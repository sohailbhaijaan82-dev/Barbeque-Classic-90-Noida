/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeGrillScene } from './components/ThreeGrillScene';
import { AmbianceGallery } from './components/AmbianceGallery';
import { BuffetCalculator } from './components/BuffetCalculator';
import { MenuSection } from './components/MenuSection';
import { OffersSection } from './components/OffersSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { RESTAURANT_INFO } from './data/restaurantData';
import { Flame, Calendar, Star, MapPin, Sparkles, Phone, MessageSquare, ExternalLink, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    mealType?: 'lunch' | 'dinner';
    vegCount?: number;
    nonVegCount?: number;
    kidsCount?: number;
    offerCode?: string;
  }>({});

  const handleOpenBooking = (customData?: typeof bookingPrefill) => {
    if (customData) {
      setBookingPrefill(customData);
    }
    setIsBookingOpen(true);
  };

  const handleClaimOffer = (offerCode: string) => {
    handleOpenBooking({ offerCode });
  };

  const handleReserveWithEstimate = (details: {
    mealType: 'lunch' | 'dinner';
    vegCount: number;
    nonVegCount: number;
    kidsCount: number;
  }) => {
    handleOpenBooking({
      mealType: details.mealType,
      vegCount: details.vegCount,
      nonVegCount: details.nonVegCount,
      kidsCount: details.kidsCount,
      offerCode: 'CLASSIC55',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#f1f1f3] flex flex-col antialiased selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main className="flex-grow pt-20">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-6 pb-20 lg:pt-12 lg:pb-28">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Verified Badge Banner (No Pill Enclosure slop, clean typography) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-gray-400 mb-6 text-center">
              <span className="flex items-center gap-1.5 font-bold text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                4.2 Star Google Rating
              </span>
              <span aria-hidden="true" className="text-gray-600">·</span>
              <span>1,300+ Verified Diners</span>
              <span aria-hidden="true" className="text-gray-600">·</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Flat 55% Off on Buffet Today
              </span>
              <span aria-hidden="true" className="text-gray-600">·</span>
              <span className="text-gray-300">Tower-B, Bhutani Alphathum, Sector 90 Noida</span>
            </div>

            {/* Main Headline */}
            <div className="text-center max-w-4xl mx-auto mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Unlimited Live Grill &amp; Royal Feast in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-200">
                  Sector 90 Noida
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Experience on-table charcoal barbecue skewers, 70+ royal buffet delicacies, live pasta &amp; chaat stations, and soul-stirring live acoustic music at Bhutani Alphathum.
              </p>
            </div>

            {/* Google Listing Quick Action Bar (Matching the exact buttons from user's screenshot) */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <button
                onClick={() => handleOpenBooking()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-orange-950/60 active:scale-95 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table (55% Off)</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-4 py-3.5 rounded-xl bg-[#141622] hover:bg-[#1d2030] border border-gray-700/70 text-gray-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Restaurant</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-[#141622] hover:bg-[#1d2030] border border-gray-700/70 text-gray-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <span>Directions</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi%20Barbeque%20Classic%2090%20Noida,%20I%20would%20like%20to%20reserve%20a%20table.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* INTERACTIVE 3D LIVE GRILL HERO SHOWCASE */}
            <div id="live-grill" className="relative">
              <div className="text-center mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Virtual Table Barbecue Experience · Three.js 3D Engine
                </span>
              </div>
              <ThreeGrillScene />
            </div>

            {/* Quick Feature Perks Strip */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#12131b] border border-gray-800 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div>
                  <strong className="text-white block">Tabletop Live Grill</strong>
                  <span className="text-gray-400 text-[11px]">Unlimited hot refills</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131b] border border-gray-800 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div>
                  <strong className="text-white block">Pure Veg &amp; Non-Veg</strong>
                  <span className="text-gray-400 text-[11px]">Separate grills &amp; kitchen</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131b] border border-gray-800 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <div>
                  <strong className="text-white block">Live Music Evenings</strong>
                  <span className="text-gray-400 text-[11px]">Bollywood &amp; acoustic</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#12131b] border border-gray-800 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <div>
                  <strong className="text-white block">Tower B Alphathum</strong>
                  <span className="text-gray-400 text-[11px]">Valet parking &amp; metro</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DINING OFFERS SECTION (Flat 55% Off) */}
        <OffersSection onClaimOffer={handleClaimOffer} />

        {/* 3. INTERACTIVE BUFFET PRICING CALCULATOR */}
        <BuffetCalculator onReserveWithEstimate={handleReserveWithEstimate} />

        {/* 4. RESTAURANT AMBIANCE & REAL PHOTO GALLERY */}
        <AmbianceGallery />

        {/* 5. GRAND MENU SECTION (70+ ITEMS) */}
        <MenuSection />

        {/* 6. VERIFIED PATRON REVIEWS (4.2 STARS, 1.3K REVIEWS) */}
        <ReviewsSection />

        {/* 7. LOCATION & HOW TO REACH */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingPrefill}
      />
    </div>
  );
}
