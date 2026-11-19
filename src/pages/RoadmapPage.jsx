import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Compass, 
  Sparkles, 
  Coins, 
  ShieldAlert, 
  Calendar, 
  CheckCircle2,
  Palette
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoadmapPage() {
  const { currentRoadmap, setIsGetIdeasModalOpen, showToast, setIsBrandLogoModalOpen, setActivePage } = useAuth();
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'budget' | 'risks'

  if (!currentRoadmap) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem', maxWidth: '640px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <Compass size={54} color="#4f46e5" style={{ margin: '0 auto 1.25rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 800 }}>No Startup Roadmap Selected</h2>
          <p style={{ color: '#475569', marginBottom: '2rem', lineHeight: 1.6 }}>
            Please use our 10-step "Get Ideas" wizard to select a business idea and generate your complete startup roadmap.
          </p>
          <button onClick={() => setIsGetIdeasModalOpen(true)} className="btn btn-primary btn-lg">
            <Sparkles size={18} /> Take 10-Step Idea Wizard
          </button>
        </div>
      </div>
    );
  }



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Roadmap Title Header Banner (Clean Light Theme) */}
      <div className="glass-card" style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '24px',
        padding: '2rem 2.25rem',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span className="badge-pill-emerald" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                <Compass size={14} /> Complete Startup Roadmap
              </span>
              <span className="badge-pill" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                {currentRoadmap.domain}
              </span>
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
              {currentRoadmap.ideaTitle}
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4f46e5', fontWeight: 700 }}>
              "{currentRoadmap.tagline}"
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={() => setIsBrandLogoModalOpen(true)} className="btn btn-secondary btn-sm"
              style={{ borderColor: '#7c3aed', color: '#7c3aed', background: 'rgba(124,58,237,0.06)' }}
            >
              <Palette size={14} /> Create Brand Logo
            </button>
            <button onClick={() => setIsGetIdeasModalOpen(true)} className="btn btn-secondary btn-sm">
              <Sparkles size={14} /> Change Idea
            </button>
          </div>
        </div>

        {/* High-Contrast Elevator Pitch */}
        <p style={{ fontSize: '1rem', color: '#334155', lineHeight: 1.65, marginBottom: '1.75rem', maxWidth: '900px', fontWeight: 500 }}>
          {currentRoadmap.elevatorPitch}
        </p>

        {/* Quick Summary Badges */}
        <div className="grid-4" style={{ gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Budget</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>{currentRoadmap.totalEstimatedBudget}</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Time To MVP</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4f46e5', marginTop: '0.2rem' }}>{currentRoadmap.timeToMVP}</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Risk Rating</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#d97706', marginTop: '0.4rem' }}>{currentRoadmap.overallRiskRating}</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Target Audience</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginTop: '0.3rem' }}>{currentRoadmap.targetAudience}</div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        background: '#f1f5f9',
        padding: '0.5rem',
        borderRadius: '16px',
        border: '1px solid #cbd5e1'
      }}>
        <button
          onClick={() => setActiveTab('timeline')}
          className="btn"
          style={{
            flex: 1,
            background: activeTab === 'timeline' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'timeline' ? '#ffffff' : '#475569',
            fontWeight: 700
          }}
        >
          <Calendar size={16} /> 1. Execution Timeline & Milestones
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className="btn"
          style={{
            flex: 1,
            background: activeTab === 'budget' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'budget' ? '#ffffff' : '#475569',
            fontWeight: 700
          }}
        >
          <Coins size={16} /> 2. Budget Estimation Breakdown
        </button>

        <button
          onClick={() => setActiveTab('risks')}
          className="btn"
          style={{
            flex: 1,
            background: activeTab === 'risks' ? 'var(--primary-gradient)' : 'transparent',
            color: activeTab === 'risks' ? '#ffffff' : '#475569',
            fontWeight: 700
          }}
        >
          <ShieldAlert size={16} /> 3. Risk Analysis & Mitigation
        </button>

        <button
          id="tab-brand-logo-roadmap"
          onClick={() => setActiveTab('logo')}
          className="btn"
          style={{
            flex: 1,
            background: activeTab === 'logo' ? 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)' : 'transparent',
            color: activeTab === 'logo' ? '#ffffff' : '#7c3aed',
            fontWeight: 700,
            border: activeTab === 'logo' ? 'none' : '1px solid rgba(124,58,237,0.25)'
          }}
        >
          <Palette size={16} /> 4. Create Brand Logo ✨
        </button>
      </div>

      {/* TAB 1: Execution Timeline & Milestones */}
      {activeTab === 'timeline' && (
        <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800 }}>Phase-by-Phase Roadmap Timeline</h2>
              <p style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 500 }}>Actionable milestones from initial validation to launch</p>
            </div>
            <span className="badge-pill-emerald">4 Phases • Month 1 to Month 12</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentRoadmap.phases.map((phase, idx) => (
              <div key={idx} style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: '1.5rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.5rem'
              }}>
                {/* Left Phase Badge */}
                <div style={{
                  borderRight: '1px solid #e2e8f0',
                  paddingRight: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '0.78rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase' }}>
                    Phase {phase.phaseNumber}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', margin: '0.2rem 0', fontWeight: 800 }}>
                    {phase.duration}
                  </h3>
                  <span className="badge-pill" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', marginTop: '0.4rem', alignSelf: 'flex-start' }}>
                    Est: {phase.estimatedCost}
                  </span>
                </div>

                {/* Right Milestones */}
                <div>
                  <h4 style={{ fontSize: '1.2rem', color: '#059669', marginBottom: '0.3rem', fontWeight: 800 }}>
                    {phase.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', fontStyle: 'italic', fontWeight: 500 }}>
                    "{phase.objective}"
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {phase.keyMilestones.map((ms, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#0f172a', fontWeight: 600 }}>
                        <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0 }} />
                        <span>{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Budget Estimation Breakdown */}
      {activeTab === 'budget' && (
        <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800 }}>Itemized Budget Estimation</h2>
              <p style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 500 }}>Capital allocation breakdown for launching {currentRoadmap.ideaTitle}</p>
            </div>

            <div style={{ background: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.25)', padding: '0.6rem 1.25rem', borderRadius: '12px', color: '#047857', fontWeight: 800 }}>
              Total Capital Needed: {currentRoadmap.totalEstimatedBudget}
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Cost Category</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Estimated Cost</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Budget Share</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Description & Purpose</th>
                </tr>
              </thead>
              <tbody>
                {currentRoadmap.budgetBreakdown.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#0f172a' }}>{item.category}</td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: '#059669' }}>{item.amount}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge-pill" style={{ fontSize: '0.78rem', fontWeight: 700 }}>{item.percentage}</span>
                    </td>
                    <td style={{ padding: '1rem', color: '#334155', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual Progress Stack */}
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 800, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              Capital Allocation Visual Distribution
            </div>
            <div style={{ display: 'flex', height: '14px', borderRadius: '8px', overflow: 'hidden', gap: '3px' }}>
              {currentRoadmap.budgetBreakdown.map((item, idx) => {
                const colors = ['#4f46e5', '#059669', '#0284c7', '#db2777', '#d97706'];
                return (
                  <div 
                    key={idx} 
                    style={{ width: item.percentage, background: colors[idx % colors.length] }} 
                    title={`${item.category}: ${item.amount} (${item.percentage})`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Risk Analysis & Mitigation Matrix */}
      {activeTab === 'risks' && (
        <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: 800 }}>Comprehensive Risk Analysis Matrix</h2>
            <p style={{ fontSize: '0.88rem', color: '#475569', fontWeight: 500 }}>Identified risks and proactive mitigation strategies for {currentRoadmap.ideaTitle}</p>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            {currentRoadmap.riskAnalysis.map((risk, idx) => {
              const isHigh = risk.level === 'High';
              const isMedium = risk.level === 'Medium';
              return (
                <div key={idx} style={{
                  background: isHigh ? '#fff5f5' : '#f8fafc',
                  border: isHigh ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase' }}>
                        {risk.riskType}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        fontWeight: 800,
                        background: isHigh ? 'rgba(225, 29, 72, 0.1)' : isMedium ? 'rgba(217, 119, 6, 0.1)' : 'rgba(5, 150, 105, 0.1)',
                        color: isHigh ? '#e11d48' : isMedium ? '#b45309' : '#047857',
                        border: isHigh ? '1px solid rgba(225, 29, 72, 0.3)' : '1px solid rgba(5, 150, 105, 0.3)'
                      }}>
                        {risk.level} Severity
                      </span>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: '#0f172a', lineHeight: 1.5, marginBottom: '1.25rem', fontWeight: 600 }}>
                      {risk.description}
                    </p>
                  </div>

                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #bbf7d0',
                    borderRadius: '14px',
                    padding: '0.9rem 1.1rem'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={14} color="#059669" /> Mitigation Strategy
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, fontWeight: 500 }}>
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Brand Logo */}
      {activeTab === 'logo' && (
        <div className="glass-card" style={{ padding: '2.5rem 2rem', background: '#ffffff', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 8px 25px rgba(124,58,237,0.3)'
          }}>
            <Palette size={36} color="#fff" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Create Your Brand Logo
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 0.75rem', lineHeight: 1.6 }}>
            Your roadmap is ready — now make your brand unforgettable. Generate a professional logo for <strong>{currentRoadmap.ideaTitle}</strong> using AI or design your own with the interactive editor.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1.5rem 0' }}>
            {['5 AI Logo Concepts', 'DIY Logo Editor', '30+ Icons', '12 Color Palettes', 'PNG & SVG Download'].map(tag => (
              <span key={tag} style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '99px', padding: '0.3rem 0.85rem', fontSize: '0.82rem', color: '#7c3aed', fontWeight: 700 }}>
                ✓ {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              id="btn-open-logo-studio"
              onClick={() => { setIsBrandLogoModalOpen(true); }}
              className="btn btn-primary btn-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)', boxShadow: '0 6px 20px rgba(124,58,237,0.35)' }}
            >
              <Palette size={20} /> Open Brand Logo Studio
            </button>
            <button
              onClick={() => { sessionStorage.setItem('logoInitMode', 'ai'); setActivePage('logo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-secondary btn-lg"
              style={{ borderColor: '#7c3aed', color: '#7c3aed' }}
            >
              <Sparkles size={18} /> AI Generate Directly
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
