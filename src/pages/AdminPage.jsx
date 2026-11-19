import React, { useState, useEffect } from 'react';
import { DatabaseService } from '../db/dbService';
import { useAuth } from '../context/AuthContext';
import { 
  Database, 
  Users, 
  FolderKanban, 
  FileText, 
  Activity, 
  Search, 
  RefreshCw, 
  Download, 
  Trash2, 
  Eye, 
  Sparkles,
  BarChart3,
  Layers,
  ShieldCheck,
  TrendingUp,
  Lock,
  Mail,
  User,
  KeyRound,
  ArrowRight,
  ShieldAlert,
  LogOut
} from 'lucide-react';

const TABLE_NAMES = [
  { id: 'users', label: '1. Users', icon: <Users size={16} /> },
  { id: 'projects', label: '2. Projects', icon: <FolderKanban size={16} /> },
  { id: 'project_inputs', label: '3. Project Inputs', icon: <Layers size={16} /> },
  { id: 'competitors', label: '4. Competitors', icon: <BarChart3 size={16} /> },
  { id: 'financial_models', label: '5. Financial Models', icon: <TrendingUp size={16} /> },
  { id: 'roadmaps', label: '6. Roadmaps', icon: <Activity size={16} /> },
  { id: 'reports', label: '7. Reports', icon: <FileText size={16} /> }
];

