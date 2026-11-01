import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Flame, MapPin, Phone, MessageSquare, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06070a] border-t border-gray-900 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-bold text-base text-white block">
                  The Barbeque Classic 90
                </span>
                <span className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold">
                  Sector 90 Noida
                </span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs">
              Noida&apos;s premier unlimited live-grill barbecue lounge and royal buffet restaurant. 
              Featuring on-table charcoal grills, 70+ delicacies, and live acoustic music.
            </p>
            <div className="text-[11px] text-amber-400 font-medium">
              ⭐ 4.2 Rating · 1,300+ Verified Diners
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#live-grill" className="hover:text-amber-400 transition-colors">
                  Interactive 3D Live Grill
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-amber-400 transition-colors">
                  Flat 55% Off Dining Offers
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Buffet Pricing Calculator
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Full 70+ Items Menu
                </a>
              </li>
              <li>
                <a href="#ambiance" className="hover:text-amber-400 transition-colors">
                  Alphathum Restaurant Ambiance
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Verified Guest Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Timings & Specials */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Buffet Timings & Days
            </h4>
            <div className="space-y-2 text-gray-300">
              <div>
                <span className="text-gray-400 block text-[11px]">Lunch Buffet</span>
                <span className="font-medium text-white">{RESTAURANT_INFO.timings.lunch}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Dinner & Live Music</span>
                <span className="font-medium text-white">{RESTAURANT_INFO.timings.dinner}</span>
              </div>
              <div className="pt-1 text-[11px] text-emerald-400 font-medium">
                Open All 7 Days a Week
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Bhutani Alphathum Location
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  {RESTAURANT_INFO.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-gray-300 hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi,%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp Booking Support
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-400">{RESTAURANT_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <p>© 2026 The Barbeque Classic 90 Noida (The BBQ Cafe & Restro). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for BBQ lovers at Bhutani Alphathum, Sector 90 Noida
          </p>
        </div>
      </div>
    </footer>
  );
};
