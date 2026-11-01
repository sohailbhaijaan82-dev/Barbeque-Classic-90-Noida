import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';
import { Utensils, Search, Flame, Sparkles } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg' | 'special'>('all');

  const categories = [
    { id: 'all', label: 'All Delicacies' },
    { id: 'starters_veg', label: 'Veg Live Grill' },
    { id: 'starters_nonveg', label: 'Non-Veg Live Grill' },
    { id: 'live_counters', label: 'Live Chef Counters' },
    { id: 'main_course', label: 'Royal Main Course' },
    { id: 'desserts', label: 'Desserts & Kulfi' },
    { id: 'mocktails', label: 'Craft Mocktails' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet check
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'nonveg' && item.isVeg) return false;
      if (dietFilter === 'special' && !item.isChefSpecial) return false;
      // Search query check
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTag = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTag) return false;
      }
      return true;
    });
  }, [selectedCategory, dietFilter, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#0a0b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
            <Utensils className="w-4 h-4" />
            <span>Grand Unlimited Feast · 70+ Items</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Curated Menu of The Barbeque Classic 90
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Every dish is freshly prepared with authentic spices and slow-cooked traditional recipes. 
            All starters are served sizzling hot directly to your table charcoal grill.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#12131b] border border-gray-800 rounded-2xl p-4 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tandoori tikka, pasta, biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#191b26] border border-gray-700/60 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Diet Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#191b26] rounded-xl border border-gray-800 w-full md:w-auto overflow-x-auto">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  dietFilter === 'all'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                All Menu
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  dietFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-emerald-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                Pure Veg Only
              </button>
              <button
                onClick={() => setDietFilter('nonveg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  dietFilter === 'nonveg'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-red-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                Non-Veg
              </button>
              <button
                onClick={() => setDietFilter('special')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                  dietFilter === 'special'
                    ? 'bg-amber-500 text-black shadow-sm font-bold'
                    : 'text-gray-400 hover:text-amber-300'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                Chef&apos;s Specials
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-[#181a24] text-gray-400 hover:text-gray-200 border border-gray-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#12131b] border border-gray-800/90 rounded-2xl p-5 hover:border-amber-700/60 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header: Diet symbol & Chef Special indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {/* Standard Indian Veg / Non-Veg mark */}
                    <span
                      className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center p-0.5 ${
                        dish.isVeg ? 'border-emerald-500' : 'border-red-500'
                      }`}
                      title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      />
                    </span>
                    <span className="text-[11px] font-medium text-gray-400 capitalize">
                      {dish.category.replace('_', ' ')}
                    </span>
                  </div>

                  {dish.isChefSpecial && (
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                      <Sparkles className="w-3 h-3" />
                      Chef Special
                    </span>
                  )}
                </div>

                {/* Dish Name */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {dish.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {dish.description}
                </p>
              </div>

              {/* Bottom: Tags & Spice rating */}
              <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2 text-[11px]">
                  {dish.tags?.map((t, idx) => (
                    <span key={t} className="text-gray-400">
                      {t}
                      {idx < (dish.tags?.length || 0) - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>

                {dish.spicyLevel && (
                  <div className="flex items-center gap-0.5" title={`Spiciness: Level ${dish.spicyLevel}/3`}>
                    {[...Array(dish.spicyLevel)].map((_, i) => (
                      <Flame key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#12131b] rounded-2xl border border-gray-800">
            <Utensils className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No delicacies matched your filter</h4>
            <p className="text-xs text-gray-400 mb-4">Try clearing the search query or switching diet filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Live BBQ Guarantee Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#181a24] to-orange-950/40 border border-amber-600/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Unlimited Re-Fills on All Starters & Live Counters
              </h4>
              <p className="text-xs text-gray-400">
                You never leave hungry! Relish as many rounds of paneer tikkas, mutton seekh, pastas, and desserts as you desire.
              </p>
            </div>
          </div>
          <a
            href="#calculator"
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md transition-colors"
          >
            Check 55% Off Pricing
          </a>
        </div>
      </div>
    </section>
  );
};
