import { Program, Coach, GalleryItem, Testimonial, FAQItem } from '../types/academy';

export const BRAND_INFO = {
  name: "Hazik’s Footstep with Ball",
  shortName: "Footstep with Ball",
  primarySlogan: "Every Great Player Starts With a Step.",
  secondarySlogan: "Train With Purpose. Play With Passion. Rise With Every Step.",
  positioning: "An ambitious football academy dedicated to helping players develop their football ability, confidence, discipline, teamwork, and love for the game.",
  phonePlaceholder: "+[Country Code] [Academy Office Number - Editable Placeholder]",
  emailPlaceholder: "admissions@haziksfootstep.academy [Editable Placeholder]",
  pitchLocation: "Hazik's Academy, Ghauri Town Phase 4A",
  pitchLocationPlaceholder: "Hazik's Academy, Ghauri Town Phase 4A",
  trainingDaysPlaceholder: "Tuesdays, Thursdays & Saturday Matchdays [Proposed Placeholder]",
};

export const PROGRAMS: Program[] = [
  {
    id: "prog-foundation",
    name: "Foundation Training",
    tagline: "Building core motor skills, ball affinity, and the joy of football.",
    description: "Designed for budding players taking their initial steps onto the pitch. Focuses on physical literacy, balance, fundamental touches, and nurturing a lifelong passion for football.",
    skillFocus: ["Basic Dribbling", "Spatial Orientation", "Bilateral Footwork", "Motor Agility"],
    ageGroupPlaceholder: "Ages 5–8 (Proposed Category - Subject to confirmation)",
    schedulePlaceholder: "2 Sessions/Week · 60 mins each [Proposed Placeholder]",
    feePlaceholder: "Contact academy for program details & kit inclusions",
    intensity: "Foundation",
    featuredDrills: ["Cone Slalom Fun Games", "First Touch Gates", "1v1 Mini Goal Challenges"]
  },
  {
    id: "prog-ball-control",
    name: "Ball Control and Technical Skills",
    tagline: "Mastering close control, manipulation, and confidence in 1v1 duels.",
    description: "An intensive technical syllabus teaching players to feel the ball as an extension of their feet. Master turns, feints, change of direction, and clean execution under match pressure.",
    skillFocus: ["Sole Roll & V-Turns", "Shielding Technique", "Aerial Trapping", "Weak Foot Accuracy"],
    ageGroupPlaceholder: "Ages 8–12 (Proposed Category - Subject to confirmation)",
    schedulePlaceholder: "2-3 Sessions/Week · 75 mins each [Proposed Placeholder]",
    feePlaceholder: "Contact academy for program details & kit inclusions",
    intensity: "Development",
    featuredDrills: ["Rondo Pressure Boxes", "Coerver Ball Mastery Grids", "Dynamic Cut-and-Accelerate"]
  },
  {
    id: "prog-speed-agility",
    name: "Speed and Agility",
    tagline: "Sharpening explosive footwork, deceleration mechanics, and kinetic speed.",
    description: "Football-specific athletic performance training. We develop rapid reaction time, change of pace, low-center agility, and sprint mechanics synchronized with ball possession.",
    skillFocus: ["Explosive First 5 Yards", "Deceleration Mechanics", "Ladder & Hurdle Kinetics", "Reaction Drills"],
    ageGroupPlaceholder: "Ages 10–16 (Proposed Category - Subject to confirmation)",
    schedulePlaceholder: "Weekly Dedicated Performance Lab · 60 mins [Proposed Placeholder]",
    feePlaceholder: "Contact academy for program details & kit inclusions",
    intensity: "Development",
    featuredDrills: ["Speed Parachute Sprints", "T-Test Agility Circuit", "Reactive Cone Mirroring"]
  },
  {
    id: "prog-tactical",
    name: "Tactical Awareness",
    tagline: "Educating player vision, scanning habits, and decision-making on the pitch.",
    description: "Football intelligence is developed through purposeful scenarios. Players learn spatial awareness, defensive pressing triggers, passing angles, and anticipatory thinking.",
    skillFocus: ["Pre-Orientation Scanning", "Passing Lanes & Triangles", "Defensive Compactness", "Transition Speed"],
    ageGroupPlaceholder: "Ages 11–17 (Proposed Category - Subject to confirmation)",
    schedulePlaceholder: "Integrated Field & Video Review Sessions [Proposed Placeholder]",
    feePlaceholder: "Contact academy for program details & kit inclusions",
    intensity: "Development",
    featuredDrills: ["Overload Scenarios (3v2, 4v3)", "Positional Play Rondo 7v7+3", "Zone Defense Triggers"]
  },
  {
    id: "prog-team-training",
    name: "Team Training",
    tagline: "Cultivating unselfish camaraderie, collective pressing, and game cohesion.",
    description: "Football is won as a collective. Squad sessions develop communication, positional discipline, set-piece routines, and the mutual accountability needed to compete honorably.",
    skillFocus: ["Squad Communication", "Pressing In Blocks", "Set Piece Execution", "Sportsmanship & Leadership"],
    ageGroupPlaceholder: "Squad Age Groups (U10, U12, U14, U16) [Proposed Placeholder]",
    schedulePlaceholder: "Squad Training + Weekend Fixture [Proposed Placeholder]",
    feePlaceholder: "Contact academy for program details & kit inclusions",
    intensity: "Development",
    featuredDrills: ["11v11 Phase of Play", "High Press Recovery Runs", "Counter-Attack Wave Drills"]
  },
  {
    id: "prog-advanced",
    name: "Advanced Player Development",
    tagline: "High-intensity technical, mental, and competitive preparation.",
    description: "An elite pathway for dedicated footballers seeking trial readiness, competitive club selection, and comprehensive physical and psychological resilience.",
    skillFocus: ["High-Pressure Execution", "Mental Toughness", "Positional Mastery", "Competitive Match Fitness"],
    ageGroupPlaceholder: "Ages 13–18 (Selective / Trial Basis - Subject to confirmation)",
    schedulePlaceholder: "3-4 Sessions/Week + Performance Tracking [Proposed Placeholder]",
    feePlaceholder: "Contact academy for program details & kit inclusions",
    intensity: "High Performance",
    featuredDrills: ["High-Tempo Match Simulations", "Positional 1v1 Shadowing", "Aerobic Interval Finishes"]
  }
];

