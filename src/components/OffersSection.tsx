import React, { useState } from 'react';
import { DINING_OFFERS, DiningOffer } from '../data/restaurantData';
import { Tag, Sparkles, Copy, Check, Calendar, ArrowRight } from 'lucide-react';

interface OffersSectionProps {
  onClaimOffer: (offerCode: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onClaimOffer }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-20 bg-[#0e0f16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
            <Tag className="w-4 h-4" />
            <span>Direct Dining Privileges · 6 Offers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Exclusive Barbeque Classic 90 Dining Offers
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Get up to flat 55% off on unlimited buffet spreads. Direct website booking ensures zero middleman fees, 
            instant table confirmation, and complimentary celebration perks.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DINING_OFFERS.map((offer: DiningOffer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className="bg-[#141622] border border-amber-900/30 hover:border-amber-500/60 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl relative group hover:-translate-y-1"
              >
                <div>
                  {/* Top Badge & Discount */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-700/40">
                      {offer.badge}
                    </span>
                    <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                      {offer.discount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {offer.description}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] text-gray-500 mb-3 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{offer.validity}</span>
                  </div>

                  {/* Promo code box */}
                  <div className="p-2.5 rounded-xl bg-[#0b0c11] border border-gray-800 flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-mono text-xs font-bold text-amber-300 tracking-wider">
                        {offer.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="p-1 rounded text-gray-400 hover:text-white transition-colors"
                      title="Copy Coupon Code"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Apply & Reserve Button */}
                  <button
                    onClick={() => onClaimOffer(offer.code)}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-600/20 hover:bg-amber-600 border border-amber-500/40 hover:border-amber-500 text-amber-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Claim Offer & Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
