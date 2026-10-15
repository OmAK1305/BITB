export const siteSettings = {
  name: "Beauty in the Beast",
  legalName: "Beauty in the Beast Pet Salon, Day Care & Academy",
  tagline: "Grooming built around the dog",
  foundedYear: 2017,
  address: "Shop no. 3 & 4, KBC Towers, ground floor, Next to K-52, Karvenagar, Pune 411052",
  phone: "+91 92721 29797",
  whatsapp: "+919272129797",
  email: "keepgrooming@beautyinthebeast.dog",
  instagramUrl: "https://www.instagram.com/beauty.in.thebeast?igsh=NTJsbG8yd2o1ODNn",
  mapUrl: "https://maps.app.goo.gl/8fMgdtDSRQoXFcba8",
  serviceAreas: ["Karvenagar", "Kothrud", "Warje", "Erandwane", "Deccan", "Bavdhan", "Sinhagad Road"],
  businessHours: [
    { day: "Monday", hours: "10:00 AM – 7:30 PM", isOpen: true },
    { day: "Tuesday", hours: "10:00 AM – 7:30 PM", isOpen: true },
    { day: "Wednesday", hours: "10:00 AM – 7:30 PM", isOpen: true },
    { day: "Thursday", hours: "10:00 AM – 7:30 PM", isOpen: true },
    { day: "Friday", hours: "10:00 AM – 7:30 PM", isOpen: true },
    { day: "Saturday", hours: "10:00 AM – 7:30 PM", isOpen: true },
    { day: "Sunday", hours: "10:00 AM – 5:00 PM", isOpen: true },
  ],
  stats: {
    yearsRunning: "8+",
    petsGroomed: "5,000+",
    googleRating: "4.9",
    reviewsCount: "250+",
    breedsHandled: "45+",
    graduatesTrained: "40+",
  },
};

export const businessStory = {
  title: "Our Story",
  subtitle: "Care for the whole animal, not just the way they look.",
  content: [
    "Beauty in the Beast began with a simple belief: pets deserve to be treated with the same care, patience and respect we would want for our own.",
    "The journey started with Mihir, whose connection with animals began long before Beauty in the Beast. From rescuing animals as a teenager to working alongside veterinarians, and eventually becoming a professional groomer and trainer, his experience showed him something important: good grooming is not just about making a pet look good. It is about their comfort, health, confidence and overall wellbeing.",
    "In 2017, that belief became Beauty in the Beast, starting from a small grooming kit. In 2022, it grew into something much more: a place where pets could be groomed, cared for, fed well, socialised and simply feel at home.",
    "Today, Beauty in the Beast brings together professional grooming, daycare, training and an international grooming academy, all under one roof in Karvenagar, Pune.",
    "We continue to grow, but the idea at the heart of it remains the same: when you care for a pet, you care for the whole animal, not just the way they look."
  ],
  mission: "Compassionate, professional pet care where every pet is treated with patience, respect and understanding.",
  vision: "To build a complete pet-care ecosystem that raises the standard of grooming and wellbeing in India, while creating a space pets genuinely love coming to."
};

export const teamMembers = [
  {
    name: "Mihir Sahasrabuddhe",
    role: "Co-Founder & Master Groomer / Academy Director",
    experience: "Over a Decade of Experience",
    bio: "Animal rescuer since his teens, former veterinary clinical assistant, and certified master groomer & behaviour trainer. Mihir founded Beauty in the Beast in 2017 to eliminate fear and stress from pet grooming. He personally directs all styling standards and leads the Grooming Academy curriculum.",
    image: "/images/team/team_photo_2.png",
    altImage: "/images/team/team_photo_1.jpg",
    specialities: ["Breed-Specific Styling", "Anxious & Nervous Pet Rehabilitation", "Academy Instruction", "Doodle & Long Coat Scissoring"]
  },
  {
    name: "Samir S.",
    role: "Senior Groomer",
    experience: "2+ Years at Beauty in the Beast",
    bio: "Trained under Mihir's rigorous standard of gentle handling, Samir specializes in calm bathing techniques, de-matting without discomfort, and meticulous scissoring. Known for his patient temperament with young and senior dogs.",
    image: "/images/team/team_photo_3.png",
    specialities: ["De-shedding & Coat Restoration", "Gentle Puppy Introductions", "Precision Scissoring", "Sanitary Hygiene"]
  }
];

