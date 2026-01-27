# 移动端App体验增强使用指南

## 📦 文件说明

```
├── mobile-enhance.js    # 移动端增强功能JS
├── mobile-enhance.css   # 移动端增强样式CSS
└── ENHANCEMENT_GUIDE.md # 本文档
```

---

## 🎯 功能列表

### 1. Toast 提示
替代原生的 alert()，提供更友好的提示

### 2. Modal 对话框
自定义确认对话框，支持Promise

### 3. 触觉反馈
使用 Vibration API 提供震动反馈

### 4. 页面切换动画
原生App风格的滑动转场效果

### 5. 下拉刷新
完整的下拉刷新交互

### 6. 上拉加载
滚动到底部自动加载更多

### 7. 加载动画
页面加载时的Loading效果

### 8. 骨架屏
数据加载时的占位动画

---

## 🚀 快速集成

### 步骤1：在HTML中引入文件

在每个页面的 `<head>` 中引入CSS：

```html
<link rel="stylesheet" href="mobile-enhance.css">
```

在页面底部（`</body>` 前）引入JS：

```html
<script type="module">
    import {
        Toast,
        Modal,
        HapticFeedback,
        PageTransition,
        PullToRefresh,
        LoadMore
    } from './mobile-enhance.js';

    // 初始化功能
    initApp();
</script>
```

### 步骤2：初始化页面功能

```javascript
function initApp() {
    // 1. 设置页面切换动画
    PageTransition.setupNavigation();

    // 2. 应用触觉反馈到所有按钮
    HapticFeedback.applyToSelector('button, .mobile-nav-item, .product-card');

    // 3. 设置下拉刷新
    new PullToRefresh({
        threshold: 80,
        onRefresh: async () => {
            // 刷新数据逻辑
            await loadData();
        }
    });

    // 4. 设置上拉加载
    new LoadMore({
        threshold: 100,
        onLoad: async () => {
            // 加载更多逻辑
            await loadMoreData();
        }
    });

    // 5. 页面进入动画
    PageTransition.enterAnimation();
}
```

---

## 📖 使用示例

### Toast 提示

```javascript
// 成功提示
Toast.success('添加成功');

// 错误提示
Toast.error('操作失败，请重试');

// 警告提示
Toast.warning('积分不足');

// 信息提示
Toast.info('正在加载...');

// 自定义时长
Toast.success('操作成功', 3000);

// 自定义消息
Toast.show('自定义消息', 'info', 2000);
```

### Modal 对话框

```javascript
// 确认对话框
Modal.confirm('确定要删除这个商品吗？').then(confirmed => {
    if (confirmed) {
        // 用户点击了确定
        deleteProduct();
    }
});

// 提示对话框
Modal.alert('订单提交成功').then(() => {
    // 用户点击了确定
    goBack();
});

// 自定义对话框
Modal.show({
    title: '提示',
    message: '您的积分即将过期',
    confirmText: '立即使用',
    cancelText: '稍后再说'
}).then(confirmed => {
    if (confirmed) {
        // 跳转到兑换页面
        window.location.href = 'exchange.html';
    }
});
```

### 触觉反馈

```javascript
// 轻微震动（点击反馈）
HapticFeedback.light();

// 中等震动（成功反馈）
HapticFeedback.medium();

// 强烈震动（错误反馈）
HapticFeedback.heavy();

// 成功震动模式
HapticFeedback.success();

// 错误震动模式
HapticFeedback.error();

// 应用到元素选择器
HapticFeedback.applyToSelector('.product-card');
```

### 页面切换

```javascript
// 前进切换
PageTransition.navigateTo('category.html', 'forward');

// 返回切换
PageTransition.navigateBack();

// 自动设置底部导航动画
PageTransition.setupNavigation();

// 页面进入时调用
PageTransition.enterAnimation();
```

### 下拉刷新

```javascript
const pullRefresh = new PullToRefresh({
    threshold: 80,  // 下拉阈值
    onRefresh: async () => {
        // 刷新数据
        try {
            await refreshData();
            Toast.success('刷新成功');
        } catch (error) {
            Toast.error('刷新失败');
        }
    }
});

// 手动触发刷新
pullRefresh.refresh();
```

### 上拉加载

```javascript
let page = 1;

const loadMore = new LoadMore({
    threshold: 100,  // 距离底部100px时触发
    onLoad: async () => {
        page++;
        try {
            const newData = await fetchProducts(page);
            renderProducts(newData);
        } catch (error) {
            Toast.error('加载失败');
        }
    }
});
```

### 加载动画

```javascript
// 显示加载动画
Loading.show();

// 执行异步操作
try {
    await fetchData();
} finally {
    // 隐藏加载动画
    Loading.hide();
}
```

### 骨架屏

```javascript
// 显示骨架屏
const container = document.querySelector('.product-list');
Skeleton.show(container, 5);  // 显示5个骨架项

// 加载数据
const data = await fetchData();

// 隐藏骨架屏并渲染数据
Skeleton.hide(container);
renderProducts(data);
```

---

## 🎨 完整页面示例

### xinfuli.html (首页)

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>鑫福利商城</title>
    <link rel="stylesheet" href="mobile-enhance.css">
    <!-- 其他样式 -->
