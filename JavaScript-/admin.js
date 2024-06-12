const ADMIN_LOGGED_IN_KEY = 'adminLoggedIn';
const CLIENT_KEY = 'clients';
const EMAIL_KEY_PREFIX = 'email_';
const PASSWORD_KEY_PREFIX = 'password_';

// 检查是否为管理员登录
function checkAdminLogin() {
    if (localStorage.getItem(ADMIN_LOGGED_IN_KEY) !== 'true') {
        alert('请先登录管理员账户!');
        window.location.href = 'https://xiejiah.github.io/html/admin_login.html';
    }
}

checkAdminLogin();

const table = document.getElementById('client-table').getElementsByTagName('tbody')[0];
const clientDetailsDiv = document.getElementById('client-details');

function loadClients() {
    return JSON.parse(localStorage.getItem(CLIENT_KEY)) || [];
}

function saveClients(clients) {
    localStorage.setItem(CLIENT_KEY, JSON.stringify(clients));
}

function updateTable() {
    const clients = loadClients();
    table.innerHTML = '';
    clients.forEach((client) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = client;
        const statusCell = row.insertCell(1);
        const actionCell = row.insertCell(2);

        statusCell.innerText = client.disabled ? '禁用' : '正常';
        const viewButton = document.createElement('button');
        viewButton.innerText = '查看详情';
        viewButton.onclick = () => {
            viewClientDetails(client);
        };

        const disableButton = document.createElement('button');
        disableButton.innerText = client.disabled ? '启用' : '禁用';
        disableButton.onclick = () => {
            toggleClientStatus(client);
        };

        actionCell.appendChild(viewButton);
        actionCell.appendChild(disableButton);
    });
}

function viewClientDetails(clientPhone) {
    const personKey = `persons_${clientPhone}`;
    const prizeKey = `prizes_${clientPhone}`;
    const algorithmKey = `algorithm_${clientPhone}`;
    const emailKey = `${EMAIL_KEY_PREFIX}${clientPhone}`;
    const passwordKey = `${PASSWORD_KEY_PREFIX}${clientPhone}`;

    const persons = JSON.parse(localStorage.getItem(personKey)) || [];
    const prizes = JSON.parse(localStorage.getItem(prizeKey)) || [];
    const algorithm = localStorage.getItem(algorithmKey) || '未设置';
    const email = localStorage.getItem(emailKey) || '未设置';
    const password = localStorage.getItem(passwordKey) || '未设置';

    clientDetailsDiv.innerHTML = `
        <h4>客户: ${clientPhone}</h4>
        <h5>人员列表</h5>
        <ul>${persons.map(person => `<li>${person.name} (${person.phone})</li>`).join('')}</ul>
        <h5>奖品列表</h5>
        <ul>${prizes.map(prize => `<li>${prize.name} <img src="${prize.image}" width="50" height="50"/></li>`).join('')}</ul>
        <h5>邮箱</h5>
        <p>${email}</p>
        <h5>密码</h5>
        <p>${password}</p>
    `;
}

function toggleClientStatus(clientPhone) {
    let clients = loadClients();
    const clientIndex = clients.findIndex(c => c === clientPhone);
    if (clientIndex !== -1) {
        const client = clients[clientIndex];
        if (!client.disabled) {
            // 禁用客户并移除其所有信息
            localStorage.removeItem(`persons_${clientPhone}`);
            localStorage.removeItem(`prizes_${clientPhone}`);
            localStorage.removeItem(`algorithm_${clientPhone}`);
            localStorage.removeItem(`${EMAIL_KEY_PREFIX}${clientPhone}`);
            localStorage.removeItem(`${PASSWORD_KEY_PREFIX}${clientPhone}`);
            clients.splice(clientIndex, 1); // 从列表中移除客户
        } else {
            // 启用客户
            client.disabled = false;
        }
        saveClients(clients);
        updateTable();
    }
}
updateTable();