export const servicesList = [
  {
    id: "full-grooming",
    slug: "full-grooming",
    title: "Full Styling & Breed Grooming",
    category: "Grooming",
    badge: "Most Popular",
    shortDesc: "Complete transformation tailored to your dog's breed standard, lifestyle, and coat condition.",
    duration: "90 – 120 mins",
    icon: "/images/brand/Grooming.png",
    features: [
      "Hydrotherapy warm bath with hypoallergenic shampoo & coat conditioner",
      "Gentle blowout and dead-coat de-shedding",
      "Precision breed-standard haircut or owner-customized styling",
      "Nail clipping, paw pad clearing & organic paw balm",
      "Ear canal cleaning and hygiene check",
      "Sanitary trim & breath freshener spray"
    ],
    suitablePets: "All dog breeds (Shih Tzus, Golden Retrievers, Cockapoos, Indie breeds, Poodles, etc.)"
  },
  {
    id: "bath-blowdry",
    slug: "bath-blowdry",
    title: "Bath, Blow-Dry & De-shedding",
    category: "Grooming",
    badge: "Essential Care",
    shortDesc: "Thorough deep clean and coat revival designed to loosen trapped undercoat and promote healthy skin.",
    duration: "60 – 75 mins",
    icon: "/images/brand/Grooming.png",
    features: [
      "Double shampoo cleanse (deep cleansing + nourishing coat finish)",
      "High-velocity low-noise blowout to eliminate loose undercoat",
      "Full brush-out to prevent knotting and tangles",
      "Nail trimming & ear cleaning",
      "Paw wipe-down and coat freshening mist"
    ],
    suitablePets: "Ideal for double-coated breeds (Labradors, Huskies, Goldens) and regular upkeep"
  },
  {
    id: "puppy-intro",
    slug: "puppy-intro",
    title: "Puppy First-Groom Introduction",
    category: "Grooming",
    badge: "Behaviour-First",
    shortDesc: "A slow, low-stress desensitization session that teaches puppies to love grooming for life.",
    duration: "45 – 60 mins",
    icon: "/images/brand/Grooming.png",
    features: [
      "Zero-pressure exploration of salon tables, water sounds, and dryer vibrations",
      "Positive reinforcement with treats and gentle tactile touch",
      "Face trim, paw trim, and sanitary clean (if puppy is relaxed)",
      "Nail tipping and gentle ear wipe",
      "Personalized report and home-care advice for pet parents"
    ],
    suitablePets: "Puppies aged 3 to 7 months (post-vaccination)"
  },
  {
    id: "daycare",
    slug: "daycare",
    title: "Supervised Daycare & Socialization",
    category: "Daycare",
    badge: "Calm & Safe",
    shortDesc: "A boutique, small-capacity daycare space where dogs socialize safely, exercise, and rest.",
    duration: "Half-Day / Full-Day",
    icon: "/images/brand/Daycare.png",
    features: [
      "Small groups grouped by size and play temperament",
      "Air-conditioned indoor play area with non-slip flooring",
      "Structured quiet hours and individual rest zones",
      "Fresh filtered water and meal service according to your schedule",
      "Continuous supervision by experienced handlers"
    ],
    suitablePets: "Vaccinated, tick-free dogs with friendly social temperament"
  },
  {
    id: "academy",
    slug: "academy",
    title: "Professional Grooming Academy",
    category: "Academy",
    badge: "Certified Career Course",
    shortDesc: "India's premier hands-on grooming diploma taught personally by Mihir Sahasrabuddhe.",
    duration: "2 – 2.5 Months (35 Sessions)",
    icon: "/images/brand/Academy.png",
    features: [
      "10 comprehensive theory modules on animal behavior, anatomy, tools & safety",
      "25 intensive practical grooming sessions on live pets",
      "Direct one-on-one mentorship in scissor technique, clipper control & breed cuts",
      "Customer communication & salon management training",
      "Formal Certification upon passing the practical examination"
    ],
    suitablePets: "Aspiring groomers, veterinary professionals, and passionate pet owners"
  }
];

