/**
 * API使用示例
 * 演示如何调用API接口
 */

import api from './api.js';

// ==================== 示例1：获取首页数据 ====================

async function loadHomePageData() {
    try {
        // 并行请求多个接口
        const [bannersRes, quickActionsRes, userPointsRes, categoriesRes, productsRes] = await Promise.all([
            api.getBannerList(),
            api.getQuickActions(),
            api.getUserPoints(),
            api.getCategories(),
            api.getHotProducts({ page: 1, limit: 10 })
        ]);

        // 处理返回数据
        if (bannersRes.code === 200) {
            const banners = bannersRes.data;
            console.log('轮播图数据:', banners);
            // 渲染轮播图...
        }

        if (quickActionsRes.code === 200) {
            const quickActions = quickActionsRes.data;
            console.log('快捷入口:', quickActions);
            // 渲染快捷入口...
        }

        if (userPointsRes.code === 200) {
            const userPoints = userPointsRes.data;
            console.log('用户积分:', userPoints);
            // 显示积分信息...
        }

        if (categoriesRes.code === 200) {
            const categories = categoriesRes.data;
            console.log('分类列表:', categories);
            // 渲染分类...
        }

        if (productsRes.code === 200) {
            const products = productsRes.data.list;
            console.log('商品列表:', products);
            // 渲染商品列表...
        }

    } catch (error) {
        console.error('加载首页数据失败:', error);
        // 显示错误提示...
    }
}

// ==================== 示例2：获取分类页数据 ====================

async function loadCategoryPage() {
    try {
        const res = await api.getCategoryList();

        if (res.code === 200) {
            const categoryList = res.data;
            console.log('分类列表:', categoryList);

            // 渲染侧边栏和内容区
            categoryList.forEach(category => {
                console.log(`分类: ${category.name}, 子分类数量: ${category.subcategories.length}`);
            });
        }
    } catch (error) {
        console.error('加载分类数据失败:', error);
    }
}

// ==================== 示例3：获取秒杀数据 ====================

async function loadSeckillPage() {
    try {
        const [infoRes, productsRes] = await Promise.all([
            api.getSeckillInfo(),
            api.getSeckillProducts({ sessionId: 3 })
        ]);

        if (infoRes.code === 200) {
            const seckillInfo = infoRes.data;
            console.log('秒杀信息:', seckillInfo);

            // 设置倒计时
            const { hours, minutes, seconds } = seckillInfo.countdown;
            console.log(`倒计时: ${hours}时${minutes}分${seconds}秒`);
        }

        if (productsRes.code === 200) {
            const products = productsRes.data.list;
            console.log('秒杀商品:', products);

            // 渲染商品列表
            products.forEach(product => {
                console.log(`${product.name} - ${product.seckillPrice}积分 - 已抢${product.progress}%`);
            });
        }
    } catch (error) {
        console.error('加载秒杀数据失败:', error);
    }
}

// ==================== 示例4：购物车操作 ====================

// 获取购物车列表
async function loadCartList() {
    try {
        const res = await api.getCartList();

        if (res.code === 200) {
            const cartList = res.data;
            console.log('购物车列表:', cartList);

            // 计算总价
            let totalPoints = 0;
            let totalCount = 0;

            cartList.forEach(shop => {
                shop.products.forEach(product => {
                    if (product.checked) {
                        totalPoints += product.price * product.quantity;
                        totalCount += product.quantity;
                    }
                });
            });

            console.log(`总计: ${totalPoints}积分, ${totalCount}件商品`);
        }
    } catch (error) {
        console.error('加载购物车失败:', error);
    }
}

// 添加到购物车
async function addToCart(productId, quantity = 1) {
    try {
        const res = await api.addToCart({
            productId: productId,
            quantity: quantity,
            spec: ''
        });

        if (res.code === 200) {
            console.log('添加成功:', res.data.message);
            // 显示成功提示
            alert('已添加到购物车');
        }
    } catch (error) {
        console.error('添加失败:', error);
        alert('添加失败，请重试');
    }
}

