import React, { useState } from 'react';
import { BUFFET_PRICING } from '../data/restaurantData';
import { Calculator, Tag, Sparkles, Check, ArrowRight, Info, ShieldCheck } from 'lucide-react';

interface BuffetCalculatorProps {
  onReserveWithEstimate: (details: {
    dayType: 'weekday' | 'weekend';
    mealType: 'lunch' | 'dinner';
    vegCount: number;
    nonVegCount: number;
    kidsCount: number;
    estimatedTotal: number;
  }) => void;
}

export const BuffetCalculator: React.FC<BuffetCalculatorProps> = ({ onReserveWithEstimate }) => {
  const [dayType, setDayType] = useState<'weekday' | 'weekend'>('weekday');
  const [mealType, setMealType] = useState<'lunch' | 'dinner'>('dinner');
  const [vegCount, setVegCount] = useState<number>(2);
  const [nonVegCount, setNonVegCount] = useState<number>(2);
  const [kidsCount, setKidsCount] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<boolean>(true);

  const pricing = BUFFET_PRICING[dayType];

  // Pricing calculations
  const vegRate = couponApplied ? pricing.veg.discounted : pricing.veg.regular;
  const nonVegRate = couponApplied ? pricing.nonVeg.discounted : pricing.nonVeg.regular;
  const kidsRate = couponApplied ? pricing.kids.discounted : pricing.kids.regular;

  const originalSubtotal = (vegCount * pricing.veg.regular) + (nonVegCount * pricing.nonVeg.regular) + (kidsCount * pricing.kids.regular);
  const discountedSubtotal = (vegCount * vegRate) + (nonVegCount * nonVegRate) + (kidsCount * kidsRate);
  
  const totalSavings = originalSubtotal - discountedSubtotal;
  const gst = Math.round(discountedSubtotal * 0.05); // 5% restaurant GST
  const grandTotal = discountedSubtotal + gst;

  const totalGuests = vegCount + nonVegCount + kidsCount;

  const handleBookNow = () => {
    onReserveWithEstimate({
      dayType,
      mealType,
      vegCount,
      nonVegCount,
      kidsCount,
      estimatedTotal: grandTotal,
    });
  };

  return (
    <section id="calculator" className="py-20 bg-[#0c0d13] relative border-t border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
            <Calculator className="w-4 h-4" />
            <span>Interactive Buffet Pricing & Savings Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Calculate Your Royal Buffet Bill with Flat 55% Off
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Transparent pricing with zero hidden charges. Enjoy unlimited live starters on your table grill, 
            70+ buffet dishes, live pasta & chaat counters, and decadent desserts.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-[#12141d] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* 1. Day Type Selection */}
            <div>
              <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">
                Select Dining Day
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDayType('weekday')}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    dayType === 'weekday'
                      ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg'
                      : 'bg-[#181a24] border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Weekday Feast</span>
                    <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-700/40">
                      Mon – Fri
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Veg ₹629 <span className="line-through text-gray-500">₹1,399</span> · Non-Veg ₹719
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDayType('weekend')}
                  className={`p-3.5 rounded-xl text-left border transition-all ${
                    dayType === 'weekend'
                      ? 'bg-amber-600/20 border-amber-500 text-white shadow-lg'
                      : 'bg-[#181a24] border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Weekend Gala</span>
                    <span className="text-[10px] text-orange-400 font-semibold px-2 py-0.5 rounded bg-orange-950/60 border border-orange-700/40">
                      Sat – Sun
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Veg ₹674 <span className="line-through text-gray-500">₹1,499</span> · Non-Veg ₹764
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Meal Slot Selection */}
            <div>
              <label className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-2 block">
                Select Meal Time
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMealType('lunch')}
                  className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                    mealType === 'lunch'
                      ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                      : 'bg-[#181a24] border-gray-800 text-gray-300 hover:bg-[#1e212e]'
                  }`}
                >
                  <span>☀️ Lunch Buffet (12:00 PM – 4:00 PM)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMealType('dinner')}
                  className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
                    mealType === 'dinner'
                      ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                      : 'bg-[#181a24] border-gray-800 text-gray-300 hover:bg-[#1e212e]'
                  }`}
                >
                  <span>🌙 Dinner & Live Music (7:00 PM – 11:30 PM)</span>
                </button>
              </div>
            </div>

            {/* 3. Guest Count Adjusters */}
            <div className="space-y-4 pt-2">
              <label className="text-xs uppercase font-bold text-gray-400 tracking-wider block">
                Number of Guests
              </label>

              {/* Veg Adults */}
              <div className="p-3.5 rounded-xl bg-[#181a24] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-sm border-2 border-emerald-500 flex items-center justify-center p-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-sm font-bold text-white">Veg Buffet Adults</span>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold">
                    ₹{vegRate} / person
                  </span>
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ₹{pricing.veg.regular}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setVegCount(Math.max(0, vegCount - 1))}
                    className="w-8 h-8 rounded-lg bg-[#222534] hover:bg-[#2b2f42] text-white flex items-center justify-center font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-white">{vegCount}</span>
                  <button
                    onClick={() => setVegCount(vegCount + 1)}
                    className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Non-Veg Adults */}
              <div className="p-3.5 rounded-xl bg-[#181a24] border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-sm border-2 border-red-500 flex items-center justify-center p-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    </span>
                    <span className="text-sm font-bold text-white">Non-Veg Buffet Adults</span>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold">
                    ₹{nonVegRate} / person
                  </span>
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ₹{pricing.nonVeg.regular}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNonVegCount(Math.max(0, nonVegCount - 1))}
                    className="w-8 h-8 rounded-lg bg-[#222534] hover:bg-[#2b2f42] text-white flex items-center justify-center font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-white">{nonVegCount}</span>
                  <button
                    onClick={() => setNonVegCount(nonVegCount + 1)}
                    className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Kids */}
              <div className="p-3.5 rounded-xl bg-[#181a24] border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white">Kids (Age 5 to 10 Years)</span>
                  <div>
                    <span className="text-xs text-amber-400 font-semibold">
                      ₹{kidsRate} / child
                    </span>
                    <span className="text-xs text-gray-500 line-through ml-2">
                      ₹{pricing.kids.regular}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                    className="w-8 h-8 rounded-lg bg-[#222534] hover:bg-[#2b2f42] text-white flex items-center justify-center font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-sm text-white">{kidsCount}</span>
                  <button
                    onClick={() => setKidsCount(kidsCount + 1)}
                    className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Corporate perk reminder */}
            {totalGuests >= 8 && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 flex items-start gap-2.5 text-xs text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Group Celebration Unlocked!</strong> Since your party has {totalGuests} guests, 
                  you qualify for complimentary welcome mocktail shots and priority live acoustic music seating.
                </span>
              </div>
            )}
          </div>

          {/* Bill Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#181a25] to-[#111219] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Direct Booking Quotation
                </span>
                <h3 className="text-lg font-bold text-white">The Barbeque Classic 90</h3>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-600/50 text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>55% Discount Applied</span>
              </div>
            </div>

            {/* Coupon Chip */}
            <div className="mt-4 p-3 rounded-xl bg-amber-950/50 border border-dashed border-amber-500/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                <span className="font-mono font-bold text-white">CLASSIC55</span>
                <span className="text-gray-400 text-[11px]">(Flat 55% Off Promo)</span>
              </div>
              <button
                type="button"
                onClick={() => setCouponApplied(!couponApplied)}
                className="text-[11px] text-amber-400 underline font-semibold hover:text-white"
              >
                {couponApplied ? 'Remove' : 'Apply'}
              </button>
            </div>

            {/* Line items */}
            <div className="py-5 space-y-2.5 text-xs border-b border-gray-800">
              {vegCount > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Veg Buffet ({vegCount} × ₹{vegRate})</span>
                  <span className="font-semibold text-white">₹{vegCount * vegRate}</span>
                </div>
              )}
              {nonVegCount > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Non-Veg Buffet ({nonVegCount} × ₹{nonVegRate})</span>
                  <span className="font-semibold text-white">₹{nonVegCount * nonVegRate}</span>
                </div>
              )}
              {kidsCount > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Kids Buffet ({kidsCount} × ₹{kidsRate})</span>
                  <span className="font-semibold text-white">₹{kidsCount * kidsRate}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400 pt-2 border-t border-gray-800/60">
                <span>Buffet Subtotal</span>
                <span>₹{discountedSubtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Restaurant GST (5%)</span>
                <span>₹{gst}</span>
              </div>
            </div>

            {/* Savings banner */}
            {couponApplied && totalSavings > 0 && (
              <div className="my-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs flex items-center justify-between font-medium">
                <span>Total Instant Savings</span>
                <span className="text-sm font-bold text-emerald-400">₹{totalSavings.toLocaleString('en-IN')} Saved</span>
              </div>
            )}

            {/* Total */}
            <div className="pt-2 pb-6 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Total Payable at Counter</span>
                <span className="text-[11px] text-gray-500">Includes all taxes for {totalGuests} guests</span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
                {couponApplied && (
                  <span className="block text-xs text-gray-500 line-through">
                    ₹{(originalSubtotal + Math.round(originalSubtotal * 0.05)).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleBookNow}
              disabled={totalGuests === 0}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 shadow-xl transition-all ${
                totalGuests > 0
                  ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 text-white cursor-pointer active:scale-98 shadow-orange-950/60'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Lock 55% Deal & Reserve Table</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No Prepayment Needed
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Instant WhatsApp Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
