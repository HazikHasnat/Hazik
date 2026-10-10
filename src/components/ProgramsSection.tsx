import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { PROGRAMS } from '../data/academyData';
import { Program } from '../types/academy';

interface ProgramsSectionProps {
  onSelectProgramForInquiry: (programName: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectProgramForInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Foundation' | 'Development' | 'High Performance'>('All');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filteredPrograms = activeFilter === 'All'
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.intensity === activeFilter);

  return (
    <section className="py-24 bg-[#050706] border-y border-[#0B2419] relative" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              DEVELOPMENT SYLLABUS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              PROPOSED TRAINING PROGRAMS
            </h2>
            <p className="text-sm text-[#A7B0AA]">
              Comprehensive player development streams designed for progressive mastery. Specific schedules, age brackets, and seasonal fees are finalized during enrollment consultation.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons allowed under Section 1.A) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#080B0A] border border-[#0B2419] rounded-md shrink-0 self-start md:self-end">
            {(['All', 'Foundation', 'Development', 'High Performance'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-[#19D66B] text-[#080B0A]'
                    : 'text-[#A7B0AA] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid: Asymmetric Bento / Card Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog, idx) => (
            <div
              key={prog.id}
              className="flex flex-col justify-between p-7 rounded-xl bg-[#080B0A] border border-[#0B2419] hover:border-[#19D66B]/50 hover:shadow-[0_10px_30px_rgba(25,214,107,0.08)] transition-all duration-300 group"
            >
              <div className="space-y-5">
                {/* Header with clean unboxed metadata */}
                <div className="flex items-center justify-between text-xs text-[#A7B0AA]">
                  <span className="font-heading font-bold text-[#19D66B] tracking-wider">
                    STREAM 0{idx + 1}
                  </span>
                  <span className="text-xs font-medium text-stone-400">
                    {prog.intensity}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide group-hover:text-[#19D66B] transition-colors">
                    {prog.name}
                  </h3>
                  <p className="text-xs text-emerald-400/90 font-medium mt-1">
                    {prog.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#A7B0AA] leading-relaxed">
                  {prog.description}
                </p>

                {/* Skill Focus - Clean Unboxed metadata */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                    Core Skill Focus:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white">
                    {prog.skillFocus.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#19D66B] shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Editable Placeholders */}
                <div className="p-3 rounded bg-[#0B2419]/30 border border-[#19D66B]/10 space-y-1 text-xs">
                  <div className="text-[#A7B0AA] flex items-center justify-between">
                    <span className="text-stone-400">Target Age:</span>
                    <span className="text-stone-200 font-medium text-right">{prog.ageGroupPlaceholder}</span>
                  </div>
                  <div className="text-[#A7B0AA] flex items-center justify-between">
                    <span className="text-stone-400">Schedule:</span>
                    <span className="text-stone-200 font-medium text-right">{prog.schedulePlaceholder}</span>
                  </div>
                  <div className="text-[#A7B0AA] flex items-center justify-between">
                    <span className="text-stone-400">Program Fee:</span>
                    <span className="text-emerald-400 font-medium text-right">{prog.feePlaceholder}</span>
                  </div>
                </div>
              </div>

              {/* Working Inquiry CTA */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <button
                  onClick={() => onSelectProgramForInquiry(prog.name)}
                  className="w-full py-3 px-4 rounded bg-[#0B2419] hover:bg-[#19D66B] text-white hover:text-[#080B0A] font-display font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group-hover:border group-hover:border-[#19D66B]"
                >
                  <span>Inquire for {prog.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Banner */}
        <div className="p-5 rounded-lg bg-[#080B0A] border border-[#19D66B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-xs text-[#A7B0AA]">
            <div className="text-white font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#19D66B]" />
              Need help selecting the best program for your child?
            </div>
            <p>
              Our coaching staff conducts an initial evaluation session to recommend the optimal development group based on technical readiness.
            </p>
          </div>
          <button
            onClick={() => onSelectProgramForInquiry('General Evaluation & Placement')}
            className="px-5 py-2.5 rounded bg-[#19D66B] text-[#080B0A] font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 hover:bg-emerald-400 transition-colors"
          >
            Request Evaluation
          </button>
        </div>
      </div>
    </section>
  );
};
