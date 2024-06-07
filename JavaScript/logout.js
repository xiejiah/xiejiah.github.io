const LOGGED_IN_KEY = 'loggedInClient';
const ADMIN_LOGGED_IN_KEY = 'adminLoggedIn';
const PASS_IN_KEY = 'PASS';
        // 注销用户
function logout() {
    localStorage.removeItem(LOGGED_IN_KEY);
    localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
    localStorage.removeItem(PASS_IN_KEY);
    alert('已注销!');
    window.location.href = 'https://xiejiah.github.io/index.html'; // 普通客户注销后重定向到首页

}

logout();