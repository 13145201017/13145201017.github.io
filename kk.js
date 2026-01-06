// 1. 实时时钟（缩小字体，适配并排布局）
const clockEl = document.getElementById("real-time-clock");
function updateClock() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const week = ["日", "一", "二", "三", "四", "五", "六"][now.getDay()];
  // 精简文字，缩小长度，适配并排
  clockEl.textContent = `在时间的大钟上只有两个字————"现在"时间: ${year}-${month}-${day} 周${week} ${hours}:${minutes}:${seconds}`;
}
updateClock();
setInterval(updateClock, 1000);

/* 2. 天气模块（修复不显示，适配并排） */
const weaBox = document.getElementById('weather');

// 初始化显示加载状态（验证容器存在）
weaBox.textContent = '加载天气中...';

// 修复接口：移除重复脚本，确保回调触发
function getWeather(city = '泸州') {
  // 清除旧脚本，避免冲突
  const oldScripts = document.querySelectorAll('script[src*="asilu.com/weather"]');
  oldScripts.forEach(script => script.remove());

  const script = document.createElement('script');
  script.src = `https://api.asilu.com/weather/?city=${encodeURIComponent(city)}&callback=showWeather`;
  script.type = 'text/javascript';
  document.body.appendChild(script);
}

// 渲染函数：取消换行，横向显示核心信息
window.showWeather = function(res) {
  if (res && res.status === 'success' && res.weather && res.weather.length > 0) {
    const today = res.weather[0];
    // 移除<br>，用空格分隔，适配并排布局
    weaBox.textContent = `${today.weather} ${today.temp}℃ | 湿度${today.humidity} | 风力${today.wind}`;
  } else {
    weaBox.textContent = '天气加载失败';
    console.error('天气接口异常：', res);
  }
};

// 初始化天气+30分钟更新
getWeather();
setInterval(() => getWeather(), 30 * 60 * 1000);

// 3. 轮播功能
const carousel = document.getElementById("carousel");
const slides = carousel.children;
let currentIndex = 0;
function moveCarousel() {
    const slideHeight = slides[0].offsetHeight;
    currentIndex = (currentIndex + 1) % slides.length;
    carousel.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
}

// 确保轮播图高度正确
window.addEventListener('load', () => {
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
    { title: "长白山天池迎今年首场初雪", link: "#w.html" },
    { title: "西双版纳热带雨林科考开放日", link: "#news6" },
    { title: "青海湖候鸟迁徙季观测指南发布", link: "#news7" },
    { title: "张家界天门山玻璃栈道升级完成", link: "#news8" }
];

const imgNewsData = [
    { title: "黄山云海波澜壮阔 宛如仙境", time: "08:30", img: "黄山1.jpg", link: "https://hsgwh.huangshan.gov.cn/" },
    { title: "喀纳斯湖秋日层林尽染 色彩斑斓", time: "10:20", img: "kanas.jpg", link: "https://kns.gov.cn/" },
    { title: "奇峰三千 秀水八百 雄奇险峻", time: "14:40", img: "张家界武陵源.jpg", link: "https://cn.yadingtour.com/" }
];

// 文字逐字动画函数
function createTextAnimation(text) {
    return text.split('').map((char, idx) => `<span class="char" style="animation-delay: ${idx * 0.03}s">${char}</span>`).join('');
}

// 渲染左侧八点新闻
function renderDotNews() {
    const dotContainer = document.getElementById("news-list-dot");
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

// 渲染右侧三图新闻（去重统一版本）
function renderImgNews() {
    const imgContainer = document.getElementById("news-list-img");
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
const video = document.getElementById('polarVideo');
const programItems = document.querySelectorAll('.program-item');
const moreBtn = document.querySelector('.more-btn button');

// 节目切换功能：点击节目时加载自定义视频链接
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

// more按钮跳转功能
moreBtn.addEventListener('click', () => {
  window.location.href = '1.html';
});

// 页面初始化
renderDotNews();
renderImgNews();
document.getElementById('footer-report-btn').addEventListener('click', () => {
  document.getElementById('report-modal').classList.remove('hidden');
});

// 关闭弹窗
document.getElementById('close-report-modal').addEventListener('click', () => {
  document.getElementById('report-modal').classList.add('hidden');
});
document.getElementById('cancel-report').addEventListener('click', () => {
  document.getElementById('report-modal').classList.add('hidden');
});

// 表单提交：跳转官方举报渠道
document.getElementById('report-form').addEventListener('submit', (e) => {
  e.preventDefault();
  window.open('https://www.12377.cn/jbzn.html?tab=4', '_blank');
  alert('举报已提交，官方将在3-5个工作日内核实反馈！');
  document.getElementById('report-modal').classList.add('hidden');
});