// 更新购物车数量
async function updateCartQuantity(cartItemId, quantity) {
    try {
        const res = await api.updateCartQuantity({
            cartItemId: cartItemId,
            quantity: quantity
        });

        if (res.code === 200) {
            console.log('更新成功');
            // 重新加载购物车
            loadCartList();
        }
    } catch (error) {
        console.error('更新失败:', error);
    }
}

// 删除购物车商品
async function deleteCartItem(cartItemId) {
    try {
        const res = await api.deleteCartItem(cartItemId);

        if (res.code === 200) {
            console.log('删除成功');
            // 重新加载购物车
            loadCartList();
        }
    } catch (error) {
        console.error('删除失败:', error);
    }
}

// ==================== 示例5：搜索商品 ====================

async function searchProducts(keyword) {
    try {
        const res = await api.searchProducts({
            keyword: keyword,
            page: 1,
            limit: 20
        });

        if (res.code === 200) {
            const result = res.data;
            console.log(`搜索"${keyword}"找到${result.total}个商品:`);
            result.list.forEach(product => {
                console.log(`- ${product.name}: ${product.price}积分`);
            });
        }
    } catch (error) {
        console.error('搜索失败:', error);
    }
}

// ==================== 示例6：订单操作 ====================

// 创建订单
async function createOrder(cartItemIds) {
    try {
        const res = await api.createOrder({
            cartItemIds: cartItemIds,
            remark: ''
        });

        if (res.code === 200) {
            console.log('下单成功:', res.data.orderId);
            // 跳转到支付页面
            window.location.href = `/payment?orderId=${res.data.orderId}`;
        }
    } catch (error) {
        console.error('下单失败:', error);
    }
}

// 取消订单
async function cancelOrder(orderId) {
    if (!confirm('确定要取消订单吗？')) {
        return;
    }

    try {
        const res = await api.cancelOrder(orderId);

        if (res.code === 200) {
            console.log('订单已取消');
            // 重新加载订单列表
            loadOrderList();
        }
    } catch (error) {
        console.error('取消失败:', error);
    }
}

// ==================== 在HTML页面中使用示例 ====================

/*
在HTML文件中引入：

<script type="module">
    import api from './api/api.js';

    // 页面加载时获取数据
    window.addEventListener('DOMContentLoaded', async () => {
        try {
            const bannersRes = await api.getBannerList();
            if (bannersRes.code === 200) {
                const banners = bannersRes.data;

                // 渲染轮播图
                const bannerContainer = document.querySelector('.banner-slider');
                banners.forEach(banner => {
                    const slide = document.createElement('div');
                    slide.className = 'banner-slide';
                    slide.style.background = banner.bgColor;
                    slide.innerHTML = `
                        <div class="banner-content">
                            <h1 class="banner-title">${banner.title}</h1>
                            <p class="banner-desc">${banner.desc}</p>
                        </div>
                    `;
                    bannerContainer.appendChild(slide);
                });
            }
        } catch (error) {
            console.error('加载失败:', error);
        }
    });
</script>
*/

// ==================== 错误处理示例 ====================

async function loadDataWithErrorHandling() {
    try {
        const res = await api.getHotProducts();

        // 检查响应码
        if (res.code !== 200) {
            throw new Error(res.message || '请求失败');
        }

        // 处理数据
        const products = res.data.list;
        console.log('商品列表:', products);

    } catch (error) {
        // 错误处理
        console.error('加载失败:', error.message);

        // 显示用户友好的错误提示
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = error.message || '加载失败，请稍后重试';
        document.body.appendChild(errorMsg);

        // 3秒后自动消失
        setTimeout(() => {
            errorMsg.remove();
        }, 3000);
    }
}

// ==================== 导出示例函数（可选） ====================

export {
    loadHomePageData,
    loadCategoryPage,
    loadSeckillPage,
    loadCartList,
    addToCart,
    updateCartQuantity,
    deleteCartItem,
    searchProducts,
    createOrder,
    cancelOrder
};
