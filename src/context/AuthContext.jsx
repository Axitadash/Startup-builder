import React, { createContext, useContext, useState, useEffect } from 'react';
import { DatabaseService } from '../db/dbService';

const AuthContext = createContext();

const DEFAULT_PROFILE = {
  id: 'cand-101',
  name: 'Alex Vance',
  email: 'alex.vance@ai-startup.io',
  role: 'AI Technical Founder',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  bio: 'Building innovative technology solutions and leading startup product teams.',
  location: 'Bengaluru, India',
  startupName: 'Synthetix AI',
  pitch: 'Autonomous platform that builds digital solutions for small businesses.',
  stage: 'Building MVP',
  targetMarket: 'Enterprise Software & Creator Tools',
  fundingGoal: '₹25,00,000',
  skills: ['React', 'JavaScript', 'Design', 'Marketing'],
  socials: {
    github: 'https://github.com/alexvance-ai',
    linkedin: 'https://linkedin.com/in/alexvance-founder',
    twitter: 'https://x.com/alexvance_ai',
    website: 'https://synthetix-ai.io'
  },
  seekingCofounder: true,
  seekingInvestors: true,
  equityShare: '15-25% Co-founder Equity'
};

// Helper to parse numeric budget value out of any budget string (e.g. "₹1,50,000" => 150000)
export function parseBudgetValue(budgetStr) {
  if (budgetStr === 0 || budgetStr === '0') return 0;
  if (!budgetStr) return 50000;
  if (typeof budgetStr === 'number') return budgetStr >= 0 ? budgetStr : 50000;
  
  const str = String(budgetStr).replace(/,/g, '');
  const matches = str.match(/\d+/g);
  if (!matches || matches.length === 0) return 50000;
  
  const nums = matches.map(n => parseInt(n, 10)).filter(n => !isNaN(n));
  if (nums.length === 0) return 50000;
  
  const maxVal = Math.max(...nums);
  return maxVal;
}

export function formatRupee(val) {
  if (isNaN(val) || val <= 0) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
}

