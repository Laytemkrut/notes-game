<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Космос Заметок</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            color: white;
            overflow: hidden;
            height: 100vh;
        }

        #space-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        .container {
            position: relative;
            z-index: 2;
            padding: 20px;
            height: 100vh;
            overflow-y: auto;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .tree-container {
            position: relative;
            width: 100%;
            min-height: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            padding: 20px 0;
        }

        .branch {
            position: relative;
            width: 90%;
            max-width: 400px;
        }

        .branch-header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 15px 20px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
        }

        .branch-header:hover {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }

        .branch-title {
            font-size: 20px;
            font-weight: bold;
        }

        .branch-count {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 14px;
        }

        .notes-list {
            margin-top: 15px;
            display: none;
            flex-direction: column;
            gap: 10px;
        }

        .notes-list.active {
            display: flex;
        }

        .note-item {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 15px;
            border-left: 4px solid;
            position: relative;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .note-text {
            margin-bottom: 8px;
            line-height: 1.5;
        }

        .note-date {
            font-size: 12px;
            opacity: 0.7;
        }

        .delete-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 0, 0, 0.3);
            border: none;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        }

        .delete-btn:hover {
            background: rgba(255, 0, 0, 0.6);
            transform: scale(1.1);
        }

        .add-note-btn {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
            transition: all 0.3s;
            z-index: 1000;
        }

        .add-note-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 30px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        }

        .modal-header {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            font-size: 16px;
            font-family: inherit;
        }

        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        .modal-buttons button {
            padding: 12px 30px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-save {
            background: #4CAF50;
            color: white;
        }

        .btn-cancel {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .btn-save:hover {
            background: #45a049;
            transform: scale(1.05);
        }

        .btn-cancel:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
        }

        .stars {
            position: fixed;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 3s infinite;
        }

        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    </style>
</head>
<body>
    <canvas id="space-canvas"></canvas>
    
    <div class="stars" id="stars"></div>

    <div class="container">
        <h1>🌌 Космос Заметок 🌌</h1>
        
        <div class="tree-container" id="tree-container">
            <!-- Ветви будут добавлены динамически -->
        </div>
    </div>

    <button class="add-note-btn" onclick="openModal()">+</button>

    <div class="modal" id="modal">
        <div class="modal-content">
            <div class="modal-header">Новая Заметка</div>
            <div class="form-group">
                <label>Выберите ветвь:</label>
                <select id="branch-select">
                    <option value="work">⭐ Работа</option>
                    <option value="personal">💫 Личное</option>
                    <option value="study">🌟 Учёба</option>
                    <option value="ideas">✨ Идеи</option>
                    <option value="goals">🌠 Цели</option>
                </select>
            </div>
            <div class="form-group">
                <label>Текст заметки:</label>
                <textarea id="note-text" placeholder="Введите вашу заметку..."></textarea>
            </div>
            <div class="modal-buttons">
                <button class="btn-save" onclick="saveNote()">Сохранить</button>
                <button class="btn-cancel" onclick="closeModal()">Отмена</button>
            </div>
        </div>
    </div>

    <script>
        // Инициализация Telegram Web App
        let tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();

        // Данные ветвей
        const branches = {
            work: { name: '⭐ Работа', color: '#FF6B6B', notes: [] },
            personal: { name: '💫 Личное', color: '#4ECDC4', notes: [] },
            study: { name: '🌟 Учёба', color: '#45B7D1', notes: [] },
            ideas: { name: '✨ Идеи', color: '#FFA07A', notes: [] },
            goals: { name: '🌠 Цели', color: '#98D8C8', notes: [] }
        };

        // Создание звёзд на фоне
        function createStars() {
            const starsContainer = document.getElementById('stars');
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                starsContainer.appendChild(star);
            }
        }

        // Анимация космоса
        function initSpaceCanvas() {
            const canvas = document.getElementById('space-canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1
                });
            }

            function animate() {
                ctx.fillStyle = 'rgba(15, 12, 41, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
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

        // Отрисовка древа заметок
        function renderTree() {
            const container = document.getElementById('tree-container');
            container.innerHTML = '';

            Object.keys(branches).forEach(branchKey => {
                const branch = branches[branchKey];
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
                        <div class="note-text">${note.text}</div>
                        <div class="note-date">${new Date(note.created_at).toLocaleString('ru-RU')}</div>
                        <button class="delete-btn" onclick="deleteNote('${branchKey}', ${index})">×</button>
                    `;
                    notesList.appendChild(noteItem);
                });

                branchDiv.appendChild(header);
                branchDiv.appendChild(notesList);
                container.appendChild(branchDiv);
            });
        }

        // Переключение отображения заметок
        function toggleNotes(branchKey) {
            const notesList = document.getElementById(`notes-${branchKey}`);
            notesList.classList.toggle('active');
        }

        // Открытие модального окна
        function openModal() {
            document.getElementById('modal').classList.add('active');
        }

        // Закрытие модального окна
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.getElementById('note-text').value = '';
        }

        // Сохранение заметки
        function saveNote() {
            const branchKey = document.getElementById('branch-select').value;
            const noteText = document.getElementById('note-text').value.trim();

            if (!noteText) {
                alert('Пожалуйста, введите текст заметки!');
                return;
            }

            const note = {
                text: noteText,
                created_at: new Date().toISOString(),
                branch: branchKey,
                color: branches[branchKey].color
            };

            branches[branchKey].notes.push(note);

            // Отправка данных в Telegram
            tg.sendData(JSON.stringify({
                action: 'save_note',
                ...note
            }));

            closeModal();
            renderTree();
        }

        // Удаление заметки
        function deleteNote(branchKey, index) {
            if (confirm('Удалить эту заметку?')) {
                const noteId = branches[branchKey].notes[index].id;
                branches[branchKey].notes.splice(index, 1);

                tg.sendData(JSON.stringify({
                    action: 'delete_note',
                    note_id: noteId
                }));

                renderTree();
            }
        }

        // Инициализация
        createStars();
        initSpaceCanvas();
        renderTree();

        // Адаптация под размер окна
        window.addEventListener('resize', () => {
            const canvas = document.getElementById('space-canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    </script>
</body>
</html>
