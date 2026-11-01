import React, { useState } from 'react';
import { REVIEWS_LIST, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, MessageSquareQuote, ShieldCheck, Heart } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'corporate' | 'family' | 'celebration'>('all');

  const filteredReviews = REVIEWS_LIST.filter((r) => {
    if (filter === 'corporate') return r.comment.toLowerCase().includes('corporate') || r.comment.toLowerCase().includes('team');
    if (filter === 'family') return r.comment.toLowerCase().includes('family') || r.comment.toLowerCase().includes('kids');
    if (filter === 'celebration') return r.comment.toLowerCase().includes('anniversary') || r.comment.toLowerCase().includes('birthday');
    return true;
  });

  return (
    <section id="reviews" className="py-20 bg-[#0c0d14] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>Verified Patron Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Loved by 1,300+ Diners in Noida
            </h2>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              From corporate team celebrations at Bhutani Alphathum to romantic candlelit live grill dinners.
            </p>
          </div>

          {/* Aggregate Rating Badge with Google link */}
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Read and write reviews on Google"
            className="bg-[#141622] hover:bg-[#1a1d2d] border border-amber-900/40 hover:border-amber-500/50 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center text-white font-extrabold text-xl shadow-lg group-hover:scale-105 transition-transform">
              <span>{RESTAURANT_INFO.rating}</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors block">
                Excellent Rating ↗
              </span>
              <span className="text-[11px] text-gray-400">Based on 1,300+ Google Reviews</span>
            </div>
          </a>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#151722] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            All Verified Reviews
          </button>
          <button
            onClick={() => setFilter('corporate')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'corporate'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#151722] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            Alphathum Corporate Parties
          </button>
          <button
            onClick={() => setFilter('family')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'family'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#151722] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            Family & Kids Dinners
          </button>
          <button
            onClick={() => setFilter('celebration')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === 'celebration'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-[#151722] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            Birthdays & Anniversaries
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#12141c] border border-gray-800/80 hover:border-amber-700/50 rounded-2xl p-6 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">{review.date}</span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <MessageSquareQuote className="w-4 h-4 text-amber-500/80 shrink-0" />
                  <span>{review.highlight}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">{review.author}</span>
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {review.source}
                  </span>
                </div>
                <span className="text-amber-500 font-medium text-[11px] flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-amber-500" />
                  Recommended
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