// Dynamic Domain-Aware & Idea-Specific Roadmap Generator in Indian Rupees (₹)
export function buildCompleteRoadmap(idea) {
  const title = idea.title || 'Custom Business Venture';
  const pitch = idea.pitch || 'Innovative business solution';
  const domain = (idea.domain || '').toLowerCase();
  const targetAudience = idea.targetAudience || 'Target Local Customers';
  const totalBudget = idea.estimatedCost || '₹50,000';
  const timeline = idea.timeline || '1 Month';

  // Compute dynamic numeric budget and phase allocations (15% validation, 35% MVP launch, 25% public scale, 25% scale)
  const numericBudget = parseBudgetValue(totalBudget);
  const p1Cost = formatRupee(numericBudget * 0.15);
  const p2Cost = formatRupee(numericBudget * 0.35);
  const p3Cost = formatRupee(numericBudget * 0.25);
  const p4Cost = formatRupee(numericBudget * 0.25);

  // Determine Category Type for Dynamic Tailoring
  const isFoodOrPhysical = domain.includes('food') || domain.includes('kitchen') || domain.includes('juice') || domain.includes('bakery') || domain.includes('beverage') || title.toLowerCase().includes('juice') || title.toLowerCase().includes('food') || title.toLowerCase().includes('bakery') || title.toLowerCase().includes('cafe');
  const isTechOrSaaS = domain.includes('software') || domain.includes('app') || domain.includes('saas') || domain.includes('ai') || domain.includes('platform') || title.toLowerCase().includes('app') || title.toLowerCase().includes('ai') || title.toLowerCase().includes('software');
  const isAgencyOrService = domain.includes('agency') || domain.includes('service') || domain.includes('retainer') || domain.includes('consulting') || title.toLowerCase().includes('agency') || title.toLowerCase().includes('consulting');

  let phase1, phase2, phase3, phase4;
  let budgetBreakdown = [];
  let riskAnalysis = [];

  if (isFoodOrPhysical) {
    phase1 = {
      phaseNumber: 1,
      title: 'Recipe & Initial Product Formulation',
      duration: 'Phase 1 (Validation)',
      objective: `Formulate initial product menu for "${title}" and test samples with ${targetAudience}.`,
      keyMilestones: [
        `Complete 25 taste-test interviews with ${targetAudience}`,
        `Finalize ingredient supplier sourcing & FSSAI / Food Safety licensing checklist`,
        `Design branded packaging and menu pricing cards`,
        `Set up pre-order landing page & WhatsApp catalog`
      ],
      estimatedCost: p1Cost
    };
    phase2 = {
      phaseNumber: 2,
      title: 'Production Setup & Ordering Channel',
      duration: 'Phase 2 (MVP Launch)',
      objective: `Establish initial kitchen production batch and automated ordering routes for ${title}.`,
      keyMilestones: [
        `Set up production unit & hygiene packaging workflow`,
        `Launch WhatsApp bot / online shopfront for instant orders`,
        `Onboard 2 local delivery partners or route dispatchers`,
        `Run initial 50-customer trial delivery run`
      ],
      estimatedCost: p2Cost
    };
    phase3 = {
      phaseNumber: 3,
      title: 'Subscription Launch & Local Retainer Growth',
      duration: 'Phase 3 (Public Scale)',
      objective: `Launch weekly/monthly subscription plans targeting ${targetAudience}.`,
      keyMilestones: [
        `Acquire 30 recurring monthly subscribers for ${title}`,
        `Achieve target revenue scale for ${title}`,
        `Launch referral program ("Refer a friend, get 20% off next week")`,
        `Partner with 5 local offices / community hubs`
      ],
      estimatedCost: p3Cost
    };
    phase4 = {
      phaseNumber: 4,
      title: 'Capacity Expansion & Multi-Location Reach',
      duration: 'Phase 4 (Scale)',
      objective: `Scale production capacity and introduce 3 complementary product lines.`,
      keyMilestones: [
        `Reach 3x initial monthly revenue scale`,
        `Expand production facility or open 2nd cloud kitchen hub`,
        `Hire dedicated operations manager & customer support lead`,
        `Reinvest profits to scale brand awareness`
      ],
      estimatedCost: p4Cost
    };

    budgetBreakdown = [
      { category: `Raw Ingredients & Packaging for ${title}`, amount: formatRupee(numericBudget * 0.35), percentage: '35%', detail: 'Supplier inventory, food-grade packaging, and labels.' },
      { category: 'Digital Store & Ordering WhatsApp Bot', amount: formatRupee(numericBudget * 0.25), percentage: '25%', detail: 'E-commerce setup, domain, WhatsApp API, and payment setup.' },
      { category: `Targeted Marketing to ${targetAudience}`, amount: formatRupee(numericBudget * 0.20), percentage: '20%', detail: 'Local flyer promotion, Instagram ads, and free trial samples.' },
      { category: 'Food Safety & Business Licenses', amount: formatRupee(numericBudget * 0.11), percentage: '11%', detail: 'FSSAI license, GST registration, terms & health guidelines.' },
      { category: 'Emergency Reserve Buffer', amount: formatRupee(numericBudget * 0.09), percentage: '9%', detail: 'Buffer for ingredient price fluctuations or delivery equipment.' }
    ];

    riskAnalysis = [
      {
        riskType: 'Perishable Inventory & Spoilage Risk',
        level: 'Medium',
        description: `Risk of ingredient waste if order volume fluctuates for ${title}.`,
        mitigation: `Operate on a pre-paid subscription model so batches are prepared exactly according to orders.`
      },
      {
        riskType: 'Local Delivery Logistics Risk',
        level: 'Medium',
        description: `Delays during peak hours impacting customer experience.`,
        mitigation: `Batch daily deliveries into fixed time slots (e.g. 8:00 AM - 10:00 AM) with dedicated riders.`
      },
      {
        riskType: 'Customer Retention Risk',
        level: 'Low',
        description: `Customers canceling subscriptions after initial trial period.`,
        mitigation: `Offer customizable flavor variations every week to keep ${targetAudience} engaged.`
      }
    ];
  } else if (isTechOrSaaS) {
    phase1 = {
      phaseNumber: 1,
      title: 'Workflow Wireframing & User Interviews',
      duration: 'Phase 1 (Validation)',
      objective: `Validate workflow bottlenecks for "${title}" with 30 target users in ${targetAudience}.`,
      keyMilestones: [
        `Conduct 25 problem interviews with ${targetAudience}`,
        `Map core software workflows & UX wireframes`,
        `Publish pre-launch landing page with waitlist form`,
        `Finalize MVP tech stack (React, Node, Cloud DB)`
      ],
      estimatedCost: p1Cost
    };
    phase2 = {
      phaseNumber: 2,
      title: 'Core Software MVP Development',
      duration: 'Phase 2 (MVP Launch)',
      objective: `Build & deploy core features and user accounts for ${title}.`,
      keyMilestones: [
        `Deploy web frontend & backend API integration`,
        `Integrate UPI & subscription payment gateway`,
        `Onboard 20 alpha testers from ${targetAudience}`,
        `Implement data security & access controls`
      ],
      estimatedCost: p2Cost
    };
    phase3 = {
      phaseNumber: 3,
      title: 'Public Beta & Subscription Monetization',
      duration: 'Phase 3 (Public Scale)',
      objective: `Launch paid plans and content marketing targeting ${targetAudience}.`,
      keyMilestones: [
        `Public Product Hunt & Social Media launch`,
        `Acquire first 50 paid subscribers for ${title}`,
        `Reach initial positive recurring monthly revenue`,
        `Publish 3 customer case studies`
      ],
      estimatedCost: p3Cost
    };
    phase4 = {
      phaseNumber: 4,
      title: 'Infrastructure Scaling & Enterprise Tier',
      duration: 'Phase 4 (Scale)',
      objective: `Scale server bandwidth, introduce team collaboration features, and expand MRR.`,
      keyMilestones: [
        `Scale infrastructure for 4x initial user load`,
        `Optimize cloud DB infrastructure for high concurrency`,
        `Hire 2 technical co-founders or developers`,
        `Prepare Seed pitch deck for investor fundraising`
      ],
      estimatedCost: p4Cost
    };

    budgetBreakdown = [
      { category: `Software Development & UI Design for ${title}`, amount: formatRupee(numericBudget * 0.35), percentage: '35%', detail: 'Frontend engineering, API integration, and design.' },
      { category: 'Cloud Infrastructure & DB Hosting', amount: formatRupee(numericBudget * 0.25), percentage: '25%', detail: 'Database hosting, API bandwidth, domain, SSL security.' },
      { category: `Digital Ads & Growth Marketing to ${targetAudience}`, amount: formatRupee(numericBudget * 0.20), percentage: '20%', detail: 'Meta/Google ads, Product Hunt launch, SEO content.' },
      { category: 'Software Legal & Terms of Service', amount: formatRupee(numericBudget * 0.11), percentage: '11%', detail: 'Company registration, privacy policy, payment gateway fees.' },
      { category: 'Reserve Contingency Buffer', amount: formatRupee(numericBudget * 0.09), percentage: '9%', detail: 'Safety reserve for API rate limits and unexpected servers.' }
    ];

    riskAnalysis = [
      {
        riskType: 'Technical Complexity Risk',
        level: 'Medium',
        description: `Delays in developing core features for ${title}.`,
        mitigation: `Scope down to a lean MVP focused strictly on solving 1 primary pain point first.`
      },
      {
        riskType: 'User Churn Risk',
        level: 'Medium',
        description: `Users canceling monthly subscriptions if onboarding is unclear.`,
        mitigation: `Provide 1-on-1 onboarding calls and automated email tutorial sequences.`
      },
      {
        riskType: 'Competitor Copying Risk',
        level: 'Low',
        description: `Established tools launching similar features.`,
        mitigation: `Focus on niche pricing in Rupees (₹) and ultra-fast customer support.`
      }
    ];
  } else if (isAgencyOrService) {
    phase1 = {
      phaseNumber: 1,
      title: 'Service Packaging & Offer Definition',
      duration: 'Phase 1 (Validation)',
      objective: `Package "${title}" into clear 3-tier monthly retainer service offerings.`,
      keyMilestones: [
        `Define Core Service Packages & Pricing Tiers`,
        `Create professional agency portfolio site & pitch deck`,
        `Outreach to 30 prospective clients in ${targetAudience}`,
        `Prepare standardized client agreement contract templates`
      ],
      estimatedCost: p1Cost
    };
    phase2 = {
      phaseNumber: 2,
      title: 'First Client Onboarding & Delivery Setup',
      duration: 'Phase 2 (MVP Launch)',
      objective: `Onboard initial paying clients and establish delivery SOPs for ${title}.`,
      keyMilestones: [
        `Sign first 3 monthly retainer clients in ${targetAudience}`,
        `Establish client communication & reporting portal`,
        `Deliver high-impact initial results for client #1`,
        `Collect video testimonial & detailed case study`
      ],
      estimatedCost: p2Cost
    };
    phase3 = {
      phaseNumber: 3,
      title: 'Outbound Sales & Monthly Retainer Scale',
      duration: 'Phase 3 (Public Scale)',
      objective: `Scale monthly recurring retainers and launch LinkedIn / email campaign.`,
      keyMilestones: [
        `Scale to 8 active monthly retainer clients for ${title}`,
        `Achieve strong positive monthly retainer revenue`,
        `Onboard 2 specialized freelancers for client execution`,
        `Implement client dashboard & automated reporting`
      ],
      estimatedCost: p3Cost
    };
    phase4 = {
      phaseNumber: 4,
      title: 'Agency Operations & Team Expansion',
      duration: 'Phase 4 (Scale)',
      objective: `Transition from founder-led execution to structured agency team.`,
      keyMilestones: [
        `Scale retainer operations and client management`,
        `Hire full-time Account Manager & Lead Specialist`,
        `Expand service offerings to high-ticket clients`,
        `Establish 6-month minimum retainer contracts`
      ],
      estimatedCost: p4Cost
    };

    budgetBreakdown = [
      { category: `Agency Portfolio & Pitch Deck for ${title}`, amount: formatRupee(numericBudget * 0.30), percentage: '30%', detail: 'Brand identity, website design, case study PDFs.' },
      { category: 'Outreach Software & CRM Tools', amount: formatRupee(numericBudget * 0.24), percentage: '24%', detail: 'Email automation, CRM software, LinkedIn Sales Navigator.' },
      { category: `Client Acquisition Marketing to ${targetAudience}`, amount: formatRupee(numericBudget * 0.22), percentage: '22%', detail: 'Targeted ads, sponsored content, event networking.' },
      { category: 'Legal Contracts & Business Setup', amount: formatRupee(numericBudget * 0.14), percentage: '14%', detail: 'MSME registration, GST, client legal contracts.' },
      { category: 'Operations Reserve', amount: formatRupee(numericBudget * 0.10), percentage: '10%', detail: 'Safety reserve for freelancer payouts.' }
    ];

    riskAnalysis = [
      {
        riskType: 'Founder Burnout Risk',
        level: 'Medium',
        description: `Managing client communication and execution simultaneously.`,
        mitigation: `Systematize execution with strict SOPs and hire vetted sub-contractors.`
      },
      {
        riskType: 'Client Retainer Churn Risk',
        level: 'High',
        description: `Clients pausing retainers after 2-3 months.`,
        mitigation: `Tie monthly reports directly to measurable ROI and revenue generated.`
      },
      {
        riskType: 'Payment Delay Risk',
        level: 'Low',
        description: `Clients delaying monthly invoices.`,
        mitigation: `Require 100% upfront payment on the 1st of every month before work begins.`
      }
    ];
  } else {
    phase1 = {
      phaseNumber: 1,
      title: 'Concept Validation & Prototype Setup',
      duration: 'Phase 1 (Validation)',
      objective: `Validate "${title}" with target customers in ${targetAudience}.`,
      keyMilestones: [
        `Conduct 25 customer problem interviews for ${title}`,
        `Build basic prototype / product landing page`,
        `Collect initial 50 pre-orders or waitlist signups`,
        `Finalize supplier / production logistics & pricing`
      ],
      estimatedCost: p1Cost
    };
    phase2 = {
      phaseNumber: 2,
      title: 'MVP Launch & Initial Sales Setup',
      duration: 'Phase 2 (MVP Launch)',
      objective: `Launch core version of ${title} and process first orders.`,
      keyMilestones: [
        `Deploy functional storefront / service ordering platform`,
        `Integrate UPI & payment gateway processing`,
        `Fulfill initial 30 customer orders for ${title}`,
        `Gather 15 detailed customer reviews & ratings`
      ],
      estimatedCost: p2Cost
    };
    phase3 = {
      phaseNumber: 3,
      title: 'Market Expansion & Repeat Customer Growth',
      duration: 'Phase 3 (Public Scale)',
      objective: `Scale marketing campaigns targeting ${targetAudience} to grow monthly revenue.`,
      keyMilestones: [
        `Launch targeted social media & influencer campaigns`,
        `Reach target monthly sales revenue for ${title}`,
        `Achieve 25% repeat customer order rate`,
        `Expand customer support channels`
      ],
      estimatedCost: p3Cost
    };
    phase4 = {
      phaseNumber: 4,
      title: 'Scale & Operational Optimization',
      duration: 'Phase 4 (Scale)',
      objective: `Scale operations, optimize unit margins, and build team.`,
      keyMilestones: [
        `Scale monthly business operations & inventory`,
        `Automate inventory / fulfillment routines`,
        `Hire 3 key operations & marketing team members`,
        `Explore multi-city / B2B partnership distribution`
      ],
      estimatedCost: p4Cost
    };

    budgetBreakdown = [
      { category: `Product / Service Setup for ${title}`, amount: formatRupee(numericBudget * 0.35), percentage: '35%', detail: `Inventory, initial production, or setup for ${title}.` },
      { category: 'Digital Storefront & Payment Gateway', amount: formatRupee(numericBudget * 0.25), percentage: '25%', detail: 'Website, hosting, domain, UPI payment integration.' },
      { category: `Marketing & Customer Acquisition for ${targetAudience}`, amount: formatRupee(numericBudget * 0.20), percentage: '20%', detail: 'Online advertising, social media promotion, content.' },
      { category: 'Business Registration & Licensing', amount: formatRupee(numericBudget * 0.10), percentage: '10%', detail: 'GST, MSME registration, terms & policies.' },
      { category: 'Contingency Reserve Buffer', amount: formatRupee(numericBudget * 0.10), percentage: '10%', detail: 'Emergency buffer for operational expenses.' }
    ];

    riskAnalysis = [
      {
        riskType: 'Market Demand Risk',
        level: 'Medium',
        description: `Customer adoption for ${title} taking longer than expected.`,
        mitigation: `Run pre-sales campaigns with pre-order discounts to validate real cash demand.`
      },
      {
        riskType: 'Execution & Operations Risk',
        level: 'Medium',
        description: `Operational bottlenecks in fulfilling orders for ${title}.`,
        mitigation: `Keep inventory lean and automate order notification workflows.`
      },
      {
        riskType: 'Capital Reserve Risk',
        level: 'Low',
        description: `Running low on cash flow before month 3.`,
        mitigation: `Maintain 10% emergency buffer and re-invest initial sales profits.`
      }
    ];
  }

  return {
    ideaTitle: title,
    tagline: idea.tagline || `Custom Roadmap • ${domain}`,
    domain: idea.domain || 'General Business',
    elevatorPitch: pitch,
    targetAudience: targetAudience,
    overallRiskRating: idea.riskRating || 'Custom Roadmap • Tailored Plan',
    totalEstimatedBudget: typeof totalBudget === 'string' && totalBudget.includes('₹') ? totalBudget : formatRupee(numericBudget),
    timeToMVP: timeline,
    phases: [phase1, phase2, phase3, phase4],
    budgetBreakdown: budgetBreakdown,
    riskAnalysis: riskAnalysis
  };
}

