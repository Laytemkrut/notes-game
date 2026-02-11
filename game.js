// Telegram Mini App
let tg = window.Telegram.WebApp;
tg.expand();
tg.ready();
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Все 60 цитат (сохранены из предыдущей версии)
const dailyQuotes = [
    { text: "Счастье есть цель, к которой стремится всякий разумный человек", author: "Аль-Фараби" },
    { text: "Разум — это свет, освещающий путь человеку", author: "Аль-Фараби" },
    { text: "Человек становится человеком через знание", author: "Аль-Фараби" },
    { text: "Государство гибнет не от силы врагов, а от невежества правителей", author: "Аль-Фараби" },
    { text: "Добродетель не врождённая, она воспитывается", author: "Аль-Фараби" },
    { text: "Я знаю, что ничего не знаю", author: "Сократ" },
    { text: "Мнение — это не знание", author: "Платон" },
    { text: "Мы есть то, что делаем постоянно", author: "Аристотель" },
    { text: "Не потому трудно, что мы не смеем, а не смеем, потому что трудно", author: "Сенека" },
    { text: "Людей тревожат не события, а их мнение о них", author: "Эпиктет" },
    { text: "Люди скорее забудут смерть отца, чем потерю имущества", author: "Никколо Макиавелли" },
    { text: "Цель оправдывает средства", author: "Никколо Макиавелли" },
    { text: "Лучше быть внушающим страх, чем любимым", author: "Никколо Макиавелли" },
    { text: "Люди по природе неблагодарны и лживы", author: "Никколо Макиавелли" },
    { text: "Никогда не затмевай господина", author: "Роберт Грин" },
    { text: "Скрывай свои намерения", author: "Роберт Грин" },
    { text: "Всегда добивайся победы", author: "Роберт Грин" },
    { text: "Используй отсутствие, чтобы повысить уважение", author: "Роберт Грин" },
    { text: "Разгроми врага полностью", author: "Роберт Грин" },
    { text: "Действуй смело, нерешительность убивает власть", author: "Роберт Грин" },
    { text: "Никогда не спорь с глупцом, окружающие могут не заметить разницы", author: "Марк Твен" },
    { text: "Правда — самое ценное, что у нас есть, экономьте её", author: "Марк Твен" },
    { text: "Образование — это то, что остаётся, когда всё выученное забыто", author: "Марк Твен" },
    { text: "Человек — единственное животное, способное краснеть", author: "Марк Твен" },
    { text: "То, что не убивает, делает сильнее", author: "Фридрих Ницше" },
    { text: "Кто сражается с чудовищами, должен следить, чтобы самому не стать чудовищем", author: "Фридрих Ницше" },
    { text: "Если долго смотришь в бездну, бездна смотрит в тебя", author: "Фридрих Ницше" },
    { text: "Человек — это канат между зверем и сверхчеловеком", author: "Фридрих Ницше" },
    { text: "Человек может делать что хочет, но не может хотеть что хочет", author: "Артур Шопенгауэр" },
    { text: "Человек — мыслящий тростник", author: "Блез Паскаль" },
    { text: "Человек обречён быть свободным", author: "Жан-Поль Сартр" },
    { text: "Жить — значит бунтовать", author: "Альбер Камю" },
    { text: "Лучшая победа — та, что достигнута без боя", author: "Сунь-цзы" },
    { text: "Знай врага и знай себя, и не проиграешь ни одной битвы", author: "Сунь-цзы" },
    { text: "Мягкое побеждает твёрдое", author: "Лао-цзы" },
    { text: "Тот, кто знает себя, просветлён", author: "Лао-цзы" },
    { text: "Все люди — инструменты", author: "Аянокоджи Киётака" },
    { text: "Равенство — это иллюзия", author: "Аянокоджи Киётака" },
    { text: "Побеждает не сильнейший, а самый хладнокровный", author: "Аянокоджи Киётака" },
    { text: "Эмоции — слабость, замаскированная под искренность", author: "Аянокоджи Киётака" },
    { text: "Наблюдать выгоднее, чем действовать первым", author: "Аянокоджи Киётака" },
    { text: "Настоящая власть — когда тебя не замечают", author: "Аянокоджи Киётака" },
    { text: "Проигрыш начинается с уверенности в победе", author: "Аянокоджи Киётака" },
    { text: "Не каждый путь ведёт вперёд, даже если ты идёшь", author: "Не Ной" },
    { text: "Иногда остановка — это форма движения", author: "Не Ной" },
    { text: "Человек теряет себя, когда пытается быть удобным", author: "Не Ной" },
    { text: "Молчание часто честнее слов", author: "Не Ной" },
    { text: "Не все потери — поражения", author: "Не Ной" },
    { text: "Мир не жесток, он равнодушен", author: "Неизвестный автор" },
    { text: "Разум — оружие, если знаешь, куда бить", author: "Неизвестный автор" },
    { text: "Иногда проигрыш — лучшая маскировка", author: "Неизвестный автор" },
    { text: "Человек строит клетку из собственных убеждений", author: "Неизвестный автор" },
    { text: "Контроль начинается с информации", author: "Неизвестный автор" },
    { text: "Свобода пугает сильнее клетки", author: "Неизвестный автор" },
    { text: "Люди ненавидят правду, если она лишает их иллюзий", author: "Неизвестный автор" },
    { text: "Доверие — самый дорогой ресурс", author: "Неизвестный автор" },
    { text: "Добро без силы беспомощно", author: "Неизвестный автор" },
    { text: "Власть любит тишину", author: "Неизвестный автор" },
    { text: "Мысли опаснее оружия", author: "Неизвестный автор" },
    { text: "Понимание опаснее знания", author: "Неизвестный автор" }
];

