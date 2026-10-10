import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ChevronDown, CheckCircle, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { BRAND_INFO, FAQS } from '../data/academyData';

interface ContactSectionProps {
  onRegisterClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onRegisterClick }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Academy Inquiry',
    message: '',
  });
  const [formSent, setFormSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSent(true);
    setContactForm({ name: '', email: '', subject: 'General Academy Inquiry', message: '' });
  };

  return (
    <section className="py-24 bg-[#080B0A] relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
            GET IN TOUCH
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
            CONTACT & ACADEMY GROUNDS
          </h2>
          <p className="text-sm text-[#A7B0AA]">
            Have questions about age intakes, coaching methodology, or training schedules? Reach our admissions team below.
          </p>
        </div>

        {/* Contact Grid: Details & Interactive Map Placeholder on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Academy Ground & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide">
                ACADEMY ADMISSIONS DESK
              </h3>
              <p className="text-sm text-[#A7B0AA] leading-relaxed">
                We welcome parent questions regarding training readiness, equipment gear, and trial procedures.
              </p>
            </div>

            {/* Contact Placeholders Card */}
            <div className="p-6 rounded-xl bg-[#050706] border border-[#19D66B]/30 hover:border-[#19D66B]/60 shadow-[0_4px_25px_rgba(25,214,107,0.08)] transition-all duration-300 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-[#0B2419] border border-[#19D66B]/40 flex items-center justify-center text-[#19D66B] shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-stone-400">Training Facility Pitch</div>
                  <div className="text-sm text-white font-semibold mt-0.5 tracking-wide flex items-center gap-2">
                    <span>Hazik's Academy, Ghauri Town Phase 4A</span>
                  </div>
                  <div className="text-[11px] text-[#19D66B] mt-0.5 font-medium">
                    Main Training Ground · Ghauri Town Phase 4A
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Floodlit artificial and natural turf pitches with parent spectator terrace.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-[#0B2419] flex items-center justify-center text-[#19D66B] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-stone-400">Admissions Phone</div>
                  <div className="text-sm text-white font-medium mt-0.5">
                    {BRAND_INFO.phonePlaceholder}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Office hours: Monday to Saturday, 9:00 AM – 6:00 PM
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-[#0B2419] flex items-center justify-center text-[#19D66B] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase text-stone-400">Inquiry Email</div>
                  <div className="text-sm text-white font-medium mt-0.5">
                    {BRAND_INFO.emailPlaceholder}
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Pitch Location Visualizer / Map Integration Point */}
            <div className="rounded-lg overflow-hidden border border-[#0B2419] bg-[#050706] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-semibold uppercase tracking-wider text-[#19D66B]">Pitch Map Integration Point</span>
                <span className="text-[10px] text-emerald-400 font-mono">Ghauri Town Phase 4A</span>
              </div>
              <div className="h-44 w-full rounded bg-[#080B0A] border border-[#0B2419] relative flex items-center justify-center overflow-hidden">
                {/* Football Pitch Vector Diagram */}
                <div className="absolute inset-4 border border-[#19D66B]/20 rounded flex items-center justify-center">
                  <div className="w-full h-[1px] bg-[#19D66B]/20 absolute" />
                  <div className="w-16 h-16 rounded-full border border-[#19D66B]/20" />
                  <div className="absolute top-2 w-12 h-6 border-b border-x border-[#19D66B]/20" />
                  <div className="absolute bottom-2 w-12 h-6 border-t border-x border-[#19D66B]/20" />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center p-3">
                  <div className="w-8 h-8 rounded-full bg-[#19D66B] text-[#080B0A] flex items-center justify-center shadow-[0_0_15px_#19D66B] mb-2">
                    <MapPin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase">
                    Hazik’s Footstep Pitch Complex
                  </span>
                  <span className="text-[11px] text-[#19D66B] mt-0.5 font-medium">
                    Ghauri Town Phase 4A
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-xl bg-[#050706] border border-[#0B2419] space-y-6 shadow-xl">
              <div className="space-y-1">
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide">
                  SEND AN ACADEMY MESSAGE
                </h3>
                <p className="text-xs text-[#A7B0AA]">
                  Fill out the form below. We typically respond within 24 business hours.
                </p>
              </div>

              {formSent && (
                <div className="p-4 rounded bg-[#0B2419] border border-[#19D66B] text-xs text-stone-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#19D66B] shrink-0" />
                  <span>Thank you. Your message has been received by Hazik's Academy Admissions team.</span>
                </div>
              )}

              <form onSubmit={handleSend} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider">
                    Inquiry Subject
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B]"
                  >
                    <option value="General Academy Inquiry">General Academy Inquiry</option>
                    <option value="Trials & Assessment Dates">Trials & Assessment Dates</option>
                    <option value="Coaching Staff Qualifications">Coaching Staff Qualifications</option>
                    <option value="Sponsorship & Partnership">Sponsorship & Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-white uppercase tracking-wider">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you would like to know..."
                    className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-black text-lg tracking-wider uppercase hover:bg-emerald-400 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(25,214,107,0.2)]"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-8 pt-8 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-3xl text-white uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h3>
            <p className="text-xs text-[#A7B0AA]">
              Key questions parents and aspiring players ask before stepping onto our pitches.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-lg bg-[#050706] border border-[#0B2419] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02]"
                  >
                    <span className="font-heading font-semibold text-sm text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#19D66B] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#A7B0AA] leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prominent Registration CTA Banner */}
        <div className="p-8 rounded-xl bg-[#0B2419]/50 border border-[#19D66B]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              READY TO TAKE YOUR FIRST STEP?
            </h4>
            <p className="text-xs text-[#A7B0AA] mt-1">
              Join the next intake of footballers developing their craft with Hazik’s Footstep with Ball.
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="px-6 py-3.5 bg-[#19D66B] text-[#080B0A] font-display font-black text-lg tracking-wider uppercase rounded-sm hover:bg-emerald-400 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(25,214,107,0.3)]"
          >
            <span>REGISTER NOW</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
