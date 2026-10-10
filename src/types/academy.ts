export interface Program {
  id: string;
  name: string;
  tagline: string;
  description: string;
  skillFocus: string[];
  ageGroupPlaceholder: string;
  schedulePlaceholder: string;
  feePlaceholder: string;
  intensity: 'Foundation' | 'Development' | 'High Performance';
  featuredDrills: string[];
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  qualifications: string[];
  isPlaceholder: boolean;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Training' | 'Matches' | 'Team' | 'Academy Life';
  caption: string;
  image: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relation: string;
  year: string;
  isDraftPlaceholder: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RegistrationFormData {
  playerName: string;
  age: string;
  guardianName: string;
  phone: string;
  email: string;
  program: string;
  experience: string;
  preferredSchedule: string;
  notes: string;
  consent: boolean;
}
