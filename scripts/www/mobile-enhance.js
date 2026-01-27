/**
 * 移动端App体验增强
 * 包含：Toast、Modal、页面切换动画、下拉刷新、触觉反馈等
 */

// ==================== 1. Toast 提示组件 ====================

class Toast {
    static show(message, type = 'success', duration = 2000) {
        // 创建Toast元素
        const toast = document.createElement('div');
        toast.className = 'mobile-toast';

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;

        document.body.appendChild(toast);

        // 触发动画
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // 自动消失
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    static success(message, duration) {
        this.show(message, 'success', duration);
    }

    static error(message, duration) {
        this.show(message, 'error', duration);
    }

    static warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    static info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// ==================== 2. Modal 对话框组件 ====================

class Modal {
    static show(options = {}) {
        return new Promise((resolve) => {
            // 创建遮罩层
            const overlay = document.createElement('div');
            overlay.className = 'mobile-modal-overlay';
            overlay.innerHTML = `
                <div class="mobile-modal">
                    <div class="mobile-modal-header">
                        <h3>${options.title || '提示'}</h3>
                    </div>
                    <div class="mobile-modal-body">
                        <p>${options.message || ''}</p>
                    </div>
                    <div class="mobile-modal-footer">
                        <button class="mobile-modal-btn cancel">${options.cancelText || '取消'}</button>
                        <button class="mobile-modal-btn confirm">${options.confirmText || '确定'}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            // 阻止滚动
            document.body.style.overflow = 'hidden';

            // 动画
            requestAnimationFrame(() => {
                overlay.classList.add('show');
            });

            // 按钮事件
            const confirmBtn = overlay.querySelector('.confirm');
            const cancelBtn = overlay.querySelector('.cancel');

            confirmBtn.addEventListener('click', () => {
                this.hide(overlay);
                resolve(true);
            });

            cancelBtn.addEventListener('click', () => {
                this.hide(overlay);
                resolve(false);
            });

            // 点击遮罩关闭
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hide(overlay);
                    resolve(false);
                }
            });
        });
    }

    static hide(overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => overlay.remove(), 300);
    }

    static alert(message) {
        return this.show({
            title: '提示',
            message: message,
            confirmText: '确定',
            cancelText: ''
        });
    }

    static confirm(message) {
        return this.show({
            title: '确认',
            message: message,
            confirmText: '确定',
            cancelText: '取消'
        });
    }
}

// ==================== 3. 触觉反馈 ====================

class HapticFeedback {
    static light() {
        if ('vibrate' in navigator) {
            navigator.vibrate(15);
        }
    }

    static medium() {
        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }
    }

    static heavy() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    static success() {
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 50, 10]);
        }
    }

    static error() {
        if ('vibrate' in navigator) {
            navigator.vibrate([20, 30, 20, 30, 20]);
        }
    }

    // 应用到元素
    static applyToSelector(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('touchstart', () => this.light());
        });
    }
}

// ==================== 4. 页面切换动画 ====================

class PageTransition {
    static navigateTo(url, direction = 'forward') {
        // 触觉反馈
        HapticFeedback.light();

        // 添加退出动画
        const animationClass = direction === 'forward'
            ? 'page-slide-out-left'
            : 'page-slide-out-right';

        document.body.classList.add(animationClass);

        // 延迟跳转
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    static setupNavigation() {
        // 底部导航切换
        document.querySelectorAll('.mobile-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                if (href && !item.classList.contains('active') && href !== '#') {
                    e.preventDefault();
                    this.navigateTo(href, 'forward');
                }
            });
        });

        // 返回按钮
        document.querySelectorAll('.header-back, .mobile-menu-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                HapticFeedback.light();

                if (window.history.length > 1) {
                    this.navigateBack();
                } else {
                    this.navigateTo('xinfuli.html', 'back');
                }
            });
        });
    }

    static navigateBack() {
        document.body.classList.add('page-slide-in-from-left');
        setTimeout(() => {
            window.history.back();
        }, 300);
    }

    static enterAnimation() {
        document.body.classList.add('page-slide-in-from-right');
        setTimeout(() => {
            document.body.classList.remove('page-slide-in-from-right');
        }, 300);
    }
}

// ==================== 5. 下拉刷新 ====================

class PullToRefresh {
    constructor(options = {}) {
        this.threshold = options.threshold || 80;
        this.onRefresh = options.onRefresh || (() => {});
        this.init();
    }

    init() {
        this.element = document.querySelector('.pull-refresh');
        if (!this.element) return;

        this.startY = 0;
        this.currentY = 0;
        this.isDragging = false;
        this.isRefreshing = false;

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
        document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.onTouchEnd.bind(this), { passive: true });
    }

    onTouchStart(e) {
        if (window.scrollY === 0 && !this.isRefreshing) {
            this.startY = e.touches[0].pageY;
            this.isDragging = true;
        }
    }

    onTouchMove(e) {
        if (!this.isDragging || window.scrollY > 0) return;

        this.currentY = e.touches[0].pageY;
        const diff = this.currentY - this.startY;

        if (diff > 0) {
            e.preventDefault();
            const pullDistance = Math.min(diff * 0.5, 120);
            this.element.style.transform = `translateY(${pullDistance}px)`;

            const text = this.element.querySelector('span');
            if (pullDistance > this.threshold) {
                text.textContent = '↑ 释放立即刷新';
            } else {
                text.textContent = '↓ 继续下拉刷新';
            }
        }
    }

    onTouchEnd() {
        if (!this.isDragging) return;
        this.isDragging = false;

        const pullDistance = Math.min((this.currentY - this.startY) * 0.5, 120);

        if (pullDistance > this.threshold) {
            this.refresh();
        } else {
            this.reset();
        }
    }

    async refresh() {
        this.isRefreshing = true;
        this.element.querySelector('span').textContent = '⟳ 正在刷新...';
        this.element.style.transition = 'transform 0.3s';
        this.element.style.transform = 'translateY(50px)';

        try {
            await this.onRefresh();
            Toast.success('刷新成功');
        } catch (error) {
            Toast.error('刷新失败');
        }

        this.reset();
        this.isRefreshing = false;
    }

    reset() {
        this.element.style.transition = 'transform 0.3s';
        this.element.style.transform = 'translateY(0)';

        setTimeout(() => {
            this.element.style.transition = '';
            this.element.querySelector('span').textContent = '↓ 下拉刷新';
        }, 300);
    }
}

// ==================== 6. 上拉加载更多 ====================

class LoadMore {
    constructor(options = {}) {
        this.threshold = options.threshold || 100;
        this.onLoad = options.onLoad || (() => {});
        this.isLoading = false;
        this.init();
    }

    init() {
        this.element = document.querySelector('.load-more');
        if (!this.element) return;

        window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    }

    onScroll() {
        if (this.isLoading) return;

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - this.threshold) {
            this.load();
        }
    }

    async load() {
        this.isLoading = true;
        this.element.classList.add('show');

        try {
            await this.onLoad();
        } catch (error) {
            console.error('加载失败:', error);
        }

        this.element.classList.remove('show');
        this.isLoading = false;
    }
}

// ==================== 7. 加载动画 ====================

class Loading {
    static show() {
        let loader = document.querySelector('.page-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'page-loader';
            loader.innerHTML = `
                <div class="loader-spinner"></div>
            `;
            document.body.appendChild(loader);
        }

        requestAnimationFrame(() => {
            loader.classList.add('show');
        });

        document.body.style.overflow = 'hidden';
    }

    static hide() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.classList.remove('show');
            document.body.style.overflow = '';

            setTimeout(() => loader.remove(), 300);
        }
    }
}

// ==================== 8. 骨架屏 ====================

class Skeleton {
    static show(container, count = 3) {
        const html = Array(count).fill(0).map(() => `
            <div class="skeleton-item">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line title"></div>
                    <div class="skeleton-line subtitle"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        container.classList.add('skeleton-loading');
    }

    static hide(container) {
        container.classList.remove('skeleton-loading');
    }
}

// ==================== 导出 ====================

export {
    Toast,
    Modal,
    HapticFeedback,
    PageTransition,
    PullToRefresh,
    LoadMore,
    Loading,
    Skeleton
};

// 默认导出一个包含所有功能的对象
export default {
    Toast,
    Modal,
    HapticFeedback,
    PageTransition,
    PullToRefresh,
    LoadMore,
    Loading,
    Skeleton
};