export const VALUES = [
  {
    number: "01",
    title: "Skill Development",
    description: "Methodical, deliberate repetition ensuring foundational technique becomes instinctive under match conditions."
  },
  {
    number: "02",
    title: "Disciplined Work Ethic",
    description: "Punctuality, dedication, respect for equipment, and relentless effort define our training culture."
  },
  {
    number: "03",
    title: "Teamwork & Brotherhood",
    description: "No player is bigger than the team. We celebrate selflessness, collective trust, and mutual encouragement."
  },
  {
    number: "04",
    title: "Resilient Confidence",
    description: "We cultivate the courage to make mistakes, learn from every touch, and express oneself without fear."
  },
  {
    number: "05",
    title: "Integrity & Sportsmanship",
    description: "Honoring referees, opponents, and coaches. True champions carry themselves with dignity on and off the turf."
  },
  {
    number: "06",
    title: "Supportive Football Community",
    description: "A nurturing environment where parents, coaches, and young players unite to foster a wholesome sporting journey."
  }
];

export const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Discover Your Potential",
    subtitle: "Assessment & Baseline Profiling",
    description: "Every player enters with an initial evaluation observing baseline technical touch, coordination, natural speed, and enthusiasm for the game."
  },
  {
    step: "02",
    title: "Master the Fundamentals",
    subtitle: "Repetition & Ball Affinity",
    description: "Building unshakeable technical muscle memory. Thousands of touches across both feet, learning proper body mechanics, trapping, and precision passing."
  },
  {
    step: "03",
    title: "Train With Discipline",
    subtitle: "Habits, Conditioning & Focus",
    description: "Instilling professional athlete habits: punctual arrival, focused warmups, tactical obedience, hydration awareness, and high-intensity work rate."
  },
  {
    step: "04",
    title: "Develop Match Intelligence",
    subtitle: "Vision, Scanning & Spatial IQ",
    description: "Transitioning from technical drill to tactical perception. Learning when to hold, when to penetrate, and how to read opponent movements before receiving."
  },
  {
    step: "05",
    title: "Grow as a Player",
    subtitle: "Leadership, Character & Excellence",
    description: "Evolving into a confident, complete footballer possessing sportsmanship, leadership qualities, and mental fortitude ready for competitive football."
  }
];

