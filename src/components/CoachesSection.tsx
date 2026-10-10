import React from 'react';
import { Award, CheckCircle, Shield, User } from 'lucide-react';
import { COACHES } from '../data/academyData';

export const CoachesSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#050706] border-t border-[#0B2419] relative" id="coaches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-white/5">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              LEADERSHIP & MENTORSHIP
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              ACADEMY COACHING STAFF
            </h2>
            <p className="text-sm text-[#A7B0AA] max-w-2xl leading-relaxed">
              Mentors who lead with discipline, tactical clarity, and profound respect for youth potential. Our coaching lineup is structured to support players at every phase of their athletic journey.
            </p>
          </div>

          <div className="lg:col-span-4 p-4 rounded bg-[#080B0A] border border-amber-500/20 text-xs text-amber-200/80">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5 pb-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Verified Credentials Notice
            </div>
            Staff licenses, federation badges, and background checks are displayed as editable placeholders until formal academy accreditation is finalized.
          </div>
        </div>

        {/* Feature Split: Tactical Pitch Coaching Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-xl bg-[#080B0A] border border-[#0B2419] p-6 lg:p-8">
          <div className="lg:col-span-5 rounded-lg overflow-hidden border border-[#0B2419]">
            <img
              src="/src/assets/images/coaching_tactical_board_1791618644974.jpg"
              alt="Coach reviewing tactical board with youth players under evening floodlights"
              className="w-full h-72 lg:h-80 object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#19D66B] font-semibold">
              COACHING ETHOS
            </div>
            <h3 className="font-display font-black text-3xl text-white uppercase">
              STUDENTS OF THE GAME. GUARDIANS OF CHARACTER.
            </h3>
            <p className="text-sm text-[#A7B0AA] leading-relaxed">
              Every training session at Hazik’s Footstep with Ball is prepared with detailed micro-cycles. Coaches do not merely yell instructions from the touchline; they explain spatial geometry, provide instant positive corrections, and maintain zero tolerance for poor sportsmanship.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-white">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#19D66B]" />
                <span>Safeguarding Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#19D66B]" />
                <span>Continuous Coaching Education</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#19D66B]" />
                <span>Low Player-to-Coach Ratio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coaches Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COACHES.map((coach) => (
            <div
              key={coach.id}
              className="p-6 rounded-lg bg-[#080B0A] border border-[#0B2419] hover:border-[#19D66B]/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Avatar / Portrait placeholder */}
                <div className="w-16 h-16 rounded-md bg-[#0B2419] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] group-hover:scale-105 transition-transform">
                  <User className="w-8 h-8 text-[#19D66B]" />
                </div>

                <div>
                  <h4 className="font-display font-black text-xl text-white uppercase tracking-wider group-hover:text-[#19D66B] transition-colors">
                    {coach.name}
                  </h4>
                  <div className="text-xs text-emerald-400 font-semibold mt-0.5 tracking-wide">
                    {coach.role}
                  </div>
                </div>

                <p className="text-xs text-[#A7B0AA] leading-relaxed">
                  {coach.bio}
                </p>

                {/* Specialties */}
                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                    Focus Specialties:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] text-[#A7B0AA]"
                      >
                        {spec}{sIdx < coach.specialties.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Credentials Placeholder */}
              <div className="pt-4 mt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 italic">
                  <Award className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                  <span className="truncate">{coach.qualifications[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
