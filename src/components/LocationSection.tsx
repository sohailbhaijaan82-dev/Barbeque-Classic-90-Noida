import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, MessageSquare, Share2, Clock, Car, Train, Check, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Barbeque Classic 90 Noida',
        text: 'Unlimited live grill and royal buffet at Bhutani Alphathum, Sector 90 Noida. Get Flat 55% Off!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <section id="location" className="py-20 bg-[#08090d] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Location & Details Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
                <MapPin className="w-4 h-4" />
                <span>Find Us in Sector 90 Noida</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-4">
                Visit The Barbeque Classic 90
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Situated in the iconic Bhutani Alphathum complex, offering convenient access from 
                Noida-Greater Noida Expressway and the Sector 137 & Sector 142 Metro stations.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-[#12141c] border border-amber-900/40 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Complete Address
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {RESTAURANT_INFO.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {RESTAURANT_INFO.landmark}
                  </p>
                </div>
              </div>

              {/* Quick Actions (Matching the screenshot's Call, Directions, WhatsApp, Share) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-gray-800">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="p-3 rounded-xl bg-[#191b26] hover:bg-amber-600 border border-gray-700/60 text-white flex flex-col items-center justify-center gap-1.5 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-amber-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">Call</span>
                </a>

                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#191b26] hover:bg-blue-600 border border-gray-700/60 text-white flex flex-col items-center justify-center gap-1.5 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">Directions</span>
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi,%20I%20want%20to%20visit%20The%20Barbeque%20Classic%2090%20Noida.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#191b26] hover:bg-emerald-600 border border-gray-700/60 text-white flex flex-col items-center justify-center gap-1.5 transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">WhatsApp</span>
                </a>

                <button
                  onClick={handleShare}
                  className="p-3 rounded-xl bg-[#191b26] hover:bg-purple-600 border border-gray-700/60 text-white flex flex-col items-center justify-center gap-1.5 transition-colors group"
                >
                  {copiedShare ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4 text-purple-400 group-hover:text-white" />
                  )}
                  <span className="text-xs font-semibold">{copiedShare ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Timings & Commute Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#12141c] border border-gray-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                  <Clock className="w-4 h-4" />
                  <span>Buffet Timings</span>
                </div>
                <p className="text-white font-medium">Lunch: {RESTAURANT_INFO.timings.lunch}</p>
                <p className="text-white font-medium">Dinner: {RESTAURANT_INFO.timings.dinner}</p>
                <span className="text-[11px] text-emerald-400 mt-1 block">Open 7 Days a Week</span>
              </div>

              <div className="p-4 rounded-xl bg-[#12141c] border border-gray-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5">
                  <Car className="w-4 h-4" />
                  <span>Parking & Valet</span>
                </div>
                <p className="text-gray-300">Dedicated basement valet parking at Tower-B Alphathum.</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                  <Train className="w-3.5 h-3.5 text-blue-400" />
                  <span>5 mins from Sector 137 Metro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Landmark Card */}
          <div className="lg:col-span-6 bg-[#12131b] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Interactive styled Map placeholder with real location pin & Google Link */}
            <div className="relative h-80 sm:h-96 w-full bg-[#181a25] flex flex-col justify-between p-6">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-gray-700 backdrop-blur-sm text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Bhutani Alphathum · Sector 90 Noida</span>
                </div>
                <span className="text-xs text-amber-400 font-bold px-2 py-1 rounded bg-amber-950/80 border border-amber-600/40">
                  Tower B
                </span>
              </div>

              {/* Center Map Pin with pulse */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 animate-ping absolute inset-0" />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-orange-500 border-2 border-white flex items-center justify-center text-white shadow-2xl relative z-10">
                    <MapPin className="w-7 h-7" />
                  </div>
                </div>
                <h4 className="font-serif font-bold text-lg text-white mt-3">The Barbeque Classic 90</h4>
                <p className="text-xs text-amber-300 font-medium">Bhutani Alphathum, Tower B, Sector 90, Noida</p>
              </div>

              {/* Bottom directions link */}
              <div className="relative z-10">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Open in Google Maps Navigation</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick tips */}
            <div className="p-4 bg-[#0e0f17] border-t border-gray-800 text-xs text-gray-400 flex items-center justify-between">
              <span>🚘 Landmark: Alphathum Central Lake Courtyard</span>
              <span className="text-emerald-400 font-medium">Valet Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
