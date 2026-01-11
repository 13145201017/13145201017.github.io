// 3. 轮播功能（修复版）
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById("carousel");
    if (!carousel) return;

    const slides = carousel.children;
    let currentIndex = 0;

    function moveCarousel() {
        const slideHeight = slides[0].offsetHeight;
        currentIndex = (currentIndex + 1) % slides.length;
        carousel.style.transition = "transform 0.5s ease";
        carousel.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
    }

    // 确保轮播图高度正确
    const slideHeight = slides[0].offsetHeight;
    carousel.style.height = `${slideHeight * slides.length}px`;
    setInterval(moveCarousel, 3000);
});

// 4. 新闻数据
const dotNewsData = [
    { title: "黄山云海最佳观赏期来临", link: "#news1" },
    { title: "新疆喀纳斯湖秋景进入鼎盛期", link: "#news2" },
    { title: "稻城亚丁推出生态保护游览路线", link: "#news3" },
    { title: "桂林漓江竹筏游览新航线开通", link: "#news4" },
    { title: "长白山天池迎今年首场初雪", link: "#news5" },
    { title: "西双版纳热带雨林科考开放日", link: "#news6" },
    { title: "青海湖候鸟迁徙季观测指南发布", link: "#news7" },
    { title: "张家界天门山玻璃栈道升级完成", link: "#news8" }
];

const imgNewsData = [
    { title: "黄山云海波澜壮阔 宛如仙境", time: "08:30", img: "黄山1.jpg", link: "https://hsgwh.huangshan.gov.cn/" },
    { title: "喀纳斯湖秋日层林尽染 色彩斑斓", time: "10:20", img: "kanas.jpg", link: "https://kns.gov.cn/" },
    { title: "奇峰三千 秀水八百 雄奇险峻", time: "14:40", img: "张家界武陵源.jpg", link: "https://cn.yadingtour.com/" }
];

// 文字逐字动画函数（修复版）
function createTextAnimation(text) {
    if (!text) return "";
    return text.split('').map((char, idx) => 
        `<span class="char" style="animation-delay: ${idx * 0.03}s">${char}</span>`
    ).join('');
}

// 渲染左侧八点新闻（修复版）
function renderDotNews() {
    const dotContainer = document.getElementById("news-list-dot");
    if (!dotContainer) return;

    dotNewsData.forEach((news, index) => {
        const item = document.createElement("a");
        item.href = news.link;
        item.className = "flex items-center gap-3 p-3 rounded-lg hover:bg-nature-light transition-all duration-300 card-hover";
        item.innerHTML = `
            <span class="w-2 h-2 bg-nature-main rounded-full flex-shrink-0"></span>
            <span class="text-gray-800 flex-1">${createTextAnimation(news.title)}</span>
            <span class="text-gray-400 text-xs">${index + 1}</span>
        `;
        dotContainer.appendChild(item);
    });
}

// 渲染右侧三图新闻（修复版）
function renderImgNews() {
    const imgContainer = document.getElementById("news-list-img");
    if (!imgContainer) return;

    imgNewsData.forEach((news, index) => {
        const item = document.createElement("a");
        item.href = news.link;
        item.className = "flex items-start gap-4 p-4 rounded-lg hover:bg-nature-light transition-all duration-300 card-hover img-news-item";
        item.innerHTML = `
            <div class="w-1/3 md:w-1/4 h-32 flex-shrink-0 img-news-img-container">
                <img src="${news.img}" alt="自然美景图" class="w-full h-full object-cover rounded-lg img-news-img">
            </div>
            <div class="flex-1 min-w-0 img-news-content">
                <p class="text-gray-800 font-medium mb-2">${createTextAnimation(news.title)}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-gray-500 text-sm">${news.time}</span>
                    <span class="text-nature-main text-sm font-medium">查看详情 →</span>
                </div>
            </div>
        `;
        imgContainer.appendChild(item);
    });
}

// 视频播放功能
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('polarVideo');
    const programItems = document.querySelectorAll('.program-item');
    const moreBtn = document.querySelector('.more-btn button');

    if (!video) return;

    // 节目切换功能
    programItems.forEach(item => {
        item.addEventListener('click', () => {
            programItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const videoSrc = item.dataset.videoSrc;
            const videoPoster = item.dataset.videoPoster;

            video.poster = videoPoster;
            video.src = videoSrc;
            video.load();
            video.play();
        });
    });

    // 视频循环播放
    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play();
    });

    // more按钮跳转
    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            window.location.href = '1.html';
        });
    }
});

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    renderDotNews();
    renderImgNews();

    // 举报按钮
    const reportBtn = document.getElementById('footer-report-btn');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            document.getElementById('report-modal').classList.remove('hidden');
        });
    }
});

// 友情链接弹窗
document.addEventListener('DOMContentLoaded', function() {
    const friendLinkPopup = document.getElementById('friendLinkPopup');
    if (!friendLinkPopup) return;

    const closePopupBtn = document.getElementById('closePopup');
    const skipPopupBtn = document.getElementById('skipPopup');
    const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
    const popupMask = friendLinkPopup;

    function checkShowPopup() {
        const lastPopupTime = localStorage.getItem('lastFriendLinkPopup');
        const now = Date.now();
        if (lastPopupTime && (now - lastPopupTime) < 86400000) {
            return false;
        }
        return true;
    }

    function showFriendLinkPopup() {
        if (!checkShowPopup()) return;
        setTimeout(() => {
            friendLinkPopup.classList.remove('hidden');
            localStorage.setItem('lastFriendLinkPopup', Date.now().toString());
        }, 3000);
    }

    function closeFriendLinkPopup() {
        friendLinkPopup.classList.add('hidden');
        if (dontShowAgainCheckbox.checked) {
            localStorage.setItem('lastFriendLinkPopup', Date.now().toString());
        }
        dontShowAgainCheckbox.checked = false;
    }

    closePopupBtn.addEventListener('click', closeFriendLinkPopup);
    skipPopupBtn.addEventListener('click', closeFriendLinkPopup);

    popupMask.addEventListener('click', function(e) {
        if (e.target === friendLinkPopup) {
            closeFriendLinkPopup();
        }
    });

    showFriendLinkPopup();
});

// 举报表单提交
document.getElementById('report-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open('https://www.12377.cn/jbzn.html?tab=4', '_blank');
    alert('举报已提交，官方将在3-5个工作日内核实反馈！');
    document.getElementById('report-modal').classList.add('hidden');
});
