const LOGGED_IN_KEY = 'loggedInClient';
const form = document.getElementById('prize-form');
const table = document.getElementById('prize-table').getElementsByTagName('tbody')[0];
const imageUrlInput = document.getElementById('image');
const imageUploadInput = document.getElementById('image-upload');
const fileNameDisplay = document.getElementById('file-name');

function checkLogin() {
    const client = localStorage.getItem(LOGGED_IN_KEY);
    if (!client) {
        alert('请先登录!');
        window.location.href = 'login.html';
    }
    return client;
}

const client = checkLogin();
const PRIZE_KEY = `prizes_${client}`;

function loadPrizes() {
    return JSON.parse(localStorage.getItem(PRIZE_KEY)) || [];
}

function savePrizes(prizes) {
    localStorage.setItem(PRIZE_KEY, JSON.stringify(prizes));
}

function updateTable() {
    const prizes = loadPrizes();
    table.innerHTML = '';
    prizes.forEach((prize, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = prize.name;
        const imgCell = row.insertCell(1);
        const img = document.createElement('img');
        img.src = prize.image;
        img.width = 50;
        img.height = 50;
        imgCell.appendChild(img);
        const actionCell = row.insertCell(2);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '删除';
        deleteButton.onclick = () => deletePrize(index);
        actionCell.appendChild(deleteButton);
    });
}

imageUrlInput.addEventListener('input', () => {
    if (imageUrlInput.value && imageUploadInput.files.length > 0) {
        alert('已上传本地图片，不能输入图片url');
        imageUrlInput.value = '';
    }
});

imageUploadInput.addEventListener('change', () => {
    const file = imageUploadInput.files[0];
    if (file && !file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        alert('仅允许上传 jpg, jpeg, png, gif 格式的图片');
        imageUploadInput.value = '';
        fileNameDisplay.innerText = '';
    } else if (imageUploadInput.files.length > 0 && imageUrlInput.value) {
        alert('已输入图片url，不能上传本地图片');
        imageUploadInput.value = '';
    } else if (imageUploadInput.files.length > 0) {
        fileNameDisplay.innerText = imageUploadInput.files[0].name;
    } else {
        fileNameDisplay.innerText = '';
    }
});

function handleFormSubmit(event) {
    event.preventDefault();
    const name = form.name.value;
    const imageUrl = imageUrlInput.value;
    const imageFile = imageUploadInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            savePrize(name, base64Image);
        };
        reader.readAsDataURL(imageFile);
    } else if (imageUrl) {
        savePrize(name, imageUrl);
    } else {
        alert('请上传图片或输入图片URL');
    }
}

function savePrize(name, image) {
    let prizes = loadPrizes();
    const existingIndex = prizes.findIndex(prize => prize.name === name);
    if (existingIndex >= 0) {
        prizes[existingIndex].image = image;
    } else {
        prizes.push({ name, image });
    }
    savePrizes(prizes);
    updateTable();
    form.reset();
    fileNameDisplay.innerText = '';
}

function deletePrize(index) {
    let prizes = loadPrizes();
    prizes.splice(index, 1);
    savePrizes(prizes);
    updateTable();
}

form.onsubmit = handleFormSubmit;

updateTable();