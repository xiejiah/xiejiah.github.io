document.addEventListener('mousemove', function(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 将鼠标位置映射到背景位置的偏移量
    const moveX = (e.clientX - width / 2) / width * 50; // 最大偏移量为50px
    const moveY = (e.clientY - height / 2) / height * 50;

    // 更新背景位置
    document.body.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});