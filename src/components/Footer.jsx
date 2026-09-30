import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Rocket, Send, Heart, Sparkles } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';

export default function Footer() {
  const { setActivePage, showToast } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to AI Startup Weekly!');
      setEmail('');
    }
  };

  return (
    <footer style={{
      background: '#040609',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '4rem 1.5rem 2rem',
      marginTop: 'auto',
      color: 'var(--text-muted)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {/* Col 1: Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Rocket size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>
                Venture<span className="gradient-text">Forge AI</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              The all-in-one AI co-pilot for tech founders and candidates. Validate ideas, craft pitch decks, and find co-founders in minutes.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem' }}>
                <GithubIcon size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem' }}>
                <TwitterIcon size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem' }}>
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Platform Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><button onClick={() => setActivePage('home')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Home Page</button></li>
              <li><button onClick={() => setActivePage('about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>About Us</button></li>
              <li><button onClick={() => setActivePage('contact')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Contact Us & FAQ</button></li>
              <li><button onClick={() => setActivePage('profile')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Candidate Profile Editor</button></li>
            </ul>
          </div>

          {/* Col 3: AI Tools */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>AI Startup Suite</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#8b5cf6" /> AI Pitch Generator
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#8b5cf6" /> Business Model Canvas
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#8b5cf6" /> Co-founder AI Matcher
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={14} color="#8b5cf6" /> Financial Runway Forecast
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>Stay Informed</h4>
            <p style={{ fontSize: '0.88rem', marginBottom: '1rem' }}>
              Get weekly AI startup insights, venture funding trends, and founder opportunities.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
              <input 
                type="email" 
                placeholder="founder@startup.io" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            © {new Date().getFullYear()} VentureForge AI Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} color="#ec4899" fill="#ec4899" /> for visionary candidates & startup founders.
          </div>
        </div>
      </div>
    </footer>
  );
}
