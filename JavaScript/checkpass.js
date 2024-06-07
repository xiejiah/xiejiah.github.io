const PASS_IN_KEY = 'PASS';
function checkpass() {
    const check = localStorage.getItem(PASS_IN_KEY);
    if (!check) {
        alert('请先获取通行证!');
        window.location.href = 'http://xiejiah.github.io/pass.html';
    }
}
checkpass();