import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';
import { GalleryItem } from '../types/academy';

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Floodlit Matchday Focus',
    category: 'Matches',
    caption: 'Evening training match on pristine turf under high-intensity floodlights.',
    image: '/src/assets/images/hero_football_pitch_1791618610848.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'First Touch & Sole Mastery',
    category: 'Training',
    caption: 'Fine-tuning the exact angle of ball contact during wet turf training conditions.',
    image: '/src/assets/images/philosophy_youth_training_1791618628487.jpg',
    aspect: 'square',
  },
  {
    id: 'gal-3',
    title: 'High-Speed Slalom Agility',
    category: 'Training',
    caption: 'Explosive slalom sprint and ball acceleration through training cone gates.',
    image: '/src/assets/images/player_drill_agility_1791618661867.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-4',
    title: 'Tactical Board Review',
    category: 'Team',
    caption: 'Coach explaining spatial positioning and defensive triggers on the sideline.',
    image: '/src/assets/images/coaching_tactical_board_1791618644974.jpg',
    aspect: 'square',
  },
  {
    id: 'gal-5',
    title: 'Matchday Squad Preparation',
    category: 'Academy Life',
    caption: 'Players gathering before warmup drills with disciplined focus and mutual encouragement.',
    image: '/src/assets/images/coaching_tactical_board_1791618644974.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gal-6',
    title: 'Technical Ball Manipulation',
    category: 'Training',
    caption: 'Repetition drills to make close control second nature under pressure.',
    image: '/src/assets/images/philosophy_youth_training_1791618628487.jpg',
    aspect: 'square',
  },
];

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Training' | 'Matches' | 'Team' | 'Academy Life'>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredItems = filter === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === filter);

  const handleNext = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [activeImageIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handleNext, handlePrev]);

  return (
    <section className="py-24 bg-[#080B0A] relative" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
              BEHIND THE DRILLS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              ACADEMY GALLERY
            </h2>
            <p className="text-sm text-[#A7B0AA] max-w-xl">
              Authentic training captures, match simulations, and academy moments illustrating our daily commitment to player growth.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#050706] border border-[#0B2419] rounded-md shrink-0">
            {(['All', 'Training', 'Matches', 'Team', 'Academy Life'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#19D66B] text-[#080B0A]'
                    : 'text-[#A7B0AA] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative rounded-lg overflow-hidden bg-[#050706] border border-[#0B2419] hover:border-[#19D66B]/50 cursor-pointer shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0A] via-[#080B0A]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                <div className="flex items-center justify-between text-xs text-[#19D66B]">
                  <span className="font-semibold uppercase tracking-wider">{item.category}</span>
                  <Maximize2 className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A7B0AA] line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Note for Image Submissions */}
        <div className="text-center pt-4 text-xs text-stone-500 flex items-center justify-center gap-2">
          <Camera className="w-4 h-4 text-[#19D66B]" />
          <span>Academy media is updated weekly following official matchday fixture reviews.</span>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeImageIndex !== null && filteredItems[activeImageIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Viewer"
          className="fixed inset-0 z-50 bg-[#080B0A]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-[#19D66B] hover:text-[#080B0A] transition-colors focus:outline-none z-10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-[#19D66B] hover:text-[#080B0A] transition-colors focus:outline-none z-10"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-[#19D66B] hover:text-[#080B0A] transition-colors focus:outline-none z-10"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden border border-[#0B2419] bg-[#050706] max-h-[70vh] flex items-center justify-center">
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full mt-4 text-center space-y-1">
              <span className="text-xs font-semibold text-[#19D66B] uppercase tracking-wider">
                {filteredItems[activeImageIndex].category} · Image {activeImageIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wide">
                {filteredItems[activeImageIndex].title}
              </h3>
              <p className="text-xs text-[#A7B0AA] max-w-xl mx-auto">
                {filteredItems[activeImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
