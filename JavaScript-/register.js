const form = document.getElementById('register-form');
const sendSmsButton = document.getElementById('send-sms');
const phoneInput = document.getElementById('phone');
const CLIENT_KEY = 'clients';

function isPhoneNumberValid(phone) {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
}

function saveClient(phone) {
    let clients = JSON.parse(localStorage.getItem(CLIENT_KEY)) || [];
    if (!clients.includes(phone)) {
        clients.push(phone);
        localStorage.setItem(CLIENT_KEY, JSON.stringify(clients));
        alert('注册成功!');
        window.location.href = 'https://xiejiah.github.io/html/login.html'; // 注册成功后跳转到登录页面
    } else {
        alert('该手机号已注册!');
    }
}

function startCountdown() {
    let countdown = 60;
    sendSmsButton.disabled = true;
    sendSmsButton.classList.add('disabled');
    sendSmsButton.innerText = `发送短信 (${countdown})`;
    const interval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(interval);
            sendSmsButton.innerText = '发送短信';
            sendSmsButton.disabled = false;
            sendSmsButton.classList.remove('disabled');
        } else {
            sendSmsButton.innerText = `发送短信 (${countdown})`;
        }
    }, 1000);
}

sendSmsButton.onclick = () => {
    const phone = phoneInput.value;
    if (!isPhoneNumberValid(phone)) {
        alert('请输入有效的手机号，必须是11位数字。');
        return;
    }
    let clients = JSON.parse(localStorage.getItem(CLIENT_KEY)) || [];
    if (clients.includes(phone)) {
        alert('该手机号已注册!');
        return;
    }

    // 在实际应用中，这里应该发送请求到后端API发送短信验证码
    alert('短信验证码已发送!');
    startCountdown();
};

form.onsubmit = (event) => {
    event.preventDefault();
    const phone = form.phone.value;
    const code = form.code.value;
    const agreement = form.agreement.checked;

    if (!code || !agreement) {
        alert('请填写完整信息并同意用户使用协议');
        return;
    }

    // 在实际应用中，这里应该验证短信验证码的正确性
    saveClient(phone);
    form.reset();
};