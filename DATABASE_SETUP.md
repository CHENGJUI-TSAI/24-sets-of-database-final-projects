DATABASE SETUP — 長者健康追蹤系統

此檔包含三種常見 DB 的建表範例（SQLite / MySQL / PostgreSQL），以及快速建立與匯入指令。表設計以專案中的 ER 概念為基礎：`elders`, `family_applications`, `caregivers`, `users`, `daily_records`, `health_records`, `change_logs`, `activity_items`, `activity_registrations`, `community_sites`。

-- 建議欄位與說明
- `elders`：長者主檔（基本資料、指派照護員）
- `family_applications`：家屬送審申請
- `caregivers`：照護員名冊
- `users`：系統帳號（管理員 / 照護員 / 家屬）
- `daily_records`：照護員每日填報（草稿/送出）
- `health_records`：正式健康檢查紀錄（來自 daily_records 或醫療檢查）
- `change_logs`：長者資料與申請異動紀錄
- `activity_items` / `activity_registrations`：活動與報名
- `community_sites`：據點資料

下面提供 SQL 範例（以通用 SQL 為主，Postgres/MySQL/SQLite 大致相容）：

-- SQLite / MySQL / Postgres CREATE TABLE 範例

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL,
  display_name VARCHAR(200),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE caregivers (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  name VARCHAR(200),
  specialty VARCHAR(200),
  phone VARCHAR(50),
  email VARCHAR(200),
  assigned_clients TEXT
);

CREATE TABLE community_sites (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200),
  phone VARCHAR(50),
  service_scope TEXT,
  address TEXT
);

CREATE TABLE elders (
  id VARCHAR(50) PRIMARY KEY,
  community_site_id VARCHAR(50),
  name VARCHAR(200) NOT NULL,
  age INTEGER,
  phone VARCHAR(50),
  health_status VARCHAR(50),
  family_applicant VARCHAR(100),
  assigned_caregiver VARCHAR(50),
  care_notes TEXT,
  disease_history TEXT,
  allergy_history TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE family_applications (
  id VARCHAR(50) PRIMARY KEY,
  elder_id VARCHAR(50),
  applicant VARCHAR(100),
  client_name VARCHAR(200),
  relation VARCHAR(50),
  age INTEGER,
  phone VARCHAR(50),
  disease_history TEXT,
  allergy_history TEXT,
  care_notes TEXT,
  medication_plan JSON DEFAULT '[]',
  status VARCHAR(50),
  assigned_caregiver VARCHAR(50),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE daily_records (
  id VARCHAR(50) PRIMARY KEY,
  elder_id VARCHAR(50),
  caregiver_id VARCHAR(50),
  client_name VARCHAR(200),
  date DATE,
  temperature VARCHAR(20),
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  sleep_hours NUMERIC,
  exercise_time VARCHAR(100),
  medication_on_time VARCHAR(10),
  medication_time TIME,
  medication_details JSON DEFAULT '[]',
  status VARCHAR(20),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE health_records (
  id VARCHAR(50) PRIMARY KEY,
  elder_id VARCHAR(50),
  caregiver_id VARCHAR(50),
  client_name VARCHAR(200),
  date DATE,
  doctor VARCHAR(200),
  exam_item VARCHAR(200),
  result TEXT,
  check_date DATE,
  care_record_id VARCHAR(50),
  temperature VARCHAR(20),
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  sleep_hours NUMERIC,
  exercise_time VARCHAR(100),
  medication_on_time VARCHAR(10),
  medication_time TIME,
  medication_details JSON DEFAULT '[]',
  status VARCHAR(20),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE change_logs (
  id VARCHAR(50) PRIMARY KEY,
  elder_id VARCHAR(50),
  user_id VARCHAR(100),
  change_item VARCHAR(100),
  change_content TEXT,
  operator VARCHAR(100),
  change_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_items (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200),
  date DATE,
  place VARCHAR(200),
  community_site_id VARCHAR(50),
  capacity INTEGER,
  deadline TIMESTAMP,
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_registrations (
  id VARCHAR(50) PRIMARY KEY,
  activity_id VARCHAR(50),
  elder_id VARCHAR(50),
  username VARCHAR(100),
  participant_name VARCHAR(200),
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50)
);

-- 建表指令範例（SQLite 範例）
-- 建立 sqlite 檔案並匯入 SQL
# 使用 sqlite3
# Windows PowerShell 範例：
# 如果尚未安裝 sqlite3，可以在 https://sqlite.org/ 下載

# 建立 db 檔案
sqlite3 eldercare.db ".read DATABASE_SETUP.sql"

-- MySQL 範例
-- 在 MySQL 伺服器上建立資料庫並匯入
# 登入 MySQL
mysql -u root -p
CREATE DATABASE eldercare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE eldercare;
# 在終端機執行 SQL 檔案
mysql -u root -p eldercare < DATABASE_SETUP.sql

-- PostgreSQL 範例
# 建立資料庫並匯入
createdb eldercare
psql -d eldercare -f DATABASE_SETUP.sql

範例種子資料（可選）
INSERT INTO users (username, password, role, display_name, phone) VALUES ('admin', 'admin123', '管理員', '系統管理員', '');
INSERT INTO caregivers (id, username, name, specialty, phone, email) VALUES ('care-1','care1','林小美','失智專長','0911-205-168','care1@eldercare.local');
INSERT INTO community_sites (id, name, phone, service_scope, address) VALUES ('site-1','社區活動中心','02-1234-5678','日間照顧','信義路 10 號');

INSERT INTO elders (id, community_site_id, name, age, phone, health_status, family_applicant) VALUES ('E001','site-1','陳阿姨',78,'0912-345-678','待審核','family');

示意備註
- `JSON` 欄位在 SQLite 及 MySQL / Postgres 支援程度不同，必要時可改成 TEXT 存 JSON 字串。
- 欄位型別與約束（FOREIGN KEY）可依實際 DB 調整並加入索引以優化查詢。

下一步建議
- 若要我幫你：我可以
  - 產生 `DATABASE_SETUP.sql` 檔（含上面 CREATE TABLE 與 seed），
  - 並修改 `server.js` 加入簡單的 REST API 並示範如何使用 SQLite 儲存資料。