export const academyCurriculum = {
  courseTitle: "Intermediate Grooming Course",
  credential: "Professional Diploma Certification by Beauty in the Beast",
  instructor: "Mihir Sahasrabuddhe (Co-founder & Master Groomer)",
  structure: {
    theorySessions: 10,
    practicalSessions: 25,
    totalDuration: "2 – 2.5 months",
    attendanceCriteria: "35 sessions over 75 days to be eligible for final assessment and certification.",
    certificatePolicy: "Certificate will be handed out AFTER the student has met all attendance criteria and passed the final assessment exam with satisfactory results.",
    pdfDownloadUrl: "/BitB-Intermediate-Grooming-Course.pdf"
  },
  overview: "This grooming course module is designed to provide aspiring groomers with comprehensive training in professional grooming services for pets. It covers animal behavior, safe handling, equipment mastery, breed styling, and client communication. The purpose is to equip students with the skills to deliver world-class grooming while prioritizing the well-being and safety of pets in their care.",
  modules: [
    {
      moduleNumber: 1,
      type: "Theory",
      title: "Introduction to Grooming",
      topics: [
        "What is Grooming? Definition and vital importance for pet health and wellbeing",
        "Comprehensive overview of various salon and veterinary grooming services",
        "The Groomer's Role and ethical responsibilities in pet care",
        "Animal welfare, stress reduction, and safety considerations"
      ]
    },
    {
      moduleNumber: 2,
      type: "Theory",
      title: "Dog Behavior, Anatomy and Handling",
      topics: [
        "Understanding Animal Behavior: Recognizing canine body language and subtle signals",
        "Identifying early signs of stress, discomfort, fear, or pain",
        "Safe animal handling techniques and ergonomic posture",
        "Proper restraint methods for different breeds, sizes, and temperaments"
      ]
    },
    {
      moduleNumber: 3,
      type: "Practical",
      title: "Tools and Equipment Mastery",
      topics: [
        "Essential grooming tools: Clippers, blades, shears, thinning scissors, slicker brushes, combs, and rakes",
        "Selection and maintenance: Sharpening, cleaning, and oiling equipment",
        "Safe equipment usage and demonstrating proper grip and maneuvering",
        "Preventing salon accidents and thermal/mechanical injuries"
      ]
    },
    {
      moduleNumber: 4,
      type: "Theory & Practical",
      title: "Pre-Grooming Preparation & Skin Assessment",
      topics: [
        "Initial pet condition evaluation: Coat density, knots, skin health, and temperament",
        "Communicating with pet parents to understand styling requests and pet history",
        "Coat and skin pathology: Identifying common dermatitis, parasites, and infections",
        "Pre-bath brush-out and coat de-matting preparation"
      ]
    },
    {
      moduleNumber: 5,
      type: "Theory & Practical",
      title: "Basic Grooming Techniques",
      topics: [
        "Bathing and drying: Choosing appropriate shampoos, conditioners, and water temperature",
        "High-velocity and stand dryer methods without causing panic",
        "Brushing techniques across short, double, curly, and wire coats",
        "Safe nail trimming & understanding quick anatomy to avoid bleeding",
        "Ear cleaning protocols: Cleaning canal safely and preventing ear infections",
        "Teeth and oral hygiene introduction as part of holistic grooming"
      ]
    },
    {
      moduleNumber: 6,
      type: "Practical",
      title: "Haircuts and Breed-Specific Styling",
      topics: [
        "Breed-specific grooming standards (Shih Tzu teddy cuts, Poodle lamb trim, Golden outlines)",
        "Scissoring exercises: Hand alignment, balance, and fluidity",
        "Deep focus on scissor and trimmer holding, maneuvering, and line blending",
        "Body profiling, leg tapering, and head shaping"
      ]
    },
    {
      moduleNumber: 7,
      type: "Practical",
      title: "Final Touches and Styling",
      topics: [
        "Finishing techniques: Line combing, fluffing, and symmetry check",
        "Corrective styling to enhance coat texture and hide structural flaws",
        "Creative styling touches and pet-safe coat finishing products"
      ]
    },
    {
      moduleNumber: 8,
      type: "Theory & Practical",
      title: "Dealing with Difficult Situations",
      topics: [
        "Handling nervous and traumatized pets with desensitization techniques",
        "Methods of calm, slow handling to avoid overwhelming the pet",
        "Handling aggressive pets: Safety protocols for pet and groomer",
        "Knowing when to seek assistance, pause, or professionally decline/halt service"
      ]
    },
    {
      moduleNumber: 9,
      type: "Theory",
      title: "Customer Service & Pet Parent Communication",
      topics: [
        "Effective client consultation: Setting realistic expectations for matted coats",
        "Managing client requests and explaining post-groom care",
        "Handling customer feedback and complaints with empathy and professionalism",
        "Ensuring a reassuring, five-star experience for both parent and pet"
      ]
    },
    {
      moduleNumber: 10,
      type: "Theory",
      title: "Health, Hygiene and First Aid",
      topics: [
        "Sanitation protocols: Disinfecting tables, blades, tubs, and air filtration",
        "Cross-contamination prevention between salon guests",
        "First aid knowledge: Heat exhaustion, quick cuts, allergic reactions",
        "Emergency response protocols and liaising with veterinary clinics"
      ]
    },
    {
      moduleNumber: 11,
      type: "Practical",
      title: "Final Assessment and Certification",
      topics: [
        "Comprehensive hands-on grooming evaluation on live model dog",
        "Assessment of safety, tool handling, scissor finish, and speed",
        "Constructive individual feedback and technique refinement",
        "Awarding of official Certification and guidance on career pathways or salon launch"
      ]
    }
  ]
};

