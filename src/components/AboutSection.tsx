import React from 'react';
import { ArrowUpRight, Award, Compass, Heart, ShieldCheck, Users, Zap } from 'lucide-react';
import { BRAND_INFO, VALUES } from '../data/academyData';

interface AboutSectionProps {
  onLearnMoreClick?: () => void;
  onJoinClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMoreClick, onJoinClick }) => {
  return (
    <section className="py-24 bg-[#080B0A] relative overflow-hidden" id="about">
      {/* Subtle pitch pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#19D66B_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Editorial Split: Philosophy Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with natural athletic lighting */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#0B2419] bg-[#050706] shadow-2xl">
              <img
                src="/src/assets/images/philosophy_youth_training_1791618628487.jpg"
                alt="Close-up of football boots stepping on match ball on wet green turf"
                className="w-full h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0A] via-transparent to-transparent opacity-80" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#080B0A]/90 backdrop-blur-md border border-[#19D66B]/30">
                <div className="text-xs uppercase font-bold tracking-widest text-[#19D66B]">
                  ACADEMY CREED
                </div>
                <div className="font-display font-bold text-lg text-white mt-0.5">
                  “Every Great Player Starts With a Step.”
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              PHILOSOPHY & FOUNDATION
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase leading-[0.95] text-balance">
              MORE THAN FOOTBALL. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#19D66B]">
                A FOUNDATION FOR LIFE.
              </span>
            </h2>

            <div className="space-y-4 text-base text-[#A7B0AA] leading-relaxed">
              <p>
                At <strong className="text-white font-medium">{BRAND_INFO.name}</strong>, we believe technical mastery begins with patience, deliberate practice, and humility. Football is not merely ninety minutes on a weekend—it is a crucible where young individuals learn self-discipline, resilience in adversity, and the strength of a united team.
              </p>
              <p>
                Whether a child is taking their very first touch on a grass pitch or preparing for competitive youth leagues, our coaching philosophy guides them through structured, progressive steps. We teach players to understand the why behind every movement: scanning before receiving, playing with composure under pressure, and respecting opponents, referees, and teammates.
              </p>
            </div>

            {/* Mission & Vision Callout Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded bg-[#0B2419]/30 border border-[#19D66B]/20">
                <div className="flex items-center gap-2 text-white font-heading font-semibold text-sm">
                  <Compass className="w-4 h-4 text-[#19D66B]" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-[#A7B0AA] mt-2 leading-relaxed">
                  To provide an encouraging, high-standard football training environment where every young player discovers their athletic capability, builds lifelong discipline, and cultivates a pure love for the game.
                </p>
              </div>

              <div className="p-4 rounded bg-[#0B2419]/30 border border-[#19D66B]/20">
                <div className="flex items-center gap-2 text-white font-heading font-semibold text-sm">
                  <Award className="w-4 h-4 text-[#19D66B]" />
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-[#A7B0AA] mt-2 leading-relaxed">
                  To become a benchmark youth football institution recognized for developing technically refined, tactically intelligent, and morally grounded players who rise with every step.
                </p>
              </div>
            </div>

            {/* Editable Foundation Notice */}
            <div className="p-3.5 rounded bg-white/[0.02] border border-white/5 text-xs text-stone-400">
              <strong className="text-stone-300">Academy Foundation Note:</strong> Founded on player-centric values. Official academy affiliations, federation accreditations, and competition calendars are finalized upon seasonal registration review.
            </div>

            <div className="pt-2 flex items-center gap-4">
              {onJoinClick && (
                <button
                  onClick={onJoinClick}
                  className="px-6 py-3 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-bold text-base tracking-wider uppercase hover:bg-emerald-400 transition-colors flex items-center gap-2"
                >
                  <span>Begin Your Journey</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Why Choose Us & Core Values */}
        <div className="pt-12 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              THE VALUES WE STAND FOR
            </div>
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              WHY CHOOSE HAZIK’S ACADEMY
            </h3>
            <p className="text-sm text-[#A7B0AA]">
              Our core values guide every drill, every team talk, and every touch of the ball.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((val) => (
              <div
                key={val.number}
                className="p-6 rounded-lg bg-[#0B2419]/25 border border-[#19D66B]/15 hover:border-[#19D66B]/40 hover:bg-[#0B2419]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="font-heading font-black text-xl text-[#19D66B] tracking-tight">
                    {val.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#19D66B]/30 group-hover:bg-[#19D66B] transition-colors" />
                </div>
                <h4 className="font-display font-bold text-xl text-white uppercase tracking-wide mt-4 group-hover:text-[#19D66B] transition-colors">
                  {val.title}
                </h4>
                <p className="text-sm text-[#A7B0AA] mt-2 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
