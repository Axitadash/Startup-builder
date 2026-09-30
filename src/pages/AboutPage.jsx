import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Rocket, 
  Target, 
  Lightbulb, 
  Cpu, 
  ShieldCheck, 
  Users, 
  Globe2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const { setActivePage, setIsAuthModalOpen, user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '1rem 0' }}>
      
      {/* Header Banner */}
      <section style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
        <div className="badge-pill" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} color="#4f46e5" />
          <span>Making Business Creation Simple</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1.25rem', color: '#0f172a' }}>
          Empowering Everyone to Become a <span className="gradient-text">Successful Founder</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: '1.7', fontWeight: 500 }}>
          VentureForge AI was created to help ambitious candidates and creators turn simple ideas into real working businesses without needing months of research or complex technical jargon.
        </p>
      </section>

      {/* Mission & Vision Grid */}
      <section className="grid-2">
        <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Target size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 800 }}>Our Mission</h2>
          <p style={{ color: '#334155', lineHeight: '1.65', fontSize: '0.95rem' }}>
            To simplify business creation by providing clear 10-step questionnaires, tailored startup recommendations, accurate budget breakdowns in Rupees (₹), and step-by-step roadmaps.
          </p>
        </div>

        <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <Lightbulb size={24} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 800 }}>Our Vision</h2>
          <p style={{ color: '#334155', lineHeight: '1.65', fontSize: '0.95rem' }}>
            A world where anyone with an idea—whether a student, professional, or first-time entrepreneur—can easily launch a business that fits their skills, time, and budget.
          </p>
        </div>
      </section>



      {/* Core Values */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 800 }}>Our Core Principles</h2>
        </div>

        <div className="grid-3">
          <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
            <h3 style={{ color: '#059669', marginBottom: '0.5rem', fontWeight: 800 }}>Simple & Transparent</h3>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
              No jargon or hidden complexity. Everything is explained clearly so anyone can follow along step by step.
            </p>
          </div>
          <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
            <h3 style={{ color: '#4f46e5', marginBottom: '0.5rem', fontWeight: 800 }}>Speed & Clarity</h3>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
              Instant AI tools save candidate founders hundreds of hours of manual research and financial planning.
            </p>
          </div>
          <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
            <h3 style={{ color: '#db2777', marginBottom: '0.5rem', fontWeight: 800 }}>Founder First</h3>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
              You maintain 100% ownership over your profile, ideas, and execution roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button 
          onClick={user ? () => setActivePage('profile') : () => setIsAuthModalOpen(true)}
          className="btn btn-primary btn-lg"
        >
          {user ? 'Edit My Founder Profile' : 'Join VentureForge AI Free'}
          <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}