export const daycareProgram = {
  headline: "A gentle, home-like daycare in Karvenagar.",
  description: "We keep our daycare capacity intentionally limited so every dog receives genuine companionship, supervision, and calm quiet periods.",
  schedule: [
    { time: "10:00 AM – 11:30 AM", activity: "Arrival, Health Check & Gentle Settle-in", desc: "Welcome greetings, quick coat & tick check, and easing into the playroom." },
    { time: "11:30 AM – 01:30 PM", activity: "Supervised Play & Socialization", desc: "Interactive toys, agility play, and compatible dog-to-dog social time." },
    { time: "01:30 PM – 03:30 PM", activity: "Midday Meal & Quiet Snooze Time", desc: "Calm room dimming, soft beds, and individual relaxation in climate-controlled spaces." },
    { time: "03:30 PM – 05:30 PM", activity: "Brain Games & Gentle Exercise", desc: "Sniffing puzzles, basic manners practice, and low-impact movement." },
    { time: "05:30 PM – 07:00 PM", activity: "Brushing, Fresh-up & Parent Reunion", desc: "Coat brush-out, paw wipe-down, and happy reuniting with parents." }
  ],
  safetyRules: [
    "Compulsory vaccination certificate verification before first admission",
    "Pre-admission temperament test to ensure dog is comfortable around other dogs",
    "Separation zones for small breeds and large breeds",
    "24/7 on-call veterinary partner within 5 minutes of Karvenagar salon"
  ]
};

export const beforeAfterGallery = [
  {
    id: "pair-1",
    petName: "Milo",
    breed: "Shih Tzu",
    service: "Full Styling & Matt Removal",
    beforeImage: "/images/gallery/1/IMG-20260407-WA0003.jpg",
    afterImage: "/images/gallery/1/IMG-20260117-WA0009.jpg",
    story: "Milo arrived with severely tangled facial hair and heavy matted undercoat. After a soothing conditioning soak and patient hand scissoring, he emerged fresh, playful and completely knot-free."
  },
  {
    id: "pair-2",
    petName: "Oscar",
    breed: "Lhasa Apso",
    service: "De-Shedding & Teddy Face Cut",
    beforeImage: "/images/gallery/2/IMG-20230416-WA0002.jpg",
    afterImage: "/images/gallery/2/IMG-20230416-WA0003.jpg",
    story: "Oscar's coat had grown dense and difficult to brush at home. A gentle de-shedding bath followed by an outline trim gave him a cheerful, easy-to-maintain summer look."
  }
];

