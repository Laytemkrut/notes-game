// Инициализация Telegram Mini App
let tg = window.Telegram.WebApp;
tg.expand();
tg.ready();
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Цитаты дня (ЗДЕСЬ ВЫ ВСТАВИТЕ СВОИ ЦИТАТЫ)
const dailyQuotes = [
    { text: "Знание — это сила.", author: "Фрэнсис Бэкон" },
    { text: "Единственный способ делать великую работу — любить то, что ты делаешь.", author: "Стив Джобс" },
    { text: "Образование — это самое мощное оружие, которым можно изменить мир.", author: "Нельсон Мандела" },
    { text: "Будущее принадлежит тем, кто верит в красоту своих мечтаний.", author: "Элеонора Рузвельт" },
    { text: "Не откладывайте на завтра то, что можно сделать сегодня.", author: "Бенджамин Франклин" },
    { text: "Путешествие в тысячу миль начинается с одного шага.", author: "Лао-цзы" },
    { text: "Успех — это способность идти от одной неудачи к другой, не теряя энтузиазма.", author: "Уинстон Черчилль" }
];

// Конфигурация навыков
const skills = {
    work: {
        name: 'Работа',
        icon: '⭐',
        color: '#FF6B6B',
        notes: [],
        position: { level: 0, index: 0 }
    },
    personal: {
        name: 'Личное',
        icon: '💫',
        color: '#4ECDC4',
        notes: [],
        position: { level: 1, index: 0 }
    },
    study: {
        name: 'Учёба',
        icon: '🌟',
        color: '#45B7D1',
        notes: [],
        position: { level: 1, index: 1 }
    },
    ideas: {
        name: 'Идеи',
        icon: '✨',
        color: '#FFA07A',
        notes: [],
        position: { level: 2, index: 0 }
    },
    goals: {
        name: 'Цели',
        icon: '🌠',
        color: '#98D8C8',
        notes: [],
        position: { level: 2, index: 1 }
    }
};

// Связи между навыками (откуда -> куда)
const connections = [
    { from: 'work', to: 'personal' },
    { from: 'work', to: 'study' },
    { from: 'personal', to: 'ideas' },
    { from: 'study', to: 'goals' },
    { from: 'ideas', to: 'goals' }
];

// Текущий открытый навык
let currentSkill = null;

// Ключ для хранения
const STORAGE_KEY = 'skill_tree_' + (tg.initDataUnsafe?.user?.id || 'guest');

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

function init() {
    showLoader();
    loadData();
    createStars();
    displayDailyQuote();
    updateSkillTree();
    drawConnections();
    setupEventListeners();
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
            Object.keys(skills).forEach(key => {
                if (data[key]) {
                    skills[key].notes = data[key];
                }
            });
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
}

