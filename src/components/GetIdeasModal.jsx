import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  ArrowLeft, 
  Flag, 
  RotateCcw, 
  Award, 
  Smile, 
  User, 
  Users, 
  UserCheck, 
  Ban, 
  Banknote, 
  Coins, 
  Trophy, 
  Wallet, 
  Shield, 
  Rocket, 
  Clock, 
  PiggyBank, 
  Lock, 
  TrendingUp, 
  Megaphone, 
  Edit3, 
  Palette, 
  Code, 
  Video, 
  Folder, 
  GraduationCap, 
  Bot, 
  Laptop, 
  Utensils, 
  Dumbbell, 
  Gamepad2, 
  Heart, 
  Wrench, 
  Package, 
  ShoppingCart, 
  MapPin,
  Sparkles,
  Compass,
  Check,
  Store,
  BookOpen,
  Briefcase
} from 'lucide-react';

const STEP_COLORS = [
  '#ffffff', // Step 1
  '#f59e0b', // Step 2
  '#ef4444', // Step 3
  '#06b6d4', // Step 4
  '#8b5cf6', // Step 5
  '#ec4899', // Step 6
  '#3b82f6', // Step 7
  '#a855f7', // Step 8
  '#d946ef', // Step 9
  '#10b981', // Step 10
];

