import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/academyData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdvisor?: () => void;
  onOpenAiStudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdvisor,
  onOpenAiStudio,
}) => {
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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'coaches', label: 'Coaches' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B0A]/95 backdrop-blur-md border-b border-[#0B2419]/70 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-[#080B0A]/90 via-[#080B0A]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Hazik's Footstep with Ball Home"
          >
            {/* Minimalist Footstep & Ball crest */}
            <div className="w-9 h-9 rounded-md bg-[#0B2419] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] font-display font-black text-xl tracking-tighter group-hover:border-[#19D66B] transition-colors shadow-inner">
              HFB
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white uppercase leading-none group-hover:text-[#19D66B] transition-colors whitespace-nowrap">
                HAZIK’S FOOTSTEP
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.28em] text-[#19D66B] leading-tight">
                WITH BALL
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links with subtle hover underlines) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#A7B0AA] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#19D66B] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* AI Studio & Advisor Quick Launch Tabs */}
            <button
              onClick={() => {
                setActiveTab('studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded border transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'studio'
                  ? 'bg-[#19D66B]/15 text-[#19D66B] border-[#19D66B]/60'
                  : 'bg-[#0B2419]/50 text-emerald-300 border-[#19D66B]/30 hover:border-[#19D66B]/70 hover:bg-[#0B2419]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#19D66B]" />
              AI Studio (1K/2K/4K)
            </button>

            <button
              onClick={() => {
                if (onOpenAdvisor) onOpenAdvisor();
                else setActiveTab('advisor');
              }}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded border border-[#A7B0AA]/20 bg-[#080B0A]/70 text-[#A7B0AA] hover:text-white hover:border-[#19D66B]/40 transition-all whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#19D66B]" />
              Coach AI
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('register')}
              className="px-5 py-2.5 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-bold text-base tracking-wider uppercase hover:bg-emerald-400 active:scale-95 transition-all shadow-[0_0_20px_rgba(25,214,107,0.25)] flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <span>JOIN THE ACADEMY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('register')}
              className="px-3 py-1.5 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-bold text-xs uppercase tracking-wider"
            >
              Join
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#A7B0AA] hover:text-white hover:bg-[#0B2419]/50 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080B0A]/98 border-b border-[#0B2419] px-6 pt-4 pb-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                  activeTab === link.id
                    ? 'text-[#19D66B] bg-[#0B2419]/50'
                    : 'text-[#A7B0AA] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                setActiveTab('studio');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-emerald-300 bg-[#0B2419] rounded border border-[#19D66B]/30"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#19D66B]" />
                AI Studio (1K/2K/4K Image Generator)
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                if (onOpenAdvisor) onOpenAdvisor();
                else setActiveTab('advisor');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-white bg-white/5 rounded border border-white/10"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#19D66B]" />
                Hazik's Academy AI Advisor (Chat)
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleNavClick('register')}
              className="w-full mt-2 py-3 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-bold text-center text-sm uppercase tracking-wider"
            >
              Register Your Interest
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