function saveData() {
    try {
        const data = {};
        Object.keys(skills).forEach(key => {
            data[key] = skills[key].notes;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        
        if (tg.CloudStorage) {
            tg.CloudStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ==================== ЦИТАТА ДНЯ ====================

function displayDailyQuote() {
    const today = new Date().toDateString();
    const savedQuoteDate = localStorage.getItem('quote_date');
    
    let quoteIndex;
    
    if (savedQuoteDate === today) {
        quoteIndex = parseInt(localStorage.getItem('quote_index') || '0');
    } else {
        // Новый день - новая цитата
        quoteIndex = Math.floor(Math.random() * dailyQuotes.length);
        localStorage.setItem('quote_date', today);
        localStorage.setItem('quote_index', quoteIndex.toString());
    }
    
    const quote = dailyQuotes[quoteIndex];
    document.getElementById('quote-text').textContent = quote.text;
    document.getElementById('quote-author').textContent = '— ' + quote.author;
}

// ==================== КОСМИЧЕСКИЙ ФОН ====================

function createStars() {
    const container = document.getElementById('stars');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        if (Math.random() > 0.9) {
            star.classList.add('big');
        }
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }
}

// ==================== ДРЕВО НАВЫКОВ ====================

function updateSkillTree() {
    let totalNotes = 0;
    let activeSkills = 0;
    
    Object.keys(skills).forEach(skillKey => {
        const skill = skills[skillKey];
        const count = skill.notes.length;
        totalNotes += count;
        
        if (count > 0) activeSkills++;
        
        // Обновляем UI навыка
        const node = document.querySelector(`[data-skill="${skillKey}"]`);
        const countEl = node.querySelector('.skill-count');
        countEl.textContent = count;
        
        if (count > 0) {
            node.classList.add('active');
        } else {
            node.classList.remove('active');
        }
    });
    
    // Обновляем статистику
    document.getElementById('total-notes').textContent = totalNotes;
    document.getElementById('active-skills').textContent = activeSkills;
    
    const progress = Math.min(100, Math.floor((totalNotes / 50) * 100));
    document.getElementById('progress-percent').textContent = progress + '%';
    
    // Обновляем линии связи
    updateConnectionLines();
}

function drawConnections() {
    const svg = document.getElementById('tree-connections');
    const treeContainer = document.querySelector('.skill-tree');
    
    // Устанавливаем размер SVG
    svg.setAttribute('width', treeContainer.offsetWidth);
    svg.setAttribute('height', treeContainer.offsetHeight);
    
    connections.forEach(conn => {
        const fromNode = document.querySelector(`[data-skill="${conn.from}"]`);
        const toNode = document.querySelector(`[data-skill="${conn.to}"]`);
        
        if (!fromNode || !toNode) return;
        
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        const treeRect = treeContainer.getBoundingClientRect();
        
        const x1 = fromRect.left - treeRect.left + fromRect.width / 2;
        const y1 = fromRect.top - treeRect.top + fromRect.height / 2;
        const x2 = toRect.left - treeRect.left + toRect.width / 2;
        const y2 = toRect.top - treeRect.top + toRect.height / 2;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.classList.add('connection-line');
        line.dataset.from = conn.from;
        line.dataset.to = conn.to;
        
        svg.appendChild(line);
    });
}

function updateConnectionLines() {
    const lines = document.querySelectorAll('.connection-line');
    
    lines.forEach(line => {
        const fromSkill = line.dataset.from;
        const toSkill = line.dataset.to;
        
        const fromActive = skills[fromSkill].notes.length > 0;
        const toActive = skills[toSkill].notes.length > 0;
        
        if (fromActive && toActive) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}

// ==================== МОДАЛЬНОЕ ОКНО ====================

function openSkillModal(skillKey) {
    currentSkill = skillKey;
    const skill = skills[skillKey];
    
    // Устанавливаем заголовок
    const title = document.getElementById('modal-title');
    title.textContent = `${skill.icon} ${skill.name}`;
    title.style.color = skill.color;
    
    // Отображаем заметки
    renderNotes();
    
    // Открываем модалку
    document.getElementById('modal').classList.add('active');
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('note-input').value = '';
    currentSkill = null;
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

function renderNotes() {
    const container = document.getElementById('notes-list');
    const skill = skills[currentSkill];
    
    if (skill.notes.length === 0) {
        container.innerHTML = `
            <div class="empty-notes">
                <div class="empty-notes-icon">🌌</div>
                <div>Пока нет заметок в этой ветви.<br>Добавьте первую!</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    skill.notes.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.style.borderColor = skill.color;
        card.innerHTML = `
            <div class="note-text">${escapeHtml(note.text)}</div>
            <div class="note-date">${formatDate(note.created_at)}</div>
            <button class="note-delete" onclick="deleteNote(${index})">×</button>
        `;
        container.appendChild(card);
    });
}

// ==================== ЗАМЕТКИ ====================

function saveNote() {
    if (!currentSkill) return;
    
    const input = document.getElementById('note-input');
    const text = input.value.trim();
    
    if (!text) {
        tg.showAlert('Введите текст заметки!');
        return;
    }
    
    const note = {
        id: Date.now(),
        text: text,
        created_at: new Date().toISOString()
    };
    
    skills[currentSkill].notes.unshift(note);
    saveData();
    
    // Обновляем UI
    renderNotes();
    updateSkillTree();
    
    // Очищаем поле
    input.value = '';
    
    // Уведомление
    tg.showPopup({
        title: '✅ Успех!',
        message: `Заметка добавлена в "${skills[currentSkill].name}"`,
        buttons: [{type: 'ok'}]
    });
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }
}

function deleteNote(index) {
    if (!currentSkill) return;
    
    tg.showConfirm('Удалить эту заметку?', (confirmed) => {
        if (confirmed) {
            skills[currentSkill].notes.splice(index, 1);
            saveData();
            renderNotes();
            updateSkillTree();
            
            if (tg.HapticFeedback) {
                tg.HapticFeedback.notificationOccurred('warning');
            }
        }
    });
}

// ==================== БЫСТРОЕ ДОБАВЛЕНИЕ ====================

function showQuickAdd() {
    // Создаём меню выбора навыка
    const buttons = Object.keys(skills).map(key => ({
        text: `${skills[key].icon} ${skills[key].name}`,
        id: key
    }));
    
    tg.showPopup({
        title: 'Выберите ветвь',
        message: 'В какую ветвь добавить заметку?',
        buttons: buttons.concat([{type: 'cancel'}])
    }, (buttonId) => {
        if (buttonId !== 'cancel' && skills[buttonId]) {
            openSkillModal(buttonId);
        }
    });
}

// ==================== УТИЛИТЫ ====================

function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'только что';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' мин. назад';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' ч. назад';
    
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
    }, 500);
}

// ==================== СОБЫТИЯ ====================

function setupEventListeners() {
    // Клики по навыкам
    document.querySelectorAll('.skill-node').forEach(node => {
        node.addEventListener('click', () => {
            const skillKey = node.dataset.skill;
            openSkillModal(skillKey);
        });
    });
    
    // FAB кнопка
    document.getElementById('fab-btn').addEventListener('click', showQuickAdd);
    
    // Закрытие модалки по фону
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            closeModal();
        }
    });
    
    // Enter для сохранения
    document.getElementById('note-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            saveNote();
        }
    });
    
    // Перерисовка линий при изменении размера
    window.addEventListener('resize', () => {
        const svg = document.getElementById('tree-connections');
        svg.innerHTML = '';
        drawConnections();
    });
}

// ==================== ЭКСПОРТ (для отладки) ====================

window.exportData = function() {
    const data = {};
    Object.keys(skills).forEach(key => {
        data[key] = skills[key].notes;
    });
    console.log(JSON.stringify(data, null, 2));
    tg.showAlert('Данные в консоли');
};

window.clearAll = function() {
    tg.showConfirm('Удалить ВСЕ заметки?', (confirmed) => {
        if (confirmed) {
            Object.keys(skills).forEach(key => {
                skills[key].notes = [];
            });
            localStorage.clear();
            updateSkillTree();
            if (currentSkill) renderNotes();
            tg.showAlert('Все данные удалены');
        }
    });
};

// ==================== ЗАПУСК ====================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Сохранение при закрытии
window.addEventListener('beforeunload', saveData);