// Конфигурация ветвей с ХАОТИЧНЫМ расположением
const branchConfigs = [
    { key: 'personal', name: 'Личное', icon: '💫', color: '#FF6B6B', colorDark: '#C92A2A', x: -420, y: -180 },
    { key: 'development', name: 'Саморазвитие', icon: '🌟', color: '#4ECDC4', colorDark: '#2B8A81', x: 280, y: -350 },
    { key: 'work', name: 'Работа', icon: '⭐', color: '#45B7D1', colorDark: '#2E7D9A', x: 480, y: 120 },
    { key: 'hobby', name: 'Хобби', icon: '🎨', color: '#FFA07A', colorDark: '#FF6347', x: 180, y: 420 },
    { key: 'finance', name: 'Финансы', icon: '💰', color: '#98D8C8', colorDark: '#5FA89E', x: -320, y: 350 },
    { key: 'media', name: 'Фильмы/Сериалы', icon: '🎬', color: '#F06292', colorDark: '#C2185B', x: -540, y: 80 },
    { key: 'diary', name: 'Ежедневник', icon: '📔', color: '#9575CD', colorDark: '#673AB7', x: 60, y: -280 }
];

const branches = {};
branchConfigs.forEach(config => {
    branches[config.key] = { ...config, notes: [] };
});

// Состояние приложения
let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentBranch = null;
let isPremium = false;
let currentSkin = 'default';
let currentBgSkin = 'default';
let reminderEnabled = false;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Ключи хранения
const userId = tg.initDataUnsafe?.user?.id || 'guest';
const STORAGE_KEY = 'universe_' + userId;
const NAMES_KEY = 'universe_names_' + userId;
const PREMIUM_KEY = 'premium_' + userId;
const SKIN_KEY = 'skin_' + userId;
const BG_KEY = 'bg_' + userId;
const REMINDERS_KEY = 'reminders_' + userId;

// Инициализация
function init() {
    showLoader();
    loadData();
    loadCustomNames();
    loadPremium();
    createStars();
    displayDailyQuote();
    renderUniverse();
    setupControls();
    updateStats();
    setupReminderChecker();
    hideLoader();
    
    tg.BackButton.show();
    tg.BackButton.onClick(() => tg.close());
}

