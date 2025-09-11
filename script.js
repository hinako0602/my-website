document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.className = 'tsubaki-container';
    document.body.appendChild(container);

    const tsubakiCount = 30; // 椿の数を少し増やす
    const tsubakiElements = [];

    for (let i = 0; i < tsubakiCount; i++) {
        const tsubaki = document.createElement('div');
        tsubaki.className = 'tsubaki';

        tsubaki.innerHTML = `
            <div class="bud"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="petal"></div>
            <div class="center"></div>
        `;

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        tsubaki.style.left = `${x}px`;
        tsubaki.style.top = `${y}px`;
        tsubaki.style.transform = `rotate(${rotation}deg) scale(${Math.random() * 0.5 + 0.5})`;
        
        // 各椿の座標を保存しておく
        tsubaki.dataset.x = x;
        tsubaki.dataset.y = y;

        container.appendChild(tsubaki);
        tsubakiElements.push(tsubaki);
    }

    // マウスの動きに反応して椿を開花させる
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        tsubakiElements.forEach(tsubaki => {
            if (tsubaki.classList.contains('bloom')) {
                return; // すでに咲いているものは何もしない
            }

            const tsubakiX = parseFloat(tsubaki.dataset.x);
            const tsubakiY = parseFloat(tsubaki.dataset.y);
            
            const distance = Math.sqrt(Math.pow(mouseX - tsubakiX, 2) + Math.pow(mouseY - tsubakiY, 2));

            if (distance < 100) { // マウスカーソルから100px以内なら開花
                tsubaki.classList.add('bloom');

                // 一定時間後に花を閉じる（つぼみに戻る）
                setTimeout(() => {
                    tsubaki.classList.remove('bloom');
                }, 3000); // 3秒後に閉じる
            }
        });
    });
});
