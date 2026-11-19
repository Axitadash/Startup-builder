import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, MapPin, Rocket, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, loginDemoCandidate } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('Technical Founder');
  const [startupName, setStartupName] = useState('');

  // Reset form fields every time the modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setLocation('');
      setRole('Technical Founder');
      setStartupName('');
      setTab('login');
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 'login') {
      login(email, password);
    } else {
      register({ email, password, name, location, role, startupName });
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)'
          }}>
            <Rocket size={24} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem', color: '#0f172a' }}>
            {tab === 'login' ? 'Candidate Sign In' : 'Create Founder Profile'}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#475569' }}>
            {tab === 'login' ? 'Welcome back! Sign in to edit your profile.' : 'Create your founder profile with your location and skills.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: '#f1f5f9',
          padding: '4px',
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setTab('login')}
            style={{
              padding: '0.6rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: tab === 'login' ? 'var(--primary-gradient)' : 'transparent',
              color: tab === 'login' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              padding: '0.6rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: tab === 'register' ? 'var(--primary-gradient)' : 'transparent',
              color: tab === 'register' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s ease'
            }}
          >
            Register Profile
          </button>
        </div>

        {/* Fast Demo Access Button (Login Tab Only) */}
        {tab === 'login' && (
          <div style={{ marginBottom: '1.25rem' }}>
            <button 
              type="button" 
              onClick={loginDemoCandidate}
              className="btn btn-secondary"
              style={{
                width: '100%',
                borderColor: '#059669',
                background: 'rgba(5, 150, 105, 0.08)',
                color: '#047857',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontWeight: 700
              }}
            >
              <ShieldCheck size={18} color="#059669" />
              Instant Demo Candidate Login
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.25rem 0',
              color: '#64748b',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
              <span style={{ padding: '0 0.75rem' }}>OR WITH EMAIL</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            </div>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {tab === 'register' && (
            <>
              <div className="form-group">
                <label className="form-label">Candidate Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    placeholder="Alex Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              {/* Location Input Field during registration */}
              <div className="form-group">
                <label className="form-label">Candidate Location / City, Country</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    placeholder="e.g. Mumbai, India or Bengaluru, India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input 
                type="email"
                name="email-login"
                autoComplete="off"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input 
                type="password"
                name="password-login"
                autoComplete="new-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              marginTop: '1.25rem', 
              padding: '0.9rem',
              fontSize: '0.98rem',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(79, 70, 229, 0.25)'
            }}
          >
            {tab === 'login' ? 'Sign In to Profile' : 'Create Candidate Account'}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
