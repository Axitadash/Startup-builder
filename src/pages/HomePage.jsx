import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Rocket, 
  ArrowRight, 
  Zap, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Bot, 
  BrainCircuit, 
  CheckCircle2, 
  Building2, 
  FileCode,
  Lightbulb,
  Check,
  MapPin
} from 'lucide-react';

export default function HomePage() {
  const { setIsAuthModalOpen, user, setActivePage, loginDemoCandidate, setIsGetIdeasModalOpen, setIsMapMyIdeaModalOpen } = useAuth();
  
  // Interactive Live AI Generator State (Simple & Understandable)
  const [prompt, setPrompt] = useState('AI tool that helps local bakery owners post daily recipes on WhatsApp');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState({
    name: 'BakeConnect AI',
    tagline: 'Simple WhatsApp ordering & recipe updates for local bakeries',
    elevatorPitch: 'BakeConnect sends automated daily special menus and fresh bread updates to local customers over WhatsApp, making it easy for bakeries to double their daily sales.',
    revenueModel: 'Simple monthly subscription (₹499/month per bakery)',
    targetMarket: 'Local Bakeries, Home Bakers, & Artisan Pastry Shops'
  });

  const presetIdeas = [
    { label: '🥐 Bakery WhatsApp Bot', query: 'AI tool that helps local bakery owners post daily recipes on WhatsApp' },
    { label: '✍️ Social Media Post Writer', query: 'Simple tool for small shops to write Instagram captions in 1 minute' },
    { label: '🏋️ Home Workout Coach App', query: 'Personalized beginner workout and macro meal planner app' }
  ];

  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      const cleaned = prompt.trim() || 'Small Business AI Tool';
      const words = cleaned.split(' ');
      const mainWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      
      setGeneratedResult({
        name: `${mainWord}Ease AI`,
        tagline: `Smart & simple helper for ${cleaned}`,
        elevatorPitch: `An easy-to-use digital helper designed for ${cleaned}, helping you save 10 hours every week and win more local customers without complex technical setup.`,
        revenueModel: 'Low monthly plan starting at ₹499/month or ₹49 per task',
        targetMarket: 'Small business owners, freelancers, and independent creators'
      });
      setIsGenerating(false);
    }, 1000);
  };

  const applyPreset = (presetQuery) => {
    setPrompt(presetQuery);
    setIsGenerating(true);
    setTimeout(() => {
      if (presetQuery.includes('bakery')) {
        setGeneratedResult({
          name: 'BakeConnect AI',
          tagline: 'Simple WhatsApp ordering & recipe updates for local bakeries',
          elevatorPitch: 'BakeConnect sends automated daily special menus and fresh bread updates to local customers over WhatsApp, making it easy for bakeries to double their daily sales.',
          revenueModel: 'Simple monthly subscription (₹499/month per bakery)',
          targetMarket: 'Local Bakeries, Home Bakers, & Artisan Pastry Shops'
        });
      } else if (presetQuery.includes('Social Media')) {
        setGeneratedResult({
          name: 'PostCraft Studio',
          tagline: 'Instant social media captions & graphics for local shops',
          elevatorPitch: 'PostCraft automatically creates ready-to-post photo captions and promotional offers for clothing stores and cafes in under 60 seconds.',
          revenueModel: '₹299/month starter pack or ₹999/month unlimited',
          targetMarket: 'Boutique shops, cafes, salon owners, & Instagram sellers'
        });
      } else {
        setGeneratedResult({
          name: 'FitPulse Daily',
          tagline: 'Beginner-friendly home fitness & meal tracking coach',
          elevatorPitch: 'FitPulse guides workout beginners with simple 15-minute home exercises and easy weekly meal plans based on foods available in Indian kitchens.',
          revenueModel: '₹199/month personal plan with 7-day free trial',
          targetMarket: 'Busy office workers, students, & workout beginners'
        });
      }
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="home-page" style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', paddingTop: '2.5rem', position: 'relative' }}>
        <div className="badge-pill" style={{ marginBottom: '1.25rem', cursor: 'pointer' }} onClick={() => setIsGetIdeasModalOpen(true)}>
          <Sparkles size={14} color="#6366f1" />
          <span>Click 'Get Ideas' for 5 Simple Business Options Tailored to You</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.18,
          maxWidth: '960px',
          margin: '0 auto 1.5rem',
          color: '#0f172a'
        }}>
          Turn Simple Ideas into <span className="gradient-text">Successful Businesses</span> in Minutes.
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-muted)',
          maxWidth: '720px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.65
        }}>
          Answer 10 easy questions, discover beginner-friendly business ideas, get complete step-by-step guides, and build your pitch deck—all in simple, plain language.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setIsGetIdeasModalOpen(true)} 
            className="btn btn-primary btn-lg"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #4f46e5 100%)',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.35)'
            }}
          >
            <Lightbulb size={20} color="#fef08a" fill="#fef08a" />
            Get Ideas Wizard
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={() => setIsMapMyIdeaModalOpen(true)} 
            className="btn btn-primary btn-lg"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
              boxShadow: '0 4px 20px rgba(5, 150, 105, 0.35)'
            }}
          >
            <MapPin size={20} color="#ffffff" />
            Map My Business Idea
            <ArrowRight size={18} />
          </button>
          
          {user ? (
            <button 
              onClick={() => setActivePage('profile')} 
              className="btn btn-secondary btn-lg"
            >
              <Users size={20} color="#4f46e5" />
              Edit My Profile
            </button>
          ) : (
            <button 
              onClick={loginDemoCandidate} 
              className="btn btn-secondary btn-lg"
            >
              <ShieldCheck size={20} color="#059669" />
              Explore Demo Founder Profile
            </button>
          )}
        </div>
      </section>

      {/* Interactive AI Prompt Simulator Card (Light Theme & Simple Language) */}
      <section style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <div className="glass-card" style={{
          background: '#ffffff',
          borderColor: 'rgba(99, 102, 241, 0.25)',
          boxShadow: '0 10px 35px rgba(15, 23, 42, 0.08), 0 0 20px rgba(99, 102, 241, 0.08)',
          borderRadius: '24px',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <BrainCircuit size={24} color="#4f46e5" />
              <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0f172a' }}>
                Live AI Business Generator
              </span>
            </div>
            <span className="badge-pill-emerald" style={{ fontSize: '0.8rem' }}>Instant Live Simulation</span>
          </div>

          <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Online skincare tips, organic food delivery, home workout app..."
              className="form-input"
              style={{ 
                flex: 1, 
                minWidth: '280px', 
                fontSize: '0.98rem', 
                padding: '0.9rem 1.25rem',
                borderColor: '#cbd5e1',
                color: '#0f172a',
                background: '#f8fafc'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isGenerating}
              style={{ minWidth: '160px' }}
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Sparkles size={18} /> Generate Plan
                </>
              )}
            </button>
          </form>

          {/* Quick Presets */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', fontWeight: 600 }}>Try an example:</span>
            {presetIdeas.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p.query)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '20px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.8rem',
                  color: '#334155',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Generated Result Box */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', color: '#059669', fontWeight: 800 }}>{generatedResult.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>"{generatedResult.tagline}"</p>
              </div>
              <span className="badge-pill" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4338ca' }}>
                AI Success Score: 98/100
              </span>
            </div>

            <div style={{ height: '1px', background: '#e2e8f0' }}></div>

            <div className="grid-2">
              <div>
                <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                  💡 Business Summary
                </div>
                <p style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.55 }}>
                  {generatedResult.elevatorPitch}
                </p>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>
                  💵 How You Make Money
                </div>
                <p style={{ fontSize: '0.92rem', color: '#1e293b', lineHeight: 1.55 }}>
                  {generatedResult.revenueModel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Core Features Section */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: '#0f172a' }}>
            Built to Help You <span className="gradient-text">Start & Grow</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
            Simple tools designed to take you from a basic idea to a real working business.
          </p>
        </div>

        <div className="grid-3">
          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Lightbulb size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>1. Smart Business Finder</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Answer 10 quick questions to get 5 personalized business options picked just for your skills, time, and budget.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Bot size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>2. Step-by-Step Action Plan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Get a clear 12-month guide showing exactly what to do each month, how much it costs in Rupees (₹), and how to avoid risks.
            </p>
          </div>

          <div className="glass-card">
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(236, 72, 153, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <TrendingUp size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>3. Easy Pitch Deck Builder</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Create clean 10-slide presentations and business summaries ready to show friends, clients, or partners.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner (Clean Light Theme) */}
      <section style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
      }}>
        <div className="grid-4">
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#4f46e5' }}>
              ₹25 Lakhs+
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem', fontWeight: 600 }}>
              Capital Built by Founders
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#059669' }}>
              1,200+
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem', fontWeight: 600 }}>
              Simple Business Ideas Created
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#7c3aed' }}>
              98.4%
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem', fontWeight: 600 }}>
              User Satisfaction Rate
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#db2777' }}>
              ₹0
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem', fontWeight: 600 }}>
              Starting Capital Gigs Available
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner (Light Theme Friendly) */}
      <section style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
        borderRadius: '24px',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        boxShadow: '0 15px 35px rgba(79, 70, 229, 0.3)'
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
          Ready to Find a Simple Business Idea That Fits You?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.92)', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Take our quick 10-step questionnaire to discover 5 beginner-friendly business options with complete action plans in Rupees (₹).
        </p>
        <button 
          onClick={() => setIsGetIdeasModalOpen(true)}
          className="btn" 
          style={{
            background: '#ffffff',
            color: '#4f46e5',
            fontSize: '1.05rem',
            padding: '0.95rem 2.25rem',
            borderRadius: '14px',
            fontWeight: 800,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Lightbulb size={20} color="#eab308" fill="#eab308" />
          Get Ideas & View Roadmap
          <ArrowRight size={20} />
        </button>
      </section>

    </div>
  );
}
