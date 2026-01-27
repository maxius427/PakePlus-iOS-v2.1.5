/**
 * API配置文件
 * 用于控制是使用测试数据还是真实API接口
 */

const API_CONFIG = {
    // ==================== 核心配置开关 ====================
    // true = 使用测试数据（mockData.js）
    // false = 调用真实后端API接口
    USE_MOCK_DATA: true,

    // ==================== API基础配置 ====================
    // API基础URL（根据环境切换）
    BASE_URL: {
        development: 'http://localhost:3000/api',  // 开发环境
        production: 'https://api.xinfuli.com'      // 生产环境
    },

    // 当前环境：development | production
    ENV: 'development',

    // 请求超时时间（毫秒）
    TIMEOUT: 10000,

    // ==================== 接口路径配置 ====================
    API_PATHS: {
        // 首页相关
        GET_BANNER_LIST: '/home/banner',              // 获取轮播图
        GET_QUICK_ACTIONS: '/home/quickActions',      // 获取快捷入口
        GET_CATEGORIES: '/home/categories',           // 获取分类
        GET_HOT_PRODUCTS: '/home/hotProducts',        // 获取热销商品
        GET_NEW_PRODUCTS: '/home/newProducts',        // 获取新品

        // 分类相关
        GET_CATEGORY_LIST: '/category/list',          // 获取分类列表
        GET_CATEGORY_PRODUCTS: '/category/products',  // 获取分类商品

        // 秒杀相关
        GET_SECKILL_INFO: '/seckill/info',            // 获取秒杀信息
        GET_SECKILL_PRODUCTS: '/seckill/products',    // 获取秒杀商品

        // 购物车相关
        GET_CART_LIST: '/cart/list',                  // 获取购物车列表
        ADD_TO_CART: '/cart/add',                     // 添加到购物车
        UPDATE_CART_QUANTITY: '/cart/update',         // 更新购物车数量
        DELETE_CART_ITEM: '/cart/delete',             // 删除购物车商品

        // 用户相关
        GET_USER_INFO: '/user/info',                  // 获取用户信息
        GET_USER_ORDERS: '/user/orders',              // 获取用户订单
        GET_USER_POINTS: '/user/points',              // 获取用户积分

        // 搜索相关
        SEARCH_PRODUCTS: '/search/products',          // 搜索商品
        GET_HOT_KEYWORDS: '/search/hotKeywords',      // 获取热门搜索词

        // 订单相关
        CREATE_ORDER: '/order/create',                // 创建订单
        GET_ORDER_DETAIL: '/order/detail',            // 获取订单详情
        CANCEL_ORDER: '/order/cancel'                 // 取消订单
    },

    // ==================== 获取完整API URL ====================
    getBaseUrl() {
        return this.BASE_URL[this.ENV];
    },

    // 获取完整的API地址
    getFullPath(path) {
        return this.getBaseUrl() + path;
    },

    // ==================== 判断是否使用Mock数据 ====================
    isUseMock() {
        return this.USE_MOCK_DATA;
    },

    // ==================== 通用请求配置 ====================
    getRequestConfig() {
        return {
            timeout: this.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                // 可以在这里添加token等认证信息
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
    }
};

// 导出配置
export default API_CONFIG;
