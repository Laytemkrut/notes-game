// Инициализация Telegram Mini App
let tg = window.Telegram.WebApp;
tg.expand();
tg.ready();
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Все цитаты (полный список из предыдущей версии)
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

// Конфигурация ветвей
const branches = {
    personal: { name: 'Личное', icon: '💫', color: '#FF6B6B', colorDark: '#C92A2A', notes: [], angle: 0 },
    development: { name: 'Саморазвитие', icon: '🌟', color: '#4ECDC4', colorDark: '#2B8A81', notes: [], angle: 51.43 },
    work: { name: 'Работа', icon: '⭐', color: '#45B7D1', colorDark: '#2E7D9A', notes: [], angle: 102.86 },
    hobby: { name: 'Хобби', icon: '🎨', color: '#FFA07A', colorDark: '#FF6347', notes: [], angle: 154.29 },
    finance: { name: 'Финансы', icon: '💰', color: '#98D8C8', colorDark: '#5FA89E', notes: [], angle: 205.71 },
    media: { name: 'Фильмы/Сериалы', icon: '🎬', color: '#F06292', colorDark: '#C2185B', notes: [], angle: 257.14 },
    diary: { name: 'Ежедневник', icon: '📔', color: '#9575CD', colorDark: '#673AB7', notes: [], angle: 308.57 }
};

// Система зума и перемещения
let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentBranch = null;

// Премиум
let isPremium = false;
let currentSkin = 'default';

// Ключи хранения
const STORAGE_KEY = 'universe_' + (tg.initDataUnsafe?.user?.id || 'guest');
const NAMES_KEY = 'universe_names_' + (tg.initDataUnsafe?.user?.id || 'guest');
const PREMIUM_KEY = 'premium_' + (tg.initDataUnsafe?.user?.id || 'guest');
const SKIN_KEY = 'skin_' + (tg.initDataUnsafe?.user?.id || 'guest');

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

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
    hideLoader();
    
    tg.BackButton.show();
    tg.BackButton.onClick(() => tg.close());
}

// ==================== ДАННЫЕ ====================

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(branches).forEach(key => {
                if (data[key]) branches[key].notes = data[key];
            });
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
}

