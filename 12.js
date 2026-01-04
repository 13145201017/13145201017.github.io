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
