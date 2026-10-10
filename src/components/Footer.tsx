import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, ShieldCheck, Instagram, Youtube, Facebook } from 'lucide-react';
import { BRAND_INFO } from '../data/academyData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050706] border-t border-[#0B2419] text-[#A7B0AA] text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Col 1 & 2: Brand Lockup & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#0B2419] border border-[#19D66B]/40 flex items-center justify-center text-[#19D66B] font-display font-black text-lg">
                HFB
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-wider text-white uppercase leading-none">
                  HAZIK’S FOOTSTEP
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#19D66B]">
                  WITH BALL
                </span>
              </div>
            </div>

            <p className="text-sm text-[#A7B0AA] max-w-sm leading-relaxed">
              {BRAND_INFO.positioning}
            </p>

            <div className="pt-2 text-xs text-emerald-400/90 font-medium tracking-wide">
              “{BRAND_INFO.secondarySlogan}”
            </div>

            {/* Social media placeholders note */}
            <div className="pt-2 flex items-center gap-3 text-stone-400">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                className="w-8 h-8 rounded bg-[#0B2419]/70 border border-white/5 flex items-center justify-center hover:text-[#19D66B] hover:border-[#19D66B]/50 transition-colors"
                aria-label="Academy Instagram placeholder"
                title="Official Academy Instagram (Link pending confirmation)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                className="w-8 h-8 rounded bg-[#0B2419]/70 border border-white/5 flex items-center justify-center hover:text-[#19D66B] hover:border-[#19D66B]/50 transition-colors"
                aria-label="Academy YouTube placeholder"
                title="Official Academy YouTube (Link pending confirmation)"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                className="w-8 h-8 rounded bg-[#0B2419]/70 border border-white/5 flex items-center justify-center hover:text-[#19D66B] hover:border-[#19D66B]/50 transition-colors"
                aria-label="Academy Facebook placeholder"
                title="Official Academy Facebook (Link pending confirmation)"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-[#A7B0AA]/60">
                Official handles active upon launch
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider">
              Academy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Philosophy & Values
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-white transition-colors">
                  Training Programs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('coaches')} className="hover:text-white transition-colors">
                  Coaching Staff
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors">
                  Pitch & Matches Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pathways & Interactive */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider">
              Development
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-white transition-colors">
                  Foundation (Ages 5–8)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-white transition-colors">
                  Ball Control (Ages 8–12)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('programs')} className="hover:text-white transition-colors">
                  High Performance (Ages 13–18)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('studio')} className="text-[#19D66B] hover:underline flex items-center gap-1">
                  AI Media Studio (1K/2K/4K)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('register')} className="text-white hover:text-[#19D66B] font-medium transition-colors">
                  Player Application Form
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Placeholders */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-xs uppercase tracking-wider">
              Admissions
            </h4>
            <div className="space-y-2.5 text-xs text-[#A7B0AA]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#19D66B] shrink-0 mt-0.5" />
                <span>Hazik's Academy Grounds [Pitch Address Placeholder]</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#19D66B] shrink-0" />
                <span>+[Office Phone Placeholder]</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#19D66B] shrink-0" />
                <span className="truncate">admissions@haziksfootstep.academy [Placeholder]</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#19D66B] shrink-0" />
                <span>Youth Safeguarding & Safety First</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7B0AA]/70">
          <div>
            © {new Date().getFullYear()} Hazik’s Footstep with Ball. All rights reserved.
            <span className="block sm:inline sm:ml-2 text-stone-500">
              “Every Great Player Starts With a Step.”
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-stone-500">
              Official Academy Launch Edition
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#A7B0AA] hover:text-[#19D66B] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
