import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Save, 
  Sparkles, 
  MapPin, 
  Globe, 
  Plus, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Code,
  Upload,
  Palette
} from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from '../components/SocialIcons';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
];

export default function ProfilePage() {
  const { user, updateProfile, setIsAuthModalOpen, loginDemoCandidate, selectedLogoDesign, setIsBrandLogoModalOpen, setActivePage } = useAuth();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'skills' | 'socials'
  
  // Local form state (Purely Candidate focused)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    avatar: '',
    bio: '',
    location: '',
    skills: [],
    socials: { github: '', linkedin: '', twitter: '', website: '' },
    seekingCofounder: true,
    seekingInvestors: true,
    equityShare: ''
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        role: user.role || 'Startup Founder',
        avatar: user.avatar || PRESET_AVATARS[0],
        bio: user.bio || '',
        location: user.location !== undefined ? user.location : '',
        skills: user.skills || [],
        socials: user.socials || { github: '', linkedin: '', twitter: '', website: '' },
        seekingCofounder: user.seekingCofounder ?? true,
        seekingInvestors: user.seekingInvestors ?? true,
        equityShare: user.equityShare || '15-25%'
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <User size={48} color="#4f46e5" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 800 }}>Candidate Sign In Required</h2>
          <p style={{ color: '#475569', marginBottom: '2rem' }}>
            Please sign in to view and edit your candidate profile, location, and skills.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button onClick={() => setIsAuthModalOpen(true)} className="btn btn-primary btn-lg">
              Sign In to Edit Profile
            </button>
            <button onClick={loginDemoCandidate} className="btn btn-secondary">
              <ShieldCheck size={18} color="#059669" />
              Use Demo Candidate Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateProfile(formData);
  };

  // Local File Upload Handler (Converts computer image file to Base64 URL)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Top Banner & Header */}
      <div className="glass-card" style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'} 
              alt={formData.name} 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid #4f46e5',
                boxShadow: '0 4px 15px rgba(79, 70, 229, 0.25)'
              }}
            />
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Upload Photo from Computer"
              style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#4f46e5',
                border: '2px solid #ffffff',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Upload size={13} />
            </button>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{formData.name || 'Candidate Founder'}</h1>
              <span className="badge-pill-emerald">
                <CheckCircle2 size={12} /> Candidate Verified
              </span>
            </div>
            <p style={{ color: '#4f46e5', fontSize: '0.95rem', fontWeight: 700 }}>{formData.role}</p>
            <p style={{ color: '#475569', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem', fontWeight: 600 }}>
              <MapPin size={14} color="#dc2626" /> {formData.location || 'Location Not Specified'}
            </p>
          </div>
        </div>

        <button onClick={handleSave} className="btn btn-primary btn-lg">
          <Save size={18} /> Save Profile Changes
        </button>
      </div>

      {/* Main Grid: Form Editor (Left) vs Live Public Card (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }} className="profile-layout">
        
        {/* Left Column: Form Editor */}
        <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          
          {/* Tab Selection */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: '1rem',
            marginBottom: '1.75rem',
            overflowX: 'auto'
          }}>
            <button
              onClick={() => setActiveTab('personal')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'personal' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                color: activeTab === 'personal' ? '#4f46e5' : '#475569',
                borderColor: activeTab === 'personal' ? '#6366f1' : 'transparent',
                fontWeight: activeTab === 'personal' ? 700 : 600
              }}
            >
              <User size={14} /> Personal Details
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'skills' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                color: activeTab === 'skills' ? '#4f46e5' : '#475569',
                borderColor: activeTab === 'skills' ? '#6366f1' : 'transparent',
                fontWeight: activeTab === 'skills' ? 700 : 600
              }}
            >
              <Code size={14} /> Candidate Skills
            </button>
            <button
              onClick={() => setActiveTab('socials')}
              className="btn btn-sm"
              style={{
                background: activeTab === 'socials' ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                color: activeTab === 'socials' ? '#4f46e5' : '#475569',
                borderColor: activeTab === 'socials' ? '#6366f1' : 'transparent',
                fontWeight: activeTab === 'socials' ? 700 : 600
              }}
            >
              <Globe size={14} /> Social Links
            </button>
          </div>

          <form onSubmit={handleSave}>
            
            {/* Tab 1: Personal Details */}
            {activeTab === 'personal' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#0f172a', fontWeight: 800 }}>Personal Details</h3>
                
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Primary Role / Title</label>
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Technical Founder or Product Designer"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Candidate Actual Location Field */}
                <div className="form-group">
                  <label className="form-label">Actual Location (City, Country)</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Mumbai, India or Bengaluru, India"
                      required
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                {/* Profile Photo: File Upload from Computer + URL option */}
                <div className="form-group">
                  <label className="form-label">Profile Photo / Avatar</label>
                  
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />

                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      className="btn btn-secondary"
                      style={{
                        borderColor: '#6366f1',
                        background: 'rgba(79, 70, 229, 0.08)',
                        color: '#4f46e5',
                        fontWeight: 700,
                        fontSize: '0.88rem'
                      }}
                    >
                      <Upload size={16} /> Import Picture from My Computer / Folder
                    </button>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600 }}>
                    Or paste Image URL:
                  </div>
                  <input 
                    type="url" 
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://..."
                    className="form-input"
                  />

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Select preset avatar:</span>
                    {PRESET_AVATARS.map((url, idx) => (
                      <img 
                        key={idx} 
                        src={url} 
                        alt="Preset avatar" 
                        onClick={() => setFormData({ ...formData, avatar: url })}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          border: formData.avatar === url ? '2px solid #4f46e5' : '1px solid #cbd5e1'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Candidate Bio</label>
                  <textarea 
                    rows="3"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Briefly describe your experience, background, and business goals..."
                    className="form-textarea"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Tab 2: Candidate Skills */}
            {activeTab === 'skills' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#0f172a', fontWeight: 800 }}>Candidate Personal Skills</h3>
                
                <div className="form-group">
                  <label className="form-label">Your Personal Skill Tags</label>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.6rem' }}>
                    These are your candidate profile skills. They remain your personal profile skills and do not get overwritten by specific idea questionnaires.
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <input 
                      type="text" 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add skill (e.g. Writing, Coding, Design, Marketing)..."
                      className="form-input"
                      style={{ flex: 1 }}
                    />
                    <button onClick={handleAddSkill} className="btn btn-secondary btn-sm" type="button">
                      <Plus size={16} /> Add Skill
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {formData.skills.length > 0 ? (
                      formData.skills.map((skill, i) => (
                        <span key={i} className="badge-pill" style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.35rem 0.75rem', color: '#4338ca' }}>
                          {skill}
                          <X size={12} style={{ cursor: 'pointer', marginLeft: '0.3rem' }} onClick={() => handleRemoveSkill(skill)} />
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>No skills added yet. Add your skills above!</span>
                    )}
                  </div>
                </div>

                <div className="grid-2" style={{ marginTop: '1.5rem' }}>
                  <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.seekingCofounder}
                        onChange={(e) => setFormData({ ...formData, seekingCofounder: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: '#4f46e5' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Seeking Co-founder</div>
                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>Looking for business or technical partners</div>
                      </div>
                    </label>
                  </div>

                  <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.seekingInvestors}
                        onChange={(e) => setFormData({ ...formData, seekingInvestors: e.target.checked })}
                        style={{ width: '18px', height: '18px', accentColor: '#059669' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Seeking Investors</div>
                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>Allow investors to view profile</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Social Links */}
            {activeTab === 'socials' && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: '#0f172a', fontWeight: 800 }}>Social & Contact Links</h3>

                <div className="form-group">
                  <label className="form-label">GitHub Profile URL</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                      <GithubIcon size={16} />
                    </div>
                    <input 
                      type="url" 
                      value={formData.socials.github}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, github: e.target.value } })}
                      placeholder="https://github.com/username"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">LinkedIn Profile URL</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                      <LinkedinIcon size={16} />
                    </div>
                    <input 
                      type="url" 
                      value={formData.socials.linkedin}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                      placeholder="https://linkedin.com/in/username"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Twitter / X Handle</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                      <TwitterIcon size={16} />
                    </div>
                    <input 
                      type="url" 
                      value={formData.socials.twitter}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, twitter: e.target.value } })}
                      placeholder="https://x.com/username"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Personal Website</label>
                  <div style={{ position: 'relative' }}>
                    <Globe size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                    <input 
                      type="url" 
                      value={formData.socials.website}
                      onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, website: e.target.value } })}
                      placeholder="https://mywebsite.com"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Public Founder Card Preview */}
        <div>
          <div style={{ position: 'sticky', top: '5.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              Live Public Profile Card
            </div>

            <div className="glass-card" style={{
              background: '#ffffff',
              borderColor: '#e2e8f0',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
            }}>
              {/* Badge Top Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className="badge-pill" style={{ background: 'rgba(79, 70, 229, 0.08)' }}>
                  <Sparkles size={12} /> Candidate Profile
                </span>
                {formData.seekingCofounder && (
                  <span className="badge-pill-emerald" style={{ fontSize: '0.72rem' }}>
                    Seeking Co-founder
                  </span>
                )}
              </div>

              {/* Avatar & Name */}
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <img 
                  src={formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'} 
                  alt={formData.name} 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 0.75rem',
                    border: '3px solid #4f46e5',
                    boxShadow: '0 4px 15px rgba(79, 70, 229, 0.25)'
                  }}
                />
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>{formData.name || 'Candidate Name'}</h3>
                <p style={{ fontSize: '0.88rem', color: '#4f46e5', fontWeight: 700 }}>{formData.role || 'Startup Founder'}</p>
                <p style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <MapPin size={13} color="#dc2626" /> {formData.location || 'Location Not Specified'}
                </p>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, textAlign: 'center', marginBottom: '1.25rem', fontStyle: 'italic' }}>
                "{formData.bio || 'Building innovative businesses.'}"
              </p>

              {/* Skill Tags */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  Candidate Profile Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {formData.skills.length > 0 ? (
                    formData.skills.map((s, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: 'rgba(79, 70, 229, 0.08)',
                        color: '#4338ca',
                        border: '1px solid rgba(79, 70, 229, 0.2)',
                        fontWeight: 600
                      }}>
                        {s}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No personal skills added yet.</span>
                  )}
                </div>
              </div>

              {/* Social Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                {formData.socials.github && (
                  <a href={formData.socials.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem' }}>
                    <GithubIcon size={14} />
                  </a>
                )}
                {formData.socials.linkedin && (
                  <a href={formData.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem' }}>
                    <LinkedinIcon size={14} />
                  </a>
                )}
                {formData.socials.twitter && (
                  <a href={formData.socials.twitter} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem' }}>
                    <TwitterIcon size={14} />
                  </a>
                )}
                {formData.socials.website && (
                  <a href={formData.socials.website} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '0.4rem' }}>
                    <Globe size={14} />
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Brand Identity Section */}
      <div className="glass-card" style={{ padding: '2rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <Palette size={20} color="#7c3aed" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Brand Identity</h2>
            </div>
            <p style={{ color: '#475569', fontSize: '0.88rem', margin: 0 }}>Your saved logo design and branding assets</p>
          </div>
          <button
            onClick={() => setIsBrandLogoModalOpen(true)}
            className="btn"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)', color: '#fff', fontWeight: 700, boxShadow: '0 4px 15px rgba(124,58,237,0.25)' }}
          >
            <Palette size={15} /> {selectedLogoDesign ? 'Edit Logo' : 'Create Brand Logo'}
          </button>
        </div>

        {selectedLogoDesign ? (
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ background: selectedLogoDesign.bg_color || '#f8fafc', borderRadius: '16px', padding: '1.5rem 2rem', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '180px' }}>
              <div style={{ fontFamily: selectedLogoDesign.font_family + ', sans-serif', fontWeight: 800, fontSize: '1.4rem', color: selectedLogoDesign.primary_color }}>
                {selectedLogoDesign.brand_name}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Logo Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Style:</span>
                  <span style={{ fontSize: '0.82rem', background: 'rgba(124,58,237,0.1)', color: '#7c3aed', padding: '0.1rem 0.5rem', borderRadius: '99px', fontWeight: 700 }}>{selectedLogoDesign.style}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Font:</span>
                  <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700 }}>{selectedLogoDesign.font_family}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600 }}>Colours:</span>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: selectedLogoDesign.primary_color }} />
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: selectedLogoDesign.secondary_color }} />
                </div>
              </div>
              <button onClick={() => setActivePage('logo')} className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem', borderColor: '#7c3aed', color: '#7c3aed' }}>
                Open Logo Studio →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'linear-gradient(135deg, rgba(124,58,237,0.04), rgba(217,70,239,0.04))', borderRadius: '16px', border: '1px dashed rgba(124,58,237,0.25)' }}>
            <Palette size={40} color="#c084fc" style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ color: '#7c3aed', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.3rem' }}>No brand logo created yet</p>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 1rem' }}>Generate a professional logo with AI or design your own</p>
            <button onClick={() => setIsBrandLogoModalOpen(true)} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)' }}>
              <Sparkles size={15} /> Create Your Brand Logo
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
