const form = document.getElementById('login-form');
        const CLIENT_KEY = 'clients';
        const PASSWORD_KEY_PREFIX = 'password_';
        const LOGGED_IN_KEY = 'loggedInClient';

        form.onsubmit = (event) => {
            event.preventDefault();
            const phone = form.phone.value;
            const password = form.password.value;
            let clients = JSON.parse(localStorage.getItem(CLIENT_KEY)) || [];
            
            if (!clients.includes(phone)) {
                alert('该手机号未注册!');
                return;
            }

            const storedPassword = localStorage.getItem(`${PASSWORD_KEY_PREFIX}${phone}`);
            
            if (!storedPassword) {
                // 第一次登录，设置默认密码为手机号
                if (password === phone) {
                    localStorage.setItem(LOGGED_IN_KEY, phone);
                    alert('第一次登录，请修改密码!');
                    window.location.href = 'change_password.html'; // 跳转到修改密码页面
                } else {
                    alert('密码错误!');
                }
            } else if (password === storedPassword) {
                localStorage.setItem(LOGGED_IN_KEY, phone);
                alert('登录成功!');
                window.location.href = 'draw.html'; // 登录后重定向到抽奖页面
            } else {
                alert('密码错误!');
            }
        };