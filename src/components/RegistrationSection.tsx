import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Loader2, Send, ShieldCheck, Info } from 'lucide-react';
import { PROGRAMS } from '../data/academyData';
import { RegistrationFormData } from '../types/academy';

interface RegistrationSectionProps {
  initialProgram?: string;
  onSuccess?: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  initialProgram = '',
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    playerName: '',
    age: '',
    guardianName: '',
    phone: '',
    email: '',
    program: initialProgram || PROGRAMS[0].name,
    experience: 'Beginner / First Steps',
    preferredSchedule: 'Weekday Evenings (Proposed)',
    notes: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId?: string;
    message?: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

    if (!formData.playerName.trim()) {
      newErrors.playerName = 'Player name is required.';
    } else if (formData.playerName.trim().length < 2) {
      newErrors.playerName = 'Player name must be at least 2 characters.';
    }

    if (!formData.age.trim()) {
      newErrors.age = 'Player age or birth year is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required.';
    } else if (!/^[+0-9\s\-()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must acknowledge the parental consent & privacy policy to submit.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitResult({
          success: true,
          referenceId: data.inquiry?.id || `HFWB-${Date.now().toString(36).toUpperCase()}`,
          message: 'Your registration interest has been successfully logged with Hazik’s Footstep with Ball Admissions. Our academy coordinator will reach out to confirm trial availability.',
        });
        // Reset form partially
        setFormData({
          playerName: '',
          age: '',
          guardianName: '',
          phone: '',
          email: '',
          program: PROGRAMS[0].name,
          experience: 'Beginner / First Steps',
          preferredSchedule: 'Weekday Evenings (Proposed)',
          notes: '',
          consent: false,
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Server rejected registration inquiry. Please check your details.',
        });
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitResult({
        success: false,
        message: 'Could not connect to the academy admissions server. Please verify your connection or email admissions directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#080B0A] relative" id="register">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
            STEP FORWARD
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
            PLAYER REGISTRATION & INQUIRY
          </h2>
          <p className="text-sm text-[#A7B0AA] max-w-xl mx-auto">
            Take the first step. Submit your player inquiry below to reserve a place in our upcoming seasonal evaluation trials.
          </p>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-lg bg-[#0B2419]/40 border border-[#19D66B]/30 flex items-start gap-3 text-xs text-[#A7B0AA]">
          <Info className="w-5 h-5 text-[#19D66B] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Admissions Protocol & Demo Notice: </strong>
            This inquiry portal records registrations directly to the Academy Admissions service. Submissions receive a unique reference ID. Official physical trial bookings and kit allocations are finalized after parental verification.
          </div>
        </div>

        {/* Success Message Banner */}
        {submitResult && submitResult.success && (
          <div className="p-6 rounded-lg bg-[#0B2419] border border-[#19D66B] space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 text-[#19D66B] font-display font-bold text-xl uppercase tracking-wide">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <span>Registration Inquiry Confirmed</span>
            </div>
            <p className="text-sm text-stone-200">
              {submitResult.message}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-300 font-mono">
              <span className="text-stone-400">Reference ID:</span>
              <span className="px-2 py-0.5 rounded bg-black/60 text-[#19D66B] font-bold">
                {submitResult.referenceId}
              </span>
            </div>
          </div>
        )}

        {/* Error Message Banner */}
        {submitResult && !submitResult.success && (
          <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{submitResult.message}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-xl bg-[#050706] border border-[#0B2419] space-y-8 shadow-2xl">
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19D66B]" />
              1. Player Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Player Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Player Full Name *
                </label>
                <input
                  type="text"
                  value={formData.playerName}
                  onChange={(e) => setFormData({ ...formData, playerName: e.target.value })}
                  placeholder="e.g. Leo Hazik"
                  className={`w-full px-4 py-3 rounded bg-[#080B0A] border text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors ${
                    errors.playerName ? 'border-red-500' : 'border-[#0B2419]'
                  }`}
                />
                {errors.playerName && <p className="text-xs text-red-400">{errors.playerName}</p>}
              </div>

              {/* Player Age / Birth */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Age / Year of Birth *
                </label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g. 10 years old (2016)"
                  className={`w-full px-4 py-3 rounded bg-[#080B0A] border text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors ${
                    errors.age ? 'border-red-500' : 'border-[#0B2419]'
                  }`}
                />
                {errors.age && <p className="text-xs text-red-400">{errors.age}</p>}
              </div>

              {/* Parent / Guardian Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Parent / Guardian Name (Required for minors)
                </label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="e.g. Mr. / Mrs. Guardian"
                  className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 pt-2">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19D66B]" />
              2. Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 555 019 2834"
                  className={`w-full px-4 py-3 rounded bg-[#080B0A] border text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-[#0B2419]'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. family@example.com"
                  className={`w-full px-4 py-3 rounded bg-[#080B0A] border text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors ${
                    errors.email ? 'border-red-500' : 'border-[#0B2419]'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Program Selection & Preferences */}
          <div className="space-y-6 pt-2">
            <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider pb-3 border-b border-white/5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19D66B]" />
              3. Training Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Preferred Program */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Preferred Training Program *
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors"
                >
                  {PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.name} className="bg-[#080B0A]">
                      {prog.name} ({prog.intensity})
                    </option>
                  ))}
                  <option value="General Evaluation & Placement" className="bg-[#080B0A]">
                    General Evaluation & Placement (Unsure)
                  </option>
                </select>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Previous Football Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B]"
                >
                  <option value="Beginner / First Steps">Beginner / First Steps</option>
                  <option value="School / Recreational Team">School / Recreational Team</option>
                  <option value="Previous Academy Experience">Previous Academy Experience</option>
                  <option value="Competitive Club Player">Competitive Club Player</option>
                </select>
              </div>

              {/* Schedule Preference */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Preferred Schedule Availability
                </label>
                <select
                  value={formData.preferredSchedule}
                  onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B]"
                >
                  <option value="Weekday Evenings (Proposed)">Weekday Evenings (Proposed)</option>
                  <option value="Saturday Morning (Proposed)">Saturday Morning (Proposed)</option>
                  <option value="Weekend Full Intensive (Proposed)">Weekend Full Intensive (Proposed)</option>
                  <option value="Flexible / Either">Flexible / Either</option>
                </select>
              </div>

              {/* Additional notes */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Medical Notes, Position Preferences, or Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share any special notes, preferred playing positions, or medical considerations..."
                  className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded accent-[#19D66B] bg-[#080B0A] border-[#0B2419]"
              />
              <span className="text-xs text-[#A7B0AA] leading-relaxed">
                I confirm I am the player or parent/guardian authorized to register interest. I consent to Hazik’s Footstep with Ball contacting me regarding trial dates, scheduling, and academy updates. Data is protected under standard youth safeguarding principles. *
              </span>
            </label>
            {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-black text-xl tracking-wider uppercase hover:bg-emerald-400 active:scale-98 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(25,214,107,0.25)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>RECORDING APPLICATION...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT APPLICATION & INQUIRY</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
