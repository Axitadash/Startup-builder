-- VentureForge AI - Database Schema DDL
-- Database Design based on Specification Table

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(100) DEFAULT 'Candidate Founder',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(150),
  idea TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Project Inputs Table
CREATE TABLE IF NOT EXISTS project_inputs (
  project_id VARCHAR(64) PRIMARY KEY,
  target_market VARCHAR(255),
  budget VARCHAR(100),
  location VARCHAR(255),
  goals TEXT,
  constraints TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 4. Analyses Table
CREATE TABLE IF NOT EXISTS analyses (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  module VARCHAR(100),
  input_version VARCHAR(50) DEFAULT 'v1.0',
  output_json TEXT,
  status VARCHAR(50) DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 5. Personas Table
CREATE TABLE IF NOT EXISTS personas (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  demographics TEXT,
  pain_points TEXT,
  motivations TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 6. Competitors Table
CREATE TABLE IF NOT EXISTS competitors (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  strengths TEXT,
  weaknesses TEXT,
  notes TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 7. Financial Models Table
CREATE TABLE IF NOT EXISTS financial_models (
  project_id VARCHAR(64) PRIMARY KEY,
  pricing TEXT,
  costs TEXT,
  revenue_assumptions TEXT,
  scenarios TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 8. Roadmaps Table
CREATE TABLE IF NOT EXISTS roadmaps (
  project_id VARCHAR(64) PRIMARY KEY,
  phase VARCHAR(100),
  feature TEXT,
  priority VARCHAR(50),
  timeline VARCHAR(100),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 9. Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id VARCHAR(64) PRIMARY KEY,
  project_id VARCHAR(64) NOT NULL,
  type VARCHAR(100),
  file_path VARCHAR(255),
  version VARCHAR(50) DEFAULT '1.0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 10. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64),
  action VARCHAR(255) NOT NULL,
  resource VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for Fast Querying
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_project_id ON analyses(project_id);
CREATE INDEX IF NOT EXISTS idx_personas_project_id ON personas(project_id);
CREATE INDEX IF NOT EXISTS idx_competitors_project_id ON competitors(project_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
