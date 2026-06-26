const calendar = document.getElementById('calendar');
const riskTableBody = document.getElementById('riskTableBody');
const announcementList = document.getElementById('announcementList');
const statAlerts = document.getElementById('statAlerts');
const statPending = document.getElementById('statPending');
const statEvents = document.getElementById('statEvents');
const statNotices = document.getElementById('statNotices');
const caseSummary = document.getElementById('caseSummary');
const caseList = document.getElementById('caseList');
const modalOverlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const actionButtons = document.querySelectorAll('.action-item');
const navButtons = document.querySelectorAll('.nav-item');
const themeToggle = document.getElementById('themeToggle');
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginCancel = document.getElementById('loginCancel');
const loginCancelButton = document.getElementById('loginCancelButton');
const registerOverlay = document.getElementById('registerOverlay');
const registerForm = document.getElementById('registerForm');
const registerUsername = document.getElementById('registerUsername');
const registerPassword = document.getElementById('registerPassword');
const registerDisplayName = document.getElementById('registerDisplayName');
const registerPhone = document.getElementById('registerPhone');
const registerCancel = document.getElementById('registerCancel');
const registerCancelButton = document.getElementById('registerCancelButton');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const familyApplicationSection = document.getElementById('familyApplicationSection');
const familyApplicationList = document.getElementById('familyApplicationList');
const familyRecordList = document.getElementById('familyRecordList');
const adminApplications = document.getElementById('adminApplications');
const adminRecordList = document.getElementById('adminRecordList');
const adminChangeLogList = document.getElementById('adminChangeLogList');
const caregiverOverview = document.getElementById('caregiverOverview');
const dailyRecordSection = document.getElementById('dailyRecordSection');
const dailyRecordList = document.getElementById('dailyRecordList');
const careAssignments = document.getElementById('careAssignments');
const homeDashboardContent = document.getElementById('homeDashboardContent');
const homeGuestIntro = document.getElementById('homeGuestIntro');
const topbarSelect = document.getElementById('topbarSelect');
const customDropdown = document.getElementById('customDropdown');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownItems = document.getElementById('dropdownItems');
const notificationButton = document.getElementById('notificationButton');
const notificationPanel = document.getElementById('notificationPanel');
const notificationList = document.getElementById('notificationList');
const notificationBadge = document.getElementById('notificationBadge');
const messageButton = document.getElementById('messageButton');
const messagePanel = document.getElementById('messagePanel');
const messageList = document.getElementById('messageList');
const messageBadge = document.getElementById('messageBadge');

const topbarNavigationOptions = [
  { value: 'homePage', label: '首頁' },
  { value: 'elderDataPage', label: '長者資料管理' },
  { value: 'healthRecordsPage', label: '健康紀錄管理' },
  { value: 'careServicesPage', label: '照護服務管理' },
  { value: 'activityPage', label: '活動參與管理' },
  { value: 'changesPage', label: '異動管理' },
  { value: 'familyPage', label: '家屬專區' },
  { value: 'contactPage', label: '聯絡我們' },
];

let currentRiskData = [];
let currentCaseData = [];
let currentAnnouncementData = [];
let currentUser = null;
let currentPage = 'homePage';
let familyApplications = [];
let applicationCounter = 1;
let elders = [];
let elderCounter = 1;
let dailyRecords = [];
let dailyRecordCounter = 1;
let healthRecords = [];
let healthRecordCounter = 1;
let changeLogs = [];
let changeLogCounter = 1;
let registeredUsers = [];
let activityItems = [];
let activityRegistrations = [];
let calendarViewDate = new Date();

const communitySites = [
  { id: 'site-1', name: '社區活動中心', phone: '02-1234-5678', serviceScope: '日間照顧、健康講座、復健課程', address: '信義路 10 號' },
  { id: 'site-2', name: '健康教室 A', phone: '02-2345-6789', serviceScope: '慢性疾病管理、用藥諮詢', address: '仁愛路 20 號' },
  { id: 'site-3', name: '銀髮共融館', phone: '02-3456-7890', serviceScope: '活動促進、社區互動', address: '忠孝東路 30 號' },
];

const baseUsers = [
  { username: 'admin', password: 'admin123', role: '管理員' },
  { username: 'care1', password: 'care123', role: '照護員' },
  { username: 'care2', password: 'care123', role: '照護員' },
  { username: 'care3', password: 'care123', role: '照護員' },
  { username: 'care4', password: 'care123', role: '照護員' },
  { username: 'care5', password: 'care123', role: '照護員' },
  { username: 'family', password: 'family123', role: '家屬' },
];

const caregivers = [
  { id: 'care-1', username: 'care1', name: '林小美', specialty: '失智專長', suitable: '情緒安穩、記憶支持長者', phone: '0911-205-168', email: 'care1@eldercare.local', assignedClients: [] },
  { id: 'care-2', username: 'care2', name: '陳大傑', specialty: '慢性病管理', suitable: '糖尿病、高血壓長者', phone: '0922-316-280', email: 'care2@eldercare.local', assignedClients: [] },
  { id: 'care-3', username: 'care3', name: '吳雅玲', specialty: '復健照護', suitable: '行動不便、復健照護長者', phone: '0933-427-392', email: 'care3@eldercare.local', assignedClients: [] },
  { id: 'care-4', username: 'care4', name: '張志豪', specialty: '復健與營養', suitable: '需要復健與飲食控制長者', phone: '0966-538-416', email: 'care4@eldercare.local', assignedClients: [] },
  { id: 'care-5', username: 'care5', name: '王淑芬', specialty: '藥物管理', suitable: '需複雜用藥與過敏追蹤者', phone: '0988-649-527', email: 'care5@eldercare.local', assignedClients: [] },
];

const supportItems = [
  { label: '服務時間', value: '週一至週五 09:00-18:00' },
  { label: '客服電話', value: '02-1234-5678' },
  { label: '電子信箱', value: 'support@eldercare.local' },
  { label: '緊急聯絡', value: '請撥 119 或通知個案管理師' },
];

const pagePermissions = {
  elderDataPage: ['管理員', '照護員'],
  healthRecordsPage: ['管理員', '照護員'],
  careServicesPage: ['管理員', '照護員', '家屬'],
  activityPage: ['管理員', '照護員', '家屬'],
  changesPage: ['管理員'],
  familyPage: ['管理員', '家屬'],
  contactPage: ['管理員', '照護員', '家屬'],
};