</head>
<body>
    <!-- 下拉刷新 -->
    <div class="pull-refresh">
        <span>↓ 下拉刷新</span>
    </div>

    <!-- 页面内容 -->
    <div class="page-content">
        <!-- 你的页面内容 -->
    </div>

    <!-- 上拉加载 -->
    <div class="load-more">
        <span class="load-more-spinner"></span>
        <span>加载中...</span>
    </div>

    <script type="module">
        import {
            Toast,
            Modal,
            HapticFeedback,
            PageTransition,
            PullToRefresh,
            LoadMore,
            Loading,
            Skeleton
        } from './mobile-enhance.js';

        // 页面加载时
        window.addEventListener('DOMContentLoaded', async () => {
            // 显示加载动画
            Loading.show();

            try {
                // 加载数据
                await loadHomePageData();

                // 页面进入动画
                PageTransition.enterAnimation();

            } catch (error) {
                Toast.error('加载失败');
            } finally {
                Loading.hide();
            }
        });

        // 初始化页面功能
        function initPage() {
            // 设置导航动画
            PageTransition.setupNavigation();

            // 应用触觉反馈
            HapticFeedback.applyToSelector('button, a, .product-card');

            // 下拉刷新
            new PullToRefresh({
                onRefresh: async () => {
                    await refreshHomePage();
                }
            });

            // 上拉加载
            new LoadMore({
                onLoad: async () => {
                    await loadMoreProducts();
                }
            });
        }

        // 加载首页数据
        async function loadHomePageData() {
            const container = document.querySelector('.products-grid');

            // 显示骨架屏
            Skeleton.show(container, 6);

            // 模拟API请求
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 隐藏骨架屏
            Skeleton.hide(container);

            // 渲染数据
            renderProducts();
        }

        // 刷新首页
        async function refreshHomePage() {
            try {
                await loadHomePageData();
                Toast.success('刷新成功');
            } catch (error) {
                Toast.error('刷新失败');
            }
        }

        // 加载更多商品
        async function loadMoreProducts() {
            // 加载更多逻辑
            Toast.info('没有更多商品了');
        }

        // 初始化
        initPage();
    </script>
</body>
</html>
```

### cart.html (购物车)

```html
<script type="module">
    import { Toast, Modal, HapticFeedback, PageTransition } from './mobile-enhance.js';

    // 删除购物车商品
    async function deleteCartItem(itemId) {
        // 确认对话框
        const confirmed = await Modal.confirm('确定要删除这个商品吗？');

        if (confirmed) {
            try {
                // 删除逻辑
                await api.deleteCartItem(itemId);
                Toast.success('删除成功');

                // 震动反馈
                HapticFeedback.success();

                // 重新加载
                loadCartData();
            } catch (error) {
                Toast.error('删除失败');
                HapticFeedback.error();
            }
        }
    }

    // 结算按钮
    document.querySelector('.checkout-btn').addEventListener('click', async () => {
        HapticFeedback.medium();

        // 检查是否选中商品
        const selectedItems = getSelectedItems();

        if (selectedItems.length === 0) {
            Toast.warning('请先选择要结算的商品');
            return;
        }

        // 显示加载
        Loading.show();

        try {
            // 创建订单
            const result = await api.createOrder(selectedItems);

            Loading.hide();

            // 成功反馈
            HapticFeedback.success();

            // 跳转到支付页面
            PageTransition.navigateTo('payment.html', 'forward');

        } catch (error) {
            Loading.hide();
            Toast.error('下单失败');
            HapticFeedback.error();
        }
    });

    // 设置导航
    PageTransition.setupNavigation();
    PageTransition.enterAnimation();
</script>
```

---

## 🔧 高级配置

### 自定义Toast样式

```css
/* 覆盖默认样式 */
.mobile-toast {
    background: rgba(230, 0, 18, 0.95); /* 红色背景 */
    padding: 16px 24px; /* 更大的内边距 */
}
```

### 自定义Modal样式

```javascript
Modal.show({
    title: '自定义标题',
    message: '自定义内容',
    confirmText: '知道了',
    cancelText: '关闭'
}).then(result => {
    console.log('用户选择:', result);
});
```

### 调整下拉刷新阈值

```javascript
new PullToRefresh({
    threshold: 100,  // 需要下拉100px才触发
    onRefresh: () => {
        // 刷新逻辑
    }
});
```

---

## 📱 兼容性说明

- ✅ iOS Safari 12+
- ✅ Android Chrome 70+
- ✅ 微信浏览器
- ✅ 支付宝浏览器
- ⚠️ 触觉反馈仅支持支持Vibration API的设备
- ⚠️ 安全区域适配仅支持iPhone X及以上机型

---

## 💡 最佳实践

### 1. 错误处理

```javascript
try {
    await someOperation();
    Toast.success('操作成功');
    HapticFeedback.success();
} catch (error) {
    Toast.error(error.message);
    HapticFeedback.error();
}
```

### 2. 异步操作

```javascript
async function handleSubmit() {
    HapticFeedback.medium();
    Loading.show();

    try {
        await api.submitData();
        Loading.hide();
        Toast.success('提交成功');
        HapticFeedback.success();
    } catch (error) {
        Loading.hide();
        Toast.error('提交失败');
        HapticFeedback.error();
    }
}
```

### 3. 列表操作

```javascript
// 下拉刷新 + 上拉加载 + 骨架屏
function initList() {
    const container = document.querySelector('.list-container');

    // 初始加载
    Skeleton.show(container, 5);
    loadData().finally(() => Skeleton.hide(container));

    // 下拉刷新
    new PullToRefresh({
        onRefresh: () => loadData()
    });

    // 上拉加载
    new LoadMore({
        onLoad: () => loadMore()
    });
}
```

---

## 🎯 总结

通过使用这些增强功能，你的商城页面将具备：

1. ✅ 原生App级别的交互体验
2. ✅ 流畅的页面切换动画
3. ✅ 友好的提示和反馈
4. ✅ 完整的下拉刷新/上拉加载
5. ✅ 优雅的加载状态
6. ✅ 支持刘海屏等全面屏设备

立即集成，让你的Web应用体验媲美原生App！
