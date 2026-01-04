// 执行本地搜索（过滤天气和时间相关内容）
function performformLocalSearch(searchTerm) {
    if (!searchTerm.trim()) {
        searchResults.classList.add('hidden');
        return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    // 定义需要过滤的关键词
    const excludedKeywords = ['天气', '时间', '温度', '湿度', '风速', '星期', '日期'];
    const isExcluded = excludedKeywords.some(keyword => 
        lowerSearchTerm.includes(keyword)
    );
    
    if (isExcluded) {
        // 显示过滤提示
        resultsContainer.innerHTML = `
            <div class="p-4 text-center text-gray-600">
                搜索内容包含不支持的关键词，请尝试搜索自然美景相关内容
            </div>
        `;
        searchResults.classList.remove('hidden');
        return;
    }
    
    // 正常搜索逻辑
    const results = searchableContent.filter(item => {
        return item.title.toLowerCase().includes(lowerSearchTerm) ||
               item.content.toLowerCase().includes(lowerSearchTerm) ||
               item.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
    });
    
    displayLocalResults(results, searchTerm);
}

// 搜索按钮动画效果
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    
    // 添加点击动画
    searchButton.addEventListener('click', function() {
        this.classList.add('animate-pulse');
        setTimeout(() => {
            this.classList.remove('animate-pulse');
        }, 300);
        
        // 执行搜索
        const searchTerm = document.getElementById('search-input').value;
        performLocalSearch(searchTerm);
    });
    
    // 添加悬停动画
    searchButton.addEventListener('mouseenter', function() {
        this.classList.add('scale-105');
        this.style.transition = 'all 0.3s ease';
    });
    
    searchButton.addEventListener('mouseleave', function() {
        this.classList.remove('scale-105');
    });
});
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('search-input');
            const searchButton = document.getElementById('search-button');
            const clearSearchButton = document.getElementById('clear-search');
            const resetSearchButton = document.getElementById('reset-search');
            const searchResults = document.getElementById('search-results');
            const resultsContainer = document.getElementById('results-container');
            const resultCount = document.getElementById('result-count');
            const searchSuggestionBtns = document.querySelectorAll('.search-suggestion-btn');
            
            // 搜索引擎选择相关元素
            const engineSelected = document.getElementById('engine-selected');
            const engineOptions = document.getElementById('engine-options');
            const selectedEngineIcon = document.getElementById('selected-engine-icon');
            const selectedEngineName = document.getElementById('selected-engine-name');
            const engineToggle = document.querySelector('.engine-toggle');
            
            // 当前选择的搜索引擎
            let currentEngine = 'local';
            
            // 模拟的本地搜索数据
            const searchableContent = [
                {
                    id: 1,
                    title: '草原全景实拍',
                    content: '草原全景实拍视频展示了广袤的草原风光，蓝天白云下牛羊成群。',
                    type: '视频',
                    link: '#video-src1',
                    tags: ['草原', '自然风光', '视频']
                },
                {
                    id: 2,
                    title: '高山湖泊风光',
                    content: '高山湖泊风光介绍，清澈的湖水倒映着雪山，景色宜人。',
                    type: '视频',
                    link: '#video-src2',
                    tags: ['高山', '湖泊', '雪山']
                },
                {
                    id: 3,
                    title: '呼伦贝尔日出',
                    content: '呼伦贝尔草原上的日出景象，金色的阳光洒满大地。',
                    type: '视频',
                    link: '#video-src=3',
                    tags: ['日出', '草原', '呼伦贝尔']
                },
                {
                    id: 4,
                    title: '自然美景图鉴',
                    content: '探索各种自然美景图片，包括山脉、森林、河流等。',
                    type: '图库',
                    link: 'https://500px.com.cn/community/discover',
                    tags: ['美景', '图鉴', '自然']
                },
                {
                    id: 5,
                    title: '自然资讯速览',
                    content: '最新的自然美景资讯和环境保护相关新闻。',
                    type: '资讯',
                    link: '#newsSection',
                    tags: ['资讯', '新闻', '自然']
                },
                {
                    id: 6,
                    title: '自然风光推荐',
                    content: '推荐国内外最佳自然风光旅游目的地和摄影点。',
                    type: '推荐',
                    link: '#newsSection',
                    tags: ['推荐', '旅游', '摄影']
                },
                {
                    id: 7,
                    title: '旅游攻略',
                    content: '详细的自助游攻略，包括行程规划、装备准备等。',
                    type: '攻略',
                    link: '4.html',
                    tags: ['旅游', '攻略', '自助游']
                },
                {
                    id: 8,
                    title: '个人介绍',
                    content: '网站作者的个人介绍和自然摄影作品展示。',
                    type: '个人',
                    link: '5.html',
                    tags: ['个人', '介绍', '摄影']
                },
                {
                    id: 9,
                    title: '轮播图美景',
                    content: '首页轮播图中展示的各种自然美景图片，包括山脉、森林、湖泊等。',
                    type: '图片',
                    link: '#home',
                    tags: ['轮播', '美景', '图片']
                }
            ];
            
            // 搜索引擎配置
            const searchEngines = {
                local: {
                    name: '本地',
                    icon: 'local',
                    search: function(query) {
                        performLocalSearch(query);
                    }
                },
                360: {
                    name: '360',
                    icon: '360',
                    search: function(query) {
                        window.open(`https://www.so.com/s?q=${encodeURIComponent(query)}`, '_blank');
                    }
                },
                baidu: {
                    name: '百度',
                    icon: 'baidu',
                    search: function(query) {
                        window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(query)}`, '_blank');
                    }
                },
                bing: {
                    name: '必应',
                    icon: 'bing',
                    search: function(query) {
                        window.open(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, '_blank');
                    }
                },
                
                doubao: {
                    name: '豆包',
                    icon: 'doubao',
                    search: function(query) {
                        window.open(`https://www.doubao.com/chat/search?q=${encodeURIComponent(query)}`, '_blank');
                    }
                },
                qianwen: {
                    name: '千问',
                    icon: 'qianwen',
                    search: function(query) {
                        window.open(`https://www.qianwen.com/chat/search?q=${encodeURIComponent(query)}`, '_blank');
                    }
                },
                douyin: {
                    name: '抖音',
                    icon: 'douyin',
                    search: function(query) {
                        window.open(`https://www.douyin.com/?recommend=1/search?q=${encodeURIComponent(query)}`, '_blank');
                    }
                },
            };
            
            // 创建搜索引擎图标样式
            function createEngineIconStyles() {
                const style = document.createElement('style');
                style.textContent = `
                    .local-icon {
                        background-color: #48bb78;
                        border-radius: 4px;
                        position: relative;
                    }
                    .local-icon::after {
                        content: "本";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    ._360-icon {
                        background-color: #19b955;
                        border-radius: 50%;
                        position: relative;
                    }
                    ._360-icon::after {
                        content: "360";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 10px;
                        font-weight: bold;
                    }
                    .baidu-icon {
                        background-color: #2932e1;
                        border-radius: 4px;
                        position: relative;
                    }
                    .baidu-icon::after {
                        content: "B";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .bing-icon {
                        background-color: #00809d;
                        border-radius: 4px;
                        position: relative;
                    }
                    .bing-icon::after {
                        content: "B";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 12px;
                        font-weight: bold;
                    }
                    .google-icon {
                        background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg);
                        border-radius: 50%;
                        position: relative;
                    }
                    .google-icon::after {
                        content: "G";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 12px;
                        font-weight: bold;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 初始化搜索引擎图标
            createEngineIconStyles();
            
            // 设置选中的搜索引擎
            function setSelectedEngine(engineKey) {
                currentEngine = engineKey;
                const engine = searchEngines[engineKey];
                
                // 更新显示
                selectedEngineName.textContent = engine.name;
                selectedEngineIcon.className = `engine-icon ${engine.icon}-icon`;
                
                // 更新下拉菜单中的选中状态
                document.querySelectorAll('.engine-option').forEach(option => {
                    option.classList.remove('active');
                    const check = option.querySelector('.engine-check');
                    check.textContent = '';
                });
                
                const selectedOption = document.querySelector(`.engine-option[data-engine="${engineKey}"]`);
                if (selectedOption) {
                    selectedOption.classList.add('active');
                    const check = selectedOption.querySelector('.engine-check');
                    check.textContent = '✓';
                }
                
                // 保存到本地存储
                localStorage.setItem('preferredSearchEngine', engineKey);
                
                // 如果是本地搜索，显示搜索建议；否则隐藏
                const searchSuggestions = document.getElementById('search-suggestions');
                if (engineKey === 'local') {
                    searchSuggestions.style.display = 'block';
                } else {
                    searchSuggestions.style.display = 'none';
                    searchResults.classList.add('hidden');
                }
                
                // 更新搜索框占位符
                searchInput.placeholder = `使用${engine.name}搜索...`;
            }
            
            // 切换搜索引擎下拉菜单
            engineSelected.addEventListener('click', function(e) {
                e.stopPropagation();
                const isOpen = engineOptions.style.display === 'block';
                engineOptions.style.display = isOpen ? 'none' : 'block';
                engineToggle.classList.toggle('open', !isOpen);
            });
            
            // 选择搜索引擎
            document.querySelectorAll('.engine-option').forEach(option => {
                option.addEventListener('click', function() {
                    const engineKey = this.getAttribute('data-engine');
                    setSelectedEngine(engineKey);
                    engineOptions.style.display = 'none';
                    engineToggle.classList.remove('open');
                    searchInput.focus();
                });
            });
            
            // 点击页面其他地方关闭下拉菜单
            document.addEventListener('click', function() {
                engineOptions.style.display = 'none';
                engineToggle.classList.remove('open');
            });
            
            // 阻止下拉菜单内的点击事件冒泡
            engineOptions.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // 从本地存储加载用户首选的搜索引擎
            const savedEngine = localStorage.getItem('preferredSearchEngine');
            if (savedEngine && searchEngines[savedEngine]) {
                setSelectedEngine(savedEngine);
            } else {
                setSelectedEngine('local');
            }
            
            // 高亮文本函数
            function highlightText(text, searchTerm) {
                if (!searchTerm) return text;
                
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                return text.replace(regex, '<span class="search-highlight">$1</span>');
            }
            
            // 执行本地搜索
            function performLocalSearch(searchTerm) {
                if (!searchTerm.trim()) {
                    searchResults.classList.add('hidden');
                    return;
                }
                
                const lowerSearchTerm = searchTerm.toLowerCase();
                const results = searchableContent.filter(item => {
                    return item.title.toLowerCase().includes(lowerSearchTerm) ||
                           item.content.toLowerCase().includes(lowerSearchTerm) ||
                           item.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm));
                });
                
                displayLocalResults(results, searchTerm);
            }
            
            // 显示本地搜索结果
            function displayLocalResults(results, searchTerm) {
                resultsContainer.innerHTML = '';
                
                if (results.length === 0) {
                    resultsContainer.innerHTML = '<div class="no-results">未找到相关结果，请尝试其他关键词。</div>';
                    resultCount.textContent = '0 个结果';
                } else {
                    resultCount.textContent = `${results.length} 个结果`;
                    
                    results.forEach(result => {
                        const resultElement = document.createElement('div');
                        resultElement.className = 'search-result-item p-3 border border-gray-100 rounded-md';
                        
                        const title = highlightText(result.title, searchTerm);
                        const content = highlightText(result.content, searchTerm);
                        
                        resultElement.innerHTML = `
                            <div class="flex justify-between items-start">
                                <div>
                                    <h4 class="font-bold text-nature-dark mb-1">${title}</h4>
                                    <p class="text-gray-600 text-sm mb-2">${content}</p>
                                    <div class="flex flex-wrap gap-1">
                                        ${result.tags.map(tag => 
                                            `<span class="bg-nature-light text-nature-dark text-xs px-2 py-1 rounded">${tag}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                                <span class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">${result.type}</span>
                            </div>
                        `;
                        
                        // 点击结果跳转
                        resultElement.addEventListener('click', function() {
                            if (result.link.startsWith('http')) {
                                window.open(result.link, '_blank');
                            } else if (result.link.startsWith('#')) {
                                document.querySelector(result.link).scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = result.link;
                            }
                            searchResults.classList.add('hidden');
                        });
                        
                        resultsContainer.appendChild(resultElement);
                    });
                }
                
                searchResults.classList.remove('hidden');
            }
            
            // 执行搜索
            function performSearch() {
                const searchTerm = searchInput.value.trim();
                if (!searchTerm) {
                    if (currentEngine === 'local') {
                        searchResults.classList.add('hidden');
                    }
                    return;
                }
                
                // 根据当前选择的搜索引擎执行搜索
                searchEngines[currentEngine].search(searchTerm);
            }
            
            // 事件监听
            searchButton.addEventListener('click', performSearch);
            
            searchInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    performSearch();
                }
                
                // 显示/隐藏清除按钮
                if (searchInput.value.trim()) {
                    clearSearchButton.classList.remove('hidden');
                    
                    // 如果是本地搜索，实时显示结果
                    if (currentEngine === 'local') {
                        performLocalSearch(searchInput.value);
                    }
                } else {
                    clearSearchButton.classList.add('hidden');
                    if (currentEngine === 'local') {
                        searchResults.classList.add('hidden');
                    }
                }
            });
            
            clearSearchButton.addEventListener('click', function() {
                searchInput.value = '';
                clearSearchButton.classList.add('hidden');
                if (currentEngine === 'local') {
                    searchResults.classList.add('hidden');
                }
                searchInput.focus();
            });
            
            resetSearchButton.addEventListener('click', function() {
                searchInput.value = '';
                clearSearchButton.classList.add('hidden');
                if (currentEngine === 'local') {
                    searchResults.classList.add('hidden');
                }
                searchInput.focus();
            });
            
            // 搜索建议按钮
            searchSuggestionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const searchTerm = this.getAttribute('data-search');
                    searchInput.value = searchTerm;
                    
                    if (currentEngine === 'local') {
                        performLocalSearch(searchTerm);
                    } else {
                        searchEngines[currentEngine].search(searchTerm);
                    }
                    
                    clearSearchButton.classList.remove('hidden');
                });
            });
            
            // 点击页面其他地方隐藏搜索结果（仅本地搜索）
            document.addEventListener('click', function(event) {
                if (!event.target.closest('.search-container') && currentEngine === 'local') {
                    // 延迟隐藏，以便点击搜索结果可以跳转
                    setTimeout(() => {
                        searchResults.classList.add('hidden');
                    }, 200);
                }
            });
            
            // 初始隐藏清除按钮
            if (!searchInput.value.trim()) {
                clearSearchButton.classList.add('hidden');
            }
        });
    
    