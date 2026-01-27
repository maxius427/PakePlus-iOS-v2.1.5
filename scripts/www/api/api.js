/**
 * API接口封装
 * 统一管理所有API调用，支持Mock数据和真实API切换
 */

import API_CONFIG from './config.js';
import { get, post, put, del } from './utils.js';
import {
    mockBannerList,
    mockQuickActions,
    mockUserPoints,
    mockCategories,
    mockProducts,
    mockCategoryList,
    mockSeckillInfo,
    mockSeckillProducts,
    mockCartList,
    mockUserInfo,
    mockUserOrders,
    simulateDelay,
    mockSuccess,
    mockError
} from './mockData.js';

class ApiClient {
    constructor() {
        this.config = API_CONFIG;
    }

    // ==================== 私有方法 ====================

    /**
     * 判断是否使用Mock数据
     */
    _isMock() {
        return this.config.isUseMock();
    }

    /**
     * 模拟API延迟
     */
    async _delay() {
        await simulateDelay();
    }

    /**
     * 获取完整API路径
     */
    _getFullPath(path) {
        return this.config.getFullPath(path);
    }

    // ==================== 首页相关接口 ====================

    /**
     * 获取轮播图列表
     * @returns {Promise}
     */
    async getBannerList() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockBannerList);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_BANNER_LIST));
    }

    /**
     * 获取快捷入口
     * @returns {Promise}
     */
    async getQuickActions() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockQuickActions);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_QUICK_ACTIONS));
    }

    /**
     * 获取用户积分信息
     * @returns {Promise}
     */
    async getUserPoints() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockUserPoints);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_USER_POINTS));
    }

    /**
     * 获取分类列表
     * @returns {Promise}
     */
    async getCategories() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockCategories);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_CATEGORIES));
    }

    /**
     * 获取热销商品
     * @param {object} params - 查询参数 {page, limit}
     * @returns {Promise}
     */
    async getHotProducts(params = { page: 1, limit: 10 }) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({
                list: mockProducts,
                total: mockProducts.length,
                page: params.page,
                limit: params.limit
            });
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_HOT_PRODUCTS), params);
    }

    /**
     * 获取新品商品
     * @param {object} params - 查询参数 {page, limit}
     * @returns {Promise}
     */
    async getNewProducts(params = { page: 1, limit: 10 }) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({
                list: mockProducts.slice(5),
                total: mockProducts.length,
                page: params.page,
                limit: params.limit
            });
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_NEW_PRODUCTS), params);
    }

    // ==================== 分类页相关接口 ====================

    /**
     * 获取分类列表（含子分类）
     * @returns {Promise}
     */
    async getCategoryList() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockCategoryList);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_CATEGORY_LIST));
    }

    /**
     * 获取分类商品
     * @param {object} params - 查询参数 {categoryId, page, limit}
     * @returns {Promise}
     */
    async getCategoryProducts(params = {}) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({
                list: mockProducts,
                total: mockProducts.length,
                ...params
            });
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_CATEGORY_PRODUCTS), params);
    }

    // ==================== 秒杀相关接口 ====================

    /**
     * 获取秒杀活动信息
     * @returns {Promise}
     */
    async getSeckillInfo() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockSeckillInfo);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_SECKILL_INFO));
    }

    /**
     * 获取秒杀商品列表
     * @param {object} params - 查询参数 {sessionId, page, limit}
     * @returns {Promise}
     */
    async getSeckillProducts(params = {}) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({
                list: mockSeckillProducts,
                total: mockSeckillProducts.length,
                ...params
            });
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_SECKILL_PRODUCTS), params);
    }

    // ==================== 购物车相关接口 ====================

    /**
     * 获取购物车列表
     * @returns {Promise}
     */
    async getCartList() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockCartList);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_CART_LIST));
    }

    /**
     * 添加到购物车
     * @param {object} data - 商品信息 {productId, quantity, spec}
     * @returns {Promise}
     */
    async addToCart(data) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({ message: '添加成功' });
        }
        return post(this._getFullPath(this.config.API_PATHS.ADD_TO_CART), data);
    }

    /**
     * 更新购物车商品数量
     * @param {object} data - {cartItemId, quantity}
     * @returns {Promise}
     */
    async updateCartQuantity(data) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({ message: '更新成功' });
        }
        return put(this._getFullPath(this.config.API_PATHS.UPDATE_CART_QUANTITY), data);
    }

    /**
     * 删除购物车商品
     * @param {number} cartItemId - 购物车项ID
     * @returns {Promise}
     */
    async deleteCartItem(cartItemId) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({ message: '删除成功' });
        }
        return del(this._getFullPath(`${this.config.API_PATHS.DELETE_CART_ITEM}/${cartItemId}`));
    }

    // ==================== 用户相关接口 ====================

    /**
     * 获取用户信息
     * @returns {Promise}
     */
    async getUserInfo() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockUserInfo);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_USER_INFO));
    }

    /**
     * 获取用户订单统计
     * @returns {Promise}
     */
    async getUserOrders() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess(mockUserOrders);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_USER_ORDERS));
    }

    // ==================== 搜索相关接口 ====================

    /**
     * 搜索商品
     * @param {object} params - {keyword, page, limit}
     * @returns {Promise}
     */
    async searchProducts(params) {
        if (this._isMock()) {
            await this._delay();
            // 简单的搜索过滤逻辑
            const filtered = mockProducts.filter(p =>
                p.name.includes(params.keyword)
            );
            return mockSuccess({
                list: filtered,
                total: filtered.length,
                keyword: params.keyword
            });
        }
        return get(this._getFullPath(this.config.API_PATHS.SEARCH_PRODUCTS), params);
    }

    /**
     * 获取热门搜索词
     * @returns {Promise}
     */
    async getHotKeywords() {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess([
                '京东E卡',
                '话费充值',
                '加油卡',
                '爱奇艺会员',
                '星巴克'
            ]);
        }
        return get(this._getFullPath(this.config.API_PATHS.GET_HOT_KEYWORDS));
    }

    // ==================== 订单相关接口 ====================

    /**
     * 创建订单
     * @param {object} data - 订单信息
     * @returns {Promise}
     */
    async createOrder(data) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({
                orderId: 'ORD' + Date.now(),
                message: '下单成功'
            });
        }
        return post(this._getFullPath(this.config.API_PATHS.CREATE_ORDER), data);
    }

    /**
     * 获取订单详情
     * @param {string} orderId - 订单ID
     * @returns {Promise}
     */
    async getOrderDetail(orderId) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({
                orderId: orderId,
                status: 'pending',
                products: mockCartList[0].products,
                totalPoints: 4900
            });
        }
        return get(this._getFullPath(`${this.config.API_PATHS.GET_ORDER_DETAIL}/${orderId}`));
    }

    /**
     * 取消订单
     * @param {string} orderId - 订单ID
     * @returns {Promise}
     */
    async cancelOrder(orderId) {
        if (this._isMock()) {
            await this._delay();
            return mockSuccess({ message: '订单已取消' });
        }
        return post(this._getFullPath(`${this.config.API_PATHS.CANCEL_ORDER}/${orderId}`));
    }
}

// 创建单例实例
const api = new ApiClient();

// 导出实例
export default api;
