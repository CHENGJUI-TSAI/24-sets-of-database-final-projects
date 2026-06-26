-- DATABASE_SETUP.sql
-- SQLite-compatible schema and seed data for 長者健康追蹤系統
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  display_name TEXT,
  phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- caregivers
CREATE TABLE IF NOT EXISTS caregivers (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE,
  name TEXT,
  specialty TEXT,
  suitable TEXT,
  phone TEXT,
  email TEXT,
  assigned_clients TEXT
);

-- community_sites
CREATE TABLE IF NOT EXISTS community_sites (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  service_scope TEXT,
  address TEXT
);

-- elders (長者主檔)
CREATE TABLE IF NOT EXISTS elders (
  id TEXT PRIMARY KEY,
  community_site_id TEXT REFERENCES community_sites(id),
  name TEXT NOT NULL,
  age INTEGER,
  phone TEXT,
  health_status TEXT,
  family_applicant TEXT,
  assigned_caregiver TEXT REFERENCES caregivers(id),
  care_notes TEXT,
  disease_history TEXT,
  allergy_history TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- family_applications (家屬申請)
CREATE TABLE IF NOT EXISTS family_applications (
  id TEXT PRIMARY KEY,
  elder_id TEXT REFERENCES elders(id),
  applicant TEXT,
  client_name TEXT,
  relation TEXT,
  age INTEGER,
  phone TEXT,
  disease_history TEXT,
  allergy_history TEXT,
  care_notes TEXT,
  medication_plan TEXT DEFAULT '[]', -- JSON stored as TEXT
  status TEXT,
  assigned_caregiver TEXT REFERENCES caregivers(id),
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- daily_records (照護員每日填報，草稿或送出)
CREATE TABLE IF NOT EXISTS daily_records (
  id TEXT PRIMARY KEY,
  elder_id TEXT REFERENCES elders(id),
  caregiver_id TEXT,
  client_name TEXT,
  date TEXT,
  temperature TEXT,
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  sleep_hours REAL,
  exercise_time TEXT,
  medication_on_time TEXT,
  medication_time TEXT,
  medication_details TEXT DEFAULT '[]', -- JSON as TEXT
  status TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- health_records (正式健康紀錄)
CREATE TABLE IF NOT EXISTS health_records (
  id TEXT PRIMARY KEY,
  elder_id TEXT REFERENCES elders(id),
  caregiver_id TEXT,
  client_name TEXT,
  date TEXT,
  doctor TEXT,
  exam_item TEXT,
  result TEXT,
  check_date TEXT,
  care_record_id TEXT,
  temperature TEXT,
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  sleep_hours REAL,
  exercise_time TEXT,
  medication_on_time TEXT,
  medication_time TEXT,
  medication_details TEXT DEFAULT '[]',
  status TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- change_logs (異動紀錄)
CREATE TABLE IF NOT EXISTS change_logs (
  id TEXT PRIMARY KEY,
  elder_id TEXT REFERENCES elders(id),
  user_id TEXT,
  change_item TEXT,
  change_content TEXT,
  operator TEXT,
  change_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- activity_items
CREATE TABLE IF NOT EXISTS activity_items (
  id TEXT PRIMARY KEY,
  title TEXT,
  date TEXT,
  place TEXT,
  community_site_id TEXT REFERENCES community_sites(id),
  capacity INTEGER,
  deadline TEXT,
  created_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- activity_registrations
CREATE TABLE IF NOT EXISTS activity_registrations (
  id TEXT PRIMARY KEY,
  activity_id TEXT REFERENCES activity_items(id),
  elder_id TEXT REFERENCES elders(id),
  username TEXT,
  participant_name TEXT,
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT
);

-- Seed: basic data
INSERT INTO users (username, password, role, display_name, phone) VALUES ('admin','admin123','管理員','系統管理員','');
INSERT INTO users (username, password, role, display_name, phone) VALUES ('family','family123','家屬','家屬帳號','');

INSERT INTO caregivers (id, username, name, specialty, suitable, phone, email, assigned_clients) VALUES ('care-1','care1','林小美','失智專長','情緒安穩、記憶支持長者','0911-205-168','care1@eldercare.local','[]');

INSERT INTO community_sites (id, name, phone, service_scope, address) VALUES ('site-1','社區活動中心','02-1234-5678','日間照顧、健康講座、復健課程','信義路 10 號');

INSERT INTO elders (id, community_site_id, name, age, phone, health_status, family_applicant) VALUES ('E001','site-1','陳阿姨',78,'0912-345-678','待審核','family');

INSERT INTO family_applications (id, elder_id, applicant, client_name, relation, age, phone, disease_history, allergy_history, care_notes, medication_plan, status, assigned_caregiver) VALUES ('A001','E001','family','陳阿姨','母親',78,'0912-345-678','高血壓','青黴素過敏','需要每日測量血壓','[]','待審核',NULL);

COMMIT;

-- 使用說明：
-- SQLite（檔案：eldercare.db）
-- sqlite3 eldercare.db < DATABASE_SETUP.sql

-- MySQL / Postgres：請參考 DATABASE_SETUP.md，或將此檔案內容調整為目標 DB 的自動增量語法（例如 SERIAL / AUTO_INCREMENT）。
