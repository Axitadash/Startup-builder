import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Clock, 
  Globe 
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does candidate profile editing work?',
    a: 'Once you register or sign in, navigate to the Candidate Profile Editor via the top menu or your avatar button. You can customize your bio, actual location, candidate skills, and social contact links in real-time.'
  },
  {
    q: 'Are my AI-generated business roadmaps confidential?',
    a: 'Yes. All generated startup roadmaps and ideas remain private to your account.'
  },
  {
    q: 'How do I choose 5 tailored business ideas?',
    a: 'Click the "Get Ideas" button in the top right navbar. Answer 10 quick questions about your experience, age, available weekly time, starting budget, and interests to receive 5 tailored options.'
  },
  {
    q: 'Is there any cost to use VentureForge AI?',
    a: 'VentureForge AI is 100% free for candidates and founders to generate business ideas and complete financial roadmaps in Rupees (₹).'
  }
];

export default function ContactPage() {
  const { showToast } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent! We will reply within 2 hours.');
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', padding: '1rem 0' }}>
      
      {/* Header Banner */}
      <section style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
        <div className="badge-pill" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} color="#4f46e5" />
          <span>24/7 Founder & Candidate Support</span>
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>
          Get in Touch with <span className="gradient-text">VentureForge AI</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#475569', fontWeight: 500 }}>
          Have questions about your candidate profile, business roadmaps, or feature requests? We're here to help you.
        </p>
      </section>

      {/* Grid: Form + Info Cards */}
      <section className="grid-2">
        {/* Contact Form Card */}
        <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 800 }}>
            <MessageSquare size={20} color="#4f46e5" />
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input 
                type="text" 
                placeholder="Alex Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                placeholder="candidate@ai-startup.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Inquiry Category</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="form-select"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Candidate Profile Help">Candidate Profile & Account Support</option>
                <option value="Business Roadmap Support">Business Roadmap & Ideas Question</option>
                <option value="Feature Request">Feature Suggestion</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea 
                rows="4"
                placeholder="How can we assist your business journey?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="form-textarea"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem', fontWeight: 800 }}>Email Support</h3>
              <p style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>support@ventureforge.ai</p>
              <p style={{ fontSize: '0.82rem', color: '#4f46e5', marginTop: '0.2rem', fontWeight: 600 }}>Avg response time: &lt; 2 hours</p>
            </div>
          </div>

          <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Globe size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem', fontWeight: 800 }}>Community Hub</h3>
              <p style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>community.ventureforge.ai</p>
              <p style={{ fontSize: '0.82rem', color: '#059669', marginTop: '0.2rem', fontWeight: 600 }}>4,500+ active candidates online</p>
            </div>
          </div>

          <div className="glass-card" style={{ background: '#ffffff', borderColor: '#e2e8f0', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(219, 39, 119, 0.1)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.2rem', fontWeight: 800 }}>Head Office</h3>
              <p style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>Bengaluru Tech Park, Outer Ring Road</p>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Bengaluru, Karnataka 560103</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ maxWidth: '840px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#0f172a', fontWeight: 800 }}>Frequently Asked Questions</h2>
          <p style={{ color: '#475569', fontWeight: 500 }}>Everything candidates need to know about VentureForge AI</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="glass-card"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                style={{ cursor: 'pointer', padding: '1.25rem 1.5rem', background: '#ffffff', borderColor: isOpen ? '#6366f1' : '#e2e8f0' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isOpen ? '#4f46e5' : '#0f172a' }}>
                    {faq.q}
                  </h3>
                  {isOpen ? <ChevronUp size={20} color="#4f46e5" /> : <ChevronDown size={20} color="#64748b" />}
                </div>
                {isOpen && (
                  <p style={{ marginTop: '0.85rem', color: '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
