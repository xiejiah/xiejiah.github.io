const LOGGED_IN_KEY = 'loggedInClient';
const drawButton = document.getElementById('draw-button');
const winnerDiv = document.getElementById('winner');
const winnerTableBody = document.getElementById('winner-table').getElementsByTagName('tbody')[0];

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
const PRIZE_KEY = `prizes_${client}`;

function loadSelectedPersons() {
    const settings = JSON.parse(localStorage.getItem(ALGORITHM_KEY));
    if (settings && settings.selectedPersons) {
        return settings.selectedPersons;
    }
    return [];
}

function loadPrizes() {
    return JSON.parse(localStorage.getItem(PRIZE_KEY)) || [];
}

let remainingPrizes = loadPrizes();

function drawWinner() {
    const persons = loadSelectedPersons();
    if (persons.length === 0) {
        alert('没有可抽奖的人员!');
        return;
    }
    if (remainingPrizes.length === 0) {
        alert('已抽完所有奖品!');
        return;
    }

    winnerDiv.innerHTML = '等待中奖者...';

    let countdown = 3;
    const countdownInterval = setInterval(() => {
        winnerDiv.innerHTML = `等待中奖者... ${countdown} 秒`;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            const randomPersonIndex = Math.floor(Math.random() * persons.length);
            const randomPrizeIndex = Math.floor(Math.random() * remainingPrizes.length);
            const winner = persons[randomPersonIndex];
            const prize = remainingPrizes[randomPrizeIndex];
            remainingPrizes.splice(randomPrizeIndex, 1); // Remove the selected prize from the list
            const newRow = winnerTableBody.insertRow();
            newRow.insertCell(0).innerText = `${winner.name} (${winner.phone})`;
            newRow.insertCell(1).innerText = prize.name;
            const imgCell = newRow.insertCell(2);
            const img = document.createElement('img');
            img.src = prize.image;
            img.width = 50;
            img.height = 50;
            imgCell.appendChild(img);
            winnerDiv.innerHTML = `<strong>中奖者:</strong> <span class="highlight">${winner.name} (${winner.phone})</span><br>
                                   <strong>奖品:</strong> <span class="highlight">${prize.name}</span><br>
                                   <img src="${prize.image}" width="100" height="100">`;
        }
    }, 1000);
}
drawButton.onclick = drawWinner;