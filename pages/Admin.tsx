import React, { useState } from "react";
import {
  HERO_CONTENT,
  ONBOARDING_CONTENT,
  ABOUT_CONTENT,
  STATISTICS,
  EVENTS,
  GALLERY_IMAGES,
  SECTION_CONTENT,
  BUTTON_LABELS,
  TEAM_MEMBERS,
  TEAM_LABELS,
  FOOTER_CONTENT,
  getStaffMembers,
  getStudentMembers,
} from "../constants";

const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("general");

  const handleAction = (action: string, item?: string) => {
    alert(`${action} action clicked${item ? ` for: ${item}` : ""}`);
  };

  const staffMembers = getStaffMembers();
  const studentMembers = getStudentMembers();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">ZYNORA Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage your event website content easily</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: "general", label: "📊 General", desc: "Homepage & Stats" },
              { id: "about", label: "ℹ️ About", desc: "About Page" },
              { id: "events", label: "🎭 Events", desc: "Manage Events" },
              { id: "gallery", label: "🖼️ Gallery", desc: "Manage Photos" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  activeSection === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                data-testid={`admin-tab-${tab.id}`}
              >
                <div className="text-lg">{tab.label}</div>
                <div className="text-xs opacity-80">{tab.desc}</div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* GENERAL SECTION */}
        {activeSection === "general" && (
          <div className="space-y-8" data-testid="admin-section-general">
            {/* Statistics */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">📊 Statistics</h2>
                  <p className="text-gray-600 text-sm mt-1">Numbers shown on homepage</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATISTICS.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200"
                    data-testid={`stat-card-${stat.id}`}
                  >
                    <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <button
                      onClick={() => handleAction("Edit", stat.label)}
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      data-testid={`stat-edit-${stat.id}`}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Hero Content */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">🎬 Hero Section</h2>
                  <p className="text-gray-600 text-sm mt-1">Main banner at the top of homepage</p>
                </div>
                <button
                  onClick={() => handleAction("Edit", "Hero Content")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  data-testid="hero-edit-btn"
                >
                  ✏️ Edit Hero
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Title</label>
                  <div className="text-xl font-bold text-gray-900 mt-1">{HERO_CONTENT.title}</div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Subtitle</label>
                  <div className="text-gray-700 mt-1">{HERO_CONTENT.subtitle}</div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                    {HERO_CONTENT.primaryButtonText}
                  </div>
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium">
                    {HERO_CONTENT.secondaryButtonText}
                  </div>
                </div>
              </div>
            </section>

            {/* Team Members */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">👥 Team Members</h2>
                  <p className="text-gray-600 text-sm mt-1">Staff and student coordinators</p>
                </div>
                <button
                  onClick={() => handleAction("Add", "New Team Member")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  data-testid="team-add-btn"
                >
                  ➕ Add Member
                </button>
              </div>

              {/* Staff Members */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">👔 {TEAM_LABELS.staffTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {staffMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-purple-50 rounded-lg p-5 border-2 border-purple-200"
                      data-testid={`team-card-${member.id}`}
                    >
                      <div className="font-bold text-lg text-gray-900">{member.name}</div>
                      <div className="text-purple-600 font-medium text-sm mt-1">{member.role}</div>
                      <div className="text-gray-600 text-sm mt-2">📞 {member.phone}</div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleAction("Edit", member.name)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          data-testid={`team-edit-${member.id}`}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleAction("Delete", member.name)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          data-testid={`team-delete-${member.id}`}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Members */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">🎓 {TEAM_LABELS.studentTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentMembers.map((member) => (
                    <div
                      key={member.id}
                      className="bg-blue-50 rounded-lg p-5 border-2 border-blue-200"
                      data-testid={`team-card-${member.id}`}
                    >
                      <div className="font-bold text-lg text-gray-900">{member.name}</div>
                      <div className="text-blue-600 font-medium text-sm mt-1">{member.role}</div>
                      <div className="text-gray-600 text-sm mt-2">📞 {member.phone}</div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleAction("Edit", member.name)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                          data-testid={`team-edit-${member.id}`}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleAction("Delete", member.name)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                          data-testid={`team-delete-${member.id}`}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer Content */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">📄 Footer</h2>
                  <p className="text-gray-600 text-sm mt-1">Bottom of page text</p>
                </div>
                <button
                  onClick={() => handleAction("Edit", "Footer")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  data-testid="footer-edit-btn"
                >
                  ✏️ Edit
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-gray-700">{FOOTER_CONTENT.copyrightText}</div>
                {FOOTER_CONTENT.note && (
                  <div className="text-gray-500 text-sm mt-2">{FOOTER_CONTENT.note}</div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ABOUT SECTION */}
        {activeSection === "about" && (
          <div className="space-y-8" data-testid="admin-section-about">
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">ℹ️ About Page Content</h2>
                  <p className="text-gray-600 text-sm mt-1">Information about your event</p>
                </div>
                <button
                  onClick={() => handleAction("Edit", "About Content")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  data-testid="about-edit-btn"
                >
                  ✏️ Edit About
                </button>
              </div>

              <div className="space-y-4">
                {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200"
                    data-testid={`about-paragraph-${index}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Paragraph {index + 1}
                      </span>
                      <button
                        onClick={() => handleAction("Edit", `Paragraph ${index + 1}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        data-testid={`about-paragraph-edit-${index}`}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAction("Add", "New Paragraph")}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-colors"
                data-testid="about-add-paragraph-btn"
              >
                ➕ Add New Paragraph
              </button>
            </section>
          </div>
        )}

        {/* EVENTS SECTION */}
        {activeSection === "events" && (
          <div className="space-y-8" data-testid="admin-section-events">
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">🎭 Events</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Manage your event competitions - Total: {EVENTS.length} events
                  </p>
                </div>
                <button
                  onClick={() => handleAction("Add", "New Event")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  data-testid="event-add-btn"
                >
                  ➕ Add New Event
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 hover:shadow-lg transition-shadow"
                    data-testid={`event-card-${event.id}`}
                  >
                    {/* Event Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold">
                        Day {event.day}
                      </div>
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {event.vibe}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                      {/* Symbols */}
                      <div className="flex gap-2 mb-4">
                        {event.symbols.map((symbol, idx) => (
                          <span key={idx} className="text-2xl">
                            {symbol}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction("Edit", event.title)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                          data-testid={`event-edit-${event.id}`}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleAction("Delete", event.title)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                          data-testid={`event-delete-${event.id}`}
                        >
                          🗑️ Delete
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
          <div className="space-y-8" data-testid="admin-section-gallery">
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">🖼️ Gallery</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Manage event photos - Total: {GALLERY_IMAGES.length} images
                  </p>
                </div>
                <button
                  onClick={() => handleAction("Add", "New Image")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  data-testid="gallery-add-btn"
                >
                  ➕ Upload Photo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {GALLERY_IMAGES.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all"
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
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                      <button
                        onClick={() => handleAction("Favourite", `Image ${index + 1}`)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                        data-testid={`gallery-favourite-${index}`}
                      >
                        ⭐ Favourite
                      </button>
                      <button
                        onClick={() => handleAction("Edit", `Image ${index + 1}`)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                        data-testid={`gallery-edit-${index}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleAction("Remove", `Image ${index + 1}`)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors text-sm"
                        data-testid={`gallery-remove-${index}`}
                      >
                        🗑️ Remove
                      </button>
                    </div>

                    {/* Image Number Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-bold text-gray-700">
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
