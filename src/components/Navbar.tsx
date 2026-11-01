import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { Flame, Phone, MessageSquare, Calendar, Menu, X, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '3D Live Grill', href: '#live-grill' },
    { label: '55% Off Offers', href: '#offers' },
    { label: 'Buffet Calculator', href: '#calculator' },
    { label: 'Menu Spread', href: '#menu' },
    { label: 'Ambiance', href: '#ambiance' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0b10]/95 backdrop-blur-md border-b border-amber-950/40 shadow-xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 flex items-center justify-center shadow-lg shadow-orange-950/50 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                The Barbeque Classic 90
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40">
                Sector 90 Noida
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <span>The BBQ Cafe & Restro</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Open Today · Alphathum Tower B
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-amber-500 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Quick Contact & Table Reserve CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            title="Call Restaurant Directly"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141620] hover:bg-[#1e2233] border border-gray-700/60 text-xs font-medium text-gray-200 hover:text-amber-400 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden xl:inline">Call Now</span>
          </a>

          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hello%20The%20Barbeque%20Classic%2090%20Noida,%20I%20would%20like%20to%20inquire%20about%20buffet%20booking%20and%20offers.`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-xs font-medium text-emerald-300 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold tracking-wide uppercase shadow-lg shadow-orange-950/60 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Table</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#151722] text-gray-300 hover:text-white border border-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0b11] border-b border-gray-800 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs text-gray-400 flex items-center gap-1 pb-2 border-b border-gray-800">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Bhutani Alphathum, Tower-B, Sector 90 Noida</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-[#141620] hover:bg-[#1e2233] text-gray-200 hover:text-amber-400"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex gap-2">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex-1 py-2 text-center rounded-lg bg-[#141620] border border-gray-700 text-xs text-white flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Us</span>
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=Hi,%20I%20would%20like%20to%20book%20a%20table%20at%20Barbeque%20Classic%2090%20Noida.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center rounded-lg bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-300 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
