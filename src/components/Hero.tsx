import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Target, Trophy, Flame } from 'lucide-react';
import { BRAND_INFO } from '../data/academyData';

interface HeroProps {
  onJoinClick: () => void;
  onExplorePrograms: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onExplorePrograms }) => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#080B0A]">
      {/* Background Hero Image with Measured Stadium Lighting Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_football_pitch_1791618610848.jpg"
          alt="Focused young football player with foot on ball under evening stadium lights"
          className="w-full h-full object-cover object-center opacity-70 scale-100 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Scrims: Multi-stop gradient for text legibility and stadium atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0A] via-[#080B0A]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B0A] via-[#080B0A]/85 to-transparent/40" />
        {/* Subtle pitch lighting glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#19D66B]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
        <div className="max-w-3xl space-y-6">
          {/* Subtle kicker */}
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#19D66B] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#19D66B]" />
            <span>HAZIK’S FOOTSTEP WITH BALL · PLAYER DEVELOPMENT ACADEMY</span>
          </div>

          {/* Headline: Oversized Athletic Condensed Display */}
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92] text-balance">
            EVERY GREAT PLAYER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#19D66B]">
              STARTS WITH A STEP.
            </span>
          </h1>

          {/* Value proposition description */}
          <p className="text-lg sm:text-xl text-[#A7B0AA] font-normal max-w-2xl leading-relaxed">
            Building skills, discipline, confidence, and the next generation of football talent — one step at a time.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onJoinClick}
              className="px-8 py-4 bg-[#19D66B] text-[#080B0A] font-display font-black text-xl tracking-wider uppercase rounded-sm hover:bg-emerald-400 active:scale-98 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(25,214,107,0.35)]"
            >
              <span>JOIN THE ACADEMY</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={onExplorePrograms}
              className="px-8 py-4 bg-[#0B2419]/80 hover:bg-[#0B2419] text-white border border-[#19D66B]/40 hover:border-[#19D66B] font-display font-bold text-xl tracking-wider uppercase rounded-sm transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE OUR PROGRAMS</span>
            </button>
          </div>

          {/* Secondary slogan quiet quote */}
          <div className="pt-2 text-xs text-[#A7B0AA]/80 font-medium tracking-wide">
            “{BRAND_INFO.secondarySlogan}”
          </div>
        </div>
      </div>

      {/* Full-width 4-metric strip below hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 px-6 rounded-lg bg-[#0B2419]/40 border border-[#19D66B]/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#080B0A] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-wide">6 PROGRAMS</div>
              <div className="text-xs text-[#A7B0AA]">Proposed Training Paths</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#080B0A] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-wide">5-STAGE PATH</div>
              <div className="text-xs text-[#A7B0AA]">Step-By-Step Progression</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#080B0A] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-wide">DISCIPLINE</div>
              <div className="text-xs text-[#A7B0AA]">Character & Respect First</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#080B0A] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-wide">PASSION</div>
              <div className="text-xs text-[#A7B0AA]">Confidence & Game Love</div>
            </div>
          </div>
        </div>

        {/* Discreet scroll indicator */}
        <div className="flex justify-center pt-6 text-stone-500">
          <button
            onClick={onExplorePrograms}
            className="flex items-center gap-1.5 text-xs text-[#A7B0AA] hover:text-[#19D66B] transition-colors focus:outline-none"
            aria-label="Scroll down to academy philosophy"
          >
            <span>Scroll to Discover</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#19D66B]" />
          </button>
        </div>
      </div>
    </section>
  );
};