// Данные
function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(branches).forEach(key => {
                if (data[key]) branches[key].notes = data[key];
            });
        }
    } catch (e) {}
}

function saveData() {
    try {
        const data = {};
        Object.keys(branches).forEach(key => {
            data[key] = branches[key].notes;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        if (tg.CloudStorage) tg.CloudStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
}

function loadCustomNames() {
    try {
        const saved = localStorage.getItem(NAMES_KEY);
        if (saved) {
            const names = JSON.parse(saved);
            Object.keys(names).forEach(key => {
                if (branches[key]) branches[key].name = names[key];
            });
        }
    } catch (e) {}
}

function saveCustomNames() {
    try {
        const names = {};
        Object.keys(branches).forEach(key => {
            names[key] = branches[key].name;
        });
        localStorage.setItem(NAMES_KEY, JSON.stringify(names));
    } catch (e) {}
}

function loadPremium() {
    isPremium = localStorage.getItem(PREMIUM_KEY) === 'true';
    currentSkin = localStorage.getItem(SKIN_KEY) || 'default';
    currentBgSkin = localStorage.getItem(BG_KEY) || 'default';
    applyBgSkin();
}

function savePremium() {
    localStorage.setItem(PREMIUM_KEY, isPremium.toString());
    localStorage.setItem(SKIN_KEY, currentSkin);
    localStorage.setItem(BG_KEY, currentBgSkin);
}

function applyBgSkin() {
    const bg = document.getElementById('space-bg');
    bg.className = 'space-bg bg-' + currentBgSkin;
}

// Цитата дня
function displayDailyQuote() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('quote_date');
    
    let index;
    if (savedDate === today) {
        index = parseInt(localStorage.getItem('quote_index') || '0');
    } else {
        index = Math.floor(Math.random() * dailyQuotes.length);
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_index', index.toString());
    }
    
    const quote = dailyQuotes[index];
    document.getElementById('quote-text').textContent = quote.text;
    document.getElementById('quote-author').textContent = '— ' + quote.author;
}

// Космический фон
function createStars() {
    const container = document.getElementById('stars');
    const sizes = ['tiny', 'small', 'medium', 'large'];
    
    for (let i = 0; i < 400; i++) {
        const star = document.createElement('div');
        star.className = 'star ' + sizes[Math.floor(Math.random() * sizes.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        if (Math.random() > 0.7) {
            star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;
            star.style.animationDelay = Math.random() * 3 + 's';
        }
        
        container.appendChild(star);
    }
}

// Вселенная с ХАОТИЧНЫМ расположением
function renderUniverse() {
    const universe = document.getElementById('universe');
    universe.querySelectorAll('.branch, .note-planet, .connection-line').forEach(el => el.remove());
    
    const centerX = 2000;
    const centerY = 2000;
    
    // Рисуем ветви в хаотичном порядке
    branchConfigs.forEach(config => {
        const branch = branches[config.key];
        const x = centerX + config.x - 50;
        const y = centerY + config.y - 50;
        
        // Линия от центра
        const line = document.createElement('div');
        line.className = 'connection-line';
        const distance = Math.sqrt(Math.pow(x + 50 - centerX, 2) + Math.pow(y + 50 - centerY, 2));
        const angle = Math.atan2(y + 50 - centerY, x + 50 - centerX) * (180 / Math.PI);
        line.style.width = distance + 'px';
        line.style.left = centerX + 'px';
        line.style.top = centerY + 'px';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.setProperty('--line-color', config.color);
        universe.appendChild(line);
        
        // Ветвь
        const branchEl = document.createElement('div');
        branchEl.className = 'branch';
        branchEl.dataset.branch = config.key;
        branchEl.style.left = x + 'px';
        branchEl.style.top = y + 'px';
        branchEl.style.setProperty('--branch-color', config.color);
        branchEl.style.setProperty('--branch-color-dark', config.colorDark);
        branchEl.innerHTML = `
            <div class="branch-icon">${config.icon}</div>
            <div class="branch-name">${branch.name}</div>
            <div class="branch-count">${branch.notes.length}</div>
        `;
        branchEl.onclick = (e) => {
            e.stopPropagation();
            openBranchModal(config.key);
        };
        universe.appendChild(branchEl);
        
        // Планеты-заметки
        renderNotePlanets(config.key, x + 50, y + 50);
    });
}

function renderNotePlanets(branchKey, branchX, branchY) {
    const branch = branches[branchKey];
    const planetCount = branch.notes.length;
    if (planetCount === 0) return;
    
    const universe = document.getElementById('universe');
    const orbitRadius = 120 + Math.min(planetCount * 3, 60);
    
    branch.notes.forEach((note, index) => {
        const angle = (index / planetCount) * 2 * Math.PI;
        const size = 25 + Math.min(note.text.length / 8, 20);
        const x = branchX + orbitRadius * Math.cos(angle) - size / 2;
        const y = branchY + orbitRadius * Math.sin(angle) - size / 2;
        
        const planet = document.createElement('div');
        planet.className = `note-planet planet-skin-${currentSkin}`;
        planet.style.width = size + 'px';
        planet.style.height = size + 'px';
        planet.style.left = x + 'px';
        planet.style.top = y + 'px';
        planet.style.setProperty('--planet-color', branch.color);
        planet.style.setProperty('--planet-color-dark', branch.colorDark);
        planet.style.animationDelay = (index * 0.5) + 's';
        planet.onclick = (e) => {
            e.stopPropagation();
            showNotePlanet(branchKey, index);
        };
        universe.appendChild(planet);
    });
}

function showNotePlanet(branchKey, noteIndex) {
    const branch = branches[branchKey];
    const note = branch.notes[noteIndex];
    
    let message = note.text;
    if (note.reminder) {
        message += `\n\n⏰ Напоминание: ${formatDateTime(note.reminder)}`;
    }
    
    tg.showPopup({
        title: `${branch.icon} ${branch.name}`,
        message: message,
        buttons: [
            { id: 'delete', type: 'destructive', text: 'Удалить' },
            { type: 'close' }
        ]
    }, (buttonId) => {
        if (buttonId === 'delete') {
            branch.notes.splice(noteIndex, 1);
            saveData();
            renderUniverse();
            updateStats();
            if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('warning');
        }
    });
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

// Зум и перемещение
function setupControls() {
    const universe = document.getElementById('universe');
    
    universe.addEventListener('mousedown', startDrag);
    universe.addEventListener('touchstart', startDrag, { passive: false });
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    
    updateTransform();
}

function startDrag(e) {
    isDragging = true;
    const universe = document.getElementById('universe');
    universe.classList.add('grabbing');
    
    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX - posX;
        startY = e.touches[0].clientY - posY;
    } else {
        startX = e.clientX - posX;
        startY = e.clientY - posY;
    }
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    if (e.type === 'touchmove') {
        posX = e.touches[0].clientX - startX;
        posY = e.touches[0].clientY - startY;
    } else {
        posX = e.clientX - startX;
        posY = e.clientY - startY;
    }
    
    updateTransform();
}

function stopDrag() {
    isDragging = false;
    document.getElementById('universe').classList.remove('grabbing');
}

function updateTransform() {
    const universe = document.getElementById('universe');
    universe.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${scale})`;
}

function zoomIn() {
    scale = Math.min(scale + 0.2, 3);
    updateTransform();
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function zoomOut() {
    scale = Math.max(scale - 0.2, 0.3);
    updateTransform();
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function resetZoom() {
    scale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

// Модальное окно ветви
function openBranchModal(branchKey) {
    currentBranch = branchKey;
    const branch = branches[branchKey];
    
    document.getElementById('modal-icon').textContent = branch.icon;
    document.getElementById('modal-name').textContent = branch.name;
    document.getElementById('modal-title').style.color = branch.color;
    
    renderNotesList();
    document.getElementById('modal').classList.add('active');
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    clearForm();
    currentBranch = null;
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function renderNotesList() {
    const container = document.getElementById('notes-list');
    const branch = branches[currentBranch];
    
    if (branch.notes.length === 0) {
        container.innerHTML = `
            <div class="empty-notes">
                <div style="font-size: 60px; margin-bottom: 15px;">🌌</div>
                <div>Пока нет планет.<br>Создайте первую!</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    branch.notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.style.setProperty('--branch-color', branch.color);
        
        let reminderHTML = '';
        if (note.reminder) {
            reminderHTML = `<div class="note-reminder">⏰ ${formatDateTime(note.reminder)}</div>`;
        }
        
        card.innerHTML = `
            <div class="note-text">${escapeHtml(note.text)}</div>
            <div class="note-date">${formatDate(note.created_at)}</div>
            ${reminderHTML}
            <button class="note-delete" onclick="deleteNote(${index})">×</button>
        `;
        container.appendChild(card);
    });
}

// Напоминания
function toggleReminder() {
    reminderEnabled = !reminderEnabled;
    const toggle = document.getElementById('reminder-toggle');
    const input = document.getElementById('reminder-input-group');
    
    if (reminderEnabled) {
        toggle.classList.add('active');
        input.style.display = 'block';
        
        // Установить минимальную дату на текущее время
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        document.getElementById('reminder-datetime').min = now.toISOString().slice(0, 16);
    } else {
        toggle.classList.remove('active');
        input.style.display = 'none';
    }
}

function setupReminderChecker() {
    // Проверяем напоминания каждую минуту
    setInterval(checkReminders, 60000);
    checkReminders(); // Проверяем сразу при загрузке
}

function checkReminders() {
    const now = new Date();
    
    Object.values(branches).forEach(branch => {
        branch.notes.forEach(note => {
            if (note.reminder && !note.reminded) {
                const reminderDate = new Date(note.reminder);
                if (now >= reminderDate) {
                    // Отправляем уведомление
                    tg.showPopup({
                        title: '⏰ Напоминание!',
                        message: note.text,
                        buttons: [{ type: 'ok' }]
                    });
                    
                    note.reminded = true;
                    saveData();
                    
                    if (tg.HapticFeedback) {
                        tg.HapticFeedback.notificationOccurred('success');
                    }
                }
            }
        });
    });
}

function saveNote() {
    if (!currentBranch) return;
    
    const text = document.getElementById('note-input').value.trim();
    if (!text) {
        tg.showAlert('Введите текст заметки!');
        return;
    }
    
    const note = {
        id: Date.now(),
        text: text,
        created_at: new Date().toISOString()
    };
    
    if (reminderEnabled) {
        const datetime = document.getElementById('reminder-datetime').value;
        if (!datetime) {
            tg.showAlert('Укажите дату и время напоминания!');
            return;
        }
        note.reminder = new Date(datetime).toISOString();
        note.reminded = false;
    }
    
    branches[currentBranch].notes.unshift(note);
    saveData();
    renderNotesList();
    renderUniverse();
    updateStats();
    clearForm();
    
    tg.showPopup({
        title: '✨ Планета создана!',
        message: reminderEnabled ? 
            `Планета с напоминанием добавлена в "${branches[currentBranch].name}"` : 
            `Планета добавлена в "${branches[currentBranch].name}"`,
        buttons: [{type: 'ok'}]
    });
    
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
}

function deleteNote(index) {
    if (!currentBranch) return;
    
    tg.showConfirm('Удалить эту планету?', (confirmed) => {
        if (confirmed) {
            branches[currentBranch].notes.splice(index, 1);
            saveData();
            renderNotesList();
            renderUniverse();
            updateStats();
            if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('warning');
        }
    });
}

function clearForm() {
    document.getElementById('note-input').value = '';
    reminderEnabled = false;
    document.getElementById('reminder-toggle').classList.remove('active');
    document.getElementById('reminder-input-group').style.display = 'none';
    document.getElementById('reminder-datetime').value = '';
}

function renameBranch() {
    if (!currentBranch) return;
    
    const current = branches[currentBranch].name;
    const newName = prompt(`Новое название для "${current}":`, current);
    
    if (newName && newName.trim()) {
        branches[currentBranch].name = newName.trim();
        saveCustomNames();
        document.getElementById('modal-name').textContent = newName.trim();
        renderUniverse();
        tg.showAlert('✅ Название изменено!');
    }
}

// Premium
function showPremium() {
    document.getElementById('premium-modal').classList.add('active');
    renderPremiumSkins();
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function closePremium() {
    document.getElementById('premium-modal').classList.remove('active');
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
}

function renderPremiumSkins() {
    const planetSkins = [
        { id: 'default', name: 'Стандарт', free: true },
        { id: 'crystal', name: 'Кристалл', free: false },
        { id: 'neon', name: 'Неон', free: false },
        { id: 'galaxy', name: 'Галактика', free: false },
        { id: 'fire', name: 'Огонь', free: false },
        { id: 'ice', name: 'Лёд', free: false },
        { id: 'metal', name: 'Металл', free: false },
        { id: 'rainbow', name: 'Радуга', free: false },
        { id: 'void', name: 'Бездна', free: false },
        { id: 'gold', name: 'Золото', free: false }
    ];
    
    const bgSkins = [
        { id: 'default', name: 'Стандарт', free: true },
        { id: 'purple', name: 'Фиолетовый', free: false },
        { id: 'green', name: 'Зелёный', free: false },
        { id: 'red', name: 'Красный', free: false },
        { id: 'blue', name: 'Синий', free: false }
    ];
    
    const planetContainer = document.getElementById('planet-skins');
    const bgContainer = document.getElementById('background-skins');
    
    planetContainer.innerHTML = '';
    bgContainer.innerHTML = '';
    
    planetSkins.forEach(skin => {
        const option = document.createElement('div');
        option.className = 'skin-option';
        if (currentSkin === skin.id) option.classList.add('selected');
        if (!skin.free && !isPremium) option.classList.add('locked');
        
        option.innerHTML = `
            <div class="skin-preview planet-skin-${skin.id}" style="--planet-color: #667eea; --planet-color-dark: #764ba2;"></div>
            <div class="skin-name">${skin.name}</div>
            ${!skin.free ? '<div class="skin-badge">PRO</div>' : ''}
        `;
        
        option.onclick = () => selectSkin(skin.id, skin.free);
        planetContainer.appendChild(option);
    });
    
    bgSkins.forEach(skin => {
        const option = document.createElement('div');
        option.className = 'skin-option';
        if (currentBgSkin === skin.id) option.classList.add('selected');
        if (!skin.free && !isPremium) option.classList.add('locked');
        
        option.innerHTML = `
            <div class="skin-preview bg-${skin.id}" style="width: 100%; height: 60px; border-radius: 10px;"></div>
            <div class="skin-name">${skin.name}</div>
            ${!skin.free ? '<div class="skin-badge">PRO</div>' : ''}
        `;
        
        option.onclick = () => selectBgSkin(skin.id, skin.free);
        bgContainer.appendChild(option);
    });
}

function selectSkin(skinId, isFree) {
    if (!isFree && !isPremium) {
        tg.showPopup({
            title: '🔒 Premium функция',
            message: 'Этот скин доступен только с Premium',
            buttons: [{ id: 'buy', text: 'Купить Premium' }, { type: 'cancel' }]
        }, (buttonId) => {
            if (buttonId === 'buy') buyPremium();
        });
        return;
    }
    
    currentSkin = skinId;
    savePremium();
    renderUniverse();
    renderPremiumSkins();
    
    tg.showAlert(`✅ Скин "${skinId}" применён!`);
}

function selectBgSkin(skinId, isFree) {
    if (!isFree && !isPremium) {
        tg.showPopup({
            title: '🔒 Premium функция',
            message: 'Этот фон доступен только с Premium',
            buttons: [{ id: 'buy', text: 'Купить Premium' }, { type: 'cancel' }]
        }, (buttonId) => {
            if (buttonId === 'buy') buyPremium();
        });
        return;
    }
    
    currentBgSkin = skinId;
    savePremium();
    applyBgSkin();
    renderPremiumSkins();
    
    tg.showAlert(`✅ Фон "${skinId}" применён!`);
}

function buyPremium() {
    tg.showPopup({
        title: '💳 Получить Premium',
        message: 'Активируем Premium бесплатно для демо!',
        buttons: [{ id: 'demo', text: 'Активировать' }, { type: 'cancel' }]
    }, (buttonId) => {
        if (buttonId === 'demo') {
            isPremium = true;
            savePremium();
            renderPremiumSkins();
            tg.showAlert('🎉 Premium активирован!');
        }
    });
}

// Игры
function showGames() {
    if (!isPremium) {
        tg.showPopup({
            title: '🔒 Premium функция',
            message: 'Игры доступны только с Premium подпиской',
            buttons: [{ id: 'buy', text: 'Купить Premium' }, { type: 'cancel' }]
        }, (buttonId) => {
            if (buttonId === 'buy') buyPremium();
        });
        return;
    }
    
    document.getElementById('games-modal').classList.add('active');
}

function closeGames() {
    document.getElementById('games-modal').classList.remove('active');
}

function switchGameTab(game) {
    document.querySelectorAll('#games-modal .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#games-modal .tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById('game-' + game).classList.add('active');
}

// Змейка (упрощённая реализация)
let snakeGame = null;

function startSnake() {
    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 15};
    let dx = 0;
    let dy = 0;
    let score = 0;
    
    if (snakeGame) clearInterval(snakeGame);
    
    document.addEventListener('keydown', changeDirection);
    
    function changeDirection(e) {
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
    }
    
    function gameLoop() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Двигаем змейку
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        // Проверка столкновений
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            clearInterval(snakeGame);
            tg.showAlert('Игра окончена! Счёт: ' + score);
            return;
        }
        
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                clearInterval(snakeGame);
                tg.showAlert('Игра окончена! Счёт: ' + score);
                return;
            }
        }
        
        snake.unshift(head);
        
        // Проверка еды
        if (head.x === food.x && head.y === food.y) {
            score++;
            document.getElementById('snake-score').textContent = score;
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        } else {
            snake.pop();
        }
        
        // Рисуем змейку
        ctx.fillStyle = '#4ECDC4';
        for (let segment of snake) {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        }
        
        // Рисуем еду
        ctx.fillStyle = '#FF6B6B';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    snakeGame = setInterval(gameLoop, 100);
}

