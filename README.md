# 長者健康追蹤系統（動態網站部署與整合說明）

簡介
- 本專案包含前端 UI（`index.html`、`styles.css`、`script.js`）與一個簡易 `Express` 伺服器（`server.js`）。
- 初始版本以瀏覽器 `localStorage` 作為資料存放，為方便部署與測試，我們已提供可將專案升級成「動態網站」的指引與 SQL 檔（`DATABASE_SETUP.sql` / `DATABASE_SETUP.md`）。

目的
- 讓你能快速把本專案轉成動態應用：後端 Node.js + 資料庫（SQLite / MySQL / PostgreSQL），並提供 REST API 供前端呼叫。

目錄重點
- `index.html`：前端單頁應用
- `script.js`：前端邏輯（目前使用 localStorage，建議改為呼叫 API）
- `server.js`：目前為靜態伺服器，可延伸為動態 API
- `DATABASE_SETUP.sql` / `DATABASE_SETUP.md`：資料庫 schema 與匯入說明
- `.gitignore`：已包含常見忽略項目

快速安裝（本機測試，Node + SQLite）
1. 安裝 Node 依賴
```bash
npm install
# 建議安裝 SQLite 驅動（server 端示例會用 better-sqlite3）
npm install better-sqlite3
```

2. 建立 SQLite DB 並匯入 schema（使用專案 `DATABASE_SETUP.sql`）
```bash
sqlite3 eldercare.db < DATABASE_SETUP.sql
```

3. 啟動伺服器
```bash
npm start
# 預設： http://localhost:3000
```

將前端改為呼叫 API（關鍵步驟）
1. 建立後端 API（範例端點，請在 `server.js` 實作）：
   - GET /api/elders
   - GET /api/elders/:id
   - POST /api/familyApplications
   - GET /api/healthRecords?elderId=...
   - POST /api/healthRecords
   - GET /api/changeLogs
2. 把原本在 `script.js` 中直接讀寫 `localStorage` 的部分改成非同步 fetch/axios 呼叫 API，範例：
```js
// 取得長者清單
const resp = await fetch('/api/elders');
const elders = await resp.json();

// 新增健康紀錄
await fetch('/api/healthRecords', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ elderId: 'E001', caregiverId: 'care-1', doctor: '李醫師', examItem: '血壓', result: '正常' })
});
```

後端實作建議（兩種選項）
- 選項 A（快速）：使用 `better-sqlite3` 在 `server.js` 中直接操作 SQLite，簡單、易上手，適合小型測試與單機部署。
- 選項 B（正式）：使用 `knex` 或 ORM（`sequelize` / `typeorm`）搭配 migration 與 seed，方便未來切換至 MySQL/Postgres 並管理 schema。

API 範例（JSON 輸入/輸出）
- POST /api/familyApplications
  請求 body 範例：{ applicant, clientName, relation, age, phone, diseaseHistory, allergyHistory, careNotes }
  回應：{ success: true, applicationId: 'A001' }

- POST /api/healthRecords
  請求 body 範例：{ elderId, caregiverId, doctor, examItem, result, medicationDetails }
  回應：{ success: true, recordId: 'H001' }

如何在本機測試 API（curl 範例）
```bash
# 取得長者清單
curl http://localhost:3000/api/elders

# 新增健康紀錄
curl -X POST http://localhost:3000/api/healthRecords \
  -H "Content-Type: application/json" \
  -d '{"elderId":"E001","caregiverId":"care-1","doctor":"李醫師","examItem":"血壓","result":"正常"}'
```

資料庫檔案與環境變數
- 本地測試：使用 `eldercare.db`（SQLite 檔案）
- 生產環境：請使用 Postgres/MySQL 等關聯式 DB，並透過 `DATABASE_URL` / `DB_HOST` / `DB_USER` 等環境變數管理連線

部署建議
- 小型測試：直接在 VM 或自己的伺服器上執行 Node 與 SQLite
- 產品環境：使用 Postgres 並搭配遷移工具、連線池與監控（例如 PM2、Docker、CI）

下一步我可以幫你做的事（擇一）
- A：在 `server.js` 使用 `better-sqlite3` 實作基本 REST API（快速完成、單檔、同步操作）
- B：加入 `knex`、建立 migration 與 seed，並改寫 `server.js` 使用 `knex`（較正式、易切換 DB）

請回覆 A 或 B，我就開始實作，並會把變動（新增套件、修改 `server.js`、新增範例 API 測試步驟）一併完成。
