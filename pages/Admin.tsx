import React, { useState } from "react";
import {
  LayoutDashboard,
  Info,
  Calendar,
  Image,
  Edit2,
  Trash2,
  Plus,
  Star,
  Phone,
  Users,
  Briefcase,
  GraduationCap,
  BarChart3,
  Film,
  FileText,
  LogOut,
  Loader2,
} from "lucide-react";
import {
  HERO_CONTENT,
  ABOUT_CONTENT,
  STATISTICS,
  EVENTS,
  GALLERY_IMAGES,
  TEAM_LABELS,
  FOOTER_CONTENT,
  getStaffMembers,
  getStudentMembers,
} from "../constants";
import { useAuth } from "../contexts/AuthContext";
import AdminLogin from "../components/AdminLogin";

const Admin: React.FC = () => {
  const { isAdmin, isLoading, signOut, user } = useAuth();
  const [activeSection, setActiveSection] = useState<string>("general");

  const handleAction = (action: string, item?: string) => {
    alert(`${action} action clicked${item ? ` for: ${item}` : ""}`);
  };

  const staffMembers = getStaffMembers();
  const studentMembers = getStudentMembers();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated or not admin
  if (!isAdmin) {
    return <AdminLogin />;
  }

  const tabs = [
    { id: "general", label: "General", icon: LayoutDashboard, desc: "Stats & Team" },
    { id: "about", label: "About", icon: Info, desc: "About Page" },
    { id: "events", label: "Events", icon: Calendar, desc: "Manage Events" },
    { id: "gallery", label: "Gallery", icon: Image, desc: "Photos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ZYNORA Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your event website</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              data-testid="admin-logout-btn"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-all ${
                    activeSection === tab.id
                      ? "border-blue-600 text-blue-600 bg-blue-50/50"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  data-testid={`admin-tab-${tab.id}`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div className="font-semibold text-sm">{tab.label}</div>
                    <div className="text-xs opacity-70">{tab.desc}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* GENERAL SECTION */}
        {activeSection === "general" && (
          <div className="space-y-6" data-testid="admin-section-general">
            {/* Statistics */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <BarChart3 size={20} className="text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATISTICS.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                    data-testid={`stat-card-${stat.id}`}
                  >
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                      {stat.label}
                    </div>
                    <button
                      onClick={() => handleAction("Edit", stat.label)}
                      className="w-full flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-blue-300"
                      data-testid={`stat-edit-${stat.id}`}
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Hero Content */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Film size={20} className="text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Hero Section</h2>
                </div>
                <button
                  onClick={() => handleAction("Edit", "Hero Content")}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  data-testid="hero-edit-btn"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</label>
                    <div className="text-base font-semibold text-gray-900 mt-1">{HERO_CONTENT.title}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtitle</label>
                    <div className="text-sm text-gray-700 mt-1">{HERO_CONTENT.subtitle}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Members */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                </div>
                <button
                  onClick={() => handleAction("Add", "New Team Member")}
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  data-testid="team-add-btn"
                >
                  <Plus size={16} />
                  Add Member
                </button>
              </div>

              {/* Staff Members */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className="text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{TEAM_LABELS.staffTitle}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {staffMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                      data-testid={`team-card-${member.id}`}
                    >
                      <div className="font-semibold text-gray-900">{member.name}</div>
                      <div className="text-sm text-blue-600 font-medium mt-0.5">{member.role}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                        <Phone size={12} />
                        {member.phone}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAction("Edit", member.name)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-blue-300"
                          data-testid={`team-edit-${member.id}`}
                        >
                          <Edit2 size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleAction("Delete", member.name)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 px-3 py-2 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-red-300"
                          data-testid={`team-delete-${member.id}`}
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Members */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={16} className="text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{TEAM_LABELS.studentTitle}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {studentMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                      data-testid={`team-card-${member.id}`}
                    >
                      <div className="font-semibold text-gray-900 text-sm">{member.name}</div>
                      <div className="text-xs text-blue-600 font-medium mt-0.5">{member.role}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
                        <Phone size={11} />
                        {member.phone}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAction("Edit", member.name)}
                          className="flex-1 flex items-center justify-center gap-1 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-2 py-1.5 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-blue-300"
                          data-testid={`team-edit-${member.id}`}
                        >
                          <Edit2 size={11} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleAction("Delete", member.name)}
                          className="flex items-center justify-center gap-1 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 px-2 py-1.5 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-red-300"
                          data-testid={`team-delete-${member.id}`}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer Content */}
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <FileText size={20} className="text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Footer</h2>
                </div>
                <button
                  onClick={() => handleAction("Edit", "Footer")}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  data-testid="footer-edit-btn"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <div className="text-sm text-gray-700">{FOOTER_CONTENT.copyrightText}</div>
                {FOOTER_CONTENT.note && (
                  <div className="text-xs text-gray-500 mt-1">{FOOTER_CONTENT.note}</div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ABOUT SECTION */}
        {activeSection === "about" && (
          <div className="space-y-6" data-testid="admin-section-about">
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Info size={20} className="text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">About Page Content</h2>
                </div>
                <button
                  onClick={() => handleAction("Edit", "About Content")}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  data-testid="about-edit-btn"
                >
                  <Edit2 size={16} />
                  Edit All
                </button>
              </div>

              <div className="space-y-3">
                {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                    data-testid={`about-paragraph-${index}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                        Paragraph {index + 1}
                      </span>
                      <button
                        onClick={() => handleAction("Edit", `Paragraph ${index + 1}`)}
                        className="flex items-center gap-1 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-1.5 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-blue-300"
                        data-testid={`about-paragraph-edit-${index}`}
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{paragraph}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAction("Add", "New Paragraph")}
                className="mt-4 w-full flex items-center justify-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-green-200 hover:border-green-300"
                data-testid="about-add-paragraph-btn"
              >
                <Plus size={16} />
                Add New Paragraph
              </button>
            </section>
          </div>
        )}

        {/* EVENTS SECTION */}
        {activeSection === "events" && (
          <div className="space-y-6" data-testid="admin-section-events">
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-gray-700" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Events</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Total: {EVENTS.length} events</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAction("Add", "New Event")}
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  data-testid="event-add-btn"
                >
                  <Plus size={16} />
                  Add Event
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                    data-testid={`event-card-${event.id}`}
                  >
                    {/* Event Image */}
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-semibold shadow-sm">
                        Day {event.day}
                      </div>
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {event.vibe}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                      {/* Symbols */}
                      <div className="flex gap-1.5 mb-3">
                        {event.symbols.map((symbol, idx) => (
                          <span key={idx} className="text-lg">
                            {symbol}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction("Edit", event.title)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-blue-300"
                          data-testid={`event-edit-${event.id}`}
                        >
                          <Edit2 size={13} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleAction("Delete", event.title)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 px-3 py-2 rounded text-xs font-medium transition-colors border border-gray-200 hover:border-red-300"
                          data-testid={`event-delete-${event.id}`}
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* GALLERY SECTION */}
        {activeSection === "gallery" && (
          <div className="space-y-6" data-testid="admin-section-gallery">
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <Image size={20} className="text-gray-700" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Gallery</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Total: {GALLERY_IMAGES.length} images</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAction("Add", "New Image")}
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  data-testid="gallery-add-btn"
                >
                  <Plus size={16} />
                  Upload Photo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {GALLERY_IMAGES.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                    data-testid={`gallery-image-${index}`}
                  >
                    {/* Image */}
                    <div className="aspect-square">
                      <img
                        src={imageUrl}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Hover Overlay with Actions */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                      <button
                        onClick={() => handleAction("Favourite", `Image ${index + 1}`)}
                        className="w-full flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        data-testid={`gallery-favourite-${index}`}
                      >
                        <Star size={12} />
                        Favourite
                      </button>
                      <button
                        onClick={() => handleAction("Edit", `Image ${index + 1}`)}
                        className="w-full flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        data-testid={`gallery-edit-${index}`}
                      >
                        <Edit2 size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleAction("Remove", `Image ${index + 1}`)}
                        className="w-full flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1.5 rounded text-xs font-medium transition-colors"
                        data-testid={`gallery-remove-${index}`}
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>

                    {/* Image Number Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded text-xs font-semibold text-gray-700 shadow-sm">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