// Сапёр (упрощённая реализация)
function startMinesweeper() {
    const canvas = document.getElementById('minesweeper-canvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 10;
    const tileSize = canvas.width / gridSize;
    const mineCount = 10;
    
    let grid = [];
    let revealed = [];
    let flags = 0;
    
    // Инициализация
    for (let i = 0; i < gridSize; i++) {
        grid[i] = [];
        revealed[i] = [];
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = 0;
            revealed[i][j] = false;
        }
    }
    
    // Расставляем мины
    let placed = 0;
    while (placed < mineCount) {
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        if (grid[x][y] !== -1) {
            grid[x][y] = -1;
            placed++;
        }
    }
    
    // Считаем числа
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === -1) continue;
            let count = 0;
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize && grid[ni][nj] === -1) {
                        count++;
                    }
                }
            }
            grid[i][j] = count;
        }
    }
    
    // Рисуем поле
    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const x = j * tileSize;
                const y = i * tileSize;
                
                if (revealed[i][j]) {
                    if (grid[i][j] === -1) {
                        ctx.fillStyle = '#FF6B6B';
                    } else {
                        ctx.fillStyle = '#2a2a2a';
                    }
                } else {
                    ctx.fillStyle = '#4a4a4a';
                }
                
                ctx.fillRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
                
                if (revealed[i][j] && grid[i][j] > 0) {
                    ctx.fillStyle = '#fff';
                    ctx.font = '20px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(grid[i][j], x + tileSize / 2, y + tileSize / 2);
                }
            }
        }
    }
    
    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / tileSize);
        const y = Math.floor((e.clientY - rect.top) / tileSize);
        
        if (x >= 0 && x < gridSize && y >= 0 && y < gridSize && !revealed[y][x]) {
            revealed[y][x] = true;
            if (grid[y][x] === -1) {
                draw();
                tg.showAlert('Вы попали на мину! Игра окончена.');
            } else {
                draw();
            }
        }
    };
    
    draw();
    document.getElementById('mines-count').textContent = mineCount;
}

