const LOGGED_IN_KEY = 'loggedInClient';
const ADMIN_LOGGED_IN_KEY = 'adminLoggedIn';
const PASS_IN_KEY = 'PASS';
        // 注销用户
function logout() {
    const isAdminLoggedIn = localStorage.getItem(ADMIN_LOGGED_IN_KEY) === 'true';

    localStorage.removeItem(LOGGED_IN_KEY);
    localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
    localStorage.removeItem(PASS_IN_KEY);

    alert('已注销!');
    if (isAdminLoggedIn) {
        window.location.href = '../index.html'; 
    } else {
        window.location.href = '../index.html'; // 普通客户注销后重定向到首页
    }
}

logout();