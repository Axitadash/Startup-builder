import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, Palette, Wand2, PenTool, Lightbulb } from 'lucide-react';

export default function BrandLogoModal() {
  const {
    isBrandLogoModalOpen,
    setIsBrandLogoModalOpen,
    setActivePage,
    selectedIdea,
    user
  } = useAuth();

  if (!isBrandLogoModalOpen) return null;

  const startupName = selectedIdea?.title || user?.startupName || 'Your Brand';
  const industry = selectedIdea?.domain || 'Technology';

  const handleSelectMode = (mode) => {
    setIsBrandLogoModalOpen(false);
    setActivePage('logo');
    // Store mode in sessionStorage so BrandLogoPage picks it up
    sessionStorage.setItem('logoInitMode', mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsBrandLogoModalOpen(false)}>
      <div
        className="modal-content"
        style={{ maxWidth: '580px', padding: '0', overflow: 'hidden', borderRadius: '24px' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
          padding: '2rem 2rem 1.5rem',
          position: 'relative'
        }}>
          <button
            onClick={() => setIsBrandLogoModalOpen(false)}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: '34px', height: '34px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Palette size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
                Create Your Brand Logo
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: 0, marginTop: '0.2rem' }}>
                AI-powered branding studio for <strong>{startupName}</strong>
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.15)', borderRadius: '10px',
            padding: '0.6rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <Lightbulb size={14} color="#fef08a" fill="#fef08a" />
            <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>
              Industry detected: {industry} · No design skills needed
            </span>
          </div>
        </div>

        {/* Mode Selection */}
        <div style={{ padding: '1.75rem 2rem 2rem' }}>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.25rem', fontWeight: 500 }}>
            Choose how you'd like to create your logo:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* AI Generate Mode */}
            <button
              id="logo-mode-ai"
              onClick={() => handleSelectMode('ai')}
              style={{
                background: '#fff',
                border: '2px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.4rem 1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '54px', height: '54px', borderRadius: '16px', flexShrink: 0,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)'
              }}>
                <Wand2 size={26} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  🎨 AI-Generated Logo Designs
                </div>
                <div style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Instantly get <strong>5 unique logo concepts</strong> tailored to your startup — different styles, colours, icons, and typography. Preview, compare & download.
                </div>
                <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Minimalist', 'Modern', 'Luxury', 'Corporate', 'Creative'].map(s => (
                    <span key={s} style={{
                      fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '99px',
                      background: 'rgba(79, 70, 229, 0.08)', color: '#4338ca',
                      border: '1px solid rgba(79, 70, 229, 0.2)', fontWeight: 600
                    }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ color: '#6366f1', fontSize: '1.3rem' }}>→</div>
            </button>

            {/* DIY Designer Mode */}
            <button
              id="logo-mode-diy"
              onClick={() => handleSelectMode('diy')}
              style={{
                background: '#fff',
                border: '2px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.4rem 1.5rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '54px', height: '54px', borderRadius: '16px', flexShrink: 0,
                background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
              }}>
                <PenTool size={26} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                  ✏️ DIY Logo Designer
                </div>
                <div style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Build your own logo from scratch with our <strong>interactive visual editor</strong>. Choose fonts, icons, colours, layouts — with real-time live preview.
                </div>
                <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Custom Fonts', 'Color Palettes', '40+ Icons', 'Live Preview'].map(s => (
                    <span key={s} style={{
                      fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '99px',
                      background: 'rgba(5, 150, 105, 0.08)', color: '#047857',
                      border: '1px solid rgba(5, 150, 105, 0.2)', fontWeight: 600
                    }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ color: '#059669', fontSize: '1.3rem' }}>→</div>
            </button>
          </div>

          {/* Smart AI Note */}
          <div style={{
            marginTop: '1.25rem', background: 'rgba(79, 70, 229, 0.04)',
            border: '1px solid rgba(79, 70, 229, 0.15)', borderRadius: '12px',
            padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem'
          }}>
            <Sparkles size={16} color="#6366f1" />
            <span style={{ fontSize: '0.82rem', color: '#4338ca', fontWeight: 600 }}>
              Smart AI suggestions included — colours, icons & fonts auto-matched to your industry
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
