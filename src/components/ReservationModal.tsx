import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MessageSquare, MapPin, X, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    mealType?: 'lunch' | 'dinner';
    vegCount?: number;
    nonVegCount?: number;
    kidsCount?: number;
    offerCode?: string;
  };
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');

  // Form State
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [mealSlot, setMealSlot] = useState<string>(initialData?.mealType === 'lunch' ? '01:00 PM' : '08:00 PM');
  const [vegCount, setVegCount] = useState<number>(initialData?.vegCount ?? 2);
  const [nonVegCount, setNonVegCount] = useState<number>(initialData?.nonVegCount ?? 2);
  const [kidsCount, setKidsCount] = useState<number>(initialData?.kidsCount ?? 0);
  const [seatingPref, setSeatingPref] = useState<string>('Live Music Lounge');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>(initialData?.offerCode || 'CLASSIC55');
  const [bookingId, setBookingId] = useState<string>('');

  if (!isOpen) return null;

  const totalGuests = vegCount + nonVegCount + kidsCount;

  const lunchSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'];
  const dinnerSlots = ['07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalGuests === 0) return;

    // Generate random booking reference ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const id = `BBQ90-2026-${randomHex}`;
    setBookingId(id);

    // Fire joyful celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ea580c', '#10b981', '#ffffff'],
      });
    } catch {
      // ignore
    }

    setStep('confirmed');
  };

  const getWhatsAppBookingText = () => {
    const text = `Hello The Barbeque Classic 90 Noida!
I have reserved a table on your website:
• Booking ID: ${bookingId}
• Name: ${fullName}
• Date: ${date} at ${mealSlot}
• Guests: ${totalGuests} (${vegCount} Veg, ${nonVegCount} Non-Veg, ${kidsCount} Kids)
• Seating: ${seatingPref}
• Occasion: ${occasion}
• Applied Offer: ${promoCode} (Flat 55% Off)
Please confirm our reservation at Tower-B Bhutani Alphathum. Thank you!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#11131b] border border-amber-600/40 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-amber-950 via-[#1a1c27] to-orange-950 p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Direct Table Reservation
              </span>
              <h3 className="text-xl font-serif font-bold text-white">The Barbeque Classic 90 Noida</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Promo banner */}
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Flat 55% Off Promo Code Applied:</strong> You will receive full discount at billing!
                </span>
              </div>
              <span className="font-mono font-bold bg-amber-500 text-black px-2 py-0.5 rounded text-[11px]">
                {promoCode}
              </span>
            </div>

            {/* Date & Time slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  Reservation Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Select Seating Time Slot
                </label>
                <select
                  value={mealSlot}
                  onChange={(e) => setMealSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <optgroup label="Lunch Slots (12:00 PM – 04:00 PM)">
                    {lunchSlots.map((s) => (
                      <option key={s} value={s}>
                        {s} (Lunch Buffet)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Dinner & Live Music Slots (07:00 PM – 11:30 PM)">
                    {dinnerSlots.map((s) => (
                      <option key={s} value={s}>
                        {s} (Dinner & Live Music)
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Guest configuration */}
            <div>
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                Number of Guests ({totalGuests} total)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#181a25] border border-gray-800 text-center">
                  <span className="text-[11px] font-bold text-emerald-400 block mb-1">Veg Adults</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVegCount(Math.max(0, vegCount - 1))}
                      className="w-6 h-6 rounded bg-[#272a3b] text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-white">{vegCount}</span>
                    <button
                      type="button"
                      onClick={() => setVegCount(vegCount + 1)}
                      className="w-6 h-6 rounded bg-amber-600 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181a25] border border-gray-800 text-center">
                  <span className="text-[11px] font-bold text-red-400 block mb-1">Non-Veg Adults</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNonVegCount(Math.max(0, nonVegCount - 1))}
                      className="w-6 h-6 rounded bg-[#272a3b] text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-white">{nonVegCount}</span>
                    <button
                      type="button"
                      onClick={() => setNonVegCount(nonVegCount + 1)}
                      className="w-6 h-6 rounded bg-amber-600 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#181a25] border border-gray-800 text-center">
                  <span className="text-[11px] font-bold text-amber-400 block mb-1">Kids (5-10 yrs)</span>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                      className="w-6 h-6 rounded bg-[#272a3b] text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-white">{kidsCount}</span>
                    <button
                      type="button"
                      onClick={() => setKidsCount(kidsCount + 1)}
                      className="w-6 h-6 rounded bg-amber-600 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Seating preference & Occasion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block">
                  Seating Area Preference
                </label>
                <select
                  value={seatingPref}
                  onChange={(e) => setSeatingPref(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Live Music Lounge">Live Acoustic Music Area</option>
                  <option value="Cozy Family Booth">Cozy Family Greenery Booth</option>
                  <option value="Near Live Counter">Close to Live Chef Counters</option>
                  <option value="Corporate Hall">Alphathum Corporate Section</option>
                  <option value="Quiet Romantic Corner">Quiet Couple / Romantic Corner</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 block">
                  Special Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Casual Dining">Casual Dining / Foodie Outing</option>
                  <option value="Birthday Celebration">Birthday (Includes Free Celebration Cake & Sparkler!)</option>
                  <option value="Wedding Anniversary">Wedding Anniversary Celebration</option>
                  <option value="Corporate Team Outing">Corporate Team Dinner / Party</option>
                  <option value="Family Reunion">Family Get-together</option>
                </select>
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="space-y-4 pt-2 border-t border-gray-800">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                Primary Guest Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Mobile Number * (e.g. 9871489090)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address (optional for calendar invite)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Special request (e.g. Jain food, baby chair)"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181a25] border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Submission button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={totalGuests === 0}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-orange-950/60 active:scale-98 transition-all"
              >
                <span>Confirm Reservation & Lock 55% Off</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Instant Table Guarantee
                </span>
                <span>·</span>
                <span>Zero advance deposit needed</span>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Reservation Confirmed!
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                We Can&apos;t Wait to Host You, {fullName || 'Dear Guest'}!
              </h3>
              <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto">
                Your live grill table has been reserved at The Barbeque Classic 90, Tower-B Bhutani Alphathum, Sector 90 Noida.
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-[#181a25] border border-gray-800 rounded-2xl p-5 text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-gray-400">Booking Reference</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Slot</span>
                <span className="font-semibold text-white">{date} · {mealSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Party Size</span>
                <span className="font-semibold text-white">
                  {totalGuests} Guests ({vegCount} Veg, {nonVegCount} Non-Veg{kidsCount > 0 ? `, ${kidsCount} Kids` : ''})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Seating Preference</span>
                <span className="font-semibold text-white">{seatingPref}</span>
              </div>
              {occasion !== 'Casual Dining' && (
                <div className="flex justify-between text-amber-300">
                  <span>Celebration Perk</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-amber-400" />
                    {occasion} (Free Cake & Decor)
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-800 text-emerald-400 font-semibold">
                <span>Applied Privileges</span>
                <span>Flat 55% Off Buffet ({promoCode})</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${getWhatsAppBookingText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send to WhatsApp</span>
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#222534] hover:bg-[#2c3044] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Get Directions</span>
              </a>
            </div>

            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="text-xs text-gray-400 hover:text-white underline pt-2"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
