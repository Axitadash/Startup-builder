import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Rocket, Sparkles, User, LogOut, Menu, X, Shield, Lightbulb, Compass, Database, MapPin } from 'lucide-react';

export default function Navbar() {
  const { 
    user, 
    logout, 
    activePage, 
    setActivePage, 
    setIsAuthModalOpen, 
    loginDemoCandidate,
    setIsGetIdeasModalOpen,
    setIsMapMyIdeaModalOpen,
    currentRoadmap
  } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
      boxShadow: '0 2px 12px rgba(15, 23, 42, 0.03)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)'
          }}>
            <Rocket size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#0f172a'
            }}>
              Venture<span className="gradient-text">Forge AI</span>
              <span className="badge-pill" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>
                <Sparkles size={10} /> 3.0
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              AI Startup & Roadmap Engine
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }} className="desktop-nav">
          <button 
            className={`btn`}
            onClick={() => handleNavClick('home')}
            style={{
              background: activePage === 'home' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              color: activePage === 'home' ? '#4f46e5' : 'var(--text-muted)',
              border: activePage === 'home' ? '1px solid rgba(79, 70, 229, 0.25)' : '1px solid transparent',
              fontWeight: activePage === 'home' ? 700 : 600
            }}
          >
            Home
          </button>
          <button 
            className={`btn`}
            onClick={() => handleNavClick('about')}
            style={{
              background: activePage === 'about' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              color: activePage === 'about' ? '#4f46e5' : 'var(--text-muted)',
              border: activePage === 'about' ? '1px solid rgba(79, 70, 229, 0.25)' : '1px solid transparent',
              fontWeight: activePage === 'about' ? 700 : 600
            }}
          >
            About Us
          </button>
          <button 
            className={`btn`}
            onClick={() => handleNavClick('contact')}
            style={{
              background: activePage === 'contact' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              color: activePage === 'contact' ? '#4f46e5' : 'var(--text-muted)',
              border: activePage === 'contact' ? '1px solid rgba(79, 70, 229, 0.25)' : '1px solid transparent',
              fontWeight: activePage === 'contact' ? 700 : 600
            }}
          >
            Contact Us
          </button>
          <button 
            className={`btn`}
            onClick={() => handleNavClick('admin')}
            style={{
              background: activePage === 'admin' ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
              color: activePage === 'admin' ? '#4f46e5' : 'var(--text-muted)',
              border: activePage === 'admin' ? '1px solid rgba(79, 70, 229, 0.25)' : '1px solid transparent',
              fontWeight: activePage === 'admin' ? 700 : 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Database size={15} color="#4f46e5" />
            <span>Admin DB</span>
          </button>

          {currentRoadmap && (
            <button 
              className={`btn`}
              onClick={() => handleNavClick('roadmap')}
              style={{
                background: activePage === 'roadmap' ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
                color: activePage === 'roadmap' ? '#db2777' : 'var(--text-muted)',
                border: activePage === 'roadmap' ? '1px solid rgba(236, 72, 153, 0.25)' : '1px solid transparent',
                fontWeight: activePage === 'roadmap' ? 700 : 600
              }}
            >
              <Compass size={15} /> My Startup Roadmap
            </button>
          )}
        </nav>

        {/* Right-Side Action Controls: "GET IDEAS" Button & User Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* MAP MY IDEA Button */}
          <button 
            onClick={() => setIsMapMyIdeaModalOpen(true)}
            className="btn"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.25)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <MapPin size={17} color="#ffffff" />
            <span>Map My Idea</span>
          </button>

          {/* Prominent GET IDEAS Right-Side Button */}
          <button 
            onClick={() => setIsGetIdeasModalOpen(true)}
            className="btn"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #4f46e5 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.92rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Lightbulb size={18} color="#fef08a" fill="#fef08a" />
            <span>Get Ideas</span>
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => handleNavClick('profile')}
                className="btn btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderColor: activePage === 'profile' ? '#6366f1' : '#e2e8f0',
                  background: activePage === 'profile' ? 'rgba(99, 102, 241, 0.08)' : '#ffffff',
                  padding: '0.45rem 0.85rem'
                }}
              >
                <img 
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'} 
                  alt={user.name} 
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1.5px solid #6366f1'
                  }}
                />
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                  {user.name.split(' ')[0]}
                </span>
              </button>

              <button 
                onClick={logout} 
                className="btn btn-secondary btn-sm"
                title="Logout"
                style={{ color: '#ef4444', padding: '0.55rem' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.55rem 0.95rem' }}
            >
              <User size={15} /> Sign In
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'none',
              padding: '0.4rem'
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1rem 1.5rem 1.5rem',
          background: '#ffffff',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button 
            className="btn" 
            onClick={() => { setIsGetIdeasModalOpen(true); setMobileMenuOpen(false); }}
            style={{ background: 'var(--primary-gradient)', color: '#fff' }}
          >
            <Lightbulb size={18} color="#fef08a" /> Get Ideas & Roadmap
          </button>
          <button className="btn btn-secondary" onClick={() => handleNavClick('home')}>Home</button>
          <button className="btn btn-secondary" onClick={() => handleNavClick('about')}>About Us</button>
          <button className="btn btn-secondary" onClick={() => handleNavClick('contact')}>Contact Us</button>
          {currentRoadmap && (
            <button className="btn btn-secondary" onClick={() => handleNavClick('roadmap')}>
              <Compass size={16} /> Complete Startup Roadmap
            </button>
          )}
          {user ? (
            <>
              <button className="btn btn-secondary" onClick={() => handleNavClick('profile')}>
                <User size={16} /> Profile Editor ({user.name})
              </button>
              <button className="btn btn-secondary" onClick={logout} style={{ color: '#ef4444' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <button className="btn btn-secondary" onClick={() => { setIsAuthModalOpen(true); setMobileMenuOpen(false); }}>
              <User size={16} /> Login / Sign Up
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
