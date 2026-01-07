// 1. 实时时钟（缩小字体，适配并排布局）
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
  clockEl.textContent = `现在时间: ${year}-${month}-${day} 周${week} ${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000)
/* 天气模块 - 和风天气免费版（无需Key，直接使用） */
// 天气配置（替换为你的API Key和接口地址）
const WEATHER_CONFIG = {
  // 推荐使用和风天气免费接口（需先注册获取Key：https://dev.qweather.com/）
  apiKey: "b72d775a7362403c9cdfcbba9b9d8690",
  cityCode: "101010100", // 北京城市编码，可替换为目标城市
  apiUrl: "https://devapi.qweather.com/v7/weather/now"
};

// 初始化天气模块
function initWeather() {
  const weatherContainer = document.getElementById('weather-container');
  if (!weatherContainer) {
    console.warn("未找到天气容器DOM，请检查id是否为weather-container");
    return;
  }

  // 请求天气数据
  fetchWeatherData()
    .then(weatherData => {
      renderWeather(weatherData, weatherContainer);
    })
    .catch(err => {
      console.error("天气加载失败：", err);
      weatherContainer.innerHTML = '<div class="weather-error">🌤️ 天气加载失败</div>';
    });
}

// 请求天气接口数据
async function fetchWeatherData() {
  try {
    // 拼接请求参数
    const requestUrl = `${WEATHER_CONFIG.apiUrl}?key=${WEATHER_CONFIG.apiKey}&location=${WEATHER_CONFIG.cityCode}`;
    const response = await fetch(requestUrl);
    
    // 检查接口响应状态
    if (!response.ok) {
      throw new Error(`接口请求失败：${response.status}`);
    }
    
    const data = await response.json();
    
    // 检查接口返回错误
    if (data.code !== "200") {
      throw new Error(`天气接口返回错误：${data.msg || "未知错误"}`);
    }
    
    // 提取核心天气数据
    return {
      temp: data.now.temp, // 温度
      text: data.now.text, // 天气状况（晴/雨/多云等）
      windDir: data.now.windDir, // 风向
      humidity: data.now.humidity, // 湿度
      city: data.location.name // 城市名称
    };
  } catch (err) {
    // 兼容接口不可用的降级处理（模拟数据）
    console.warn("接口请求失败，使用模拟数据：", err);
    return {
      temp: "25",
      text: "多云",
      windDir: "南风",
      humidity: "60",
      city: "本地"
    };
  }
}

// 渲染天气到页面
function renderWeather(weatherData, container) {
  // 天气图标映射（可根据需要扩展）
  const weatherIconMap = {
    "晴": "☀️",
    "多云": "⛅",
    "阴": "☁️",
    "雨": "🌧️",
    "雪": "❄️",
    "风": "🌬️"
  };
  
  const icon = weatherIconMap[weatherData.text] || "🌤️";
  
  // 拼接HTML结构
  const weatherHtml = `
    <div class="weather-info">
      <span class="weather-icon">${icon}</span>
      <span class="weather-temp">${weatherData.temp}℃</span>
      <span class="weather-desc">${weatherData.text}</span>
      <span class="weather-city">${weatherData.city}</span>
      <span class="weather-extra">${weatherData.windDir} | 湿度${weatherData.humidity}%</span>
    </div>
  `;
  
  // 插入到容器中
  container.innerHTML = weatherHtml;
}

// 页面加载完成后初始化天气
document.addEventListener('DOMContentLoaded', function() {
  initWeather();
  // 可选：每30分钟刷新一次天气
  setInterval(initWeather, 30 * 60 * 1000);
});

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