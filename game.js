// Инициализация Telegram Mini App
let tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Настройка темы приложения
tg.setHeaderColor('#0f0c29');
tg.setBackgroundColor('#0f0c29');

// Данные ветвей
const branches = {
    work: { name: '⭐ Работа', color: '#FF6B6B', emoji: '⭐', notes: [] },
    personal: { name: '💫 Личное', color: '#4ECDC4', emoji: '💫', notes: [] },
    study: { name: '🌟 Учёба', color: '#45B7D1', emoji: '🌟', notes: [] },
    ideas: { name: '✨ Идеи', color: '#FFA07A', emoji: '✨', notes: [] },
    goals: { name: '🌠 Цели', color: '#98D8C8', emoji: '🌠', notes: [] }
};

// Ключ для хранения данных в localStorage
const STORAGE_KEY = 'space_notes_' + (tg.initDataUnsafe?.user?.id || 'guest');

// Загрузка данных из localStorage
function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(branches).forEach(key => {
                if (data[key]) {
                    branches[key].notes = data[key];
                }
            });
        }
    } catch (e) {
        console.error('Ошибка загрузки данных:', e);
    }
}

// Сохранение данных в localStorage
function saveData() {
    try {
        const data = {};
        Object.keys(branches).forEach(key => {
            data[key] = branches[key].notes;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        
        // Опционально отправляем в Telegram Cloud Storage
        if (tg.CloudStorage) {
            tg.CloudStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    } catch (e) {
        console.error('Ошибка сохранения данных:', e);
    }
}

// Создание звёзд на фоне
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Анимация космоса на canvas
function initSpaceCanvas() {
    const canvas = document.getElementById('space-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 0.5
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(15, 12, 41, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });

        requestAnimationFrame(animate);
    }
    
    animate();
}

// Обновление статистики
function updateStats() {
    let totalNotes = 0;
    let activeBranches = 0;
    
    Object.keys(branches).forEach(key => {
        const count = branches[key].notes.length;
        totalNotes += count;
        if (count > 0) activeBranches++;
    });
    
    document.getElementById('total-notes').textContent = totalNotes;
    document.getElementById('active-branches').textContent = activeBranches;
}

// Отрисовка древа заметок
function renderTree() {
    const container = document.getElementById('tree-container');
    container.innerHTML = '';
    
    let hasNotes = false;

    Object.keys(branches).forEach(branchKey => {
        const branch = branches[branchKey];
        if (branch.notes.length > 0) hasNotes = true;
        
        const branchDiv = document.createElement('div');
        branchDiv.className = 'branch';

        const header = document.createElement('div');
        header.className = 'branch-header';
        header.style.borderColor = branch.color;
        header.onclick = () => toggleNotes(branchKey);
        header.innerHTML = `
            <span class="branch-title">${branch.name}</span>
            <span class="branch-count">${branch.notes.length}</span>
        `;

        const notesList = document.createElement('div');
        notesList.className = 'notes-list';
        notesList.id = `notes-${branchKey}`;

        branch.notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.style.borderColor = branch.color;
            noteItem.innerHTML = `
                <div class="note-text">${escapeHtml(note.text)}</div>
                <div class="note-date">${formatDate(note.created_at)}</div>
                <button class="delete-btn" onclick="deleteNote('${branchKey}', ${index})">×</button>
            `;
            notesList.appendChild(noteItem);
        });

        branchDiv.appendChild(header);
        branchDiv.appendChild(notesList);
        container.appendChild(branchDiv);
    });
    
    // Показать пустое состояние если нет заметок
    if (!hasNotes) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🌌</div>
                <div class="empty-state-text">Ваш космос пуст<br>Добавьте первую заметку!</div>
            </div>
        `;
    }
    
    updateStats();
}

// Переключение отображения заметок
function toggleNotes(branchKey) {
    const notesList = document.getElementById(`notes-${branchKey}`);
    notesList.classList.toggle('active');
    
    // Вибрация при открытии
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Открытие модального окна
function openModal() {
    document.getElementById('modal').classList.add('active');
    document.getElementById('note-text').focus();
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('note-text').value = '';
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Сохранение заметки
function saveNote() {
    const branchKey = document.getElementById('branch-select').value;
    const noteText = document.getElementById('note-text').value.trim();

    if (!noteText) {
        tg.showAlert('Пожалуйста, введите текст заметки!');
        return;
    }

    const note = {
        id: Date.now(),
        text: noteText,
        created_at: new Date().toISOString(),
        branch: branchKey
    };

    branches[branchKey].notes.unshift(note); // Добавляем в начало
    saveData();
    
    // Показываем уведомление
    const branchName = branches[branchKey].name;
    tg.showPopup({
        title: '✅ Заметка сохранена!',
        message: `Добавлена в "${branchName}"`,
        buttons: [{type: 'ok'}]
    });
    
    // Вибрация успеха
    if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
    }

    closeModal();
    renderTree();
}

// Удаление заметки
function deleteNote(branchKey, index) {
    tg.showConfirm('Удалить эту заметку?', (confirmed) => {
        if (confirmed) {
            branches[branchKey].notes.splice(index, 1);
            saveData();
            renderTree();
            
            // Вибрация при удалении
            if (tg.HapticFeedback) {
                tg.HapticFeedback.notificationOccurred('warning');
            }
        }
    });
}

// Форматирование даты
function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    
    // Менее минуты назад
    if (diff < 60000) {
        return 'только что';
    }
    
    // Менее часа назад
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} мин. назад`;
    }
    
    // Менее суток назад
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} ч. назад`;
    }
    
    // Более суток
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Экранирование HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Обработчики событий
document.getElementById('add-btn').addEventListener('click', openModal);
document.getElementById('save-btn').addEventListener('click', saveNote);
document.getElementById('cancel-btn').addEventListener('click', closeModal);

// Закрытие модального окна по клику на фон
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Сохранение по Enter (с Shift для переноса строки)
document.getElementById('note-text').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveNote();
    }
});

// Показать кнопку "Назад" в Telegram
tg.BackButton.show();
tg.BackButton.onClick(() => {
    tg.close();
});

// Главная кнопка Telegram (опционально)
tg.MainButton.text = "Добавить заметку";
tg.MainButton.color = "#667eea";
tg.MainButton.onClick(() => {
    openModal();
});

// Экспорт данных (для разработки)
window.exportData = function() {
    const data = {};
    Object.keys(branches).forEach(key => {
        data[key] = branches[key].notes;
    });
    console.log(JSON.stringify(data, null, 2));
    tg.showAlert('Данные выведены в консоль');
};

// Очистка всех данных (для разработки)
window.clearAllData = function() {
    tg.showConfirm('Удалить ВСЕ заметки?', (confirmed) => {
        if (confirmed) {
            Object.keys(branches).forEach(key => {
                branches[key].notes = [];
            });
            localStorage.removeItem(STORAGE_KEY);
            renderTree();
            tg.showAlert('Все данные удалены');
        }
    });
};

// Инициализация приложения
function init() {
    // Показываем загрузчик
    const loader = document.getElementById('loader');
    loader.classList.add('active');
    
    // Загружаем данные
    loadData();
    
    // Создаём фон
    createStars();
    initSpaceCanvas();
    
    // Отрисовываем интерфейс
    renderTree();
    
    // Скрываем загрузчик
    setTimeout(() => {
        loader.classList.remove('active');
        // Показываем главную кнопку если есть заметки
        const totalNotes = Object.values(branches).reduce((sum, b) => sum + b.notes.length, 0);
        if (totalNotes > 0) {
            tg.MainButton.show();
        }
    }, 500);
    
    // Уведомляем Telegram что приложение готово
    tg.ready();
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Предотвращение случайного закрытия
window.addEventListener('beforeunload', (e) => {
    saveData();
});

// Отправка события в Telegram Analytics (если включено)
if (tg.initDataUnsafe?.user) {
    console.log('User ID:', tg.initDataUnsafe.user.id);
    console.log('User Name:', tg.initDataUnsafe.user.first_name);
                   }