const getAccounts = () => {
  try {
    const saved = localStorage.getItem('venture_ai_accounts');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

const saveAccount = (account) => {
  if (!account || !account.email) return;
  try {
    const accounts = getAccounts();
    accounts[account.email.toLowerCase().trim()] = account;
    localStorage.setItem('venture_ai_accounts', JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save account to localStorage', e);
  }
};

const createNewProfile = ({ email, name, location, role, skills }) => {
  const cleanEmail = (email || '').toLowerCase().trim();
  const rawName = name || (cleanEmail ? cleanEmail.split('@')[0].replace(/[._]/g, ' ') : 'Candidate Founder');
  const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

  return {
    id: `cand-${Date.now()}`,
    name: formattedName,
    email: cleanEmail || 'candidate@ai-startup.io',
    role: role || 'Startup Founder',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Candidate founder building innovative ventures and looking for co-founders.',
    location: location || '',
    skills: skills || ['Product Strategy', 'Management'],
    socials: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    },
    seekingCofounder: true,
    seekingInvestors: true,
    equityShare: '15-25%'
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('venture_ai_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePage, setActivePage] = useState('home'); // 'home', 'about', 'contact', 'profile', 'roadmap'
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGetIdeasModalOpen, setIsGetIdeasModalOpen] = useState(false);
  const [isMapMyIdeaModalOpen, setIsMapMyIdeaModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Selected idea & roadmap state
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [currentRoadmap, setCurrentRoadmap] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('venture_ai_user', JSON.stringify(user));
      saveAccount(user);
    } else {
      localStorage.removeItem('venture_ai_user');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const login = (email, password, extraDetails = {}) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    const accounts = getAccounts();
    let account = accounts[cleanEmail];

    if (!account) {
      const savedUserStr = localStorage.getItem('venture_ai_user');
      if (savedUserStr) {
        try {
          const savedUser = JSON.parse(savedUserStr);
          if (savedUser && savedUser.email && savedUser.email.toLowerCase().trim() === cleanEmail) {
            account = savedUser;
          }
        } catch (e) {}
      }
    }

    if (!account) {
      account = createNewProfile({
        email: cleanEmail,
        name: extraDetails.name,
        location: extraDetails.location,
        role: extraDetails.role
      });
    } else if (extraDetails.name || extraDetails.location || extraDetails.role) {
      account = {
        ...account,
        name: extraDetails.name || account.name,
        location: extraDetails.location || account.location,
        role: extraDetails.role || account.role
      };
    }

    setUser(account);
    saveAccount(account);
    DatabaseService.users.create({
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role
    });
    DatabaseService.audit_logs.log(account.id, 'USER_LOGIN', 'users');
    setIsAuthModalOpen(false);
    setActivePage('profile');
    showToast(`Welcome back, ${account.name}!`);
  };

  const loginDemoCandidate = () => {
    setUser(DEFAULT_PROFILE);
    saveAccount(DEFAULT_PROFILE);
    DatabaseService.users.create({
      id: DEFAULT_PROFILE.id,
      name: DEFAULT_PROFILE.name,
      email: DEFAULT_PROFILE.email,
      role: DEFAULT_PROFILE.role
    });
    DatabaseService.audit_logs.log(DEFAULT_PROFILE.id, 'DEMO_LOGIN', 'users');
    setIsAuthModalOpen(false);
    setActivePage('profile');
    showToast('Logged in as Demo Founder Profile!');
  };

  const register = (formData) => {
    const newUser = createNewProfile({
      email: formData.email,
      name: formData.name,
      location: formData.location,
      role: formData.role
    });
    setUser(newUser);
    saveAccount(newUser);
    DatabaseService.users.create({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
    DatabaseService.audit_logs.log(newUser.id, 'USER_REGISTERED', 'users');
    setIsAuthModalOpen(false);
    setActivePage('profile');
    showToast('Candidate profile created successfully!');
  };

  const logout = () => {
    if (user?.id) {
      DatabaseService.audit_logs.log(user.id, 'USER_LOGOUT', 'users');
    }
    setUser(null);
    setActivePage('home');
    showToast('Logged out successfully.', 'info');
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const newProfile = { ...prev, ...updatedFields };
      saveAccount(newProfile);
      if (newProfile.id) {
        DatabaseService.users.update(newProfile.id, updatedFields);
      }
      return newProfile;
    });
    showToast('Profile updated successfully!');
  };

  const selectIdeaAndGenerateRoadmap = (idea) => {
    setSelectedIdea(idea);
    const generated = buildCompleteRoadmap(idea);
    setCurrentRoadmap(generated);

    // Save records into DatabaseService tables
    const projId = `proj_${Date.now()}`;
    const userId = user ? user.id : 'guest';

    // Table 2: projects
    DatabaseService.projects.create({
      id: projId,
      user_id: userId,
      name: idea.title,
      industry: idea.domain || 'Technology',
      idea: idea.pitch
    });

    // Table 3: project_inputs
    DatabaseService.project_inputs.save({
      project_id: projId,
      target_market: idea.targetAudience || 'General Consumers',
      budget: idea.estimatedCost || '₹1,50,000',
      location: user?.location || 'India',
      goals: idea.tagline || 'Build MVP',
      constraints: 'Bootstrapped Timeline'
    });

    // Table 4: analyses
    DatabaseService.analyses.create({
      project_id: projId,
      module: 'Roadmap Generator',
      output: generated
    });

    // Table 7: financial_models
    DatabaseService.financial_models.save({
      project_id: projId,
      pricing: '₹499/month',
      costs: idea.estimatedCost,
      revenue_assumptions: '₹1,00,000 Monthly Revenue in Month 6',
      scenarios: 'Base Case: ₹50,000 MRR'
    });

    // Table 8: roadmaps
    DatabaseService.roadmaps.save({
      project_id: projId,
      phase: idea.timeline || 'Phase 1: MVP',
      feature: idea.title,
      priority: 'High',
      timeline: idea.timeline || '4 Months'
    });

    setIsGetIdeasModalOpen(false);
    setActivePage('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Complete Roadmap generated and stored for ${idea.title}!`);
  };

  const adminRegister = ({ name, email, password, adminPasscode }) => {
    if ((adminPasscode || '').trim() !== 'ADMIN123') {
      showToast('Invalid Master Passcode! Fixed registration passcode is "ADMIN123".', 'error');
      return false;
    }

    const cleanEmail = (email || '').toLowerCase().trim();
    const adminUser = {
      id: `admin_${Date.now()}`,
      name: name || 'System Administrator',
      email: cleanEmail,
      role: 'System Admin',
      isAdmin: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      location: 'Global Control Center',
      created_at: new Date().toISOString()
    };

    setUser(adminUser);
    saveAccount(adminUser);
    DatabaseService.users.create({
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    });
    DatabaseService.audit_logs.log(adminUser.id, 'ADMIN_REGISTERED', 'users');
    showToast(`Admin account registered! Welcome, ${adminUser.name}.`);
    return true;
  };

  const adminLogin = ({ email, password }) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    const accounts = getAccounts();
    let account = accounts[cleanEmail];

    if (!account) {
      const users = DatabaseService.users.getAll();
      account = users.find(u => u.email && u.email.toLowerCase().trim() === cleanEmail);
    }

    const adminUser = {
      ...(account || {}),
      id: account?.id || `admin_${Date.now()}`,
      name: account?.name || 'System Administrator',
      email: cleanEmail,
      role: 'System Admin',
      isAdmin: true,
      avatar: account?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    };

    setUser(adminUser);
    saveAccount(adminUser);
    DatabaseService.audit_logs.log(adminUser.id, 'ADMIN_LOGIN', 'users');
    showToast(`Authenticated as System Admin (${adminUser.name})!`);
    return true;
  };

  const generateRoadmapForCustomIdea = (customIdea) => {
    const generated = buildCompleteRoadmap(customIdea);
    setSelectedIdea(customIdea);
    setCurrentRoadmap(generated);

    // Save to DatabaseService tables
    const projId = `proj_${Date.now()}`;
    const userId = user ? user.id : 'guest';

    DatabaseService.projects.create({
      id: projId,
      user_id: userId,
      name: customIdea.title,
      industry: customIdea.domain || 'Technology',
      idea: customIdea.pitch
    });

    DatabaseService.project_inputs.save({
      project_id: projId,
      target_market: customIdea.targetAudience || 'General Customers',
      budget: customIdea.estimatedCost || '₹50,000',
      location: user?.location || 'India',
      goals: customIdea.tagline || 'Build MVP',
      constraints: 'Custom Founder Timeline'
    });

    DatabaseService.analyses.create({
      project_id: projId,
      module: 'Map My Idea Roadmap Generator',
      output: generated
    });

    DatabaseService.financial_models.save({
      project_id: projId,
      pricing: '₹499/month',
      costs: customIdea.estimatedCost,
      revenue_assumptions: '₹1,00,000 Monthly Revenue in Month 6',
      scenarios: 'Base Case: ₹50,000 MRR'
    });

    DatabaseService.roadmaps.save({
      project_id: projId,
      phase: customIdea.timeline || 'Phase 1: MVP Validation',
      feature: customIdea.title,
      priority: 'High',
      timeline: customIdea.timeline || '1 Month'
    });

    setIsMapMyIdeaModalOpen(false);
    setActivePage('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Complete End-to-End Roadmap generated for "${customIdea.title}"!`);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginDemoCandidate,
      register,
      logout,
      updateProfile,
      activePage,
      setActivePage,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isGetIdeasModalOpen,
      setIsGetIdeasModalOpen,
      isMapMyIdeaModalOpen,
      setIsMapMyIdeaModalOpen,
      selectedIdea,
      currentRoadmap,
      selectIdeaAndGenerateRoadmap,
      generateRoadmapForCustomIdea,
      adminLogin,
      adminRegister,
      showToast,
      toastMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
