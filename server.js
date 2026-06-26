const express = require('express');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Database file (SQLite)
const dbFile = process.env.DB_FILE || path.join(__dirname, 'eldercare.db');
const db = new Database(dbFile);

// If schema file exists and DB has no elders table, try to initialize
try {
  const row = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='elders'").get();
  if (!row) {
    const schemaPath = path.join(__dirname, 'DATABASE_SETUP.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      db.exec(sql);
      console.log('Initialized database from DATABASE_SETUP.sql');
    } else {
      console.log('No schema found and elders table missing. Create tables manually or provide DATABASE_SETUP.sql');
    }
  }
} catch (err) {
  console.error('DB init error:', err.message);
}

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// Basic API endpoints

app.get('/api/elders', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM elders ORDER BY created_at DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/elders/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM elders WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/familyApplications', (req, res) => {
  try {
    const body = req.body || {};
    const elderId = body.elderId || `E${Date.now()}`;
    // ensure elder exists (minimal)
    const existing = db.prepare('SELECT id FROM elders WHERE id = ?').get(elderId);
    if (!existing) {
      db.prepare('INSERT INTO elders (id, community_site_id, name, age, phone, health_status, family_applicant, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime("now"))')
        .run(elderId, body.communitySiteId || null, body.clientName || '', body.age || null, body.phone || '', '待審核', body.applicant || null);
    }
    const appId = `A${Date.now()}`;
    db.prepare('INSERT INTO family_applications (id, elder_id, applicant, client_name, relation, age, phone, disease_history, allergy_history, care_notes, medication_plan, status, assigned_caregiver, submitted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime("now"))')
      .run(appId, elderId, body.applicant || null, body.clientName || null, body.relation || null, body.age || null, body.phone || null, body.diseaseHistory || null, body.allergyHistory || null, body.careNotes || null, JSON.stringify(body.medicationPlan || []), '待審核', null);
    res.json({ success: true, applicationId: appId, elderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/healthRecords', (req, res) => {
  try {
    const { elderId, caregiverId } = req.query;
    let sql = 'SELECT * FROM health_records';
    const params = [];
    const conditions = [];
    if (elderId) { conditions.push('elder_id = ?'); params.push(elderId); }
    if (caregiverId) { conditions.push('caregiver_id = ?'); params.push(caregiverId); }
    if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
    sql += ' ORDER BY check_date DESC, updated_at DESC';
    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/healthRecords', (req, res) => {
  try {
    const body = req.body || {};
    const id = `H${Date.now()}`;
    db.prepare('INSERT INTO health_records (id, elder_id, caregiver_id, client_name, date, doctor, exam_item, result, check_date, care_record_id, temperature, breakfast, lunch, dinner, sleep_hours, exercise_time, medication_on_time, medication_time, medication_details, status, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime("now"))')
      .run(id, body.elderId || null, body.caregiverId || null, body.clientName || null, body.date || null, body.doctor || null, body.examItem || null, body.result || null, body.checkDate || body.date || null, body.careRecordId || null, body.temperature || null, body.breakfast || null, body.lunch || null, body.dinner || null, body.sleepHours || null, body.exerciseTime || null, body.medicationOnTime || null, body.medicationTime || null, JSON.stringify(body.medicationDetails || []), body.status || '已送出');
    res.json({ success: true, recordId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/changeLogs', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM change_logs ORDER BY change_time DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
