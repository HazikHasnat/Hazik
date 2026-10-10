/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { JourneySection } from './components/JourneySection';
import { CoachesSection } from './components/CoachesSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { ContactSection } from './components/ContactSection';
import { AiImageStudio } from './components/AiImageStudio';
import { AcademyAdvisorChat } from './components/AcademyAdvisorChat';
import { Footer } from './components/Footer';
import { MessageSquare, Sparkles, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProgramForInquiry, setSelectedProgramForInquiry] = useState<string>('Foundation Training');
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);

  const handleSelectProgram = (programName: string) => {
    setSelectedProgramForInquiry(programName);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRegister = () => {
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPrograms = () => {
    setActiveTab('programs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080B0A] text-[#A7B0AA] flex flex-col font-body selection:bg-[#19D66B] selection:text-[#080B0A]">
      {/* Universal Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdvisor={() => setIsAdvisorModalOpen(true)}
        onOpenAiStudio={() => {
          setActiveTab('studio');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Cinematic Hero */}
            <Hero
              onJoinClick={handleNavigateToRegister}
              onExplorePrograms={handleNavigateToPrograms}
            />

            {/* Philosophy & Academy Foundation */}
            <AboutSection
              onLearnMoreClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onJoinClick={handleNavigateToRegister}
            />

            {/* 6 Proposed Training Categories */}
            <ProgramsSection
              onSelectProgramForInquiry={handleSelectProgram}
            />

            {/* 5-Stage Player Development Journey */}
            <JourneySection />

            {/* Coaches Showcase */}
            <CoachesSection />

            {/* Academy Pitch & Training Gallery */}
            <GallerySection />

            {/* Testimonials & Master Final Call To Action */}
            <TestimonialsSection
              onRegisterClick={handleNavigateToRegister}
            />
          </>
        )}

        {activeTab === 'about' && (
          <div className="pt-24">
            <AboutSection
              onJoinClick={handleNavigateToRegister}
            />
            <JourneySection />
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="pt-24">
            <ProgramsSection
              onSelectProgramForInquiry={handleSelectProgram}
            />
            <JourneySection />
          </div>
        )}

        {activeTab === 'coaches' && (
          <div className="pt-24">
            <CoachesSection />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="pt-24">
            <GallerySection />
          </div>
        )}

        {activeTab === 'register' && (
          <div className="pt-24">
            <RegistrationSection
              initialProgram={selectedProgramForInquiry}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="pt-24">
            <ContactSection
              onRegisterClick={handleNavigateToRegister}
            />
          </div>
        )}

        {activeTab === 'studio' && (
          <div className="pt-24">
            <AiImageStudio />
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="pt-24">
            <AcademyAdvisorChat inlineMode={true} />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Launcher for Gemini Chatbot (Advisor) */}
      {!isAdvisorModalOpen && activeTab !== 'advisor' && (
        <button
          onClick={() => setIsAdvisorModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#19D66B] text-[#080B0A] font-display font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(25,214,107,0.4)] hover:bg-emerald-400 active:scale-95 transition-all flex items-center gap-2"
          aria-label="Open AI Academy Advisor"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Ask Coach AI</span>
        </button>
      )}

      {/* Floating Chatbot Modal when active */}
      {isAdvisorModalOpen && (
        <AcademyAdvisorChat
          isOpen={isAdvisorModalOpen}
          onClose={() => setIsAdvisorModalOpen(false)}
        />
      )}
    </div>
  );
}
