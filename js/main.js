// 加载数据
async function loadData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

// 初始化页面
async function initPage() {
    const data = await loadData();
    const { config, contents } = data;

    // 设置网站标题和图标
    document.title = config.site_title;
    document.querySelector('link[rel="icon"]').href = config.favicon;

    // 设置个人信息
    document.getElementById('avatar').src = config.avatar;
    document.getElementById('name').textContent = config.name;
    document.getElementById('description').textContent = config.description;
    
    // 生成导航菜单
    const navigation = document.querySelector('.navigation');
    config.navigation.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.title;
        navigation.appendChild(link);
        // 如果是 about 页面，设置为激活状态
        if (item.url === '#about') {
            link.classList.add('active');
        }
    });
    
    // 设置社交媒体链接
    const social = document.querySelector('.social-links');
    Object.entries(config.social).forEach(([platform, url]) => {
        const link = document.createElement('a');
        link.href = url;
        
        // 创建图标
        const icon = document.createElement('i');
        if (platform === 'google_scholar') {
            icon.className = 'ai ai-google-scholar';
        } else if (platform === 'email') {
            icon.className = 'fas fa-envelope';
        } else if (platform === 'phone') {
            icon.className = 'fas fa-phone';
        } else if (platform === 'blog') {
            icon.className = 'fas fa-blog';
        } else if (platform === 'wechat') {
            icon.className = 'fab fa-weixin';
        } else {
            icon.className = `fab fa-${platform}`;
        }
        link.appendChild(icon);
        
        if (!url.startsWith('tel:') && !url.startsWith('mailto:')) {
            link.target = '_blank';
        }
        social.appendChild(link);
    });

    // 加载默认内容（关于页面）
    const contentDiv = document.querySelector('.content');
    if (contents && contents.about) {
        contentDiv.innerHTML = contents.about;
    } else {
        contentDiv.innerHTML = '<p>Content not found.</p>';
    }

    // 处理导航点击
    document.querySelector('.navigation').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const url = e.target.getAttribute('href');
            
            // 如果是外部链接（不以#开头），则在新标签页中打开
            if (!url.startsWith('#')) {
                e.preventDefault();
                window.open(url, '_blank');
                return;
            }
            
            // 内部链接的处理
            e.preventDefault();
            const section = url.replace('#', '');
            if (contents && contents[section]) {
                // 移除所有激活状态
                document.querySelectorAll('.navigation a').forEach(a => a.classList.remove('active'));
                // 添加当前项的激活状态
                e.target.classList.add('active');
                contentDiv.innerHTML = contents[section];
            } else {
                contentDiv.innerHTML = '<p>Content not found.</p>';
            }
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);
    