function updateAuthDisplay() {
  if (currentUser) {
    loginButton.textContent = '登出';
    if (registerButton) registerButton.style.display = 'none';
    profileName.textContent = currentUser.username;
    profileRole.textContent = currentUser.role;
  } else {
    loginButton.textContent = '登入';
    if (registerButton) registerButton.style.display = '';
    profileName.textContent = '訪客';
    profileRole.textContent = '尚未登入';
  }
  updateNavItems();
  renderNotificationCenter();
  const activePage = currentPage || 'homePage';
  if (!canAccess(activePage)) {
    showPage('homePage');
    return;
  }
  updateTopbarOptions();
  if (activePage === 'homePage') {
    renderHomePage();
  }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? '日間' : '夜間';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
  localStorage.setItem('themeMode', theme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(nextTheme);
}

function updateNavItems() {
  navButtons.forEach((button) => {
    const pageId = button.dataset.page;
    button.classList.toggle('hidden', !canAccess(pageId));
  });
  actionButtons.forEach((button) => {
    const actionPage = button.dataset.action;
    if (!actionPage) return;
    button.classList.toggle('hidden', !canAccess(actionPage));
  });
}

function showPage(pageId) {
  currentPage = pageId;
  document.querySelectorAll('.page-panel').forEach((panel) => {
    panel.classList.toggle('hidden', panel.id !== pageId);
  });
  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageId);
  });
  if (topbarSelect) topbarSelect.value = pageId;
  
  // 更新自定義下拉選單的顯示標籤
  if (dropdownToggle) {
    const allItems = dropdownItems?.querySelectorAll('.dropdown-item') || [];
    allItems.forEach(item => item.classList.remove('selected'));
    const selectedItem = dropdownItems?.querySelector(`[data-value="${pageId}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
      const labelSpan = dropdownToggle.querySelector('.dropdown-label');
      if (labelSpan) labelSpan.textContent = selectedItem.textContent;
    }
  }
  
  renderPageContent(pageId);
}

function renderPageContent(pageId) {
  if (pageId === 'homePage') {
    renderHomePage();
  } else if (pageId === 'elderDataPage') {
    renderElderDataPage();
  } else if (pageId === 'healthRecordsPage') {
    renderHealthRecordsPage();
  } else if (pageId === 'activityPage') {
    renderActivityPage();
  } else if (pageId === 'familyPage') {
    renderFamilyPage();
  } else if (pageId === 'changesPage') {
    renderAdminApplications();
  } else if (pageId === 'careServicesPage') {
    renderCareServicesPage();
  } else if (pageId === 'contactPage') {
    renderContactPage();
  }
}

function renderHomePage() {
  if (!homeDashboardContent || !homeGuestIntro) return;
  const isGuest = !currentUser;
  homeDashboardContent.style.display = isGuest ? 'none' : '';
  homeGuestIntro.style.display = isGuest ? 'block' : 'none';
}

function getPageCard(pageId) {
  return document.querySelector(`#${pageId} .page-card`);
}

function getStatusClass(status) {
  if (status === '高風險' || status === '已拒絕' || status === '已額滿' || status === '已截止') return 'tag-danger';
  if (status === '注意' || status === '名額有限' || status === '待審核' || status === '待紀錄') return 'tag-warning';
  return 'tag-success';
}

function renderElderDataPage() {
  const card = getPageCard('elderDataPage');
  if (!card) return;
  const elderItems = getVisibleElders();
  const emptyMessage = currentUser?.role === '管理員'
    ? '目前沒有任何長者資料。'
    : currentUser?.role === '照護員'
      ? '目前沒有已分配給你的長者。'
      : '目前沒有你的申請長者資料。';
  card.innerHTML = `
    <div class="page-intro">
      <p>長者資料已從家屬申請建立，管理員審核通過後會顯示分配照護員與最新健康狀態。</p>
      <button class="primary-button" data-modal-title="新增長者資料" data-modal-message="長者資料請由家屬帳號在家屬專區提交申請；管理員審核後會自動形成正式資料。">新增資料</button>
    </div>
    ${elderItems.length === 0 ? `<div class="empty-panel">${emptyMessage}</div>` : `
      <div class="data-grid">
        ${elderItems.map((elder) => {
          const status = elder.healthStatus || '待審核';
          return `
        <article class="data-card">
          <div class="data-card-head">
            <div>
              <strong>${elder.name}</strong>
              <span>${elder.id} / ${elder.age} 歲 / 申請人：${getFamilyDisplayName(elder.familyApplicant)}</span>
            </div>
            <span class="tag ${getStatusClass(status)}">${status}</span>
          </div>
          <dl>
            <div><dt>照護需求</dt><dd>${elder.careNotes}</dd></div>
            <div><dt>病史</dt><dd>${elder.diseaseHistory}</dd></div>
            <div><dt>過敏史</dt><dd>${elder.allergyHistory}</dd></div>
            <div><dt>指派照護員</dt><dd>${elder.assignedCaregiver ? getAssignedCaregiverName(elder.assignedCaregiver) : '尚未指派'}</dd></div>
            <div><dt>緊急聯絡</dt><dd>${elder.phone}</dd></div>
          </dl>
        </article>
      `;
        }).join('')}
      </div>
    `}
  `;
  bindInlineModalButtons(card);
}

function getVisibleElders() {
  if (!currentUser) return [];
  if (currentUser.role === '管理員') return elders;
  if (currentUser.role === '照護員') {
    const caregiver = caregivers.find((item) => item.username === currentUser.username);
    if (!caregiver) return [];
    return elders.filter((elder) => elder.assignedCaregiver === caregiver.id);
  }
  if (currentUser.role === '家屬') {
    return elders.filter((elder) => elder.familyApplicant === currentUser.username);
  }
  return [];
}

function renderHealthRecordsPage() {
  const card = getPageCard('healthRecordsPage');
  if (!card) return;
  const records = healthRecords
    .filter((record) => {
      if (currentUser?.role === '管理員') return true;
      if (currentUser?.role === '照護員') {
        const caregiver = caregivers.find((item) => item.username === currentUser.username);
        return caregiver ? record.caregiverId === caregiver.id : false;
      }
      if (currentUser?.role === '家屬') {
        const elder = getElderById(record.elderId);
        return elder?.familyApplicant === currentUser.username;
      }
      return false;
    })
    .sort((a, b) => b.checkDate.localeCompare(a.checkDate) || a.id.localeCompare(b.id));

  card.innerHTML = `
    <div class="page-intro">
      <p>檢視正式醫療與健康檢查紀錄；每筆紀錄對應長者與檢查項目，並紀錄醫師與結果。</p>
      <button class="primary-button" data-modal-title="新增健康紀錄" data-modal-message="健康紀錄請由照護員或管理員建立；內容會保存為正式健康資料。">新增紀錄</button>
    </div>
    ${records.length === 0 ? '<div class="empty-panel">目前尚未有任何健康紀錄。</div>' : `
      <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>紀錄編號</th>
            <th>長者</th>
            <th>醫師</th>
            <th>檢查日期</th>
            <th>檢查項目</th>
            <th>結果</th>
            <th>關聯照護紀錄</th>
          </tr>
        </thead>
        <tbody>
          ${records.map((record) => `
            <tr>
              <td>${record.id}</td>
              <td>${getElderById(record.elderId)?.name || '-'}</td>
              <td>${record.doctor || '-'}</td>
              <td>${record.checkDate || '-'}</td>
              <td>${record.examItem || '-'}</td>
              <td>${record.result || '-'}</td>
              <td>${record.careRecordId || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `}
  `;
  bindInlineModalButtons(card);
}

function renderActivityPage() {
  const card = getPageCard('activityPage');
  if (!card) return;
  const sortedActivities = activityItems.slice().sort((a, b) => a.date.localeCompare(b.date));
  const eligibleParticipants = getEligibleActivityParticipants();
  const canSubmitRegistration = currentUser && ['照護員', '家屬'].includes(currentUser.role) && eligibleParticipants.length > 0;
  card.innerHTML = `
    <div class="page-intro">
      <p>查看本月社區活動、實際報名人數與參與狀態；活動由家屬或照護員替長者報名，管理員僅能查看。</p>
    </div>
    ${sortedActivities.length === 0 ? '<div class="empty-panel">目前尚未建立活動。</div>' : `
    <div class="activity-list">
      ${sortedActivities.map((activity) => {
        const joined = getActivityRegistrationCount(activity.id);
        const status = getActivityStatus(activity);
        const expired = isActivityRegistrationClosed(activity);
        const registeredParticipants = getActivityRegistrations(activity.id);
        const availableParticipants = eligibleParticipants.filter((participant) => !hasRegisteredActivity(activity.id, participant.name));
        const registeredCount = registeredParticipants.length;
        const allAvailableRegistered = eligibleParticipants.length > 0 && availableParticipants.length === 0;
        const siteName = getCommunitySiteName(activity.communitySiteId);
        const canRegister = canSubmitRegistration && status !== '已額滿' && !expired && availableParticipants.length > 0;
        const buttonLabel = allAvailableRegistered ? '已報名' : expired ? '已截止' : status === '已額滿' ? '已額滿' : '長者報名';
        const progressPercent = activity.capacity > 0 ? Math.min(100, Math.round((joined / activity.capacity) * 100)) : 0;
        const statusLabel = registeredCount > 0
          ? `已報名 ${registeredCount} 人`
          : expired ? '已截止' : status;
        const participantNames = registeredParticipants.map((participant) => participant.participantName);
        const participantInfo = participantNames.length > 0 ? `報名名單：${participantNames.join('、')}` : '尚無報名者。';
        return `
        <article class="activity-item">
          <div class="activity-main">
            <h3>${activity.title}</h3>
            <p>${activity.date} / ${activity.place}</p>
            <p>${siteName ? `據點：${siteName}` : ''}</p>
            <p class="activity-deadline">報名截止：${getActivityDeadline(activity)}</p>
          </div>
          <div class="activity-progress">
            <div class="activity-progress-top">
              <strong>${joined}/${activity.capacity}</strong>
              <span>已報名人數</span>
            </div>
            <div class="progress-track"><span style="width:${progressPercent}%"></span></div>
            <span class="activity-status-pill ${registeredCount > 0 ? 'registered' : getStatusClass(expired ? '已截止' : status)}">${statusLabel}</span>
          </div>
          <div class="activity-side">
            <div class="activity-actions">
              ${currentUser?.role === '管理員' ? `<div class="activity-admin-participants"><small>${participantInfo}</small></div>` : `
                <select class="activity-participant-select" data-activity-select="${activity.id}" ${canRegister ? '' : 'disabled'}>
                  ${eligibleParticipants.length === 0 ? '<option value="">沒有可報名長者</option>' : availableParticipants.length === 0 ? '<option value="">可報名長者皆已報名</option>' : availableParticipants.map((participant) => `
                    <option value="${participant.name}">${participant.name}</option>
                  `).join('')}
                </select>
                <button class="primary-button" data-activity-register="${activity.id}" ${canRegister ? '' : 'disabled'}>${buttonLabel}</button>
              `}
              <button class="secondary-button" data-modal-title="${activity.title}" data-modal-message="日期：${activity.date}；地點：${activity.place}；目前報名 ${joined}/${activity.capacity} 人。${currentUser?.role === '管理員' ? ' ' + participantInfo : ''}">查看</button>
            </div>
          </div>
        </article>
      `;
      }).join('')}
    </div>
    `}
  `;
  bindInlineModalButtons(card);
  card.querySelectorAll('[data-activity-register]').forEach((button) => {
    button.addEventListener('click', () => {
      const select = card.querySelector(`[data-activity-select="${button.dataset.activityRegister}"]`);
      registerActivity(button.dataset.activityRegister, select?.value || '');
    });
  });
}

function renderContactPage() {
  const card = getPageCard('contactPage');
  if (!card) return;
  card.innerHTML = `
    <div class="page-intro">
      <p>需要系統協助、資料異常處理或服務諮詢時，可透過以下管道聯絡支援窗口。</p>
    </div>
    <div class="support-grid">
      ${supportItems.map((item) => `
        <article class="support-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `).join('')}
    </div>
    <form class="contact-form" id="contactForm">
      <label>
        主旨
        <input name="subject" required placeholder="請輸入問題主旨" />
      </label>
      <label>
        內容
        <textarea name="message" rows="4" required placeholder="請簡述需要協助的內容"></textarea>
      </label>
      <button type="submit" class="primary-button">送出訊息</button>
    </form>
  `;
  document.getElementById('contactForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.reset();
    openModal('已送出', '您的訊息已送出，支援人員會盡快回覆。');
  });
}

function bindInlineModalButtons(scope) {
  scope.querySelectorAll('[data-modal-title]').forEach((button) => {
    button.addEventListener('click', () => {
      openModal(button.dataset.modalTitle, button.dataset.modalMessage || '功能已啟動。');
    });
  });
}

function updateTopbarOptions() {
  if (!dropdownToggle || !dropdownItems) return;
  let options = [];
  let role = currentUser?.role;
  // 訪客不顯示下拉選單
  if (!role) {
    customDropdown.style.display = 'none';
    return;
  }
  // 管理員
  if (role === '管理員') {
    options = [
      { value: 'homePage', label: '首頁' },
      { value: 'elderDataPage', label: '長者資料管理' },
      { value: 'healthRecordsPage', label: '健康紀錄管理' },
      { value: 'careServicesPage', label: '照護服務管理' },
      { value: 'activityPage', label: '活動參與管理' },
      { value: 'changesPage', label: '異動管理' },
      { value: 'familyPage', label: '家屬專區' },
      { value: 'contactPage', label: '聯絡我們' },
    ];
  } else if (role === '照護員') {
    options = [
      { value: 'homePage', label: '首頁' },
      { value: 'elderDataPage', label: '長者資料管理' },
      { value: 'healthRecordsPage', label: '健康紀錄管理' },
      { value: 'careServicesPage', label: '照護服務管理' },
      { value: 'activityPage', label: '活動參與管理' },
      { value: 'contactPage', label: '聯絡我們' },
    ];
  } else if (role === '家屬') {
    options = [
      { value: 'homePage', label: '首頁' },
      { value: 'careServicesPage', label: '照護服務管理' },
      { value: 'activityPage', label: '活動參與管理' },
      { value: 'familyPage', label: '家屬專區' },
      { value: 'contactPage', label: '聯絡我們' },
    ];
  }
  
  // 更新自定義下拉選單
  dropdownItems.innerHTML = options.map((item) => {
    const isSelected = item.value === (currentPage || 'homePage') ? 'selected' : '';
    return `<button class="dropdown-item ${isSelected}" data-value="${item.value}">${item.label}</button>`;
  }).join('');
  
  // 更新顯示的標籤
  const currentLabel = options.find(opt => opt.value === (currentPage || 'homePage'))?.label || '選擇頁面';
  const labelSpan = dropdownToggle.querySelector('.dropdown-label');
  if (labelSpan) labelSpan.textContent = currentLabel;
  
  customDropdown.style.display = '';
}

function canAccess(pageId) {
  if (pageId === 'homePage') return true;
  if (!currentUser) return false;
  const allowed = pagePermissions[pageId] || [];
  return allowed.includes(currentUser.role);
}

function getAssignedCaregiverName(assignedId) {
  const care = caregivers.find((item) => item.id === assignedId);
  return care ? care.name : '-';
}

function getAllUsers() {
  return [...baseUsers, ...registeredUsers];
}

function getElderById(id) {
  return elders.find((elder) => elder.id === id);
}

function getCommunitySiteById(id) {
  return communitySites.find((site) => site.id === id) || null;
}

function getCommunitySiteName(id) {
  const site = getCommunitySiteById(id);
  return site ? site.name : '-';
}

function addChangeLog({ elderId, userId, changeContent, operator, changeItem }) {
  const log = {
    id: `CHG-${String(changeLogCounter).padStart(3, '0')}`,
    elderId,
    userId,
    changeContent,
    changeTime: formatDateTime(new Date()),
    operator,
    changeItem,
  };
  changeLogs.unshift(log);
  changeLogCounter += 1;
  return log;
}

function getFamilyUsers() {
  return getAllUsers().filter((user) => user.role === '家屬');
}

function getFamilyDisplayName(username) {
  const user = getAllUsers().find((item) => item.username === username);
  return user?.displayName || username;
}

function getFamilyApplicationSummary() {
  return getFamilyUsers().map((user) => {
    const applications = familyApplications.filter((item) => item.applicant === user.username);
    return {
      username: user.username,
      displayName: user.displayName || user.username,
      phone: user.phone || '-',
      total: applications.length,
      pending: applications.filter((item) => item.status === '待審核').length,
      approved: applications.filter((item) => item.status === '已通過').length,
      rejected: applications.filter((item) => item.status === '已拒絕').length,
    };
  });
}

function getMissingDailyRecordItems() {
  const todayKey = getTodayKey();
  return familyApplications
    .filter((item) => item.status === '已通過' && item.assignedCaregiver)
    .filter((item) => !getDailyRecord(item.assignedCaregiver, item.clientName, todayKey));
}

function padNumber(value) {
  return String(value).padStart(2, '0');
}

function formatDateKey(year, monthIndex, day) {
  return `${year}-${padNumber(monthIndex + 1)}-${padNumber(day)}`;
}

function generateMonthlyActivities(startDate = new Date()) {
  const activityTemplates = [
    ['銀髮肌力訓練', '社區活動中心 2F', 24],
    ['慢性病飲食講座', '健康教室 A', 40],
    ['認知促進桌遊課', '共融教室', 16],
    ['用藥安全諮詢', '照護諮詢室', 18],
    ['防跌平衡訓練', '復健教室', 20],
    ['家屬照護支持小組', '會議室 B', 14],
    ['健康量測日', '社區大廳', 32],
    ['手作園藝療癒課', '多功能教室', 18],
  ];
  const offsets = [1, 3, 8, 10, 15, 17, 22, 24];

  return activityTemplates.map(([title, place, capacity], index) => ({
    id: `ACT-${startDate.getFullYear()}${padNumber(startDate.getMonth() + 1)}-${padNumber(index + 1)}`,
    title,
    date: getDateKeyWithOffset(startDate, offsets[index]),
    place,
    communitySiteId: communitySites[0]?.id || null,
    capacity,
    deadline: `${getDateKeyWithOffset(startDate, Math.max(0, offsets[index] - 1))} 23:59`,
    createdBy: 'system',
    createdAt: formatDateTime(new Date()),
  }));
}

function ensureActivitySeed() {
  const now = new Date();
  const hasCurrentMonthActivities = activityItems.some((item) => item.id?.startsWith(`ACT-${now.getFullYear()}${padNumber(now.getMonth() + 1)}`));
  if (!hasCurrentMonthActivities) {
    activityItems = [...activityItems, ...generateMonthlyActivities(now)];
  }
  activityItems = activityItems.map((activity) => ({
    ...activity,
    deadline: activity.deadline || `${activity.date} 23:59`,
  }));
  activityRegistrations = activityRegistrations.filter((item) => item.role !== '管理員');
  localStorage.setItem('activityItems', JSON.stringify(activityItems));
  localStorage.setItem('activityRegistrations', JSON.stringify(activityRegistrations));
}

function getDateKeyWithOffset(startDate, offsetDays) {
  const date = new Date(startDate);
  date.setDate(date.getDate() + offsetDays);
  return formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
}

function getActivityRegistrationCount(activityId) {
  return activityRegistrations.filter((item) => item.activityId === activityId && item.role !== '管理員').length;
}

function getActivityRegistrations(activityId) {
  return activityRegistrations.filter((item) => item.activityId === activityId && item.role !== '管理員');
}

function getActivityStatus(activity) {
  const remaining = activity.capacity - getActivityRegistrationCount(activity.id);
  if (remaining <= 0) return '已額滿';
  if (remaining <= 4) return '名額有限';
  return '開放報名';
}

function getActivityDeadline(activity) {
  return activity.deadline || `${activity.date} 00:00`;
}

function isActivityRegistrationClosed(activity) {
  return new Date(getActivityDeadline(activity).replace(' ', 'T')) <= new Date();
}

function hasRegisteredActivity(activityId, participantName) {
  if (!participantName) return false;
  return activityRegistrations.some((item) => item.activityId === activityId && item.participantName === participantName);
}

function getMyActivityRegistrationCount(activityId) {
  if (!currentUser) return 0;
  return activityRegistrations.filter((item) => item.activityId === activityId && item.username === currentUser.username).length;
}

function getEligibleActivityParticipants() {
  if (!currentUser) return [];
  if (currentUser.role === '家屬') {
    return getApprovedApplications()
      .filter((item) => item.applicant === currentUser.username)
      .map((item) => ({ name: item.clientName, source: item.id }));
  }
  if (currentUser.role === '照護員') {
    const caregiver = caregivers.find((item) => item.username === currentUser.username);
    if (!caregiver) return [];
    return getApprovedApplications()
      .filter((item) => item.assignedCaregiver === caregiver.id)
      .map((item) => ({ name: item.clientName, source: item.id }));
  }
  return [];
}

function registerActivity(activityId, participantName) {
  if (!currentUser) {
    openLogin();
    return;
  }
  if (!['照護員', '家屬'].includes(currentUser.role)) {
    openModal('無法報名', '管理員僅能查看活動與報名狀態，請由家屬或照護員替長者報名。');
    return;
  }
  const activity = activityItems.find((item) => item.id === activityId);
  if (!activity) return;
  if (isActivityRegistrationClosed(activity)) {
    openModal('報名已截止', `此活動的報名截止時間為 ${getActivityDeadline(activity)}。`);
    return;
  }
  const eligibleParticipants = getEligibleActivityParticipants();
  if (!eligibleParticipants.some((item) => item.name === participantName)) {
    openModal('請選擇長者', '請先選擇已通過申請且可參與活動的長者。');
    return;
  }
  if (hasRegisteredActivity(activityId, participantName)) {
    openModal('已報名', `${participantName} 已經報名此活動。`);
    return;
  }
  if (getActivityRegistrationCount(activityId) >= activity.capacity) {
    openModal('活動已額滿', '此活動目前沒有剩餘名額。');
    return;
  }
  const application = getApprovedApplications().find((item) => item.clientName === participantName);
  activityRegistrations.push({
    id: `AR-${Date.now()}`,
    activityId,
    elderId: application?.elderId || null,
    activityName: activity.title,
    username: currentUser.username,
    role: currentUser.role,
    participantName,
    registeredAt: formatDateTime(new Date()),
    status: '已報名',
  });
  saveData();
  renderActivityPage();
  renderCalendar();
  openModal('報名成功', `已替 ${participantName} 完成「${activity.title}」報名。`);
}

function getActivityDatesMap() {
  return activityItems.reduce((map, activity) => {
    map[activity.date] = (map[activity.date] || 0) + 1;
    return map;
  }, {});
}

function getUpcomingActivities(limit = 3) {
  const todayKey = getTodayKey();
  return activityItems
    .filter((activity) => activity.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

function buildSystemAnnouncements() {
  const items = [];
  const todayKey = getTodayKey();
  const missingRecords = getMissingDailyRecordItems();
  const upcomingActivities = getUpcomingActivities(2);
  const availableActivities = activityItems
    .filter((activity) => activity.date >= todayKey && getActivityRegistrationCount(activity.id) < activity.capacity)
    .slice(0, 3);

  if (!currentUser) {
    items.push({
      title: '歡迎使用',
      message: '登入後可查看個人化系統公告與案件管理。',
    });
    upcomingActivities.forEach((activity) => {
      items.push({
        title: '即將到來的活動',
        message: `${activity.date} ${activity.title}，地點：${activity.place}。`,
      });
    });
    return items;
  }

  if (currentUser.role === '管理員') {
    const pendingApplications = familyApplications.filter((item) => item.status === '待審核');
    if (pendingApplications.length > 0) {
      items.push({
        title: '家屬申請待審核',
        message: `目前有 ${pendingApplications.length} 筆長照需求等待管理員確認。`,
      });
    }
    if (missingRecords.length > 0) {
      items.push({
        title: '今日照護紀錄提醒',
        message: `仍有 ${missingRecords.length} 位照護對象尚未完成今日紀錄。`,
      });
    }
  }

  if (currentUser.role === '照護員') {
    const caregiver = caregivers.find((item) => item.username === currentUser.username);
    if (caregiver) {
      if (caregiver.assignedClients.length === 0) {
        items.push({
          title: '尚未有分配長者',
          message: '你目前沒有已分配的長者，請通知管理員進行指派。',
        });
      } else {
        items.push({
          title: '請登記長者資訊',
          message: `你負責的 ${caregiver.assignedClients.length} 位長者，請確認已完成今日紀錄並登記必要的照護資訊。`,
        });
      }
      const myMissingRecords = missingRecords.filter((item) => item.assignedCaregiver === caregiver.id);
      if (myMissingRecords.length > 0) {
        items.push({
          title: '紀錄尚未完成',
          message: `你今日仍有 ${myMissingRecords.length} 筆照護紀錄待填寫。`,
        });
      }
    }
  }

  if (currentUser.role === '家屬') {
    const myApplications = familyApplications.filter((item) => item.applicant === currentUser.username);
    const pending = myApplications.filter((item) => item.status === '待審核');
    const approved = myApplications.filter((item) => item.status === '已通過');

    if (pending.length > 0) {
      items.push({
        title: '申請審核中',
        message: `你有 ${pending.length} 筆長照需求正在等待管理者審核。`,
      });
    }
    if (approved.length > 0) {
      items.push({
        title: '照護指派完成',
        message: `${approved.length} 筆需求已通過並指派照護員。`,
      });
    }
    availableActivities.forEach((activity) => {
      items.push({
        title: '可報名活動',
        message: `${activity.date} ${activity.title}，地點：${activity.place}，尚有 ${activity.capacity - getActivityRegistrationCount(activity.id)} 個名額。`,
      });
    });
  }

  upcomingActivities.forEach((activity) => {
    items.push({
      title: '即將到來的活動',
      message: `${activity.date} ${activity.title}，地點：${activity.place}。`,
    });
  });

  if (items.length === 0) {
    items.push({
      title: '系統狀態正常',
      message: '目前沒有待處理提醒，資料會依照申請、活動與照護紀錄即時更新。',
    });
  }

  return items;
}

function buildCaseData() {
  if (!currentUser) {
    return [];
  }

  const visibleApplications = currentUser.role === '管理員'
    ? familyApplications
    : currentUser.role === '照護員'
      ? getVisibleCareApplications()
      : currentUser.role === '家屬'
        ? familyApplications.filter((item) => item.applicant === currentUser.username)
        : [];

  return visibleApplications.map((application) => ({
    code: application.id,
    name: `${application.clientName} 照護申請`,
    status: application.status,
    owner: getFamilyDisplayName(application.applicant),
    due: application.submittedAt,
    caregiver: application.assignedCaregiver ? getAssignedCaregiverName(application.assignedCaregiver) : '尚未指派',
  }));
}

function getApprovedApplications() {
  return familyApplications.filter((item) => item.status === '已通過');
}

function getVisibleCareApplications() {
  if (!currentUser) return [];
  if (currentUser.role === '管理員') return familyApplications;
  if (currentUser.role === '照護員') {
    const caregiver = caregivers.find((item) => item.username === currentUser.username);
    if (!caregiver) return [];
    return getApprovedApplications().filter((item) => item.assignedCaregiver === caregiver.id);
  }
  if (currentUser.role === '家屬') {
    return familyApplications.filter((item) => item.applicant === currentUser.username);
  }
  return [];
}

function getLatestRecordForClient(clientName) {
  return healthRecords
    .filter((record) => record.clientName === clientName && record.status === '已送出')
    .sort((a, b) => b.checkDate.localeCompare(a.checkDate) || b.updatedAt.localeCompare(a.updatedAt))[0];
}

function getApplicationCareStatus(application) {
  if (application.status !== '已通過') return application.status;
  const latestRecord = getLatestRecordForClient(application.clientName);
  if (!latestRecord) return '待紀錄';
  const temperature = Number(latestRecord.temperature);
  if (temperature >= 37.5 || latestRecord.medicationOnTime === '否') return '注意';
  return '穩定';
}

function getRealRiskRows() {
  return getApprovedApplications().map((application) => {
    const latestRecord = getLatestRecordForClient(application.clientName);
    const status = getApplicationCareStatus(application);
    const issue = latestRecord
      ? [
          Number(latestRecord.temperature) >= 37.5 ? `體溫 ${latestRecord.temperature}℃` : '',
          latestRecord.medicationOnTime === '否' ? '未準時服藥' : '',
        ].filter(Boolean).join('、') || '今日紀錄正常'
      : '今日尚未填寫照護紀錄';
    return {
      id: application.id,
      name: application.clientName,
      level: status === '注意' || status === '待紀錄' ? '注意' : '穩定',
      issue,
      updatedAt: latestRecord?.updatedAt || application.submittedAt,
    };
  }).filter((item) => item.level !== '穩定');
}

function syncCaregiverAssignmentsFromApplications() {
  caregivers.forEach((caregiver) => {
    caregiver.assignedClients = getApprovedApplications()
      .filter((application) => application.assignedCaregiver === caregiver.id)
      .map((application) => application.clientName);
  });
}
// 格式化日期時間為中文格式，並使用24
function formatDateTime(date) {
  return new Date(date).toLocaleString('zh-Hant', { hour12: false });
}

function loadSavedData() {
  const savedApps = JSON.parse(localStorage.getItem('familyApplications') || '[]');
  const savedCare = JSON.parse(localStorage.getItem('caregivers') || 'null');
  const savedRecords = JSON.parse(localStorage.getItem('dailyRecords') || '[]');
  const savedElders = JSON.parse(localStorage.getItem('elders') || '[]');
  const savedHealth = JSON.parse(localStorage.getItem('healthRecords') || '[]');
  const savedChanges = JSON.parse(localStorage.getItem('changeLogs') || '[]');
  const savedRecordCount = Number(localStorage.getItem('dailyRecordCounter')) || 0;
  const savedHealthCount = Number(localStorage.getItem('healthRecordCounter')) || 0;
  const savedChangeCount = Number(localStorage.getItem('changeLogCounter')) || 0;
  const savedElderCount = Number(localStorage.getItem('elderCounter')) || 0;
  const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const savedRegisteredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  const savedActivities = JSON.parse(localStorage.getItem('activityItems') || '[]');
  const savedActivityRegistrations = JSON.parse(localStorage.getItem('activityRegistrations') || '[]');
  if (Array.isArray(savedRegisteredUsers)) {
    registeredUsers = savedRegisteredUsers;
  }
  if (Array.isArray(savedActivities)) {
    activityItems = savedActivities;
  }
  if (Array.isArray(savedActivityRegistrations)) {
    activityRegistrations = savedActivityRegistrations;
  }
  if (Array.isArray(savedElders)) {
    elders = savedElders;
  }
  if (Array.isArray(savedHealth)) {
    healthRecords = savedHealth;
  }
  if (Array.isArray(savedChanges)) {
    changeLogs = savedChanges;
  }
  if (savedUser && savedUser.username && savedUser.role) {
    const fullUser = getAllUsers().find((item) => item.username === savedUser.username);
    currentUser = fullUser || savedUser;
  }
  if (Array.isArray(savedApps) && savedApps.length > 0) {
    familyApplications = savedApps;
    applicationCounter = Math.max(...savedApps.map((item) => Number(item.id.replace('A', '')))) + 1;
  }
  if (Array.isArray(savedCare)) {
    caregivers.forEach((care) => {
      const saved = savedCare.find((item) => item.id === care.id);
      if (saved) care.assignedClients = saved.assignedClients || [];
    });
  }
  if (Array.isArray(savedRecords) && savedRecords.length > 0) {
    dailyRecords = savedRecords;
    dailyRecordCounter = Math.max(...savedRecords.map((item) => Number(item.id.replace('R', '')))) + 1;
    if (dailyRecordCounter <= savedRecordCount) {
      dailyRecordCounter = savedRecordCount + 1;
    }
  } else if (savedRecordCount > 0) {
    dailyRecordCounter = savedRecordCount + 1;
  }
  if (Array.isArray(savedElders) && savedElders.length > 0) {
    elders = savedElders;
    elderCounter = Math.max(...savedElders.map((item) => Number(item.id.replace('E', '')))) + 1;
    if (elderCounter <= savedElderCount) {
      elderCounter = savedElderCount + 1;
    }
  } else if (savedElderCount > 0) {
    elderCounter = savedElderCount + 1;
  }
  if (Array.isArray(savedHealth) && savedHealth.length > 0) {
    healthRecords = savedHealth;
    healthRecordCounter = Math.max(...savedHealth.map((item) => Number(item.id.replace('H', '')))) + 1;
    if (healthRecordCounter <= savedHealthCount) {
      healthRecordCounter = savedHealthCount + 1;
    }
  } else if (savedHealthCount > 0) {
    healthRecordCounter = savedHealthCount + 1;
  }
  if (Array.isArray(savedChanges) && savedChanges.length > 0) {
    changeLogs = savedChanges;
    changeLogCounter = Math.max(...savedChanges.map((item) => Number(item.id.replace('CHG-', '')))) + 1;
    if (changeLogCounter <= savedChangeCount) {
      changeLogCounter = savedChangeCount + 1;
    }
  } else if (savedChangeCount > 0) {
    changeLogCounter = savedChangeCount + 1;
  }
  syncCaregiverAssignmentsFromApplications();
  ensureActivitySeed();
}

function saveData() {
  syncCaregiverAssignmentsFromApplications();
  localStorage.setItem('familyApplications', JSON.stringify(familyApplications));
  localStorage.setItem('caregivers', JSON.stringify(caregivers));
  localStorage.setItem('dailyRecords', JSON.stringify(dailyRecords));
  localStorage.setItem('dailyRecordCounter', String(dailyRecordCounter));
  localStorage.setItem('elders', JSON.stringify(elders));
  localStorage.setItem('elderCounter', String(elderCounter));
  localStorage.setItem('healthRecords', JSON.stringify(healthRecords));
  localStorage.setItem('healthRecordCounter', String(healthRecordCounter));
  localStorage.setItem('changeLogs', JSON.stringify(changeLogs));
  localStorage.setItem('changeLogCounter', String(changeLogCounter));
  localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  localStorage.setItem('activityItems', JSON.stringify(activityItems));
  localStorage.setItem('activityRegistrations', JSON.stringify(activityRegistrations));
  if (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify({ username: currentUser.username, role: currentUser.role }));
  }
  renderNotificationCenter();
  refreshRightPanel();
}

function renderFamilyPage() {
  if (!familyApplicationSection || !familyApplicationList) return;

  const canApply = currentUser && currentUser.role === '家屬';
  familyApplicationSection.innerHTML = canApply ? `
    <div class="info-box multi-need-note">
      ${getFamilyDisplayName(currentUser.username)} 可以替多位長照需求者送出申請；每一位照護對象請建立一筆獨立申請。
    </div>
    <form id="familyApplicationForm" class="application-form">
      <div class="form-grid">
        <label>
          照護對象姓名
          <input name="clientName" required placeholder="例如：陳阿姨" />
        </label>
        <label>
          與家屬關係
          <input name="relation" required placeholder="例如：母親、外婆" />
        </label>
        <label>
          年齡
          <input name="age" type="number" required placeholder="例如：78" />
        </label>
        <label>
          聯絡電話
          <input name="phone" required placeholder="例如：0912-345-678" />
        </label>
      </div>
      <label>
        病史
        <textarea name="diseaseHistory" rows="3" required placeholder="例如：高血壓、糖尿病、慢性心臟病"></textarea>
      </label>
      <label>
        過敏史
        <textarea name="allergyHistory" rows="2" required placeholder="例如：青黴素過敏"></textarea>
      </label>
      <label>
        照護需求與注意事項
        <textarea name="careNotes" rows="3" required placeholder="例如：需要每日測量血壓、用藥提醒"></textarea>
      </label>
      <label>
        藥物與健康品記錄
        <textarea name="medicationInfo" rows="3" placeholder="請用每行一項格式：高血壓藥：三餐 / 一天一次 / 健康品"></textarea>
      </label>
      <button type="submit" class="primary-button">提交申請</button>
    </form>
  ` : `
    <div class="info-box">
      <p>此功能僅限家屬使用。請先登入家屬帳號，填寫長者基本資料與病史、過敏史等資訊後申請照護對象。</p>
    </div>
  `;

  familyApplicationList.innerHTML = `
    <div class="section-title"><h2>申請進度</h2></div>
    <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>申請編號</th>
            <th>照護對象</th>
            <th>狀態</th>
            <th>指派照護員</th>
            <th>送出時間</th>
          </tr>
        </thead>
        <tbody>
          ${familyApplications.map((item) => `
            <tr>
              <td>${item.id}</td>
              <td>${item.clientName} (${item.relation})</td>
              <td><span class="status-badge status-${item.status.replace(/\s+/g, '')}">${item.status}</span></td>
              <td>${item.assignedCaregiver ? getAssignedCaregiverName(item.assignedCaregiver) : '-'}</td>
              <td>${item.submittedAt}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  const familyForm = document.getElementById('familyApplicationForm');
  familyForm?.addEventListener('submit', handleFamilyApplicationSubmit);
  renderFamilyDailyRecords();
}

function handleFamilyApplicationSubmit(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== '家屬') {
    openModal('權限不足', '僅家屬可以提交照護申請。');
    return;
  }

  const form = event.target;
  const formData = new FormData(form);
  const elderId = `E${String(elderCounter).padStart(3, '0')}`;
  const newElder = {
    id: elderId,
    communitySiteId: communitySites[0]?.id || null,
    name: formData.get('clientName'),
    age: formData.get('age'),
    phone: formData.get('phone'),
    healthStatus: '待審核',
    familyApplicant: currentUser.username,
    assignedCaregiver: null,
    careNotes: formData.get('careNotes'),
    diseaseHistory: formData.get('diseaseHistory'),
    allergyHistory: formData.get('allergyHistory'),
  };
  elders.unshift(newElder);
  elderCounter += 1;

  const newApplication = {
    id: `A${String(applicationCounter).padStart(3, '0')}`,
    elderId,
    applicant: currentUser.username,
    clientName: newElder.name,
    relation: formData.get('relation'),
    age: newElder.age,
    phone: newElder.phone,
    diseaseHistory: newElder.diseaseHistory,
    allergyHistory: newElder.allergyHistory,
    careNotes: newElder.careNotes,
    medicationPlan: parseMedicationPlan(formData.get('medicationInfo') || ''),
    status: '待審核',
    assignedCaregiver: null,
    submittedAt: formatDateTime(new Date()),
  };

  familyApplications.unshift(newApplication);
  applicationCounter += 1;
  saveData();
  openModal('申請已送出', '管理員將會審核您的申請，並在通過後指派照護員。');
  renderFamilyPage();
}

function renderAdminApplications() {
  if (!adminApplications) return;
  const familySummary = getFamilyApplicationSummary();
  const totalFamilies = familySummary.length;
  const totalApplications = familyApplications.length;
  const pendingApplications = familyApplications.filter((item) => item.status === '待審核').length;
  const multiNeedFamilies = familySummary.filter((item) => item.total > 1).length;

  adminApplications.innerHTML = `
    <div class="admin-overview-grid">
      <article class="admin-stat-card">
        <span>家屬帳號</span>
        <strong>${totalFamilies}</strong>
      </article>
      <article class="admin-stat-card">
        <span>長照需求總數</span>
        <strong>${totalApplications}</strong>
      </article>
      <article class="admin-stat-card">
        <span>待審核申請</span>
        <strong>${pendingApplications}</strong>
      </article>
      <article class="admin-stat-card">
        <span>多需求家屬</span>
        <strong>${multiNeedFamilies}</strong>
      </article>
    </div>
    <div class="section-title"><h2>家屬需求統計</h2></div>
    <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>家屬帳號</th>
            <th>家屬姓名</th>
            <th>電話</th>
            <th>需求數</th>
            <th>待審核</th>
            <th>已通過</th>
            <th>已拒絕</th>
          </tr>
        </thead>
        <tbody>
          ${familySummary.map((item) => `
            <tr>
              <td>${item.username}</td>
              <td>${item.displayName}</td>
              <td>${item.phone}</td>
              <td>${item.total}</td>
              <td>${item.pending}</td>
              <td>${item.approved}</td>
              <td>${item.rejected}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div class="section-title"><h2>家屬申請清單</h2></div>
    ${familyApplications.length === 0 ? '<div class="empty-panel">目前沒有任何家屬送出的長照需求。</div>' : `
      <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>申請編號</th>
            <th>照護對象</th>
            <th>病史 / 過敏史</th>
            <th>狀態</th>
            <th>指派</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${familyApplications.map((item) => `
            <tr class="admin-application-row">
              <td><span class="application-id">${item.id}</span></td>
              <td>
                <div class="applicant-cell">
                  <strong>${item.clientName}</strong>
                  <span>${item.relation} / ${item.age} 歲</span>
                  <small>家屬：${getFamilyDisplayName(item.applicant)}</small>
                </div>
              </td>
              <td>
                <div class="history-stack">
                  <span><strong>病史</strong>${item.diseaseHistory}</span>
                  <span><strong>過敏</strong>${item.allergyHistory}</span>
                </div>
              </td>
              <td><span class="status-badge status-${item.status.replace(/\s+/g, '')}">${item.status}</span></td>
              <td>
                <label class="assign-control">
                  <span>照護員</span>
                  <select data-application-id="${item.id}" class="assign-select">
                    <option value="">選擇照護員</option>
                    ${caregivers.map((care) => `<option value="${care.id}" ${item.assignedCaregiver === care.id ? 'selected' : ''}>${care.name}（${care.specialty}）</option>`).join('')}
                  </select>
                </label>
              </td>
              <td>
                <div class="review-actions">
                  <button data-action="approve" data-id="${item.id}" class="secondary-button">通過</button>
                  <button data-action="reject" data-id="${item.id}" class="danger-button">拒絕</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `}
  `;

  adminApplications.querySelectorAll('.assign-select').forEach((select) => {
    select.addEventListener('change', (event) => {
      const applicationId = event.target.dataset.applicationId;
      const caregiverId = event.target.value;
      assignCaregiver(applicationId, caregiverId);
    });
  });

  adminApplications.querySelectorAll('[data-action="approve"]').forEach((button) => {
    button.addEventListener('click', () => {
      approveApplication(button.dataset.id);
    });
  });

  adminApplications.querySelectorAll('[data-action="reject"]').forEach((button) => {
    button.addEventListener('click', () => {
      rejectApplication(button.dataset.id);
    });
  });

  renderAdminDailyRecords();
  renderChangeLogs();
}

function approveApplication(applicationId) {
  const application = familyApplications.find((item) => item.id === applicationId);
  if (!application) return;
  if (!application.assignedCaregiver) {
    openModal('請先指派照護員', '請從下拉選單選擇一位照護員，然後再通過申請。');
    return;
  }
  application.status = '已通過';

  const care = caregivers.find((item) => item.id === application.assignedCaregiver);
  if (care && !care.assignedClients.includes(application.clientName)) {
    care.assignedClients.push(application.clientName);
  }

  const elder = getElderById(application.elderId);
  if (elder) {
    elder.healthStatus = '穩定';
    elder.assignedCaregiver = application.assignedCaregiver;
    elder.careNotes = application.careNotes;
    elder.diseaseHistory = application.diseaseHistory;
    elder.allergyHistory = application.allergyHistory;
  }

  addChangeLog({
    elderId: application.elderId,
    userId: currentUser?.username || 'admin',
    changeContent: `通過申請並指派照護員 ${getAssignedCaregiverName(application.assignedCaregiver)}`,
    operator: currentUser?.username || 'admin',
    changeItem: '申請狀態 / 指派照護員',
  });

  saveData();
  renderAdminApplications();
  renderFamilyPage();
  renderCareServicesPage();
  openModal('申請已通過', `已指派 ${getAssignedCaregiverName(application.assignedCaregiver)} 負責 ${application.clientName}。`);
}

function rejectApplication(applicationId) {
  const application = familyApplications.find((item) => item.id === applicationId);
  if (!application) return;
  application.status = '已拒絕';
  const elder = getElderById(application.elderId);
  if (elder) {
    elder.healthStatus = '已拒絕';
  }
  addChangeLog({
    elderId: application.elderId,
    userId: currentUser?.username || 'admin',
    changeContent: '申請被拒絕',
    operator: currentUser?.username || 'admin',
    changeItem: '申請狀態',
  });
  saveData();
  renderAdminApplications();
  renderFamilyPage();
}

function assignCaregiver(applicationId, caregiverId) {
  const application = familyApplications.find((item) => item.id === applicationId);
  if (!application) return;

  if (application.assignedCaregiver && application.assignedCaregiver !== caregiverId) {
    const previous = caregivers.find((item) => item.id === application.assignedCaregiver);
    if (previous) {
      previous.assignedClients = previous.assignedClients.filter((name) => name !== application.clientName);
    }
  }

  application.assignedCaregiver = caregiverId || null;

  if (application.status === '已通過' && caregiverId) {
    const care = caregivers.find((item) => item.id === caregiverId);
    if (care && !care.assignedClients.includes(application.clientName)) {
      care.assignedClients.push(application.clientName);
    }
    const elder = getElderById(application.elderId);
    if (elder) {
      elder.assignedCaregiver = caregiverId;
    }
  }

  addChangeLog({
    elderId: application.elderId,
    userId: currentUser?.username || 'admin',
    changeContent: caregiverId ? `變更指派照護員為 ${getAssignedCaregiverName(caregiverId)}` : '移除指派照護員',
    operator: currentUser?.username || 'admin',
    changeItem: '指派照護員',
  });

  saveData();
}

function renderChangeLogs() {
  if (!adminChangeLogList) return;
  if (!changeLogs || changeLogs.length === 0) {
    adminChangeLogList.innerHTML = `
      <div class="section-title"><h2>異動紀錄</h2></div>
      <div class="info-box">目前尚未有任何異動紀錄。</div>
    `;
    return;
  }

  const rows = changeLogs
    .slice()
    .sort((a, b) => b.changeTime.localeCompare(a.changeTime) || a.id.localeCompare(b.id))
    .map((log) => `
      <tr>
        <td>${log.id}</td>
        <td>${log.elderId || '-'}</td>
        <td>${getElderById(log.elderId)?.name || '-'}</td>
        <td>${log.changeItem}</td>
        <td>${log.changeContent}</td>
        <td>${log.operator}</td>
        <td>${log.changeTime}</td>
      </tr>
    `).join('');

  adminChangeLogList.innerHTML = `
    <div class="section-title"><h2>異動紀錄</h2></div>
    <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>紀錄編號</th>
            <th>長者編號</th>
            <th>長者姓名</th>
            <th>異動類別</th>
            <th>異動內容</th>
            <th>操作人</th>
            <th>異動時間</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function getTodayKey(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function isPastDeadline(dateKey) {
  const deadline = new Date(`${dateKey}T23:59:00`);
  return new Date() >= deadline;
}

function getDailyRecord(caregiverId, clientName, dateKey) {
  return dailyRecords.find((record) =>
    record.caregiverId === caregiverId &&
    record.clientName === clientName &&
    record.date === dateKey
  );
}

function renderDailyRecordSection(currentCaregiver, selectedClientName) {
  if (!dailyRecordSection || !dailyRecordList) return;
  dailyRecordSection.innerHTML = '';
  dailyRecordList.innerHTML = '';
  if (!currentCaregiver) return;

  const assignedClients = currentCaregiver.assignedClients;
  if (assignedClients.length === 0) {
    dailyRecordSection.innerHTML = '<div class="info-box">目前沒有已指派的照護對象，請確認是否有通過的申請。</div>';
    return;
  }

  const todayKey = getTodayKey();
  const clientName = selectedClientName || assignedClients[0];
  const currentRecord = getDailyRecord(currentCaregiver.id, clientName, todayKey);
  const medicationPlan = getPatientMedicationPlan(clientName);

  dailyRecordSection.innerHTML = `
    <div class="section-title"><h2>今日照護紀錄（${todayKey}）</h2></div>
    <form id="dailyRecordForm" class="record-form">
      <div class="form-grid">
        <label>
          選擇照護對象
          <select name="clientName" required>
            ${assignedClients.map((name) => `<option value="${name}" ${name === clientName ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </label>
        <label>
          體溫 (℃)
          <input name="temperature" type="number" step="0.1" min="30" max="45" value="${currentRecord?.temperature || ''}" placeholder="例如 36.8" />
        </label>
        <label>
          早餐
          <input name="breakfast" type="text" value="${currentRecord?.breakfast || ''}" placeholder="例如：吃了饅頭、稀飯" />
        </label>
        <label>
          午餐
          <input name="lunch" type="text" value="${currentRecord?.lunch || ''}" placeholder="例如：吃了便當" />
        </label>
        <label>
          晚餐
          <input name="dinner" type="text" value="${currentRecord?.dinner || ''}" placeholder="例如：吃了湯麵" />
        </label>
        <label>
          醫師
          <input name="doctor" type="text" value="${currentRecord?.doctor || ''}" placeholder="例如：李醫師" />
        </label>
        <label>
          檢查項目
          <input name="examItem" type="text" value="${currentRecord?.examItem || ''}" placeholder="例如：血壓、血糖" />
        </label>
        <label>
          結果
          <input name="result" type="text" value="${currentRecord?.result || ''}" placeholder="例如：血壓穩定、需追蹤" />
        </label>
        <label>
          睡眠時數
          <input name="sleepHours" type="number" step="0.5" min="0" max="24" value="${currentRecord?.sleepHours || ''}" placeholder="例如 7.5" />
        </label>
        <label>
          運動時間
          <input name="exerciseTime" type="text" value="${currentRecord?.exerciseTime || ''}" placeholder="例如：散步 30 分鐘" />
        </label>
        <label>
          是否準時吃藥
          <select name="medicationOnTime" required>
            <option value="是" ${currentRecord?.medicationOnTime === '是' ? 'selected' : ''}>是</option>
            <option value="否" ${currentRecord?.medicationOnTime === '否' ? 'selected' : ''}>否</option>
          </select>
        </label>
        <label>
          吃藥時間
          <input name="medicationTime" type="time" value="${currentRecord?.medicationTime || ''}" required />
        </label>
      </div>
      <div class="medication-plan-box">
        <div class="section-title"><h3>今日應服用藥物 / 健康品</h3></div>
        ${medicationPlan.length > 0 ? medicationPlan.map((med, index) => `
          <div class="med-row">
            <div class="med-label">
              <strong>${med.name}</strong>
              <span class="med-badge">${med.schedule}</span>
            </div>
            <div class="med-controls">
              <label>
                已服用
                <select name="medTaken-${index}">
                  <option value="否" ${currentRecord?.medicationDetails?.[index]?.taken === '否' ? 'selected' : ''}>否</option>
                  <option value="是" ${currentRecord?.medicationDetails?.[index]?.taken === '是' ? 'selected' : ''}>是</option>
                </select>
              </label>
              <label>
                服藥時間
                <input type="time" name="medTime-${index}" value="${currentRecord?.medicationDetails?.[index]?.time || ''}" />
              </label>
              <label>
                備註
                <input type="text" name="medNote-${index}" value="${currentRecord?.medicationDetails?.[index]?.note || ''}" placeholder="例如：飯後服用" />
              </label>
            </div>
          </div>
        `).join('') : '<div class="info-box">此病患目前未設定用藥資訊。</div>'}
      </div>
      <div class="record-actions">
        <button type="submit" name="saveMode" value="draft" class="secondary-button">暫存紀錄</button>
        <button type="submit" name="saveMode" value="submit" class="primary-button">送出紀錄</button>
      </div>
    </form>
  `;

  const form = document.getElementById('dailyRecordForm');
  const clientSelect = form.querySelector('[name="clientName"]');
  clientSelect?.addEventListener('change', (event) => {
    renderDailyRecordSection(currentCaregiver, event.target.value);
  });
  form?.addEventListener('submit', (event) => handleDailyRecordSubmit(event, currentCaregiver));
}

function handleDailyRecordSubmit(event, caregiver) {
  event.preventDefault();
  if (!caregiver) return;
  const form = event.target;
  const formData = new FormData(form);
  const clientName = formData.get('clientName');
  const saveMode = formData.get('saveMode') || 'submit';
  const todayKey = getTodayKey();
  const medicationPlan = getPatientMedicationPlan(clientName);
  const medicationDetails = medicationPlan.map((med, index) => ({
    name: med.name,
    schedule: med.schedule,
    taken: formData.get(`medTaken-${index}`) || '否',
    time: formData.get(`medTime-${index}`) || '',
    note: formData.get(`medNote-${index}`) || '',
  }));

  const elder = elders.find((item) => item.name === clientName && item.assignedCaregiver === caregiver.id);
  const elderId = elder ? elder.id : null;
  if (!elderId) {
    openModal('資料不完整', '無法找到對應的長者資料，請確認長者是否已通過申請並指派給您。');
    return;
  }
  const existingIndex = dailyRecords.findIndex((item) => item.caregiverId === caregiver.id && item.clientName === clientName && item.date === todayKey);
  const dailyRecordId = existingIndex >= 0 ? dailyRecords[existingIndex].id : `R${String(dailyRecordCounter).padStart(3, '0')}`;

  const dailyRecordData = {
    elderId,
    id: dailyRecordId,
    caregiverId: caregiver.id,
    clientName,
    date: todayKey,
    temperature: formData.get('temperature') || '',
    breakfast: formData.get('breakfast') || '',
    lunch: formData.get('lunch') || '',
    dinner: formData.get('dinner') || '',
    sleepHours: formData.get('sleepHours') || '',
    exerciseTime: formData.get('exerciseTime') || '',
    medicationOnTime: formData.get('medicationOnTime') || '否',
    medicationTime: formData.get('medicationTime') || '',
    medicationDetails,
    status: saveMode === 'draft' ? '暫存' : '已送出',
    updatedAt: formatDateTime(new Date()),
  };

  if (existingIndex >= 0) {
    dailyRecords[existingIndex] = { ...dailyRecords[existingIndex], ...dailyRecordData };
  } else {
    dailyRecords.unshift(dailyRecordData);
    dailyRecordCounter += 1;
  }

  if (saveMode === 'submit') {
    const existingHealthIndex = healthRecords.findIndex((item) => item.elderId === elderId && item.checkDate === todayKey && item.caregiverId === caregiver.id);
    const healthRecordData = {
      id: existingHealthIndex >= 0 ? healthRecords[existingHealthIndex].id : `H${String(healthRecordCounter).padStart(3, '0')}`,
      elderId,
      caregiverId: caregiver.id,
      clientName,
      date: todayKey,
      doctor: formData.get('doctor') || '',
      examItem: formData.get('examItem') || '',
      result: formData.get('result') || '',
      checkDate: todayKey,
      careRecordId: dailyRecordId,
      temperature: formData.get('temperature') || '',
      breakfast: formData.get('breakfast') || '',
      lunch: formData.get('lunch') || '',
      dinner: formData.get('dinner') || '',
      sleepHours: formData.get('sleepHours') || '',
      exerciseTime: formData.get('exerciseTime') || '',
      medicationOnTime: formData.get('medicationOnTime') || '否',
      medicationTime: formData.get('medicationTime') || '',
      medicationDetails,
      status: '已送出',
      updatedAt: formatDateTime(new Date()),
    };

    if (existingHealthIndex >= 0) {
      healthRecords[existingHealthIndex] = { ...healthRecords[existingHealthIndex], ...healthRecordData };
    } else {
      healthRecords.unshift(healthRecordData);
      healthRecordCounter += 1;
    }
  }

  saveData();
  if (saveMode === 'draft') {
    openModal('紀錄已暫存', '今日照護紀錄已暫存，您可於送出前繼續編輯。');
  } else {
    openModal('紀錄已送出', '已完成送出，照護紀錄將記錄為正式資料。');
  }
  renderDailyRecordSection(caregiver, clientName);
  renderDailyRecords(caregiver);
}

function getPatientMedicationPlan(clientName) {
  const item = familyApplications.find((app) => app.clientName === clientName && app.status === '已通過');
  return item?.medicationPlan || [];
}

function parseMedicationPlan(text) {
  return text.split('\\n').map((line) => line.trim()).filter(Boolean).map((line) => {
    const parts = line.split(':');
    return {
      name: parts[0].trim(),
      schedule: parts[1] ? parts[1].trim() : '未設定',
    };
  });
}

function renderDailyRecords(currentCaregiver) {
  if (!dailyRecordList) return;
  if (!currentCaregiver) {
    dailyRecordList.innerHTML = '';
    return;
  }

  const todayKey = getTodayKey();
  const assignedClients = currentCaregiver.assignedClients;
  const rows = assignedClients.map((clientName) => {
    const record = getDailyRecord(currentCaregiver.id, clientName, todayKey);
    if (record) {
      return `
        <tr>
          <td>${record.clientName}</td>
          <td>${record.temperature}℃</td>
          <td>${record.breakfast}</td>
          <td>${record.lunch}</td>
          <td>${record.dinner}</td>
          <td>${record.medicationOnTime}</td>
          <td>${record.medicationTime}</td>
          <td>${record.sleepHours}</td>
          <td>${record.exerciseTime}</td>
          <td>${record.status}</td>
        </tr>
      `;
    }

    const pastDeadline = isPastDeadline(todayKey);
    if (pastDeadline) {
      return `
        <tr class="fake-record-row">
          <td>${clientName}</td>
          <td colspan="8">未於 23:59 前填寫，系統已自動補上偽填入資料</td>
          <td>偽填入資料</td>
        </tr>
      `;
    }

    return `
      <tr>
        <td>${clientName}</td>
        <td colspan="8">今日尚未填寫，請於 23:59 前完成。</td>
        <td>未填寫</td>
      </tr>
    `;
  }).join('');

  dailyRecordList.innerHTML = `
    <div class="section-title"><h2>今日填報狀況（${todayKey}）</h2></div>
    <div class="application-table-wrapper">
      <table class="application-table daily-record-table">
        <thead>
          <tr>
            <th>照護對象</th>
            <th>體溫</th>
            <th>早餐</th>
            <th>午餐</th>
            <th>晚餐</th>
            <th>準時吃藥</th>
            <th>吃藥時間</th>
            <th>睡眠時間</th>
            <th>運動時間</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderFamilyDailyRecords() {
  if (!familyRecordList) return;
  familyRecordList.innerHTML = '';
  if (!currentUser || currentUser.role !== '家屬') {
    return;
  }

  const myApplications = familyApplications.filter((item) => item.applicant === currentUser.username && item.status === '已通過');
  if (myApplications.length === 0) {
    familyRecordList.innerHTML = `
      <div class="section-title"><h2>送出紀錄</h2></div>
      <div class="info-box">尚未有已通過的照護對象，或尚未有任何照護紀錄送出。</div>
    `;
    return;
  }

  const records = healthRecords.filter((record) => myApplications.some((app) => app.elderId === record.elderId));
  if (records.length === 0) {
    familyRecordList.innerHTML = `
      <div class="section-title"><h2>送出紀錄</h2></div>
      <div class="info-box">目前沒有任何送出紀錄，請等待照護員填寫或稍後再看。</div>
    `;
    return;
  }

  const rows = records.map((record) => {
    const caregiverName = getAssignedCaregiverName(record.caregiverId);
    const medicationDetail = record.medicationDetails?.map((med) => `${med.name}：${med.taken === '是' ? '已服用' : '未服用'} ${med.time || ''}${med.note ? ` (${med.note})` : ''}`).join('；') || '-';
    return `
      <tr>
        <td>${getElderById(record.elderId)?.name || record.clientName}</td>
        <td>${caregiverName}</td>
        <td>${record.checkDate || record.date}</td>
        <td>${record.updatedAt}</td>
        <td>${record.status}</td>
        <td>${record.doctor || '-'}</td>
        <td>${record.examItem || '-'}</td>
        <td>${record.result || '-'}</td>
        <td>${record.breakfast || '-'} / ${record.lunch || '-'} / ${record.dinner || '-'}</td>
        <td>${record.medicationOnTime === '是' ? '準時' : '未準時'} ${record.medicationTime ? `(${record.medicationTime})` : ''}</td>
        <td>${medicationDetail}</td>
      </tr>
    `;
  }).join('');

  familyRecordList.innerHTML = `
    <div class="section-title"><h2>家屬可見送出紀錄</h2></div>
    <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>照護對象</th>
            <th>照護員</th>
            <th>檢查日期</th>
            <th>上傳時間</th>
            <th>狀態</th>
            <th>醫師</th>
            <th>檢查項目</th>
            <th>結果</th>
            <th>三餐狀況</th>
            <th>用藥狀態</th>
            <th>用藥細節</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminDailyRecords() {
  if (!adminRecordList) return;
  const records = healthRecords.slice().sort((a, b) => b.checkDate.localeCompare(a.checkDate) || b.updatedAt.localeCompare(a.updatedAt));
  if (records.length === 0) {
    adminRecordList.innerHTML = `
      <div class="section-title"><h2>送出紀錄</h2></div>
      <div class="info-box">目前尚未有任何照護紀錄送出。</div>
    `;
    return;
  }

  const rows = records.map((record) => {
    const caregiverName = getAssignedCaregiverName(record.caregiverId);
    const elder = getElderById(record.elderId);
    const application = elder ? familyApplications.find((app) => app.elderId === elder.id) : null;
    return `
      <tr>
        <td>${elder?.name || record.clientName}</td>
        <td>${application?.applicant || '-'}</td>
        <td>${caregiverName}</td>
        <td>${record.checkDate || record.date}</td>
        <td>${record.updatedAt}</td>
        <td>${record.status}</td>
        <td>${record.doctor || '-'}</td>
        <td>${record.examItem || '-'}</td>
        <td>${record.result || '-'}</td>
      </tr>
    `;
  }).join('');

  adminRecordList.innerHTML = `
    <div class="section-title"><h2>管理者可見送出紀錄</h2></div>
    <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>照護對象</th>
            <th>家屬帳號</th>
            <th>照護員</th>
            <th>檢查日期</th>
            <th>上傳時間</th>
            <th>狀態</th>
            <th>醫師</th>
            <th>檢查項目</th>
            <th>結果</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderCareServicesPage() {
  if (!caregiverOverview || !careAssignments) return;

  const currentCaregiver = currentUser && currentUser.role === '照護員'
    ? caregivers.find((item) => item.username === currentUser.username)
    : null;

  const showList = currentCaregiver ? [currentCaregiver] : caregivers;

  caregiverOverview.innerHTML = `
    <div class="section-title"><h2>照護員專長名冊</h2></div>
    <div class="caregiver-grid">
      ${showList.map((care) => `
        <div class="caregiver-card ${currentCaregiver && care.id === currentCaregiver.id ? 'current-caregiver' : ''}">
          <h3>${care.name}</h3>
          <p><strong>帳號：</strong>${care.username}</p>
          <p><strong>專長：</strong>${care.specialty}</p>
          <p><strong>適合：</strong>${care.suitable}</p>
          <p><strong>電話：</strong>${care.phone}</p>
          <p><strong>信箱：</strong>${care.email}</p>
          <p><strong>已分配：</strong>${care.assignedClients.length} 位</p>
        </div>
      `).join('')}
    </div>
  `;

  renderDailyRecordSection(currentCaregiver);

  const assignedItems = familyApplications.filter((item) => item.status === '已通過');
  const displayedItems = currentCaregiver
    ? assignedItems.filter((item) => item.assignedCaregiver === currentCaregiver.id)
    : assignedItems;

  careAssignments.innerHTML = `
    <div class="section-title"><h2>已通過的指派名單</h2></div>
    ${displayedItems.length === 0 ? '<div class="empty-panel">目前沒有已通過並指派的長照需求。</div>' : `
      <div class="application-table-wrapper">
      <table class="application-table">
        <thead>
          <tr>
            <th>照護對象</th>
            ${currentCaregiver ? '' : '<th>照護員</th>'}
            <th>病史</th>
            <th>過敏史</th>
          </tr>
        </thead>
        <tbody>
          ${displayedItems.map((item) => `
            <tr>
              <td>${item.clientName}<br/><small>${item.relation}</small></td>
              ${currentCaregiver ? '' : `<td>${getAssignedCaregiverName(item.assignedCaregiver)}</td>`}
              <td>${item.diseaseHistory}</td>
              <td>${item.allergyHistory}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    `}
  `;
}

function openLogin() {
  loginOverlay.classList.remove('hidden');
  loginOverlay.setAttribute('aria-hidden', 'false');
  loginUsername.focus();
}

function closeLogin() {
  loginOverlay.classList.add('hidden');
  loginOverlay.setAttribute('aria-hidden', 'true');
  loginForm.reset();
}

function openRegister() {
  registerOverlay?.classList.remove('hidden');
  registerOverlay?.setAttribute('aria-hidden', 'false');
  registerUsername?.focus();
}

function closeRegister() {
  registerOverlay?.classList.add('hidden');
  registerOverlay?.setAttribute('aria-hidden', 'true');
  registerForm?.reset();
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();
  const user = getAllUsers().find((item) => item.username === username && item.password === password);

  if (!user) {
    openModal('登入失敗', '帳號或密碼錯誤，請重新輸入。');
    return;
  }

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify({ username: user.username, role: user.role }));
  updateAuthDisplay();
  closeLogin();
  renderPageContent(currentPage || 'homePage');
  openModal('登入成功', `歡迎，${user.role} ${user.username}。請從上方下拉選單選擇頁面。`);
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();
  const displayName = registerDisplayName.value.trim();
  const phone = registerPhone.value.trim();

  if (getAllUsers().some((item) => item.username === username)) {
    openModal('註冊失敗', '這個帳號已被使用，請換一個帳號。');
    return;
  }

  const newUser = {
    username,
    password,
    role: '家屬',
    displayName,
    phone,
    createdAt: formatDateTime(new Date()),
  };

  registeredUsers.push(newUser);
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify({ username: newUser.username, role: newUser.role }));
  saveData();
  closeRegister();
  updateAuthDisplay();
  showPage('familyPage');
  openModal('註冊成功', '已建立家屬帳號。你可以在家屬專區替多位長照需求者分別提交申請。');
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthDisplay();
  showPage('homePage');
  renderPageContent('homePage');
  openModal('已登出', '您已成功登出，返回首頁。');
}

function handleNavClick(event) {
  const pageId = event.currentTarget.dataset.page;
  if (!pageId) return;

  if (!canAccess(pageId)) {
    if (!currentUser) {
      openLogin();
      return;
    }
    openModal('存取拒絕', '您的身份無法進入此頁面。');
    return;
  }

  showPage(pageId);
}

loadSavedData();
updateAuthDisplay();
showPage('homePage');

function renderCalendar() {
  if (!calendar) return;
  calendar.innerHTML = '';
  const now = new Date();
  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();
  const todayKey = getTodayKey();
  const activityDateMap = getActivityDatesMap();

  const title = document.createElement('div');
  title.className = 'calendar-title';
  title.innerHTML = `
    <button class="calendar-nav-button" type="button" id="prevMonthButton" aria-label="上一個月">‹</button>
    <div><strong>${year} 年 ${month + 1} 月</strong><span>紅點代表當日有活動</span></div>
    <button class="calendar-nav-button" type="button" id="nextMonthButton" aria-label="下一個月">›</button>
  `;

  const monthBlock = document.createElement('section');
  monthBlock.className = 'calendar-month';
  const monthTitle = document.createElement('h4');
  monthTitle.textContent = `${month + 1} 月`;
  const grid = document.createElement('div');
  grid.className = 'calendar-grid';
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  weekdays.forEach((label) => {
    const cell = document.createElement('div');
    cell.className = 'calendar-weekday';
    cell.textContent = label;
    grid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    grid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysCount; day += 1) {
    const dateKey = formatDateKey(year, month, day);
    const dayCell = document.createElement('button');
    dayCell.type = 'button';
    dayCell.className = 'calendar-day';
    dayCell.textContent = day;
    if (dateKey === todayKey) {
      dayCell.classList.add('today');
    }
    if (activityDateMap[dateKey]) {
      dayCell.classList.add('has-activity');
      dayCell.title = `${activityDateMap[dateKey]} 場活動`;
      dayCell.addEventListener('click', () => showActivitiesForDate(dateKey));
    }
    grid.appendChild(dayCell);
  }

  monthBlock.appendChild(monthTitle);
  monthBlock.appendChild(grid);
  calendar.appendChild(title);
  calendar.appendChild(monthBlock);
  document.getElementById('prevMonthButton')?.addEventListener('click', () => changeCalendarMonth(-1));
  document.getElementById('nextMonthButton')?.addEventListener('click', () => changeCalendarMonth(1));
}

function changeCalendarMonth(offset) {
  const nextDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + offset, 1);
  const minDate = new Date(2026, 0, 1);
  const maxDate = new Date(2026, 11, 1);
  if (nextDate < minDate || nextDate > maxDate) {
    openModal('行事曆範圍', '行事曆目前只開放查看 2026 年 1 月至 12 月。');
    return;
  }
  calendarViewDate = nextDate;
  renderCalendar();
}

function showActivitiesForDate(dateKey) {
  const activities = activityItems.filter((activity) => activity.date === dateKey);
  if (activities.length === 0) return;
  openModal(
    `${dateKey} 活動`,
    activities.map((activity) => `${activity.title}｜${activity.place}｜${getActivityRegistrationCount(activity.id)}/${activity.capacity} 人｜截止 ${getActivityDeadline(activity)}`).join('\n')
  );
}

function updateStats(data) {
  if (!data) return;
  statAlerts.textContent = `${data.alerts} 位`;
  statPending.textContent = `${data.pendingRecords} 筆`;
  statEvents.textContent = `${data.todayEvents} 場`;
  statNotices.textContent = `${data.latestNotices} 則`;
}

function renderRiskList(list) {
  if (!riskTableBody) return;
  riskTableBody.innerHTML = '';
  if (!list || list.length === 0) {
    riskTableBody.innerHTML = '<tr><td colspan="6">目前沒有由真實申請或照護紀錄產生的高風險資料。</td></tr>';
    return;
  }

  list.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td><span class="tag ${item.level === '高風險' ? 'tag-danger' : 'tag-warning'}">${item.level}</span></td>
      <td>${item.issue}</td>
      <td>${item.updatedAt}</td>
      <td><a href="#">查看</a></td>
    `;
    riskTableBody.appendChild(row);
  });
}

function renderAnnouncements(items) {
  if (!announcementList) return;
  announcementList.innerHTML = '';
  if (!items || items.length === 0) {
    announcementList.innerHTML = '<li>目前沒有系統公告。</li>';
    return;
  }
  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong> ${item.message}`;
    announcementList.appendChild(li);
  });
}

function getRealDashboardStats() {
  const realRisks = getRealRiskRows();
  return {
    alerts: realRisks.length,
    pendingRecords: getMissingDailyRecordItems().length,
    todayEvents: activityItems.filter((item) => item.date === getTodayKey()).length,
    latestNotices: buildNotificationItems().length,
  };
}

function renderNotificationCenter() {
  const notificationItems = buildNotificationItems();
  const messageItems = buildMessageItems();
  if (notificationList) {
    notificationList.innerHTML = notificationItems.length > 0 ? notificationItems.map((item) => `
      <article class="panel-item">
        <div>
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </div>
        <span>${item.time}</span>
      </article>
    `).join('') : '<div class="empty-panel">目前沒有新的通知。</div>';
  }
  if (messageList) {
    messageList.innerHTML = messageItems.length > 0 ? messageItems.map((item) => `
      <article class="panel-item">
        <div>
          <strong>${item.sender}</strong>
          <p>${item.detail}</p>
        </div>
        <span>${item.time}</span>
      </article>
    `).join('') : '<div class="empty-panel">目前沒有新的訊息。</div>';
  }
  if (notificationBadge) notificationBadge.textContent = String(notificationItems.length);
  if (messageBadge) messageBadge.textContent = String(messageItems.length);
}

function buildNotificationItems() {
  const items = [];
  const role = currentUser?.role;
  const nowLabel = new Date().toLocaleTimeString('zh-Hant', { hour: '2-digit', minute: '2-digit', hour12: false });
  const highRiskItems = getRealRiskRows();
  const pendingApplications = familyApplications.filter((item) => item.status === '待審核');
  const missingRecords = getMissingDailyRecordItems();
  const nearlyFullActivities = activityItems.filter((item) => item.capacity - getActivityRegistrationCount(item.id) <= 4);
  const upcomingActivities = getUpcomingActivities(3);

  if (!currentUser) {
    return [
      { title: '請先登入', detail: '登入後會依照管理員、照護員或家屬身份顯示即時通知。', time: nowLabel },
    ];
  }

  if (role === '管理員') {
    if (highRiskItems.length > 0) {
      items.push({ title: '健康異常提醒', detail: `${highRiskItems.length} 位長者目前列為高風險，請確認照護追蹤。`, time: nowLabel });
    }
    if (pendingApplications.length > 0) {
      items.push({ title: '申請待審核', detail: `目前有 ${pendingApplications.length} 筆家屬照護申請等待審核。`, time: nowLabel });
    }
    if (missingRecords.length > 0) {
      items.push({ title: '紀錄尚未完成', detail: `今日仍有 ${missingRecords.length} 位照護對象尚未完成照護紀錄。`, time: nowLabel });
    }
  }

  if (role === '照護員') {
    const caregiver = caregivers.find((item) => item.username === currentUser.username);
    const myMissingRecords = caregiver
      ? missingRecords.filter((item) => item.assignedCaregiver === caregiver.id)
      : [];
    const myHighRisk = caregiver
      ? highRiskItems.filter((item) => caregiver.assignedClients.includes(item.name))
      : [];
    if (myHighRisk.length > 0) {
      items.push({ title: '健康異常提醒', detail: `${myHighRisk.map((item) => item.name).join('、')} 目前為高風險，請優先追蹤。`, time: nowLabel });
    }
    if (myMissingRecords.length > 0) {
      items.push({ title: '紀錄尚未完成', detail: `你今日還有 ${myMissingRecords.length} 筆照護紀錄待填寫。`, time: nowLabel });
    }
  }

  if (role === '家屬') {
    const myApplications = familyApplications.filter((item) => item.applicant === currentUser.username);
    const approved = myApplications.filter((item) => item.status === '已通過');
    const pending = myApplications.filter((item) => item.status === '待審核');
    const rejected = myApplications.filter((item) => item.status === '已拒絕');
    if (pending.length > 0) {
      items.push({ title: '申請審核中', detail: `你有 ${pending.length} 筆長照需求正在等待管理者審核。`, time: nowLabel });
    }
    if (approved.length > 0) {
      items.push({ title: '照護指派完成', detail: `${approved.length} 筆需求已通過並指派照護員。`, time: nowLabel });
    }
    if (rejected.length > 0) {
      items.push({ title: '申請狀態更新', detail: `${rejected.length} 筆申請未通過，請洽服務窗口確認。`, time: nowLabel });
    }
  }

  nearlyFullActivities.forEach((activity) => {
    items.push({ title: '活動名額更新', detail: `${activity.title} 剩餘 ${activity.capacity - getActivityRegistrationCount(activity.id)} 個名額。`, time: '今日' });
  });

  upcomingActivities.forEach((activity) => {
    items.push({
      title: '即將到來的活動',
      detail: `${activity.date} ${activity.title}，地點：${activity.place}。`,
      time: activity.date,
    });
  });

  return items;
}

function buildMessageItems() {
  if (!currentUser) return [];
  if (currentUser.role === '管理員') {
    return getFamilyApplicationSummary()
      .filter((item) => item.total > 0)
      .slice(0, 4)
      .map((item) => ({
        sender: item.displayName,
        detail: `目前有 ${item.total} 筆長照需求，其中 ${item.pending} 筆待審核。`,
        time: '今日',
      }));
  }
  if (currentUser.role === '家屬') {
    return familyApplications
      .filter((item) => item.applicant === currentUser.username)
      .slice(0, 3)
      .map((item) => ({
        sender: '系統通知',
        detail: `${item.clientName} 的申請狀態為「${item.status}」。`,
        time: '今日',
      }));
  }
  const caregiver = caregivers.find((item) => item.username === currentUser.username);
  if (!caregiver) return [];
  return caregiver.assignedClients.slice(0, 3).map((clientName) => ({
    sender: '照護指派',
    detail: `請持續追蹤 ${clientName} 的今日健康與用藥狀態。`,
    time: '今日',
  }));
}

function closeFloatingPanels() {
  notificationPanel?.classList.remove('open');
  messagePanel?.classList.remove('open');
}

function renderCaseSummary(list) {
  if (!caseSummary) return;
  const openCount = list.filter((item) => item.status === '已通過').length;
  const pendingCount = list.filter((item) => item.status === '待審核').length;
  const doneCount = list.filter((item) => item.status === '已拒絕').length;

  caseSummary.innerHTML = `
    <div class="case-pill"><span>已通過</span><strong>${openCount}</strong></div>
    <div class="case-pill"><span>待審核</span><strong>${pendingCount}</strong></div>
    <div class="case-pill"><span>已拒絕</span><strong>${doneCount}</strong></div>
  `;
}

function refreshRightPanel() {
  currentAnnouncementData = buildSystemAnnouncements();
  currentCaseData = buildCaseData();
  renderAnnouncements(currentAnnouncementData);
  renderCaseSummary(currentCaseData);
  renderCaseList(currentCaseData);
  updateStats(getRealDashboardStats());
}

function renderCaseList(list) {
  if (!caseList) return;
  caseList.innerHTML = '';
  if (!currentUser) {
    caseList.innerHTML = '<div class="empty-panel">請先登入以查看案件管理。</div>';
    return;
  }
  if (!list || list.length === 0) {
    caseList.innerHTML = '<div class="empty-panel">目前沒有可見的案件。</div>';
    return;
  }
  list.slice(0, 3).forEach((item) => {
    const row = document.createElement('div');
    row.className = 'case-item';
    row.innerHTML = `
      <div>
        <strong>${item.code}</strong>
        <p>${item.name}</p>
      </div>
      <div class="case-meta">
        <span>家屬 ${item.owner}</span>
        <span>照護員 ${item.caregiver}</span>
      </div>
      <div><span class="case-status ${item.status === '已通過' ? 'open' : item.status === '待審核' ? 'urgent' : 'done'}">${item.status}</span></div>
    `;
    caseList.appendChild(row);
  });
}

function filterRiskTable(keyword) {
  const filtered = currentRiskData.filter((item) => {
    const lower = keyword.toLowerCase();
    return item.id.toLowerCase().includes(lower) ||
      item.name.toLowerCase().includes(lower) ||
      item.issue.toLowerCase().includes(lower);
  });
  renderRiskList(filtered);
}

function openModal(title, message) {
  if (!modalOverlay || !modalTitle || !modalBody) return;
  modalTitle.textContent = title;
  modalBody.textContent = message;
  modalOverlay.classList.add('visible');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function openListModal(title, rows) {
  openModal(title, rows.length > 0 ? rows.join('\n') : '目前沒有資料。');
}

function handlePanelAction(action) {
  if (action === 'announcements') {
    openListModal('系統公告', currentAnnouncementData.map((item) => `${item.title}\n${item.message}`));
    return;
  }
  if (action === 'cases') {
    if (!currentUser) {
      openLogin();
      return;
    }
    if (currentUser.role === '管理員') {
      showPage('changesPage');
      return;
    }
    openListModal('案件管理', currentCaseData.map((item) => `${item.code}｜${item.name}｜${item.status}｜照護員：${item.caregiver}`));
    return;
  }
  if (action === 'downloads') {
    openListModal('官方下載區', [
      '長者健康紀錄範本：health-record-template.xlsx',
      '照護服務申請表：care-application-form.pdf',
      '活動報名名冊：activity-roster-template.xlsx',
    ]);
    return;
  }
  if (action === 'elder-search') {
    if (!currentUser) {
      openLogin();
      return;
    }
    if (canAccess('elderDataPage')) {
      showPage('elderDataPage');
      return;
    }
    openModal('權限不足', '此功能限管理員或照護員使用。');
    return;
  }
  if (action === 'manual') {
    openListModal('系統使用說明', [
      '1. 家屬註冊帳號後，可在家屬專區提交一位或多位長照需求。',
      '2. 管理員在異動管理中審核申請並指派照護員。',
      '3. 照護員在照護服務管理中填寫每日紀錄。',
      '4. 家屬與照護員可在活動參與管理替長者報名活動。',
    ]);
    return;
  }
  if (action === 'faq') {
    openListModal('常見問題 FAQ', [
      'Q：一個家屬可以申請多位長者嗎？\nA：可以，每位長者建立一筆申請。',
      'Q：管理員可以報名活動嗎？\nA：不行，管理員只能查看，由家屬或照護員替長者報名。',
      'Q：照護紀錄誰看得到？\nA：管理員可看全部，家屬看自己的長者，照護員看被指派的長者。',
    ]);
  }
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('visible');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

// 自定義下拉選單事件處理
if (dropdownToggle) {
  dropdownToggle.addEventListener('click', () => {
    const isOpen = dropdownMenu.classList.contains('open');
    if (isOpen) {
      dropdownMenu.classList.remove('open');
      dropdownToggle.classList.remove('active');
    } else {
      dropdownMenu.classList.add('open');
      dropdownToggle.classList.add('active');
    }
  });
}

if (dropdownItems) {
  dropdownItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('dropdown-item')) {
      const pageId = event.target.dataset.value;
      if (pageId) {
        showPage(pageId);
        dropdownMenu.classList.remove('open');
        dropdownToggle.classList.remove('active');
      }
    }
  });
}

// 點擊外部關閉下拉選單
document.addEventListener('click', (event) => {
  if (customDropdown && !customDropdown.contains(event.target)) {
    dropdownMenu?.classList.remove('open');
    dropdownToggle?.classList.remove('active');
  }
  if (!event.target.closest('.notification-container') && !event.target.closest('.message-container')) {
    closeFloatingPanels();
  }
});

topbarSelect?.addEventListener('change', (event) => {
  const pageId = event.target.value;
  if (pageId) {
    showPage(pageId);
  }
});

modalClose?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', (event) => {
  if (event.target === modalOverlay) closeModal();
});

loginButton?.addEventListener('click', () => {
  if (currentUser) {
    handleLogout();
  } else {
    openLogin();
  }
});

registerButton?.addEventListener('click', openRegister);
themeToggle?.addEventListener('click', toggleTheme);
loginForm?.addEventListener('submit', handleLoginSubmit);
loginCancel?.addEventListener('click', closeLogin);
loginCancelButton?.addEventListener('click', closeLogin);
loginOverlay?.addEventListener('click', (event) => {
  if (event.target === loginOverlay) closeLogin();
});
registerForm?.addEventListener('submit', handleRegisterSubmit);
registerCancel?.addEventListener('click', closeRegister);
registerCancelButton?.addEventListener('click', closeRegister);
registerOverlay?.addEventListener('click', (event) => {
  if (event.target === registerOverlay) closeRegister();
});

notificationButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  messagePanel?.classList.remove('open');
  notificationPanel?.classList.toggle('open');
});

messageButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  notificationPanel?.classList.remove('open');
  messagePanel?.classList.toggle('open');
});

document.querySelectorAll('.panel-close').forEach((button) => {
  button.addEventListener('click', closeFloatingPanels);
});

navButtons.forEach((button) => {
  button.addEventListener('click', handleNavClick);
});

actionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const actionPage = button.dataset.action;
    if (actionPage) {
      if (canAccess(actionPage)) {
        showPage(actionPage);
        return;
      }
      if (!currentUser) {
        openLogin();
        return;
      }
      openModal('存取拒絕', '您的身份無法使用此功能。');
      return;
    }
    const actionName = button.textContent.trim();
    openModal(actionName, `已啟動功能：${actionName}。後續可從此處連到完整操作頁面。`);
  });
});

document.querySelectorAll('[data-panel-action]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    handlePanelAction(link.dataset.panelAction);
  });
});

async function loadDashboard() {
  try {
    const [dashboardRes, riskRes, announcementsRes, casesRes] = await Promise.all([
      fetch('/api/dashboard'),
      fetch('/api/risk-list'),
      fetch('/api/announcements'),
      fetch('/api/cases'),
    ]);

    if (!dashboardRes.ok || !riskRes.ok || !announcementsRes.ok || !casesRes.ok) {
      throw new Error('無法取得後端資料');
    }

    await dashboardRes.json();
    await riskRes.json();
    await announcementsRes.json();
    await casesRes.json();

    currentRiskData = getRealRiskRows();
    currentAnnouncementData = buildSystemAnnouncements();
    currentCaseData = buildCaseData();

    updateStats(getRealDashboardStats());
    renderRiskList(currentRiskData);
    renderAnnouncements(currentAnnouncementData);
    renderCaseSummary(currentCaseData);
    renderCaseList(currentCaseData);
    renderNotificationCenter();
  } catch (error) {
    console.warn('Dashboard data load failed:', error);
  }
}

renderCalendar();
renderNotificationCenter();
refreshRightPanel();
applyTheme(localStorage.getItem('themeMode') || 'light');
loadDashboard();
