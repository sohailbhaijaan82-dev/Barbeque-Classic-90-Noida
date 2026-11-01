import React, { useState } from 'react';
import { Sparkles, Utensils, Music, Users, ShieldCheck, Flame, MapPin, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  category: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'live-section',
    x: 78,
    y: 22,
    title: 'LIVE SECTION & Buffet Spread',
    category: '70+ Royal Dishes',
    description: 'Polished chafers kept piping hot with Dal Makhani simmered 24 hours, Butter Chicken Classic 90, Awadhi Biryani, and fresh seasonal curries.'
  },
  {
    id: 'live-counter',
    x: 73,
    y: 50,
    title: 'Live Chef Counter',
    category: 'Made To Order',
    description: 'Watch executive chefs whip up customized Penne Alfredo, fiery Schezwan wok noodles, and steamed crystal momos right in front of you.'
  },
  {
    id: 'bbq-brand',
    x: 39,
    y: 52,
    title: 'The BBQ Cafe & Restro Zone',
    category: 'Iconic Entry Arch',
    description: 'Warm natural wood paneling, glowing retro neon sign, and welcoming hospitality at Tower B, Bhutani Alphathum.'
  },
  {
    id: 'on-table-grill',
    x: 18,
    y: 84,
    title: 'Embedded Tabletop Live Grill',
    category: 'Unlimited Sizzlers',
    description: 'Every dining booth features sunken charcoal heating wells with stainless skewers so your paneer tikkas, kebabs, and tandoori sizzle hot at your fingertips.'
  },
  {
    id: 'botanical-canopy',
    x: 62,
    y: 23,
    title: 'Greenery Divider & Mood Lighting',
    category: 'Luxury Interior',
    description: 'Lush natural hanging greenery, linear LED architectural lights, and cushioned crimson banquettes designed for family gatherings and corporate celebrations.'
  }
];

export const AmbianceGallery: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(HOTSPOTS[0]);

  return (
    <section id="ambiance" className="py-20 bg-[#0a0b10] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>The Ambiance & Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Step Inside Noida&apos;s Most Vibrant Barbeque Lounge
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Located on Tower-B, Bhutani Alphathum, Sector 90 Noida. Experience warm teak finishes, 
            mesmerizing neon live counters, lush greenery, and interactive on-table grills.
          </p>
        </div>

        {/* Real Interior Showcase with Interactive Hotspots */}
        <div className="bg-[#12131b] border border-amber-900/30 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-black group">
            {/* Real photo uploaded by user */}
            <img
              src="/assets/aistudio/file_00000000b8848211aceed2c92a01739a_114383f5.png"
              alt="The Barbeque Classic 90 Noida Interior at Bhutani Alphathum"
              className="w-full h-full object-cover brightness-95 group-hover:scale-[1.01] transition-transform duration-700"
            />

            {/* Subtle gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Interactive Hotspot Markers */}
            {HOTSPOTS.map((hs) => {
              const isSelected = activeHotspot.id === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(hs)}
                    className={`relative flex items-center justify-center transition-all ${
                      isSelected ? 'scale-125' : 'hover:scale-115'
                    }`}
                    aria-label={hs.title}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-black ring-4 ring-amber-400/50'
                          : 'bg-black/80 text-amber-300 border border-amber-500/80 hover:bg-amber-600 hover:text-white'
                      }`}
                    >
                      <Flame className="w-4 h-4 fill-current" />
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Active Hotspot Explainer Card on Bottom Over image */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 bg-[#0d0e14]/95 border border-amber-500/40 backdrop-blur-md p-4 rounded-xl shadow-2xl animate-in fade-in duration-300">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {activeHotspot.category}
                </span>
                <span className="text-[10px] text-gray-400">Tap pin to explore</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{activeHotspot.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{activeHotspot.description}</p>
            </div>
          </div>

          {/* Quick Hotspot selector pills for mobile */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {HOTSPOTS.map((hs) => (
              <button
                key={hs.id}
                onClick={() => setActiveHotspot(hs)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeHotspot.id === hs.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-[#181a24] text-gray-300 hover:text-white border border-gray-800'
                }`}
              >
                {hs.title}
              </button>
            ))}
          </div>
        </div>

        {/* Key Restaurant Features highlights */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-[#12131b] border border-gray-800 hover:border-amber-700/50 transition-all shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">All You Can Eat Feast</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Unlimited grilled appetizers served on your live tabletop grill followed by 70+ royal buffet delicacies, chaat counters, and desserts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12131b] border border-gray-800 hover:border-amber-700/50 transition-all shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-105 transition-transform">
              <Music className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Live Music & Euphoria</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Enjoy soul-stirring Bollywood acoustic sessions and soothing melodies while savoring succulent smoky kebabs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12131b] border border-gray-800 hover:border-amber-700/50 transition-all shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Corporate & Party Hall</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicated corporate banquet space for up to 150 colleagues with custom menus, projector setup, and priority live grill services.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#12131b] border border-gray-800 hover:border-amber-700/50 transition-all shadow-xl group">
            <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Alphathum Noida Landmark</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tower-B, Bhutani Alphathum, Sector 90 Noida. Seamless connectivity with Sector 137 Metro & 3-level basement valet parking.
            </p>
          </div>
        </div>

        {/* Restaurant Verified Trust Strip */}
        <div className="mt-8 p-5 rounded-2xl bg-[#141622] border border-amber-900/40 flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group hover:opacity-90 transition-opacity"
            title="Open Verified Google Business Listing"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm group-hover:scale-105 transition-transform">
              4.2★
            </div>
            <div>
              <span className="font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1">
                <span>Google Verified Business</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </span>
              <span className="text-gray-400 text-[11px]">1,300+ Verified Diners · Sector 90 Noida</span>
            </div>
          </a>

          <div className="flex flex-wrap items-center gap-4 text-gray-300 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              100% Halal & Pure Veg Dedicated Sections
            </span>
            <span className="hidden sm:inline text-gray-600">·</span>
            <span className="text-amber-400 font-medium">Flat 55% Off Direct Booking Privilege</span>
          </div>
        </div>
      </div>
    </section>
  );
};
