import React from 'react';
import { ArrowUpRight, MessageSquareQuote, ShieldAlert } from 'lucide-react';
import { TESTIMONIALS } from '../data/academyData';

interface TestimonialsSectionProps {
  onRegisterClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onRegisterClick,
}) => {
  return (
    <section className="py-24 bg-[#050706] border-t border-[#0B2419] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header with Draft Disclosure */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              VOICES OF THE ACADEMY
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              COMMUNITY VOICES & EXPERIENCES
            </h2>
            <p className="text-sm text-[#A7B0AA] max-w-xl">
              Authentic reflections on player progress, attitude, and the transformative impact of disciplined training.
            </p>
          </div>

          <div className="p-3.5 rounded bg-[#080B0A] border border-amber-500/20 text-xs text-amber-200/90 max-w-sm">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5 pb-0.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Draft Placeholder Notice
            </div>
            These reviews are structured sample draft placeholders for incoming parents and players to review layout format. Verified testimonials will be posted upon seasonal parent surveys.
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-xl bg-[#080B0A] border border-[#0B2419] hover:border-[#19D66B]/30 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <MessageSquareQuote className="w-8 h-8 text-[#19D66B]/60" />
                <p className="text-sm text-stone-300 leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-1">
                <div className="font-heading font-semibold text-xs text-white">
                  {item.author}
                </div>
                <div className="text-[11px] text-[#A7B0AA] flex items-center justify-between">
                  <span>{item.relation}</span>
                  <span className="text-stone-500">{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Master Call To Action Block */}
        <div className="relative rounded-2xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-[#0B2419] via-[#080B0A] to-[#0B2419] border border-[#19D66B]/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              THE NEXT STEP IS YOURS
            </div>
            <h3 className="font-display font-black text-4xl sm:text-6xl text-white uppercase leading-[0.95]">
              YOUR JOURNEY STARTS WITH ONE STEP.
            </h3>
            <p className="text-base text-[#A7B0AA] leading-relaxed">
              Take the first step toward becoming a better player. Register your interest for our upcoming intake or schedule an initial player evaluation.
            </p>
            <div className="pt-4">
              <button
                onClick={onRegisterClick}
                className="px-8 py-4 bg-[#19D66B] text-[#080B0A] font-display font-black text-xl tracking-wider uppercase rounded-sm hover:bg-emerald-400 active:scale-98 transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(25,214,107,0.3)]"
              >
                <span>REGISTER YOUR INTEREST</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Decorative Football pitch line */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
            <div className="w-96 h-96 rounded-full border-[12px] border-[#19D66B] absolute -right-32 -bottom-32" />
          </div>
        </div>
      </div>
    </section>
  );
};
