const form = document.getElementById('admin-login-form');
const ADMIN_USERNAME = 'admin';  // 内置的管理员用户名
const ADMIN_PASSWORD = 'admin123';  // 内置的管理员密码
const ADMIN_LOGGED_IN_KEY = 'adminLoggedIn';

form.onsubmit = (event) => {
    event.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
        alert('登录成功!');
        window.location.href = 'https://xiejiah.github.io/html/admin.html'; // 登录成功后重定向到系统管理页面
    } else {
        alert('用户名或密码错误!');
    }
};