function saveData() {
    try {
        const data = {};
        Object.keys(branches).forEach(key => {
            data[key] = branches[key].notes;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        if (tg.CloudStorage) {
            tg.CloudStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
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
}

function savePremium() {
    localStorage.setItem(PREMIUM_KEY, isPremium.toString());
    localStorage.setItem(SKIN_KEY, currentSkin);
}

// ==================== ЦИТАТА ДНЯ ====================

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

// ==================== КОСМИЧЕСКИЙ ФОН ====================

function createStars() {
    const container = document.getElementById('stars');
    const sizes = ['tiny', 'small', 'medium', 'large'];
    
    for (let i = 0; i < 400; i++) {
        const star = document.createElement('div');
        const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
        star.className = 'star ' + sizeClass;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        if (Math.random() > 0.7) {
            star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;
            star.style.animationDelay = Math.random() * 3 + 's';
        }
        
        container.appendChild(star);
    }
}

// ==================== ВСЕЛЕННАЯ ====================

function renderUniverse() {
    const universe = document.getElementById('universe');
    
    // Удаляем старые элементы
    universe.querySelectorAll('.branch, .note-planet, .connection-line').forEach(el => el.remove());
    
    const centerX = 1500; // Центр большого холста
    const centerY = 1500;
    const radius = 500; // Радиус орбиты ветвей
    
    // Рисуем ветви
    Object.keys(branches).forEach(key => {
        const branch = branches[key];
        const angle = branch.angle * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle) - 50;
        const y = centerY + radius * Math.sin(angle) - 50;
        
        // Линия от центра к ветви
        const line = document.createElement('div');
        line.className = 'connection-line';
        const distance = Math.sqrt(Math.pow(x + 50 - centerX, 2) + Math.pow(y + 50 - centerY, 2));
        const lineAngle = Math.atan2(y + 50 - centerY, x + 50 - centerX) * (180 / Math.PI);
        line.style.width = distance + 'px';
        line.style.left = centerX + 'px';
        line.style.top = centerY + 'px';
        line.style.transform = `rotate(${lineAngle}deg)`;
        line.style.setProperty('--line-color', branch.color);
        universe.appendChild(line);
        
        // Ветвь
        const branchEl = document.createElement('div');
        branchEl.className = 'branch';
        branchEl.dataset.branch = key;
        branchEl.style.left = x + 'px';
        branchEl.style.top = y + 'px';
        branchEl.style.setProperty('--branch-color', branch.color);
        branchEl.style.setProperty('--branch-color-dark', branch.colorDark);
        branchEl.innerHTML = `
            <div class="branch-icon">${branch.icon}</div>
            <div class="branch-name">${branch.name}</div>
            <div class="branch-count">${branch.notes.length}</div>
        `;
        branchEl.onclick = (e) => {
            e.stopPropagation();
            openBranchModal(key);
        };
        universe.appendChild(branchEl);
        
        // Планеты-заметки
        renderNotePlanets(key, x + 50, y + 50);
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
    
    tg.showPopup({
        title: `${branch.icon} ${branch.name}`,
        message: note.text,
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

// ==================== ЗУМ И ПЕРЕМЕЩЕНИЕ ====================

function setupControls() {
    const universe = document.getElementById('universe');
    
    // Перемещение
    universe.addEventListener('mousedown', startDrag);
    universe.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    
    // Применяем начальную трансформацию
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
    const universe = document.getElementById('universe');
    universe.classList.remove('grabbing');
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

// ==================== МОДАЛЬНОЕ ОКНО ====================

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
    document.getElementById('note-input').value = '';
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
                <div>Пока нет планет в этой ветви.<br>Создайте первую!</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    branch.notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.style.setProperty('--branch-color', branch.color);
        card.innerHTML = `
            <div class="note-text">${escapeHtml(note.text)}</div>
            <div class="note-date">${formatDate(note.created_at)}</div>
            <button class="note-delete" onclick="deleteNote(${index})">×</button>
        `;
        container.appendChild(card);
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
    
    branches[currentBranch].notes.unshift(note);
    saveData();
    renderNotesList();
    renderUniverse();
    updateStats();
    document.getElementById('note-input').value = '';
    
    tg.showPopup({
        title: '✨ Планета создана!',
        message: `Новая планета добавлена в "${branches[currentBranch].name}"`,
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

// ==================== ПРЕМИУМ ====================

function showPremium() {
    document.getElementById('premium-modal').classList.add('active');
    updateSkinSelector();
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function closePremium() {
    document.getElementById('premium-modal').classList.remove('active');
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function selectSkin(skinName) {
    if (skinName !== 'default' && !isPremium) {
        unlockSkin(skinName);
        return;
    }
    
    currentSkin = skinName;
    savePremium();
    renderUniverse();
    updateSkinSelector();
    
    tg.showAlert(`✅ Скин "${skinName}" применён!`);
    if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
}

function updateSkinSelector() {
    document.querySelectorAll('.skin-option').forEach(option => {
        option.classList.remove('selected');
        if (!isPremium) {
            if (!option.classList.contains('locked')) {
                option.classList.add('locked');
            }
        } else {
            option.classList.remove('locked');
        }
    });
    
    // Разблокируем дефолтный
    const defaultOption = document.querySelector('.skin-option');
    defaultOption.classList.remove('locked');
    defaultOption.onclick = () => selectSkin('default');
    
    // Выделяем текущий
    const allOptions = document.querySelectorAll('.skin-option');
    const skins = ['default', 'crystal', 'neon', 'galaxy'];
    const currentIndex = skins.indexOf(currentSkin);
    if (currentIndex !== -1 && allOptions[currentIndex]) {
        allOptions[currentIndex].classList.add('selected');
    }
}

function unlockSkin(skinName) {
    tg.showPopup({
        title: '🔒 Premium функция',
        message: 'Этот скин доступен только с Premium подпиской',
        buttons: [
            { id: 'buy', text: 'Купить Premium' },
            { type: 'cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'buy') {
            buyPremium();
        }
    });
}

function buyPremium() {
    // Здесь интеграция с оплатой Telegram Stars или другой системой
    tg.showPopup({
        title: '💳 Оплата Premium',
        message: 'Функция оплаты будет доступна после интеграции с Telegram Stars. Для демонстрации активируем Premium бесплатно!',
        buttons: [
            { id: 'demo', text: 'Активировать демо' },
            { type: 'cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'demo') {
            isPremium = true;
            savePremium();
            updateSkinSelector();
            tg.showAlert('🎉 Premium активирован!');
            if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
        }
    });
}

// ==================== ИНФОРМАЦИЯ ====================

function showCoreInfo() {
    let total = 0;
    Object.values(branches).forEach(b => total += b.notes.length);
    
    tg.showPopup({
        title: '🌌 Моя Вселенная',
        message: `Всего планет: ${total}\nВетвей: ${Object.keys(branches).length}\n\nИспользуйте жесты для навигации:\n• Pinch - зум\n• Drag - перемещение\n• Кнопки справа - управление`,
        buttons: [{type: 'ok'}]
    });
    
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

// ==================== СТАТИСТИКА ====================

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

// ==================== УТИЛИТЫ ====================

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

// ==================== ЗАПУСК ====================

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