export const COACHES: Coach[] = [
  {
    id: "head-coach-hazik",
    name: "Coach Hazik Abbasi",
    role: "Technical Director & Founder",
    bio: "Passionate football mentor committed to player-centric development, personal discipline, and fostering technical brilliance from the first step.",
    specialties: ["Curriculum Architecture", "Technical Ball Mastery", "Player Mentorship"],
    qualifications: ["Coaching Licensure & Credentials Placeholder (Subject to confirmation)"],
    isPlaceholder: false,
  },
  {
    id: "coach-youth",
    name: "Coach Yahya Abbasi",
    role: "Youth Development Specialist (Ages 5–10)",
    bio: "Dedicated specialist in youth motor coordination, engaging game-based drills, and creating an inspiring, disciplined training atmosphere for young players.",
    specialties: ["Motor Coordination", "Age-Appropriate Pedagogy", "Confidence Building"],
    qualifications: ["Youth Coaching Certification Placeholder"],
    isPlaceholder: false,
  },
  {
    id: "coach-kinetic",
    name: "Coach Shafay Abbasi",
    role: "Head of Athletic Conditioning",
    bio: "Focuses on biomechanics, deceleration safety, explosive acceleration, and injury prevention tailored specifically for developing adolescent bodies.",
    specialties: ["Sprint Mechanics", "Core Stability", "Agility Kinetics"],
    qualifications: ["Sports Science & Strength Certification Placeholder"],
    isPlaceholder: false,
  },
  {
    id: "coach-tactical",
    name: "Coach Muntaha Abbasi",
    role: "Tactics & Match Play Coordinator",
    bio: "Experienced in positional game management, defensive block coordination, and cultivating spatial intelligence in adolescent footballers.",
    specialties: ["Positional Play", "Video Tactical Review", "Match Play Simulation"],
    qualifications: ["Tactical Coaching Badge Placeholder"],
    isPlaceholder: false,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "“The emphasis on discipline and first-touch confidence has transformed my son's game. He doesn't just play football now—he understands the game with real composure.”",
    author: "[Parent of U11 Academy Player - Draft Placeholder]",
    relation: "Academy Parent",
    year: "2026 Season",
    isDraftPlaceholder: true
  },
  {
    id: "test-2",
    quote: "“Before joining, I was hesitant in 1v1 situations. The Coerver drills and encouragement from the coaching staff gave me the courage to take players on and trust my left foot.”",
    author: "[U13 Squad Player - Draft Placeholder]",
    relation: "Youth Player",
    year: "2026 Season",
    isDraftPlaceholder: true
  },
  {
    id: "test-3",
    quote: "“What sets Hazik's academy apart is the moral foundation. Respect for teammates, coaches, and equipment is taught with the same dedication as tactical positioning.”",
    author: "[Parent of Foundation Player - Draft Placeholder]",
    relation: "Academy Parent",
    year: "2026 Season",
    isDraftPlaceholder: true
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What age groups are welcome at Hazik’s Footstep with Ball?",
    answer: "Our proposed curriculum covers youth from Foundation (ages 5–8), Intermediate Youth (ages 9–12), to High Performance Adolescents (ages 13–18). Group assignments are adjusted according to physical maturity and technical ability."
  },
  {
    question: "Does my child need previous club experience to enroll?",
    answer: "Not at all. Our core philosophy is 'Every Great Player Starts With a Step.' Whether your child is touching a football for the first time or seeking advanced tactical refinement, we have dedicated pathways tailored to their current baseline."
  },
  {
    question: "What equipment should players bring to their first session?",
    answer: "Players should wear appropriate turf/molded football boots, shin guards (mandatory for safety), athletic training socks, comfortable sports attire, and a filled water bottle. Academy training kit packages are issued upon formal enrollment confirmation."
  },
  {
    question: "How do you evaluate and track player progress?",
    answer: "Our coaching team maintains individual development checkpoints reviewing technical execution, speed agility indicators, tactical scanning, and behavioral discipline every term."
  },
  {
    question: "Where are the training sessions hosted?",
    answer: "Sessions take place at our primary training pitch complex equipped with modern all-weather turf and floodlighting. Final venue location and pitch numbers will be confirmed upon schedule finalization."
  }
];