// Календарь
function showCalendar() {
    document.getElementById('calendar-modal').classList.add('active');
    renderCalendar();
}

function closeCalendar() {
    document.getElementById('calendar-modal').classList.remove('active');
}

function renderCalendar() {
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                       'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    document.getElementById('current-month').textContent = 
        `${monthNames[currentMonth]} ${currentYear}`;
    
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    // Добавляем названия дней недели
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    days.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.textContent = day;
        dayEl.style.opacity = '0.6';
        dayEl.style.fontSize = '11px';
        grid.appendChild(dayEl);
    });
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Пустые ячейки в начале
    const startDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < startDay; i++) {
        grid.appendChild(document.createElement('div'));
    }
    
    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        
        // Проверяем, есть ли напоминания на этот день
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        let hasReminder = false;
        
        Object.values(branches).forEach(branch => {
            branch.notes.forEach(note => {
                if (note.reminder && note.reminder.startsWith(dateStr)) {
                    hasReminder = true;
                }
            });
        });
        
        if (hasReminder) dayEl.classList.add('has-reminder');
        
        if (today.getDate() === day && 
            today.getMonth() === currentMonth && 
            today.getFullYear() === currentYear) {
            dayEl.classList.add('today');
        }
        
        dayEl.onclick = () => showDayReminders(day);
        grid.appendChild(dayEl);
    }
}

