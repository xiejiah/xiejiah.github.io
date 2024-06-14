const LOGGED_IN_KEY = 'loggedInClient';
const form = document.getElementById('person-form');
const table = document.getElementById('person-table').getElementsByTagName('tbody')[0];

// 检查是否登录
function checkLogin() {
    const client = localStorage.getItem(LOGGED_IN_KEY);
    if (!client) {
        alert('请先登录!');
        window.location.href = 'https://xiejiah.github.io/html/login.html';
    }
    return client;
}

const client = checkLogin();
const PERSON_KEY = `persons_${client}`;

function loadPersons() {
    return JSON.parse(localStorage.getItem(PERSON_KEY)) || [];
}

function savePersons(persons) {
    localStorage.setItem(PERSON_KEY, JSON.stringify(persons));
}

function updateTable() {
    const persons = loadPersons();
    table.innerHTML = '';
    persons.forEach((person, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = person.name;
        row.insertCell(1).innerText = person.phone;
        const actionCell = row.insertCell(2);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = '删除';
        deleteButton.onclick = () => deletePerson(index);
        actionCell.appendChild(deleteButton);
    });
}

form.onsubmit = (event) => {
    event.preventDefault();
    const name = form.name.value;
    const phone = form.phone.value;
    let persons = loadPersons();
    const existingIndex = persons.findIndex(person => person.phone === phone);
    if (existingIndex >= 0) {
        persons[existingIndex].name = name;
    } else {
        persons.push({ name, phone });
    }
    savePersons(persons);
    updateTable();
    form.reset();
};

function deletePerson(index) {
    let persons = loadPersons();
    persons.splice(index, 1);
    savePersons(persons);
    updateTable();
}
updateTable();