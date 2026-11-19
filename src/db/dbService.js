/**
 * VentureForge AI - Database Service Module
 * Handles full client-side & persistent relational storage for all 11 schema tables:
 * 1. users
 * 2. projects
 * 3. project_inputs
 * 4. analyses
 * 5. personas
 * 6. competitors
 * 7. financial_models
 * 8. roadmaps
 * 9. reports
 * 10. audit_logs
 * 11. logo_designs
 */

const STORAGE_PREFIX = 'vf_db_';

// Helper to fetch table data from localStorage
const getTable = (tableName) => {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + tableName);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Error loading table ${tableName}:`, e);
    return [];
  }
};

// Helper to save table data
const setTable = (tableName, records) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + tableName, JSON.stringify(records));
  } catch (e) {
    console.error(`Error saving table ${tableName}:`, e);
  }
};

export const DatabaseService = {
  // ----------------------------------------------------
  // 1. USERS TABLE
  // fields: id, name, email, password_hash, role, created_at
  // ----------------------------------------------------
  users: {
    getAll: () => getTable('users'),
    getById: (id) => getTable('users').find(u => u.id === id),
    getByEmail: (email) => {
      const clean = (email || '').toLowerCase().trim();
      return getTable('users').find(u => u.email.toLowerCase().trim() === clean);
    },
    create: (userData) => {
      const users = getTable('users');
      const newUser = {
        id: userData.id || `usr_${Date.now()}`,
        name: userData.name || 'Candidate Founder',
        email: userData.email,
        password_hash: userData.password_hash || 'pbkdf2_sha256_mock_hash',
        role: userData.role || 'Candidate Founder',
        created_at: new Date().toISOString()
      };
      users.push(newUser);
      setTable('users', users);
      DatabaseService.audit_logs.log(newUser.id, 'USER_REGISTERED', 'users');
      return newUser;
    },
    update: (id, updates) => {
      const users = getTable('users');
      const index = users.findIndex(u => u.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        setTable('users', users);
        DatabaseService.audit_logs.log(id, 'USER_UPDATED_PROFILE', 'users');
        return users[index];
      }
      return null;
    }
  },

  // ----------------------------------------------------
  // 2. PROJECTS TABLE
  // fields: id, user_id, name, industry, idea, status, created_at
  // ----------------------------------------------------
  projects: {
    getAll: () => getTable('projects'),
    getByUserId: (userId) => getTable('projects').filter(p => p.user_id === userId),
    getById: (id) => getTable('projects').find(p => p.id === id),
    create: (projectData) => {
      const projects = getTable('projects');
      const newProject = {
        id: projectData.id || `proj_${Date.now()}`,
        user_id: projectData.user_id,
        name: projectData.name,
        industry: projectData.industry || 'Technology',
        idea: projectData.idea || '',
        status: projectData.status || 'active',
        created_at: new Date().toISOString()
      };
      projects.push(newProject);
      setTable('projects', projects);
      DatabaseService.audit_logs.log(projectData.user_id, 'PROJECT_CREATED', `projects:${newProject.id}`);
      return newProject;
    }
  },

  // ----------------------------------------------------
  // 3. PROJECT_INPUTS TABLE
  // fields: project_id, target_market, budget, location, goals, constraints
  // ----------------------------------------------------
  project_inputs: {
    getByProjectId: (projectId) => getTable('project_inputs').find(i => i.project_id === projectId),
    save: (inputData) => {
      const inputs = getTable('project_inputs');
      const idx = inputs.findIndex(i => i.project_id === inputData.project_id);
      const record = {
        project_id: inputData.project_id,
        target_market: inputData.target_market || 'General Consumers',
        budget: inputData.budget || '₹1,50,000',
        location: inputData.location || 'India',
        goals: inputData.goals || 'Build MVP & Launch',
        constraints: inputData.constraints || 'Bootstrapped'
      };
      if (idx !== -1) {
        inputs[idx] = record;
      } else {
        inputs.push(record);
      }
      setTable('project_inputs', inputs);
      DatabaseService.audit_logs.log(null, 'PROJECT_INPUTS_SAVED', `project_inputs:${inputData.project_id}`);
      return record;
    }
  },

  // ----------------------------------------------------
  // 4. ANALYSES TABLE
  // fields: id, project_id, module, input_version, output_json, status, created_at
  // ----------------------------------------------------
  analyses: {
    getByProjectId: (projectId) => getTable('analyses').filter(a => a.project_id === projectId),
    create: (analysisData) => {
      const list = getTable('analyses');
      const newAnalysis = {
        id: `an_${Date.now()}`,
        project_id: analysisData.project_id,
        module: analysisData.module || 'Roadmap Generator',
        input_version: analysisData.input_version || 'v1.0',
        output_json: JSON.stringify(analysisData.output || {}),
        status: analysisData.status || 'completed',
        created_at: new Date().toISOString()
      };
      list.push(newAnalysis);
      setTable('analyses', list);
      DatabaseService.audit_logs.log(null, 'ANALYSIS_RUN', `analyses:${newAnalysis.id}`);
      return newAnalysis;
    }
  },

  // ----------------------------------------------------
  // 5. PERSONAS TABLE
  // fields: id, project_id, name, demographics, pain_points, motivations
  // ----------------------------------------------------
  personas: {
    getByProjectId: (projectId) => getTable('personas').filter(p => p.project_id === projectId),
    add: (personaData) => {
      const list = getTable('personas');
      const newPersona = {
        id: `pers_${Date.now()}`,
        project_id: personaData.project_id,
        name: personaData.name || 'Primary User Persona',
        demographics: personaData.demographics || 'Age 20-35, Working Professionals',
        pain_points: personaData.pain_points || 'Lack of automated digital workflows',
        motivations: personaData.motivations || 'Save time & boost productivity'
      };
      list.push(newPersona);
      setTable('personas', list);
      DatabaseService.audit_logs.log(null, 'PERSONA_CREATED', `personas:${newPersona.id}`);
      return newPersona;
    }
  },

  // ----------------------------------------------------
  // 6. COMPETITORS TABLE
  // fields: id, project_id, name, strengths, weaknesses, notes
  // ----------------------------------------------------
  competitors: {
    getByProjectId: (projectId) => getTable('competitors').filter(c => c.project_id === projectId),
    add: (compData) => {
      const list = getTable('competitors');
      const newComp = {
        id: `comp_${Date.now()}`,
        project_id: compData.project_id,
        name: compData.name,
        strengths: compData.strengths || 'Established brand',
        weaknesses: compData.weaknesses || 'High pricing, complex setup',
        notes: compData.notes || 'Opportunity to disrupt with simple Indian pricing'
      };
      list.push(newComp);
      setTable('competitors', list);
      DatabaseService.audit_logs.log(null, 'COMPETITOR_ADDED', `competitors:${newComp.id}`);
      return newComp;
    }
  },

  // ----------------------------------------------------
  // 7. FINANCIAL_MODELS TABLE
  // fields: project_id, pricing, costs, revenue_assumptions, scenarios
  // ----------------------------------------------------
  financial_models: {
    getByProjectId: (projectId) => getTable('financial_models').find(f => f.project_id === projectId),
    save: (modelData) => {
      const list = getTable('financial_models');
      const idx = list.findIndex(f => f.project_id === modelData.project_id);
      const record = {
        project_id: modelData.project_id,
        pricing: modelData.pricing || '₹499/month',
        costs: modelData.costs || '₹1,50,000 MVP development',
        revenue_assumptions: modelData.revenue_assumptions || '100 paying users in Month 6',
        scenarios: modelData.scenarios || 'Base Case: ₹50,000/mo MRR'
      };
      if (idx !== -1) list[idx] = record;
      else list.push(record);
      setTable('financial_models', list);
      DatabaseService.audit_logs.log(null, 'FINANCIAL_MODEL_SAVED', `financial_models:${modelData.project_id}`);
      return record;
    }
  },

  // ----------------------------------------------------
  // 8. ROADMAPS TABLE
  // fields: project_id, phase, feature, priority, timeline
  // ----------------------------------------------------
  roadmaps: {
    getByProjectId: (projectId) => getTable('roadmaps').find(r => r.project_id === projectId),
    save: (roadmapData) => {
      const list = getTable('roadmaps');
      const idx = list.findIndex(r => r.project_id === roadmapData.project_id);
      const record = {
        project_id: roadmapData.project_id,
        phase: roadmapData.phase || 'Phase 1: MVP Validation',
        feature: roadmapData.feature || 'Core User Account & Interactive Generator',
        priority: roadmapData.priority || 'High',
        timeline: roadmapData.timeline || 'Months 1-4'
      };
      if (idx !== -1) list[idx] = record;
      else list.push(record);
      setTable('roadmaps', list);
      DatabaseService.audit_logs.log(null, 'ROADMAP_SAVED', `roadmaps:${roadmapData.project_id}`);
      return record;
    }
  },

  // ----------------------------------------------------
  // 9. REPORTS TABLE
  // fields: id, project_id, type, file_path, version, created_at
  // ----------------------------------------------------
  reports: {
    getByProjectId: (projectId) => getTable('reports').filter(r => r.project_id === projectId),
    save: (reportData) => {
      const list = getTable('reports');
      const newReport = {
        id: `rep_${Date.now()}`,
        project_id: reportData.project_id,
        type: reportData.type || 'Startup Roadmap PDF',
        file_path: reportData.file_path || '/exports/roadmap_plan.pdf',
        version: reportData.version || 'v1.0',
        created_at: new Date().toISOString()
      };
      list.push(newReport);
      setTable('reports', list);
      DatabaseService.audit_logs.log(null, 'REPORT_EXPORTED', `reports:${newReport.id}`);
      return newReport;
    }
  },

  // ----------------------------------------------------
  // 10. AUDIT_LOGS TABLE
  // fields: id, user_id, action, resource, timestamp
  // ----------------------------------------------------
  audit_logs: {
    getAll: () => getTable('audit_logs'),
    log: (userId, action, resource) => {
      const logs = getTable('audit_logs');
      const newLog = {
        id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        user_id: userId || 'anonymous',
        action: action,
        resource: resource,
        timestamp: new Date().toISOString()
      };
      logs.push(newLog);
      setTable('audit_logs', logs);
      return newLog;
    }
  },

  // ----------------------------------------------------
  // 11. LOGO_DESIGNS TABLE
  // fields: id, user_id, project_id, brand_name, tagline, style, primary_color,
  //         secondary_color, bg_color, font_family, icon_type, layout, svg_data, saved_at
  // ----------------------------------------------------
  logo_designs: {
    getByUserId: (userId) => getTable('logo_designs').filter(l => l.user_id === userId),
    getLatestByUserId: (userId) => {
      const all = getTable('logo_designs').filter(l => l.user_id === userId);
      return all.length > 0 ? all[all.length - 1] : null;
    },
    save: (logoData) => {
      const list = getTable('logo_designs');
      const newLogo = {
        id: `logo_${Date.now()}`,
        user_id: logoData.user_id || 'guest',
        project_id: logoData.project_id || null,
        brand_name: logoData.brand_name || 'My Brand',
        tagline: logoData.tagline || '',
        style: logoData.style || 'Modern',
        primary_color: logoData.primary_color || '#4f46e5',
        secondary_color: logoData.secondary_color || '#7c3aed',
        bg_color: logoData.bg_color || '#ffffff',
        font_family: logoData.font_family || 'Space Grotesk',
        icon_type: logoData.icon_type || 'rocket',
        layout: logoData.layout || 'icon-left',
        svg_data: logoData.svg_data || '',
        saved_at: new Date().toISOString()
      };
      list.push(newLogo);
      setTable('logo_designs', list);
      DatabaseService.audit_logs.log(logoData.user_id, 'LOGO_SAVED', `logo_designs:${newLogo.id}`);
      return newLogo;
    },
    deleteById: (id) => {
      const list = getTable('logo_designs').filter(l => l.id !== id);
      setTable('logo_designs', list);
    }
  }
};
