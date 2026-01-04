
import { EventCard, Tagline } from './types';

export const TAGLINES: Tagline[] = [
  "Enter the Stories. Live the Legends.",
  "Where Cinema Meets Celebration.",
  "A Night Inspired by Icons."
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253361-bee8a187449a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496337589254-7e19d01ced44?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1429962714451-bb934ecbb4ec?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
];

export const EVENTS: EventCard[] = [
  {
    id: 'heist',
    title: 'The Heist Protocol',
    inspiration: 'Inspired by Money Heist',
    description: 'Strategy games and puzzle cracking. Execute the perfect plan.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
    color: 'border-red-600 shadow-red-900/50',
    symbols: ['🎭', '💰', '⏰'],
    day: 1,
    vibe: 'crime'
  },
  {
    id: 'redlight',
    title: 'The Red Light Trial',
    inspiration: 'Inspired by Squid Game',
    description: 'Competitive games and high-stakes elimination rounds.',
    image: 'https://images.unsplash.com/photo-1634155581321-7076939b033d?auto=format&fit=crop&q=80&w=800',
    color: 'border-pink-600 shadow-pink-900/50',
    symbols: ['◯', '△', '▢'],
    day: 1,
    vibe: 'thriller'
  },
  {
    id: 'throne',
    title: 'The Iron Throne Challenge',
    inspiration: 'Inspired by Game of Thrones',
    description: 'Debate, leadership, and team domination. Conquer the land.',
    image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800',
    color: 'border-yellow-600 shadow-yellow-900/50',
    symbols: ['⚔️', '🐲', '❄️'],
    day: 1,
    vibe: 'fantasy'
  },
  {
    id: 'upside',
    title: 'The Upside Rift',
    inspiration: 'Inspired by Stranger Things',
    description: 'Mystery games and escape-style challenges. Brave the rift.',
    image: 'https://images.unsplash.com/photo-1498747946579-bde604cb8f44?auto=format&fit=crop&q=80&w=800',
    color: 'border-purple-600 shadow-purple-900/50',
    symbols: ['🔦', '🚲', '👾'],
    day: 2,
    vibe: 'horror'
  },
  {
    id: 'blackpearl',
    title: 'The Black Pearl Quest',
    inspiration: 'Inspired by Pirates of the Caribbean',
    description: 'A massive campus-wide treasure hunt. Follow the maps.',
    image: 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?auto=format&fit=crop&q=80&w=800',
    color: 'border-cyan-600 shadow-cyan-900/50',
    symbols: ['⚓', '🗺️', '🦜'],
    day: 2,
    vibe: 'adventure'
  },
  {
    id: 'bluelab',
    title: 'The Blue Lab Experiment',
    inspiration: 'Inspired by Breaking Bad',
    description: 'Logic games and science-based fun. Apply pure precision.',
    image: 'https://images.unsplash.com/photo-1532187875605-186c7131ed57?auto=format&fit=crop&q=80&w=800',
    color: 'border-blue-600 shadow-blue-900/50',
    symbols: ['🧪', '🚬', '⚗️'],
    day: 2,
    vibe: 'action'
  }
];
