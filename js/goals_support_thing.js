let goals = [
   
];

function renderGoals() {
    const list = document.getElementById('goalList');
    list.innerHTML = goals.map((g, index) => `
        <tr>
            <td>${g.text}</td>
            <td>${g.date}</td>
            <td>
                <select class="table-status-select" onchange="updateGoalStatus(${index}, this.value)">
                    <option value="To Do" ${g.status === 'To Do' ? 'selected' : ''}>To Do</option>
                    <option value="In Progress" ${g.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Done" ${g.status === 'Done' ? 'selected' : ''}>Done</option>
                </select>
            </td>
            <td><button onclick="deleteGoal(${index})" class="delete-btn">✕</button></td>
        </tr>
    `).join('');
    updateProgress();
}

// New function to handle the status change
function updateGoalStatus(index, newStatus) {
    goals[index].status = newStatus;
    updateProgress(); // This will automatically update your % circle!
}

function addGoal() {
    const text = document.getElementById('goalInput').value;
    const date = document.getElementById('goalDate').value;
    const status = document.getElementById('goalStatus').value;

    if(text && date) {
        goals.push({ text, date, status });
        renderGoals();
        document.getElementById('goalInput').value = '';
    }
}

function deleteGoal(index) {
    goals.splice(index, 1);
    renderGoals();
}

function updateProgress() {
    const done = goals.filter(g => g.status === 'Done').length;
    const total = goals.length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    
    document.getElementById('progressPath').setAttribute('stroke-dasharray', `${percent}, 100`);
    document.getElementById('progressText').textContent = `${percent}%`;
}

// Initialize
window.onload = () => {
    if (typeof loadLibrary === 'function') loadLibrary();
    renderGoals();
};

/* Mood save/load */
function saveMood() {
    const mood = document.getElementById('moodInput').value.trim();
    if (!mood) return;
    const timestamp = new Date().toISOString();
    const entry = { mood, timestamp };
    localStorage.setItem('lastMood', JSON.stringify(entry));
    displayLastMood();
}

function loadMood() {
    displayLastMood();
    const btn = document.getElementById('saveMoodBtn');
    if (btn) btn.addEventListener('click', saveMood);
}

function displayLastMood() {
    const container = document.getElementById('lastMood');
    const raw = localStorage.getItem('lastMood');
    if (!container) return;
    if (!raw) {
        container.innerHTML = '<em>No mood saved yet.</em>';
        return;
    }
    try {
        const entry = JSON.parse(raw);
        const time = new Date(entry.timestamp).toLocaleString();
        container.innerHTML = `<strong>${escapeHtml(entry.mood)}</strong><div style="font-size:0.85rem; opacity:0.7; margin-top:6px;">Saved: ${time}</div>`;
    } catch (e) {
        container.textContent = raw;
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>"]+/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
}

// hook mood loader on window load
const _oldOnload = window.onload;
window.onload = () => { if (typeof _oldOnload === 'function') _oldOnload(); loadMood(); };