export default function AdminPage() {
  const { user, adminLogin, adminRegister, logout, showToast } = useAuth();
  
  // Admin Auth Gate State
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Table Viewer State
  const [selectedTable, setSelectedTable] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [dbData, setDbData] = useState({});

  const isAdmin = user && (user.isAdmin || user.role === 'System Admin');

  // Reload database tables
  const loadDatabaseData = () => {
    const data = {
      users: DatabaseService.users.getAll(),
      projects: DatabaseService.projects.getAll(),
      project_inputs: localStorage.getItem('vf_db_project_inputs') ? JSON.parse(localStorage.getItem('vf_db_project_inputs')) : [],
      competitors: localStorage.getItem('vf_db_competitors') ? JSON.parse(localStorage.getItem('vf_db_competitors')) : [],
      financial_models: localStorage.getItem('vf_db_financial_models') ? JSON.parse(localStorage.getItem('vf_db_financial_models')) : [],
      roadmaps: localStorage.getItem('vf_db_roadmaps') ? JSON.parse(localStorage.getItem('vf_db_roadmaps')) : [],
      reports: localStorage.getItem('vf_db_reports') ? JSON.parse(localStorage.getItem('vf_db_reports')) : []
    };
    setDbData(data);
  };

  useEffect(() => {
    if (isAdmin) {
      loadDatabaseData();
    }
  }, [isAdmin]);

  // Handle Admin Login Submit
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setAuthError('Please fill in both email and password.');
      return;
    }
    const success = adminLogin({ email: adminEmail, password: adminPassword });
    if (!success) {
      setAuthError('Failed to authenticate as System Admin.');
    }
  };

  // Handle Admin Register Submit
  const handleAdminRegister = (e) => {
    e.preventDefault();
    setAuthError('');
    if (adminPasscode.trim() !== 'ADMIN123') {
      setAuthError('Invalid Master Passcode. Please contact your system administrator.');
      return;
    }
    const success = adminRegister({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      adminPasscode: adminPasscode
    });
    if (!success) {
      setAuthError('Admin registration failed.');
    }
  };

  // Seed sample database records if empty
  const handleSeedDatabase = () => {
    if (DatabaseService.users.getAll().length === 0) {
      DatabaseService.users.create({
        id: 'usr_101',
        name: 'Axita Founder',
        email: 'axita@ai-startup.io',
        role: 'Technical Founder'
      });
      DatabaseService.users.create({
        id: 'usr_102',
        name: 'Rohan Sharma',
        email: 'rohan.s@ventureforge.in',
        role: 'Product Strategist'
      });
    }

    const proj1 = DatabaseService.projects.create({
      id: 'proj_201',
      user_id: 'usr_101',
      name: 'Synthetix AI Platform',
      industry: 'Artificial Intelligence',
      idea: 'Autonomous platform that builds digital solutions for small businesses.'
    });

    DatabaseService.project_inputs.save({
      project_id: 'proj_201',
      target_market: 'SMBs & Digital Creators in India',
      budget: '₹1,50,000',
      location: 'Bengaluru, India',
      goals: 'Build MVP & reach 100 paying clients',
      constraints: 'Bootstrapped 4-month timeline'
    });

    DatabaseService.competitors.add({
      project_id: 'proj_201',
      name: 'Zomato / Swiggy Aggregators',
      strengths: 'Massive brand reach & existing user base',
      weaknesses: 'High 25-30% commissions per order',
      notes: 'Synthetix bypasses commissions with direct WhatsApp bot ordering.'
    });

    DatabaseService.financial_models.save({
      project_id: 'proj_201',
      pricing: '₹499 / month subscription',
      costs: '₹1,50,000 total MVP development cost',
      revenue_assumptions: '100 bakeries x ₹499/mo = ₹49,900 MRR by Month 6',
      scenarios: 'Base Case: ₹1,00,000 MRR in Month 8'
    });

    DatabaseService.roadmaps.save({
      project_id: 'proj_201',
      phase: 'Phase 1: Customer Validation',
      feature: 'Direct WhatsApp Bot & Menu Customizer',
      priority: 'High Priority',
      timeline: 'Months 1-2'
    });

    DatabaseService.reports.save({
      project_id: 'proj_201',
      type: 'Complete Startup Roadmap PDF',
      file_path: '/exports/synthetix_ai_roadmap.pdf',
      version: 'v1.0'
    });

    loadDatabaseData();
    showToast('Database successfully populated with sample records!');
  };

  // Export DB as JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(dbData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ventureforge_database_dump_${Date.now()}.json`;
    a.click();
    showToast('Database dump exported to JSON!');
  };

  // Clear Database
  const handleClearDatabase = () => {
    if (window.confirm('Are you sure you want to clear database tables?')) {
      TABLE_NAMES.forEach(t => localStorage.removeItem('vf_db_' + t.id));
      loadDatabaseData();
      showToast('Database tables cleared.', 'info');
    }
  };

  // UNAUTHENTICATED ADMIN GATE SCREEN
  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '520px', margin: '3rem auto', padding: '0 1rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem 2rem', background: '#ffffff', border: '1px solid #cbd5e1', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)'
            }}>
              <ShieldCheck size={28} color="#ffffff" />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              System Admin Portal
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Authenticate with admin credentials or master passcode to access the database control center.
            </p>
          </div>

          {/* Auth Tab Switcher */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={() => { setAuthTab('login'); setAuthError(''); }}
              style={{
                padding: '0.6rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: authTab === 'login' ? 'var(--primary-gradient)' : 'transparent',
                color: authTab === 'login' ? '#ffffff' : '#64748b'
              }}
            >
              Admin Sign In
            </button>
            <button
              onClick={() => { setAuthTab('register'); setAuthError(''); }}
              style={{
                padding: '0.6rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: authTab === 'register' ? 'var(--primary-gradient)' : 'transparent',
                color: authTab === 'register' ? '#ffffff' : '#64748b'
              }}
            >
              Admin Registration
            </button>
          </div>

          {authError && (
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              color: '#e11d48',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600
            }}>
              <ShieldAlert size={16} />
              <span>{authError}</span>
            </div>
          )}

          {authTab === 'login' ? (
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label className="form-label">Admin Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="email" 
                    placeholder="admin@ventureforge.io"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Admin Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', fontWeight: 700 }}>
                Sign In as System Admin <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminRegister}>
              <div className="form-group">
                <label className="form-label">Admin Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="text" 
                    placeholder="System Administrator"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Admin Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="email" 
                    placeholder="admin@ventureforge.io"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Admin Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: '#4f46e5', fontWeight: 700 }}>
                  Master Admin Registration Passcode
                </label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#4f46e5' }} />
                  <input 
                    type="password" 
                    placeholder="Enter master registration passcode"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    required
                    className="form-input"
                    style={{ paddingLeft: '2.5rem', borderColor: '#818cf8' }}
                  />
                </div>

              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', fontWeight: 700 }}>
                Register System Admin <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DATABASE CONTROL PANEL
  const currentRecords = dbData[selectedTable] || [];

  const filteredRecords = currentRecords.filter(rec => {
    if (!searchQuery.trim()) return true;
    const str = JSON.stringify(rec).toLowerCase();
    return str.includes(searchQuery.toLowerCase().trim());
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
      
      {/* Top Banner Header */}
      <div className="glass-card" style={{
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span className="badge-pill" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', fontWeight: 700 }}>
                <ShieldCheck size={14} /> Admin Session Active: {user.name}
              </span>
              <span className="badge-pill-emerald">
                Project Database Connected
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              Database Control & <span className="gradient-text">Schema Inspector</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 500 }}>
              Live visualization and record inspection across project database tables.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button onClick={handleSeedDatabase} className="btn btn-secondary btn-sm" style={{ borderColor: '#059669', color: '#047857' }}>
              <Sparkles size={15} color="#059669" /> Seed Demo DB Data
            </button>
            <button onClick={handleExportJSON} className="btn btn-secondary btn-sm">
              <Download size={15} /> Export JSON
            </button>
            <button onClick={loadDatabaseData} className="btn btn-secondary btn-sm">
              <RefreshCw size={15} /> Refresh
            </button>
            <button onClick={logout} className="btn btn-secondary btn-sm" style={{ borderColor: '#fca5a5', color: '#e11d48' }}>
              <LogOut size={15} color="#e11d48" /> Admin Sign Out
            </button>
          </div>
        </div>

        {/* Database Metrics Grid */}
        <div className="grid-3" style={{ gap: '1rem', marginTop: '1.75rem' }}>
          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Registered Users</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4f46e5', marginTop: '0.2rem' }}>{(dbData.users || []).length}</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Active Projects</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>{(dbData.projects || []).length}</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Generated Reports</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0284c7', marginTop: '0.2rem' }}>{(dbData.reports || []).length}</div>
          </div>
        </div>
      </div>

      {/* Database Table Selector Bar */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        background: '#f1f5f9',
        padding: '0.6rem',
        borderRadius: '18px',
        border: '1px solid #cbd5e1'
      }}>
        {TABLE_NAMES.map(tab => {
          const isSelected = selectedTable === tab.id;
          const count = (dbData[tab.id] || []).length;
          return (
            <button
              key={tab.id}
              onClick={() => { setSelectedTable(tab.id); setSelectedRecord(null); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.6rem 0.95rem',
                border: 'none',
                borderRadius: '12px',
                fontWeight: isSelected ? 800 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: isSelected ? 'var(--primary-gradient)' : 'transparent',
                color: isSelected ? '#ffffff' : '#475569',
                boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span style={{
                background: isSelected ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                color: isSelected ? '#ffffff' : '#334155',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Table Viewer */}
      <div className="glass-card" style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        
        {/* Table Search & Title Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              Table: <span style={{ color: '#4f46e5' }}>{selectedTable}</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Showing {filteredRecords.length} of {currentRecords.length} records
            </p>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input 
              type="text" 
              placeholder={`Search ${selectedTable}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        {/* Data Table */}
        {filteredRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            <Database size={42} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.25rem' }}>No records found in '{selectedTable}'</h3>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Click "Seed Demo DB Data" at the top to populate sample records.
            </p>
            <button onClick={handleSeedDatabase} className="btn btn-primary btn-sm">
              <Sparkles size={14} /> Populate Sample Records
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  {Object.keys(filteredRecords[0]).map(key => (
                    <th key={key} style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid #f1f5f9', background: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    {Object.entries(row).map(([key, val], cIdx) => (
                      <td key={cIdx} style={{ padding: '0.9rem 1rem', maxW: '240px', wordBreak: 'break-word' }}>
                        {key === 'id' || key === 'user_id' || key === 'project_id' ? (
                          <code style={{ background: '#e0e7ff', color: '#3730a3', padding: '0.15rem 0.45rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                            {String(val)}
                          </code>
                        ) : typeof val === 'object' || (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) ? (
                          <button 
                            onClick={() => setSelectedRecord(val)} 
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                          >
                            <Eye size={12} /> View JSON
                          </button>
                        ) : key === 'status' || key === 'priority' ? (
                          <span style={{
                            fontSize: '0.75rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            background: 'rgba(5, 150, 105, 0.1)',
                            color: '#047857'
                          }}>
                            {String(val)}
                          </span>
                        ) : (
                          <span style={{ color: '#334155', fontWeight: 500 }}>
                            {String(val).length > 60 ? String(val).slice(0, 60) + '...' : String(val)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* JSON Modal Record Inspector */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Record Inspection JSON</h3>
              <button onClick={() => setSelectedRecord(null)} className="btn btn-secondary btn-sm">Close</button>
            </div>
            <pre style={{
              background: '#0f172a',
              color: '#38bdf8',
              padding: '1.25rem',
              borderRadius: '14px',
              fontSize: '0.85rem',
              overflowX: 'auto',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {typeof selectedRecord === 'string' ? selectedRecord : JSON.stringify(selectedRecord, null, 2)}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
