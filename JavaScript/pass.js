const PASS_IN_KEY = 'PASS';
function checkPassword() {
    var correctPassword = 'xjhyyds';
    var userPassword = document.getElementById('password').value;
    if (userPassword === correctPassword) {
        localStorage.setItem(PASS_IN_KEY, true);
        alert('verify successfully!');
        window.location.href = './index.html';
    } else {
        alert('Incorrect password!\r\nYou have no authorization to visit the website!');
    }
}
