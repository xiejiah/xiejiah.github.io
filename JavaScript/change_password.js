document.addEventListener('mousemove', function(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const moveX = (e.clientX - width / 2) / width * 50;
    const moveY = (e.clientY - height / 2) / height * 50;
    document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

const form = document.getElementById('change-password-form');
const LOGGED_IN_KEY = 'loggedInClient';
const PASSWORD_KEY_PREFIX = 'password_';
const EMAIL_KEY_PREFIX = 'email_';

function checkLogin() {
    const client = localStorage.getItem(LOGGED_IN_KEY);
    if (!client) {
        alert('请先登录!');
        window.location.href = 'https://xiejiah.github.io/html/login.html';
    }
    return client;
}

const client = checkLogin();

form.onsubmit = (event) => {
    event.preventDefault();
    const newPassword = form['new-password'].value;
    const confirmPassword = form['confirm-password'].value;
    const email = form['email'].value;
    const captchaInput = form['captcha-input'].value.toLowerCase();

    if (captchaInput !== captchaText.toLowerCase()) {
        alert('验证码错误!');
        generateCaptcha();
        return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
        alert('密码必须是字母和数字的组合，且长度必须大于等于6位');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('两次输入的密码不一致!');
        return;
    }

    if (!email.includes('@')) {
        alert('请正确输入电子邮箱');
        return;
    }

    localStorage.setItem(`${PASSWORD_KEY_PREFIX}${client}`, newPassword);
    localStorage.setItem(`${EMAIL_KEY_PREFIX}${client}`, email);
    alert('密码和邮箱修改成功!');
    window.location.href = 'login.html';
};

function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length <= 4) {
        score += 5;
    } else if (password.length <= 7) {
        score += 10;
    } else {
        score += 25;
    }

    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        score += 20;
    } else if (/[A-Za-z]/.test(password)) {
        score += 10;
    }

    if (/\d/.test(password)) {
        score += 10;
    }

    return score;
}

function updatePasswordStrength() {
    const password = document.getElementById('new-password').value;
    const score = calculatePasswordStrength(password);
    const strengthText = document.getElementById('password-strength-text');
    const strengthFill = document.getElementById('password-strength-fill');
    const strengthBar = document.getElementById('password-strength-bar');

    if (score < 18) {
        strengthText.innerText = '弱';
        strengthFill.style.width = '33%';
        strengthFill.style.backgroundColor = 'darkred';
    } else if (score < 36) {
        strengthText.innerText = '中';
        strengthFill.style.width = '66%';
        strengthFill.style.backgroundColor = 'orange';
    } else {
        strengthText.innerText = '强';
        strengthFill.style.width = '100%';
        strengthFill.style.backgroundColor = 'green';
    }
}

function generateCaptcha() {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    captchaText = '';
    for (let i = 0; i < 6; i++) {
        captchaText += chars[Math.floor(Math.random() * chars.length)];
    }

    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2);
}
window.onload = generateCaptcha;