function showDayReminders(day) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const reminders = [];
    
    Object.values(branches).forEach(branch => {
        branch.notes.forEach(note => {
            if (note.reminder && note.reminder.startsWith(dateStr)) {
                reminders.push({
                    text: note.text,
                    time: note.reminder,
                    branch: branch.name,
                    icon: branch.icon
                });
            }
        });
    });
    
    const container = document.getElementById('day-reminders');
    const list = document.getElementById('reminders-list');
    
    if (reminders.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    list.innerHTML = '';
    
    reminders.forEach(reminder => {
        const item = document.createElement('div');
        item.className = 'note-card';
        item.style.setProperty('--branch-color', '#667eea');
        item.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 5px;">${reminder.icon} ${reminder.branch}</div>
            <div class="note-text">${escapeHtml(reminder.text)}</div>
            <div class="note-reminder">⏰ ${formatDateTime(reminder.time)}</div>
        `;
        list.appendChild(item);
    });
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Информация
function showCoreInfo() {
    let total = 0;
    Object.values(branches).forEach(b => total += b.notes.length);
    
    tg.showPopup({
        title: '🌌 Моя Вселенная',
        message: `Всего планет: ${total}\nВетвей: ${Object.keys(branches).length}\n\n💡 Используйте жесты для навигации:\n• Перетаскивание - перемещение\n• Кнопки справа - зум`,
        buttons: [{type: 'ok'}]
    });
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

// Статистика
function updateStats() {
    let total = 0;
    let active = 0;
    
    Object.values(branches).forEach(branch => {
        const count = branch.notes.length;
        total += count;
        if (count > 0) active++;
    });
    
    document.getElementById('total-notes').textContent = total;
    document.getElementById('active-branches').textContent = active;
    document.getElementById('total-planets').textContent = total;
}

// Утилиты
function formatDate(iso) {
    const date = new Date(iso);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' мин. назад';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' ч. назад';
    
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateTime(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
}

// Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.addEventListener('beforeunload', saveData);

// Debug
window.exportData = function() {
    const data = {};
    Object.keys(branches).forEach(key => {
        data[key] = branches[key].notes;
    });
    console.log(JSON.stringify(data, null, 2));
    tg.showAlert('Данные в консоли');
};