export const salonPhotos = [
  { src: "/images/salon/IMG20250622135243.jpg", title: "Grooming Styling Station", desc: "Hydraulic grooming tables and anti-fatigue mats for pet comfort." },
  { src: "/images/salon/IMG20250622135305.jpg", title: "Salon Reception & Pet Boutique", desc: "Bright, welcoming reception with premium nutrition and accessories." },
  { src: "/images/salon/IMG20250723170604.jpg", title: "Bathing & Spa Area", desc: "Deep wash tubs equipped with temperature-regulated water jets." },
  { src: "/images/salon/IMG20250723170910.jpg", title: "Quiet Daycare Lounge", desc: "Sanitized, climate-controlled space with comfortable pet bedding." },
  { src: "/images/salon/IMG20250723171226.jpg", title: "Tool & Hygiene Sanitation Bay", desc: "Hospital-grade UV sterilization for all scissors and clippers." },
  { src: "/images/salon/IMG-20250719-WA0035.jpg", title: "Clean Pet Play Zone", desc: "Non-slip hygienic flooring allowing safe, energetic play." }
];

export const testimonials = [
  {
    name: "Pooja Deshpande",
    pet: "Bruno (Golden Retriever)",
    rating: 5,
    text: "Bruno used to be terrified of baths and would tremble at other salons. Mihir and Samir treated him with unbelievable patience. Now he literally drags me inside Beauty in the Beast with his tail wagging!",
    date: "Google Review"
  },
  {
    name: "Rohit Kulkarni",
    pet: "Simba (Shih Tzu)",
    rating: 5,
    text: "Best grooming salon in Pune, hands down. The teddy cut they gave Simba was so neat, and their place in Karvenagar is spotlessly clean. No chemical smells, just genuine love for dogs.",
    date: "Google Review"
  },
  {
    name: "Tanvi Joshi",
    pet: "Bella (Indie Dog)",
    rating: 5,
    text: "So many grooming places treat Indie dogs differently, but Beauty in the Beast treats every single animal like royalty. Mihir's rescue background shines through in everything they do.",
    date: "Google Review"
  },
  {
    name: "Anand Shinde",
    pet: "Academy Graduate (Batch 2024)",
    rating: 5,
    text: "I completed the Intermediate Grooming Course under Mihir Sir. The depth of practical training on 25 live sessions gave me the confidence to start my own salon. Worth every single rupee.",
    date: "Academy Review"
  }
];

export const faqList = [
  {
    q: "How often should my dog be professionally groomed?",
    a: "For long-haired and curly breeds like Shih Tzus, Poodles, and Lhasa Apsos, we recommend professional grooming every 4 to 6 weeks to prevent painful matting. For short and double-coated breeds like Labradors or Indies, a deep bath and de-shedding every 4 to 8 weeks keeps skin healthy."
  },
  {
    q: "Do you use tranquilizers or sedatives?",
    a: "Never. We have a strict zero-sedation policy. Our founder Mihir is trained in animal behavior; we rely on patient, positive handling, calming breaks, and reassuring body language."
  },
  {
    q: "How does the appointment booking work?",
    a: "Because each pet has unique coat length, temperament, and size, we operate on an enquiry-and-confirmation model. You submit the form with your pet's details, and our team reaches out via Call/WhatsApp to confirm your time slot and provide an exact duration estimate."
  },
  {
    q: "What are the eligibility criteria for the Grooming Course?",
    a: "A genuine love for dogs and physical fitness to handle pets on grooming tables. No prior professional experience is required; Mihir teaches you everything from basic body language and tool grips to advanced breed scissor work."
  }
];
