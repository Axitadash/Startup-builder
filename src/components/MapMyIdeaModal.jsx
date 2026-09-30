import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, MapPin, Sparkles, ArrowRight, Clock, Target, Lightbulb, Rocket } from 'lucide-react';

export default function MapMyIdeaModal() {
  const { isMapMyIdeaModalOpen, setIsMapMyIdeaModalOpen, generateRoadmapForCustomIdea } = useAuth();

  const [title, setTitle] = useState('');
  const [pitch, setPitch] = useState('');
  const [domain, setDomain] = useState('E-Commerce & Digital Store');
  const [estimatedCost, setEstimatedCost] = useState('₹50,000');
  const [timeline, setTimeline] = useState('1 Month');
  const [targetAudience, setTargetAudience] = useState('');

  if (!isMapMyIdeaModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !pitch.trim()) return;

    generateRoadmapForCustomIdea({
      title: title.trim(),
      tagline: `Custom Founder Idea • ${domain}`,
      pitch: pitch.trim(),
      domain: domain,
      estimatedCost: estimatedCost,
      timeline: timeline,
      targetAudience: targetAudience.trim() || 'Target Customers & Local Clients',
      riskRating: 'Custom Founder Roadmap • Medium Risk • High Reward'
    });
  };

  return (
    <div className="modal-overlay" onClick={() => setIsMapMyIdeaModalOpen(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '24px',
          padding: '2rem 2.25rem',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.15)',
          color: '#0f172a'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsMapMyIdeaModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
          }}>
            <MapPin size={26} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
            Map My Business Idea
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
            Already have an idea? Enter your details below to get an instant 4-phase execution roadmap, budget breakdown in ₹, and risk plan—no questionnaire needed.
          </p>
        </div>

        {/* Custom Idea Form */}
        <form onSubmit={handleSubmit}>
          
          {/* 1. Business Name / Title */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Business Name or Idea Title *</label>
            <div style={{ position: 'relative' }}>
              <Rocket size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input 
                type="text" 
                placeholder="e.g. Organic Cold-Pressed Juice Delivery in Delhi"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          {/* 2. Elevator Pitch / Description */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">How your business works (Elevator Pitch) *</label>
            <textarea 
              rows="3"
              placeholder="e.g. Delivering fresh daily cold-pressed juices to health-conscious office workers via monthly subscription..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              required
              className="form-textarea"
              style={{ padding: '0.85rem 1rem', fontSize: '0.92rem' }}
            ></textarea>
          </div>

          {/* 3. Industry / Category Select */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Industry / Business Category</label>
            <select 
              value={domain} 
              onChange={(e) => setDomain(e.target.value)}
              className="form-select"
            >
              <option value="E-Commerce & Digital Store">E-Commerce & Digital Store</option>
              <option value="Food & Beverage">Food & Beverage / Cloud Kitchen</option>
              <option value="Software & Web Application">Software & Web Application / Micro-SaaS</option>
              <option value="Local Digital Agency">Local Digital Service & Retainer Agency</option>
              <option value="Education & Coaching">Education, Coaching & Content</option>
              <option value="Healthcare & Fitness">Healthcare, Wellness & Fitness</option>
              <option value="General Business">General Business / Service</option>
            </select>
          </div>

          {/* 4. Budget & Timeline Grid */}
          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Starting Capital Total Budget (₹)</label>
              <div>
                <input 
                  type="text" 
                  placeholder="e.g. ₹50,000 or ₹2,00,000"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#059669' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                {['₹10,000', '₹25,000', '₹50,000', '₹1,50,000', '₹5,00,000'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setEstimatedCost(preset)}
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '6px',
                      border: estimatedCost === preset ? '1px solid #059669' : '1px solid #cbd5e1',
                      background: estimatedCost === preset ? '#ecfdf5' : '#f8fafc',
                      color: estimatedCost === preset ? '#047857' : '#475569',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Target Launch Timeline</label>
              <select 
                value={timeline} 
                onChange={(e) => setTimeline(e.target.value)}
                className="form-select"
              >
                <option value="2 Weeks">2 Weeks (Fast Track)</option>
                <option value="1 Month">1 Month (Recommended)</option>
                <option value="3 Months">3 Months (Full Build)</option>
                <option value="6 Months">6 Months (Enterprise)</option>
              </select>
            </div>
          </div>

          {/* 5. Target Audience (Optional) */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Target Audience / Customers (Optional)</label>
            <div style={{ position: 'relative' }}>
              <Target size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input 
                type="text" 
                placeholder="e.g. Office workers, gym members, or small business owners"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn"
            style={{ 
              width: '100%', 
              padding: '1rem',
              background: 'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1rem',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(5, 150, 105, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem'
            }}
          >
            <Sparkles size={18} />
            <span>Generate End-to-End Startup Roadmap</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
