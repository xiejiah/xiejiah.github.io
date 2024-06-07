const LOGGED_IN_KEY = 'loggedInClient';
const form = document.getElementById('algorithm-form');
const settingsInfoDiv = document.getElementById('settings-info');

function checkLogin() {
    const client = localStorage.getItem(LOGGED_IN_KEY);
    if (!client) {
        alert('请先登录!');
        window.location.href = 'https://xiejiah.github.io/html/login.html';
    }
    return client;
}

const client = checkLogin();
const ALGORITHM_KEY = `algorithm_${client}`;
const PERSON_KEY = `persons_${client}`;
const PRIZE_KEY = `prizes_${client}`;

function loadPersons() {
    return JSON.parse(localStorage.getItem(PERSON_KEY)) || [];
}

function loadPrizes() {
    return JSON.parse(localStorage.getItem(PRIZE_KEY)) || [];
}

function saveSettingsTemp() {
    const selectedPersons = [...document.querySelectorAll('.person-checkbox')]
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            return {
                id: checkbox.value,
                name: checkbox.getAttribute('data-name'),
                phone: checkbox.getAttribute('data-phone')
            };
        });
    
    if (selectedPersons.length === 0) {
        alert('抽奖人员不得为空!');
        return;
    }

    const prizes = loadPrizes();
    if (prizes.length === 0) {
        alert('抽奖物品不得为空!');
        return;
    }

    const drawMode = document.getElementById('draw-mode').value;
    const tempSettings = { selectedPersons, drawMode };
    localStorage.setItem(`${ALGORITHM_KEY}_temp`, JSON.stringify(tempSettings));
    displaySettingsInfo(tempSettings, '暂存');
    alert('设置已暂存!');
}

form.onsubmit = (event) => {
    event.preventDefault();
    const tempSettings = JSON.parse(localStorage.getItem(`${ALGORITHM_KEY}_temp`));
    if (!tempSettings) {
        alert('先将信息暂存后，然后点击提交按钮');
        return;
    }
    localStorage.setItem(ALGORITHM_KEY, JSON.stringify(tempSettings));
    localStorage.removeItem(`${ALGORITHM_KEY}_temp`); // 清空暂存的抽奖算法信息
    displaySettingsInfo(tempSettings, '提交');
    alert('算法已保存!');
    window.location.href = 'https://xiejiah.github.io/html/draw.html'; // 保存成功后返回首页
};

function renderPersons() {
    const persons = loadPersons();
    const personListDiv = document.getElementById('person-list');
    personListDiv.innerHTML = persons.map(person => 
        `<label><input type="checkbox" class="person-checkbox" value="${person.phone}" data-name="${person.name}" data-phone="${person.phone}">${person.name} (${person.phone})</label><br>`
    ).join('');
}

function displaySettingsInfo(settings, action) {
    const prizes = loadPrizes();
    const prizeList = prizes.map(prize => `<li>${prize.name} <img src="${prize.image}" width="50" height="50"></li>`).join('');
    const personList = settings.selectedPersons.map(person => `<li>${person.name} (${person.phone})</li>`).join('');
    const drawModeText = getDrawModeText(settings.drawMode);
    document.getElementById('info-draw-mode').innerText = drawModeText;
    document.getElementById('info-person-list').innerHTML = personList;
    document.getElementById('info-prize-list').innerHTML = prizeList;
    settingsInfoDiv.style.display = 'block';
}

function getDrawModeText(drawMode) {
    switch(drawMode) {
        case 'random':
            return '确定奖项后随机抽取获奖人';
        case 'excludeWinner':
            return '确定奖项后随机抽选获奖人员，但排除已获奖人员';
        case 'randomPrize':
            return '随机抽取获奖人员后随机抽取奖品';
        case 'randomPrizeExclude':
            return '随机抽取获奖人员后随机抽取奖品，但排除已抽取完毕的奖品';
        default:
            return '未知模式';
    }
}

window.onload = function() {
    renderPersons();
    const tempSettings = JSON.parse(localStorage.getItem(`${ALGORITHM_KEY}_temp`));
    if (tempSettings) {
        document.getElementById('draw-mode').value = tempSettings.drawMode;
        tempSettings.selectedPersons.forEach(id => {
            const checkbox = document.querySelector(`.person-checkbox[value="${id}"]`);
            if (checkbox) checkbox.checked = true;
        });
        displaySettingsInfo(tempSettings, '暂存');
    }
};