import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { EventCard } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: EventCard;
  onSuccess: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event, onSuccess }) => {
  const isEdit = !!event;
  const [formData, setFormData] = useState<Omit<EventCard, 'id'> & { id?: string }>({
    title: '',
    description: '',
    image: '',
    color: 'border-blue-600 shadow-blue-900/50',
    symbols: [],
    day: 1,
    vibe: 'action',
  });
  const [symbolsInput, setSymbolsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setFormData(event);
      setSymbolsInput(event.symbols.join(', '));
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        color: 'border-blue-600 shadow-blue-900/50',
        symbols: [],
        day: 1,
        vibe: 'action',
      });
      setSymbolsInput('');
    }
  }, [event, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const symbols = symbolsInput.split(',').map(s => s.trim()).filter(s => s);

    try {
      if (isEdit) {
        const { error: updateError } = await supabase
          .from('events')
          .update({
            title: formData.title,
            description: formData.description,
            image: formData.image,
            color: formData.color,
            symbols,
            day: formData.day,
            vibe: formData.vibe,
            updated_at: new Date().toISOString(),
          })
          .eq('id', event.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('events').insert({
          id: formData.title.toLowerCase().replace(/\s+/g, '-'),
          title: formData.title,
          description: formData.description,
          image: formData.image,
          color: formData.color,
          symbols,
          day: formData.day,
          vibe: formData.vibe,
        });

        if (insertError) throw insertError;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{isEdit ? 'Edit' : 'Add'} Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Symbols (comma-separated)</label>
            <input
              type="text"
              value={symbolsInput}
              onChange={(e) => setSymbolsInput(e.target.value)}
              required
              placeholder="🎭, 💰, ⏰"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Day</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) as 1 | 2 })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>Day 1</option>
                <option value={2}>Day 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Vibe</label>
              <select
                value={formData.vibe}
                onChange={(e) => setFormData({ ...formData, vibe: e.target.value as EventCard['vibe'] })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="thriller">Thriller</option>
                <option value="fantasy">Fantasy</option>
                <option value="action">Action</option>
                <option value="horror">Horror</option>
                <option value="adventure">Adventure</option>
                <option value="crime">Crime</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Border Color Class</label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              required
              placeholder="border-blue-600 shadow-blue-900/50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                isEdit ? 'Save Changes' : 'Add Event'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};