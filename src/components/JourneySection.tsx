import React from 'react';
import { ArrowRight, Footprints, Shield, Target, Users, Zap } from 'lucide-react';
import { JOURNEY_STEPS } from '../data/academyData';

const stepIcons = [Footprints, Target, Zap, Shield, Users];

export const JourneySection: React.FC = () => {
  return (
    <section className="py-24 bg-[#080B0A] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0B2419]/40 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
            THE PATHWAY TO MASTERY
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
            PLAYER DEVELOPMENT JOURNEY
          </h2>
          <p className="text-sm text-[#A7B0AA]">
            Great footballers are not built overnight. Every player traverses a structured 5-stage progression designed to instill technical reflexes, cognitive sharpness, and unwavering discipline.
          </p>
        </div>

        {/* 5-Stage Editorial Step Flow */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0B2419] via-[#19D66B]/50 to-[#0B2419] -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => {
              const IconComponent = stepIcons[idx] || Footprints;
              return (
                <div
                  key={step.step}
                  className="p-6 rounded-lg bg-[#050706] border border-[#0B2419] hover:border-[#19D66B]/60 hover:bg-[#0B2419]/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Step number badge & icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded bg-[#0B2419] border border-[#19D66B]/40 flex items-center justify-center text-[#19D66B] group-hover:bg-[#19D66B] group-hover:text-[#080B0A] transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-display font-black text-3xl text-white/20 group-hover:text-[#19D66B]/40 transition-colors">
                        {step.step}
                      </span>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold text-[#19D66B] tracking-wider uppercase">
                        {step.subtitle}
                      </div>
                      <h3 className="font-display font-black text-xl text-white uppercase tracking-wide mt-1 group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#A7B0AA] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Stage {idx + 1} of 5</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#19D66B]/60 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