export default function GetIdeasModal() {
  const { isGetIdeasModalOpen, setIsGetIdeasModalOpen, selectIdeaAndGenerateRoadmap } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // Answers State
  const [businessExperience, setBusinessExperience] = useState('This is my first time');
  const [ageGroup, setAgeGroup] = useState('25 - 34');
  const [madeMoneyOnline, setMadeMoneyOnline] = useState('Not yet');
  const [goal, setGoal] = useState('Build something that can grow');
  const [weeklyTime, setWeeklyTime] = useState('10 - 20 hours');
  const [startingBudget, setStartingBudget] = useState('₹500 - ₹2,000');
  const [marketFocus, setMarketFocus] = useState('Software & Mobile Apps');
  const [selectedSkills, setSelectedSkills] = useState(['Coding', 'Design']);
  const [selectedInterests, setSelectedInterests] = useState(['AI', 'Tech']);
  const [workType, setWorkType] = useState('Software / apps');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendedIdeas, setRecommendedIdeas] = useState([]);

  if (!isGetIdeasModalOpen) return null;

  // Step 1 Options
  const expOptions = [
    { id: 'first', label: 'This is my first time', icon: <Flag size={20} /> },
    { id: 'few', label: "I've tried a few projects", icon: <RotateCcw size={20} /> },
    { id: 'done', label: "I've run a business before", icon: <Award size={20} /> },
  ];

  const ageOptions = [
    { id: '18-24', label: '18 - 24', icon: <Smile size={18} /> },
    { id: '25-34', label: '25 - 34', icon: <User size={18} /> },
    { id: '35-49', label: '35 - 49', icon: <Users size={18} /> },
    { id: '50plus', label: '50 +', icon: <UserCheck size={18} /> },
  ];

  // Step 2 Options
  const moneyOptions = [
    { id: 'none', label: 'Not yet', icon: <Ban size={20} /> },
    { id: 'under50k', label: 'Under ₹50,000', icon: <Banknote size={20} /> },
    { id: '50k-5l', label: '₹50,000 - ₹5,00,000', icon: <Coins size={20} /> },
    { id: '5lplus', label: '₹5,00,000 +', icon: <Trophy size={20} /> },
  ];

  // Step 3 Options
  const goalOptions = [
    { id: 'income', label: 'Make extra income on the side', icon: <Wallet size={20} /> },
    { id: 'less-job', label: 'Rely less on my day job', icon: <Shield size={20} /> },
    { id: 'fulltime', label: 'Work for myself full-time', icon: <UserCheck size={20} /> },
    { id: 'growth', label: 'Build a big scalable company', icon: <Rocket size={20} /> },
  ];

  // Step 4 Options
  const timeOptions = [
    { id: 'under5', label: 'Under 5 hours (Weekend / Part-time)', icon: <Clock size={20} /> },
    { id: '5-10', label: '5 - 10 hours (A few evenings)', icon: <Clock size={20} /> },
    { id: '10-20', label: '10 - 20 hours (Half-time focus)', icon: <Clock size={20} /> },
    { id: '20plus', label: '20+ hours (Full commitment)', icon: <Clock size={20} /> },
  ];

  // Step 5 Options
  const budgetOptions = [
    { id: '0', label: '₹0 (Zero starting budget)', icon: <Ban size={20} /> },
    { id: 'up-500', label: 'Up to ₹500 (Basic tool fee)', icon: <Wallet size={20} /> },
    { id: '500-2000', label: '₹500 - ₹2,000 (Small starter capital)', icon: <PiggyBank size={20} /> },
    { id: '2000plus', label: '₹2,000 + (Ready to invest)', icon: <Lock size={20} /> },
  ];

  // Step 6 Options: SIMPLIFIED & WIDER ASPECT WISE
  const marketOptions = [
    { 
      id: 'services', 
      label: 'Services & Freelancing', 
      desc: 'Helping clients directly with writing, design, marketing, coding, or consulting',
      icon: <Wrench size={22} /> 
    },
    { 
      id: 'software', 
      label: 'Software & Mobile Apps', 
      desc: 'Building websites, mobile apps, web tools, or AI utilities',
      icon: <Laptop size={22} /> 
    },
    { 
      id: 'digital-products', 
      label: 'Digital Products & Content', 
      desc: 'Selling ebooks, courses, templates, videos, or design assets',
      icon: <BookOpen size={22} /> 
    },
    { 
      id: 'e-commerce', 
      label: 'Online Store & Physical Products', 
      desc: 'Selling products online, custom merchandise, or retail items',
      icon: <Store size={22} /> 
    },
    { 
      id: 'local-offline', 
      label: 'Local & Offline Business Services', 
      desc: 'Local shops, events, home services, or in-person client setup',
      icon: <MapPin size={22} /> 
    },
  ];

  // Step 7 Options (Skills)
  const skillsOptions = [
    { id: 'Selling', label: 'Selling', icon: <TrendingUp size={22} /> },
    { id: 'Marketing', label: 'Marketing', icon: <Megaphone size={22} /> },
    { id: 'Writing', label: 'Writing', icon: <Edit3 size={22} /> },
    { id: 'Design', label: 'Design', icon: <Palette size={22} /> },
    { id: 'Coding', label: 'Coding', icon: <Code size={22} /> },
    { id: 'Content', label: 'Content', icon: <Video size={22} /> },
    { id: 'Organizing', label: 'Organizing', icon: <Folder size={22} /> },
    { id: 'Teaching', label: 'Teaching', icon: <GraduationCap size={22} /> },
    { id: 'People', label: 'People', icon: <Users size={22} /> },
  ];

  // Step 8 Options (Interests)
  const interestOptions = [
    { id: 'AI', label: 'AI', icon: <Bot size={22} /> },
    { id: 'Tech', label: 'Tech', icon: <Laptop size={22} /> },
    { id: 'Food', label: 'Food', icon: <Utensils size={22} /> },
    { id: 'Content', label: 'Content', icon: <Video size={22} /> },
    { id: 'Design', label: 'Design', icon: <Palette size={22} /> },
    { id: 'Fitness', label: 'Fitness', icon: <Dumbbell size={22} /> },
    { id: 'Gaming', label: 'Gaming', icon: <Gamepad2 size={22} /> },
    { id: 'Education', label: 'Education', icon: <GraduationCap size={22} /> },
    { id: 'Health', label: 'Health', icon: <Heart size={22} /> },
  ];

  // Step 9 Options (Work Type)
  const workTypeOptions = [
    { id: 'Services', label: 'Services', icon: <Wrench size={22} /> },
    { id: 'Software / apps', label: 'Software / apps', icon: <Code size={22} /> },
    { id: 'Digital products', label: 'Digital products', icon: <Package size={22} /> },
    { id: 'Content', label: 'Content', icon: <Video size={22} /> },
    { id: 'E-commerce', label: 'E-commerce', icon: <ShoppingCart size={22} /> },
    { id: 'Local work', label: 'Local work', icon: <MapPin size={22} /> },
  ];

  const toggleSkill = (skillLabel) => {
    if (selectedSkills.includes(skillLabel)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillLabel));
    } else {
      if (selectedSkills.length < 5) {
        setSelectedSkills([...selectedSkills, skillLabel]);
      }
    }
  };

  const toggleInterest = (interestLabel) => {
    if (selectedInterests.includes(interestLabel)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interestLabel));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, interestLabel]);
      }
    }
  };

  const handleContinue = () => {
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 10) {
      const ideas = generateDynamicIdeasFromFeedback();
      setRecommendedIdeas(ideas);
      setIsGenerating(true);
      setCurrentStep(11);
      setTimeout(() => {
        setIsGenerating(false);
      }, 700);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // DYNAMIC RECOMMENDATION ENGINE: Synthesizes 5 ideas directly mapped to user's exact selections
  const generateDynamicIdeasFromFeedback = () => {
    const interests = selectedInterests.length > 0 ? selectedInterests : ['Tech', 'AI'];
    const skills = selectedSkills.length > 0 ? selectedSkills : ['Writing', 'Design'];
    const primaryInterest = interests[0];
    const secondaryInterest = interests[1] || primaryInterest;
    const primarySkill = skills[0];
    const secondarySkill = skills[1] || primarySkill;
    const market = marketFocus || 'Software & Mobile Apps';
    const budget = startingBudget || '₹500 - ₹2,000';
    const time = weeklyTime || '10 - 20 hours';
    const userGoal = goal || 'Make extra income on the side';
    const notes = additionalInfo.trim();

    // Parse custom keywords from user's additional notes (Step 10)
    let customNiche = '';
    const lowerNotes = notes.toLowerCase();
    if (lowerNotes.includes('nurse') || lowerNotes.includes('skincare') || lowerNotes.includes('skin') || lowerNotes.includes('dermatology') || lowerNotes.includes('beauty')) {
      customNiche = 'Skincare & Clinical Health';
    } else if (lowerNotes.includes('fit') || lowerNotes.includes('gym') || lowerNotes.includes('trainer') || lowerNotes.includes('workout') || lowerNotes.includes('athlete')) {
      customNiche = 'Fitness & High-Performance Athletic';
    } else if (lowerNotes.includes('food') || lowerNotes.includes('cooking') || lowerNotes.includes('chef') || lowerNotes.includes('recipe') || lowerNotes.includes('restaurant') || lowerNotes.includes('diet')) {
      customNiche = 'Culinary & Gourmet Nutrition';
    } else if (lowerNotes.includes('real estate') || lowerNotes.includes('property') || lowerNotes.includes('broker') || lowerNotes.includes('housing')) {
      customNiche = 'Real Estate & Property Tech';
    } else if (lowerNotes.includes('pet') || lowerNotes.includes('dog') || lowerNotes.includes('cat') || lowerNotes.includes('veterinary')) {
      customNiche = 'Pet Care & Animal Health';
    } else if (lowerNotes.includes('crypto') || lowerNotes.includes('web3') || lowerNotes.includes('finance') || lowerNotes.includes('stock') || lowerNotes.includes('money') || lowerNotes.includes('investing')) {
      customNiche = 'Fintech & Wealth Management';
    } else if (lowerNotes.includes('travel') || lowerNotes.includes('trip') || lowerNotes.includes('hotel') || lowerNotes.includes('tourism')) {
      customNiche = 'Travel & Curated Experiences';
    } else if (lowerNotes.includes('photo') || lowerNotes.includes('video') || lowerNotes.includes('camera') || lowerNotes.includes('design')) {
      customNiche = 'Creative Visual Media & Design';
    } else if (lowerNotes.includes('music') || lowerNotes.includes('audio') || lowerNotes.includes('podcast') || lowerNotes.includes('sound')) {
      customNiche = 'Audio & Music Technology';
    } else if (lowerNotes.includes('law') || lowerNotes.includes('legal') || lowerNotes.includes('compliance')) {
      customNiche = 'LegalTech & Document Automation';
    }

    const niche = customNiche || primaryInterest;

    // Niche-specific generators to ensure maximum variance and true custom fit
    if (niche.includes('Skincare') || niche.includes('Health')) {
      return [
        {
          id: 'dyn-skin-1',
          title: 'Clean Skincare Routine Auditor & Copywriter',
          complexityLevel: '⚡ Level 1: Simple Job / Quick Start',
          complexityColor: '#34d399',
          tagline: `Quick Start Gig • Leverages your ${primarySkill} skills`,
          pitch: notes ? `Offer targeted skincare ingredient audits & personalized routine guides leveraging your background ("${notes.slice(0, 45)}...").` : `Provide custom skincare routine reviews and product recommendation guides for clean beauty enthusiasts.`,
          domain: 'Health & Skincare Freelance Gig',
          estimatedCost: budget.includes('₹0') ? '₹0 (Bootstrapped)' : '₹0 - ₹500',
          timeline: time.includes('Under 5') ? '2 Days' : '1 Day',
          matchScore: '99% Match',
          targetAudience: 'Skincare Enthusiasts, Wellness Bloggers & Direct Clients',
          riskRating: 'Zero Financial Risk • Immediate Income',
          whyMatches: `Uses your ${primarySkill} skill, fits ${time} schedule, zero initial cost.`
        },
        {
          id: 'dyn-skin-2',
          title: 'DermCare WhatsApp Consultation & Booking Agency',
          complexityLevel: '🛠️ Level 2: Simple Digital Service',
          complexityColor: '#6ee7b7',
          tagline: 'Productized Digital Service • Monthly Retainers',
          pitch: `Set up turnkey automated patient appointment booking and post-consultation skincare routine follow-ups for local dermatologists and beauty clinics.`,
          domain: 'Digital Health Service Agency',
          estimatedCost: '₹2,500',
          timeline: '2 Weeks',
          matchScore: '97% Match',
          targetAudience: 'Independent Dermatologists, MedSpas & Skincare Clinics',
          riskRating: 'Low Overhead • High Monthly Retainer Income',
          whyMatches: `Matches your goal to '${userGoal}' with high recurring client retainers.`
        },
        {
          id: 'dyn-skin-3',
          title: 'SkinGlow AI: Ingredient Safety & Routine Matcher App',
          complexityLevel: '⚙️ Level 3: Moderate Micro-SaaS Tool',
          complexityColor: '#a5b4fc',
          tagline: 'Micro-SaaS • Automated Subscription Revenue',
          pitch: `A sleek web and mobile tool where users scan cosmetic barcode labels to analyze comedogenic ratings, allergen risks, and build customized routines.`,
          domain: 'Consumer Healthtech SaaS',
          estimatedCost: '₹15,000',
          timeline: '1 Month',
          matchScore: '95% Match',
          targetAudience: 'Sensitive Skin Consumers & Beauty Enthusiasts',
          riskRating: 'Moderate Risk • Monthly Subscription Model',
          whyMatches: `Aligns with your interest in ${primaryInterest} and ${market}.`
        },
        {
          id: 'dyn-skin-4',
          title: 'DermOps: Clinical EHR & Patient Engagement Suite',
          complexityLevel: '🧠 Level 4: High-Complexity B2B Platform',
          complexityColor: '#c084fc',
          tagline: 'Enterprise B2B SaaS • High Value Contracts',
          pitch: `Comprehensive clinic management system integrating digital consent forms, photo progress tracking timelines, and HIPAA/telehealth workflows for medical aesthetic chains.`,
          domain: 'B2B Medical SaaS',
          estimatedCost: '₹1,20,000',
          timeline: '3 Months',
          matchScore: '92% Match',
          targetAudience: 'Multi-location Dermatology Clinics & Aesthetic Chains',
          riskRating: 'High Scalability • Annual Enterprise Contracts',
          whyMatches: `Leverages ${secondarySkill} & business expansion strategy for high-growth potential.`
        },
        {
          id: 'dyn-skin-5',
          title: 'BioGenic Skin: Genomic Biomarker Synthesis Engine',
          complexityLevel: '🔬 Level 5: Ultra-Complex DeepTech',
          complexityColor: '#f472b6',
          tagline: 'DeepTech Infrastructure • Venture Capital Scale',
          pitch: `AI-driven computer vision and genomic analysis engine that formulates bespoke active compound serums based on high-resolution dermal imaging and micro-biome sequencing.`,
          domain: 'Biotech & AI Health Infrastructure',
          estimatedCost: '₹3,50,000',
          timeline: '6 Months',
          matchScore: '90% Match',
          targetAudience: 'Global Pharmaceutical Companies & Cosmetic Research Labs',
          riskRating: 'High R&D Investment • Massive Intellectual Property Value',
          whyMatches: `Top-tier VC scale project solving fundamental healthtech challenges.`
        }
      ];
    }

    if (niche.includes('Culinary') || niche.includes('Food')) {
      return [
        {
          id: 'dyn-food-1',
          title: 'Gourmet Meal Prep & Macro Recipe Curator',
          complexityLevel: '⚡ Level 1: Simple Job / Quick Start',
          complexityColor: '#34d399',
          tagline: `Simple gig • Fits your ${primarySkill} skills`,
          pitch: notes ? `Create customized weekly macro meal prep plans and recipe guides incorporating your preferences ("${notes.slice(0, 45)}...").` : `Provide custom dietary meal plans, grocery shopping lists, and macro breakdowns for busy professionals.`,
          domain: 'Food & Nutrition Services',
          estimatedCost: budget.includes('₹0') ? '₹0' : '₹500',
          timeline: '2 Days',
          matchScore: '99% Match',
          targetAudience: 'Busy Professionals & Fitness Enthusiasts',
          riskRating: 'Zero Financial Risk • Fast Cash Flow',
          whyMatches: `Requires zero startup capital, fits ${time} weekly limit.`
        },
        {
          id: 'dyn-food-2',
          title: 'Dark Kitchen & Restaurant WhatsApp Ordering Service',
          complexityLevel: '🛠️ Level 2: Simple Digital Service',
          complexityColor: '#6ee7b7',
          tagline: 'Productized Service • Recurring Monthly Fees',
          pitch: `Set up direct-to-consumer WhatsApp ordering bots and digital menus for local cloud kitchens and artisan bakeries to bypass delivery aggregator commissions.`,
          domain: 'FoodTech Digital Services',
          estimatedCost: '₹2,500',
          timeline: '2 Weeks',
          matchScore: '97% Match',
          targetAudience: 'Local Restaurants, Bakeries & Cloud Kitchen Owners',
          riskRating: 'Low Risk • High Monthly Client Retainer',
          whyMatches: `Helps you achieve '${userGoal}' within your starting budget of ${budget}.`
        },
        {
          id: 'dyn-food-3',
          title: 'ChefBox: Artisan Meal Kit & Subscription Portal',
          complexityLevel: '⚙️ Level 3: Moderate Micro-SaaS Tool',
          complexityColor: '#a5b4fc',
          tagline: 'Micro-SaaS & E-commerce • Subscription Revenue',
          pitch: `A specialized web portal enabling local gourmet chefs to publish pre-portioned ingredient kits with step-by-step interactive video recipe cards.`,
          domain: 'FoodTech Subscription SaaS',
          estimatedCost: '₹18,000',
          timeline: '1 Month',
          matchScore: '94% Match',
          targetAudience: 'Home Chefs, Foodies & Weekend Cooking Enthusiasts',
          riskRating: 'Balanced Risk • Weekly Recurring Revenue',
          whyMatches: `Combines your passion for ${primaryInterest} with ${market} business models.`
        },
        {
          id: 'dyn-food-4',
          title: 'CulinaryOps: Kitchen Inventory & Expiry AI System',
          complexityLevel: '🧠 Level 4: High-Complexity B2B Platform',
          complexityColor: '#c084fc',
          tagline: 'Enterprise B2B Software • Multi-Location Scale',
          pitch: `Smart inventory optimization and automated supplier re-ordering software for commercial kitchens to minimize ingredient waste and track unit economics.`,
          domain: 'B2B Enterprise FoodTech',
          estimatedCost: '₹1,20,000',
          timeline: '3 Months',
          matchScore: '91% Match',
          targetAudience: 'Hotel Chains, Catering Companies & Restaurant Groups',
          riskRating: 'High Revenue Potential • B2B SaaS Contracts',
          whyMatches: `Scalable enterprise tool matching your ${secondarySkill} skills.`
        },
        {
          id: 'dyn-food-5',
          title: 'FlavorGen AI: Synthetic Flavor & Recipe Chemistry Lab',
          complexityLevel: '🔬 Level 5: Ultra-Complex DeepTech',
          complexityColor: '#f472b6',
          tagline: 'DeepTech R&D Engine • Global Enterprise Scale',
          pitch: `Generative AI model analyzing molecular flavor compounds to formulate sustainable plant-based food alternatives and optimize commercial food manufacturing formulas.`,
          domain: 'DeepTech Food Science & AI',
          estimatedCost: '₹3,50,000',
          timeline: '6 Months',
          matchScore: '89% Match',
          targetAudience: 'Global Food Manufacturers & Consumer Packaged Goods Brands',
          riskRating: 'High Intellectual Property Asset • Massive VC Potential',
          whyMatches: `Transformative deeptech solution in the ${primaryInterest} domain.`
        }
      ];
    }

    if (niche.includes('Fitness') || niche.includes('Athletic')) {
      return [
        {
          id: 'dyn-fit-1',
          title: 'Personalized Workout Plan & Form Review Coach',
          complexityLevel: '⚡ Level 1: Simple Job / Quick Start',
          complexityColor: '#34d399',
          tagline: `Quick Start Gig • Leverages your ${primarySkill} skills`,
          pitch: notes ? `Provide tailored athletic routine design and video posture review for clients utilizing your background ("${notes.slice(0, 45)}...").` : `Provide online custom workout routine creation and asynchronous video form check services for gym-goers.`,
          domain: 'Fitness & Coaching Freelance Service',
          estimatedCost: budget.includes('₹0') ? '₹0' : '₹500',
          timeline: '2 Days',
          matchScore: '99% Match',
          targetAudience: 'Gym Beginners, Athletes & Remote Fitness Clients',
          riskRating: 'Zero Financial Risk • Instant Client Cash Flow',
          whyMatches: `Zero initial budget needed, fits your ${time} weekly capacity.`
        },
        {
          id: 'dyn-fit-2',
          title: 'FitStudio WhatsApp Client Management Setup',
          complexityLevel: '🛠️ Level 2: Simple Digital Service',
          complexityColor: '#6ee7b7',
          tagline: 'Productized Service • Recurring Retainers',
          pitch: `Automate workout logging, class booking notifications, and payment collection for independent personal trainers and boutique gym owners.`,
          domain: 'Digital Fitness Consulting Service',
          estimatedCost: '₹2,500',
          timeline: '2 Weeks',
          matchScore: '97% Match',
          targetAudience: 'Personal Trainers, Yoga Studios & Crossfit Gyms',
          riskRating: 'Low Cost • Steady Monthly Subscription Fees',
          whyMatches: `Designed to help you '${userGoal}' with recurring revenue.`
        },
        {
          id: 'dyn-fit-3',
          title: 'FitPulse AI: Smart Macro & Workout Tracking SaaS',
          complexityLevel: '⚙️ Level 3: Moderate Micro-SaaS Tool',
          complexityColor: '#a5b4fc',
          tagline: 'Micro-SaaS • Recurring Subscription Revenue',
          pitch: `Web app that generates personalized progressive overload routines, syncs workout telemetry, and calculates macro targets based on body metrics.`,
          domain: 'Consumer Health & Fitness Tech',
          estimatedCost: '₹15,000',
          timeline: '1 Month',
          matchScore: '95% Match',
          targetAudience: 'Bodybuilders, Athletes & Health-Conscious Individuals',
          riskRating: 'Balanced Risk • Monthly Active Subscriptions',
          whyMatches: `Matches your focus on ${primaryInterest} and ${market}.`
        },
        {
          id: 'dyn-fit-4',
          title: 'GymFleet Ops: Enterprise Gym & Coach Management',
          complexityLevel: '🧠 Level 4: High-Complexity B2B Platform',
          complexityColor: '#c084fc',
          tagline: 'Enterprise B2B SaaS • Multi-Facility Contracts',
          pitch: `Turnkey B2B platform for fitness franchises to manage membership billing, trainer schedules, equipment maintenance logs, and member retention analytics.`,
          domain: 'B2B Fitness Enterprise SaaS',
          estimatedCost: '₹1,20,000',
          timeline: '3 Months',
          matchScore: '92% Match',
          targetAudience: 'Commercial Gym Chains & Franchise Operators',
          riskRating: 'High Revenue Scale • High Retention Enterprise Contracts',
          whyMatches: `Utilizes ${secondarySkill} expertise to drive high-value B2B growth.`
        },
        {
          id: 'dyn-fit-5',
          title: 'KineticVision AI: Biometric Motion Tracking Engine',
          complexityLevel: '🔬 Level 5: Ultra-Complex DeepTech',
          complexityColor: '#f472b6',
          tagline: 'DeepTech Computer Vision • Institutional VC Scale',
          pitch: `Real-time markerless computer vision engine analyzing biomechanical joint loads to predict sports injury risk and optimize athletic performance.`,
          domain: 'DeepTech Biomechanics & AI Engine',
          estimatedCost: '₹3,50,000',
          timeline: '6 Months',
          matchScore: '90% Match',
          targetAudience: 'Professional Sports Teams, Rehab Clinics & Olympic Organizations',
          riskRating: 'High R&D Asset • Institutional Defense & Sports IP',
          whyMatches: `High-impact technological breakthrough in fitness & biometrics.`
        }
      ];
    }

    // Default Smart Multi-Domain Hybrid Generator (Handles AI, Tech, Coding, Design, Marketing, E-commerce, Real Estate, Pet Care, etc.)
    return [
      {
        id: 'dyn-gen-1',
        title: `${niche} ${primarySkill} & Content Specialist`,
        complexityLevel: '⚡ Level 1: Simple Job / Quick Start',
        complexityColor: '#34d399',
        tagline: `Quick Start Gig • Leverages your ${primarySkill} skills`,
        pitch: notes 
          ? `Provide high-speed ${primarySkill} & ${secondarySkill} services for ${niche} clients leveraging your background ("${notes.slice(0, 45)}...").`
          : `Provide fast-turnaround ${primarySkill} assistance and tailored digital deliverables for clients in the ${niche} space.`,
        domain: `${niche} Freelance Service`,
        estimatedCost: budget.includes('₹0') ? '₹0 (Bootstrapped)' : '₹0 - ₹500',
        timeline: time.includes('Under 5') ? '2 Days' : '1 Day',
        matchScore: '99% Match',
        targetAudience: `${niche} Creators, Small Businesses & Online Clients`,
        riskRating: 'Zero Financial Risk • Instant Freelance Earnings',
        whyMatches: `Matches your ${primarySkill} skill, fits ${time} weekly limit, zero capital.`
      },
      {
        id: 'dyn-gen-2',
        title: `${niche} Automated Setup & Retainer Agency`,
        complexityLevel: '🛠️ Level 2: Simple Digital Service',
        complexityColor: '#6ee7b7',
        tagline: `Productized Service • ${workType}`,
        pitch: `Package and deliver productized ${workType} setups, customer support automation, and monthly upkeep routines tailored for ${niche} & ${secondaryInterest} businesses.`,
        domain: `Productized ${market}`,
        estimatedCost: '₹2,500',
        timeline: '2 Weeks',
        matchScore: '97% Match',
        targetAudience: `Small Businesses & Service Providers in ${niche}`,
        riskRating: 'Low Financial Risk • High Monthly Client Retainers',
        whyMatches: `Designed to help you '${userGoal}' within your starting budget of ${budget}.`
      },
      {
        id: 'dyn-gen-3',
        title: `${niche} Smart Workflow & ${secondaryInterest} SaaS`,
        complexityLevel: '⚙️ Level 3: Moderate Micro-SaaS Tool',
        complexityColor: '#a5b4fc',
        tagline: `Micro-SaaS • Automated Subscription Income`,
        pitch: `A specialized web application that automates key ${niche} workflows, monetize your ${primarySkill} knowledge, and provides high-speed analytics for users.`,
        domain: market,
        estimatedCost: budget.includes('₹500 -') ? '₹15,000' : '₹25,000',
        timeline: '1 Month',
        matchScore: '95% Match',
        targetAudience: `Professionals, Creators & Power Users in ${niche}`,
        riskRating: 'Balanced Risk • Monthly Recurring Revenue',
        whyMatches: `Aligns with your interest in ${primaryInterest} and business goal.`
      },
      {
        id: 'dyn-gen-4',
        title: `Enterprise ${niche} Automation & ${secondarySkill} Suite`,
        complexityLevel: '🧠 Level 4: High-Complexity B2B Platform',
        complexityColor: '#c084fc',
        tagline: 'Enterprise B2B Software • High Value Retainers',
        pitch: `Integrated cloud management portal for enterprise ${niche} teams that streamlines high-volume operations, multi-user permissions, and ${secondarySkill} pipelines.`,
        domain: `B2B ${niche} Enterprise Tech`,
        estimatedCost: '₹1,20,000',
        timeline: '3 Months',
        matchScore: '92% Match',
        targetAudience: `Corporate Teams & Mid-Market Firms in ${niche}`,
        riskRating: 'High Growth Scalability • Annual Enterprise Contracts',
        whyMatches: `Scalable enterprise tool matching your ${secondarySkill} & ${primarySkill} skills.`
      },
      {
        id: 'dyn-gen-5',
        title: `Nexus DeepTech ${niche} Infrastructure Engine`,
        complexityLevel: '🔬 Level 5: Ultra-Complex DeepTech',
        complexityColor: '#f472b6',
        tagline: 'DeepTech Infrastructure • Global VC Scale',
        pitch: `Advanced autonomous model architecture and proprietary data engine engineered to solve systemic research and computational bottlenecks in ${niche}.`,
        domain: `DeepTech ${niche} AI Infrastructure`,
        estimatedCost: '₹3,50,000',
        timeline: '6 Months',
        matchScore: '90% Match',
        targetAudience: `Global Institutions, Research Labs & Industry Leaders`,
        riskRating: 'High R&D Value • Billion-Dollar IP Market Potential',
        whyMatches: `Venture-backed high-tech innovation in ${primaryInterest}.`
      }
    ];
  };

  return (
    <div className="modal-overlay" onClick={() => setIsGetIdeasModalOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: currentStep === 11 ? '920px' : '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '24px',
          padding: '2rem 1.75rem',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.18)',
          color: '#0f172a'
        }}
      >
        {/* Top Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          {currentStep > 1 && currentStep <= 10 ? (
            <button 
              onClick={handleBack} 
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <div style={{ width: '36px' }}></div>
          )}

          {currentStep <= 10 && (
            <div style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 700 }}>
              Step {currentStep} of {totalSteps}
            </div>
          )}

          <button 
            onClick={() => setIsGetIdeasModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Multi-Colored Segment Progress Indicator Bar (10 Steps) */}
        {currentStep <= 10 && (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '2rem' }}>
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const isFilled = idx < currentStep;
              return (
                <div 
                  key={idx} 
                  style={{
                    flex: 1,
                    height: '5px',
                    borderRadius: '3px',
                    background: isFilled ? STEP_COLORS[idx % STEP_COLORS.length] : '#e2e8f0',
                    transition: 'all 0.3s ease'
                  }}
                />
              );
            })}
          </div>
        )}

        {/* STEP 1 OF 10: Have you run a business before? + HOW OLD ARE YOU? */}
        {currentStep === 1 && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Have you run a business before?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {expOptions.map(opt => {
                const isSelected = businessExperience === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setBusinessExperience(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.95rem 1.1rem',
                      background: isSelected ? 'rgba(79, 70, 229, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #6366f1' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', color: isSelected ? '#4338ca' : '#1e293b', fontWeight: 700 }}>
                      <span style={{ color: isSelected ? '#4f46e5' : '#64748b' }}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #4f46e5' : '2px solid #cbd5e1',
                      background: isSelected ? '#ffffff' : 'transparent'
                    }} />
                  </div>
                );
              })}
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              How old are you?
            </div>

            <div className="grid-2" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
              {ageOptions.map(opt => {
                const isSelected = ageGroup === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setAgeGroup(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      background: isSelected ? 'rgba(79, 70, 229, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #6366f1' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      color: isSelected ? '#4338ca' : '#1e293b',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}
                  >
                    <span style={{ color: isSelected ? '#4f46e5' : '#64748b' }}>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 OF 10: Made money online yet? */}
        {currentStep === 2 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              Made money online yet?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {moneyOptions.map(opt => {
                const isSelected = madeMoneyOnline === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setMadeMoneyOnline(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.2rem',
                      background: isSelected ? 'rgba(245, 158, 11, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', color: isSelected ? '#b45309' : '#1e293b', fontWeight: 700, fontSize: '1rem' }}>
                      <span style={{ color: isSelected ? '#d97706' : '#64748b' }}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #d97706' : '2px solid #cbd5e1',
                      background: isSelected ? '#ffffff' : 'transparent'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 OF 10: What's the goal? */}
        {currentStep === 3 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              What's your primary goal?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {goalOptions.map(opt => {
                const isSelected = goal === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setGoal(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.2rem',
                      background: isSelected ? 'rgba(239, 68, 68, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #ef4444' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', color: isSelected ? '#b91c1c' : '#1e293b', fontWeight: 700, fontSize: '1rem' }}>
                      <span style={{ color: isSelected ? '#dc2626' : '#64748b' }}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #dc2626' : '2px solid #cbd5e1',
                      background: isSelected ? '#ffffff' : 'transparent'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4 OF 10: How much time each week? */}
        {currentStep === 4 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              How much time can you spend each week?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {timeOptions.map(opt => {
                const isSelected = weeklyTime === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setWeeklyTime(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.2rem',
                      background: isSelected ? 'rgba(6, 182, 212, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #06b6d4' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', color: isSelected ? '#0e7490' : '#1e293b', fontWeight: 700, fontSize: '1rem' }}>
                      <span style={{ color: isSelected ? '#0891b2' : '#64748b' }}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #0891b2' : '2px solid #cbd5e1',
                      background: isSelected ? '#ffffff' : 'transparent'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5 OF 10: What can you spend to start? (In Rupees ₹) */}
        {currentStep === 5 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              What starting budget can you spend?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
              {budgetOptions.map(opt => {
                const isSelected = startingBudget === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setStartingBudget(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.2rem',
                      background: isSelected ? 'rgba(139, 92, 246, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', color: isSelected ? '#6d28d9' : '#1e293b', fontWeight: 700, fontSize: '1rem' }}>
                      <span style={{ color: isSelected ? '#7c3aed' : '#64748b' }}>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #7c3aed' : '2px solid #cbd5e1',
                      background: isSelected ? '#ffffff' : 'transparent'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6 OF 10: What type of business fits your vision? */}
        {currentStep === 6 && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              What type of business fits your vision?
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1.25rem' }}>
              Choose the business model you feel most comfortable building:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              {marketOptions.map(opt => {
                const isSelected = marketFocus === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setMarketFocus(opt.label)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.15rem',
                      background: isSelected ? 'rgba(236, 72, 153, 0.08)' : '#f8fafc',
                      border: isSelected ? '2px solid #ec4899' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                      <span style={{ color: isSelected ? '#db2777' : '#64748b' }}>{opt.icon}</span>
                      <div>
                        <div style={{ color: isSelected ? '#be185d' : '#0f172a', fontWeight: 800, fontSize: '0.98rem' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.1rem' }}>
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: isSelected ? '5px solid #db2777' : '2px solid #cbd5e1',
                      background: isSelected ? '#ffffff' : 'transparent',
                      flexShrink: 0,
                      marginLeft: '0.5rem'
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7 OF 10: What are you good at? (3x3 Grid Multi-Select) */}
        {currentStep === 7 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              What are you good at?
            </h2>

            <div className="grid-3" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
              {skillsOptions.map(opt => {
                const isSelected = selectedSkills.includes(opt.label);
                return (
                  <div 
                    key={opt.id}
                    onClick={() => toggleSkill(opt.label)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1.1rem 0.5rem',
                      background: isSelected ? 'rgba(59, 130, 246, 0.1)' : '#f8fafc',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ color: isSelected ? '#2563eb' : '#64748b' }}>{opt.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? '#1d4ed8' : '#334155' }}>
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#059669', fontWeight: 700, marginBottom: '1.5rem' }}>
              {selectedSkills.length} of 5 selected
            </div>
          </div>
        )}

        {/* STEP 8 OF 10: What are you into? (3x3 Grid Multi-Select) */}
        {currentStep === 8 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              What topics are you into?
            </h2>

            <div className="grid-3" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
              {interestOptions.map(opt => {
                const isSelected = selectedInterests.includes(opt.label);
                return (
                  <div 
                    key={opt.id}
                    onClick={() => toggleInterest(opt.label)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '1.1rem 0.5rem',
                      background: isSelected ? 'rgba(168, 85, 247, 0.1)' : '#f8fafc',
                      border: isSelected ? '2px solid #a855f7' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ color: isSelected ? '#9333ea' : '#64748b' }}>{opt.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? '#7e22ce' : '#334155' }}>
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#059669', fontWeight: 700, marginBottom: '1.5rem' }}>
              {selectedInterests.length} of 3 selected
            </div>
          </div>
        )}

        {/* STEP 9 OF 10: What kind of work fits you? (2x3 Card Grid) */}
        {currentStep === 9 && (
          <div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              What kind of work fits you best?
            </h2>

            <div className="grid-3" style={{ gap: '0.85rem', marginBottom: '2rem' }}>
              {workTypeOptions.map(opt => {
                const isSelected = workType === opt.label;
                return (
                  <div 
                    key={opt.id}
                    onClick={() => setWorkType(opt.label)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      padding: '1.25rem 0.75rem',
                      background: isSelected ? 'rgba(217, 70, 239, 0.1)' : '#f8fafc',
                      border: isSelected ? '2px solid #d946ef' : '1px solid #e2e8f0',
                      borderRadius: '18px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      position: 'relative'
                    }}
                  >
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '0.4rem',
                        right: '0.4rem',
                        background: '#d946ef',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={12} color="#ffffff" />
                      </div>
                    )}
                    <span style={{ color: isSelected ? '#c026d3' : '#64748b' }}>{opt.icon}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? '#a21caf' : '#334155' }}>
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 10 OF 10: Anything we missed? (Text Input Area) */}
        {currentStep === 10 && (
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Anything extra about you?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.25rem' }}>
              Tell us your job background, hobbies, or specific products you like (optional):
            </p>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <textarea 
                rows="4"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="e.g. I am a nurse, I know skincare, or I enjoy cooking healthy recipes..."
                className="form-textarea"
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '1.1rem',
                  fontSize: '0.95rem',
                  color: '#0f172a'
                }}
              ></textarea>
            </div>
          </div>
        )}

        {/* STEP 11: 5 DYNAMICALLY GENERATED IDEAS FROM USER'S EXACT FEEDBACK */}
        {currentStep === 11 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
                5 Tailored Ideas Matching Your Preferences
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#4f46e5', fontWeight: 600, marginTop: '0.2rem' }}>
                Ranging from Level 1 (Simple Gig) to Level 5 (Advanced Technology)
              </p>
            </div>

            {/* PREFERENCES APPLIED BANNER */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '0.85rem 1.1rem',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
              color: '#334155'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0284c7', marginBottom: '0.4rem' }}>
                ⚡ Preferences Applied:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ background: 'rgba(2, 132, 199, 0.1)', border: '1px solid rgba(2, 132, 199, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#0369a1', fontWeight: 600 }}>
                  🎯 Goal: {goal}
                </span>
                <span style={{ background: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#7e22ce', fontWeight: 600 }}>
                  💡 Interests: {selectedInterests.join(', ') || 'Tech'}
                </span>
                <span style={{ background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#1d4ed8', fontWeight: 600 }}>
                  🛠️ Skills: {selectedSkills.join(', ') || 'General'}
                </span>
                <span style={{ background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#047857', fontWeight: 600 }}>
                  💰 Budget: {startingBudget}
                </span>
                <span style={{ background: 'rgba(219, 39, 119, 0.1)', border: '1px solid rgba(219, 39, 119, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#be185d', fontWeight: 600 }}>
                  🏷️ Focus: {marketFocus}
                </span>
                {additionalInfo.trim() && (
                  <span style={{ background: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '8px', color: '#b45309', fontWeight: 600 }}>
                    📝 Notes: "{additionalInfo.trim().slice(0, 30)}..."
                  </span>
                )}
              </div>
            </div>

            {isGenerating ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <Sparkles size={42} color="#ec4899" className="pulse-icon" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700 }}>Synthesizing Ideas Matching Your Preferences...</h3>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.25rem'
                }}>
                  {(recommendedIdeas.length > 0 ? recommendedIdeas : generateDynamicIdeasFromFeedback()).map(idea => (
                    <div 
                      key={idea.id}
                      className="glass-card"
                      onClick={() => selectIdeaAndGenerateRoadmap(idea)}
                      style={{
                        cursor: 'pointer',
                        padding: '1.35rem',
                        borderColor: idea.complexityColor || '#cbd5e1',
                        background: '#ffffff',
                        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      <div>
                        {/* Complexity Level Badge */}
                        <div style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '0.25rem 0.6rem',
                          borderRadius: '8px',
                          background: `${idea.complexityColor}15`,
                          color: idea.complexityColor || '#059669',
                          border: `1px solid ${idea.complexityColor}40`,
                          marginBottom: '0.6rem',
                          display: 'inline-block'
                        }}>
                          {idea.complexityLevel}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span className="badge-pill-emerald" style={{ fontSize: '0.7rem' }}>
                            {idea.matchScore}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                            {idea.timeline}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.2rem', fontWeight: 800 }}>
                          {idea.title}
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: '#db2777', fontWeight: 700, marginBottom: '0.6rem' }}>
                          {idea.tagline}
                        </p>

                        <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                          {idea.pitch}
                        </p>

                        {/* Why This Matches You Pill */}
                        {idea.whyMatches && (
                          <div style={{
                            background: 'rgba(5, 150, 105, 0.08)',
                            border: '1px solid rgba(5, 150, 105, 0.2)',
                            borderRadius: '10px',
                            padding: '0.45rem 0.65rem',
                            fontSize: '0.75rem',
                            color: '#047857',
                            marginBottom: '0.85rem'
                          }}>
                            💡 <strong>Why it matches:</strong> {idea.whyMatches}
                          </div>
                        )}
                      </div>

                      <div>
                        <div style={{
                          borderTop: '1px solid #f1f5f9',
                          paddingTop: '0.75rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontSize: '0.8rem',
                          marginBottom: '0.75rem'
                        }}>
                          <span style={{ color: '#64748b', fontWeight: 600 }}>Est. Budget:</span>
                          <span style={{ fontWeight: 800, color: '#059669' }}>{idea.estimatedCost}</span>
                        </div>

                        <button className="btn btn-primary btn-sm" style={{ width: '100%', fontSize: '0.82rem' }}>
                          <Compass size={14} /> Select & View Complete Roadmap
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                  <button onClick={() => setCurrentStep(1)} className="btn btn-secondary btn-sm">
                    ← Retake 10-Step Questionnaire
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOTTOM ACTION BUTTON (for Steps 1 to 10) */}
        {currentStep <= 10 && (
          <button 
            onClick={handleContinue}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '1.1rem',
              borderRadius: '16px',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.03em',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            {currentStep === 10 && !additionalInfo.trim() ? 'NOTHING TO ADD' : 'CONTINUE'}
          </button>
        )}

      </div>
    </div>
  );
}
