/**
 * API工具函数
 */

// ==================== 延迟函数 ====================
export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// ==================== HTTP请求封装 ====================

/**
 * 发送GET请求
 * @param {string} url - 请求地址
 * @param {object} params - 查询参数
 * @returns {Promise}
 */
export async function get(url, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('GET请求失败:', error);
        throw error;
    }
}

/**
 * 发送POST请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求体数据
 * @returns {Promise}
 */
export async function post(url, data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('POST请求失败:', error);
        throw error;
    }
}

/**
 * 发送PUT请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求体数据
 * @returns {Promise}
 */
export async function put(url, data = {}) {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('PUT请求失败:', error);
        throw error;
    }
}

/**
 * 发送DELETE请求
 * @param {string} url - 请求地址
 * @returns {Promise}
 */
export async function del(url) {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('DELETE请求失败:', error);
        throw error;
    }
}

// ==================== 本地存储工具 ====================

/**
 * 设置本地存储
 * @param {string} key - 键名
 * @param {any} value - 值
 */
export function setLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('设置本地存储失败:', error);
    }
}

/**
 * 获取本地存储
 * @param {string} key - 键名
 * @returns {any}
 */
export function getLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('获取本地存储失败:', error);
        return null;
    }
}

/**
 * 删除本地存储
 * @param {string} key - 键名
 */
export function removeLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('删除本地存储失败:', error);
    }
}

// ==================== Token管理 ====================

/**
 * 设置Token
 * @param {string} token - Token值
 */
export function setToken(token) {
    setLocalStorage('auth_token', token);
}

/**
 * 获取Token
 * @returns {string|null}
 */
export function getToken() {
    return getLocalStorage('auth_token');
}

/**
 * 删除Token
 */
export function removeToken() {
    removeLocalStorage('auth_token');
}

// ==================== URL参数处理 ====================

/**
 * 获取URL参数
 * @param {string} name - 参数名
 * @returns {string|null}
 */
export function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 构建URL参数字符串
 * @param {object} params - 参数对象
 * @returns {string}
 */
export function buildQueryString(params) {
    return new URLSearchParams(params).toString();
}

// ==================== 数据格式化 ====================

/**
 * 格式化积分显示
 * @param {number} points - 积分数
 * @returns {string}
 */
export function formatPoints(points) {
    if (points >= 10000) {
        return (points / 10000).toFixed(1) + '万';
    }
    return points.toString();
}

/**
 * 格式化价格显示
 * @param {number} price - 价格
 * @returns {string}
 */
export function formatPrice(price) {
    return '¥' + price.toFixed(2);
}

/**
 * 格式化时间显示
 * @param {Date|string} date - 日期
 * @param {string} format - 格式化模板
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// ==================== 错误处理 ====================

/**
 * 统一错误处理
 * @param {Error} error - 错误对象
 * @param {string} defaultMessage - 默认错误消息
 * @returns {string}
 */
export function handleError(error, defaultMessage = '操作失败，请稍后重试') {
    console.error('错误:', error);

    if (error.message) {
        return error.message;
    }

    return defaultMessage;
}

// ==================== 防抖节流 ====================

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} delay - 延迟时间
 * @returns {Function}
 */
export function debounce(func, delay = 300) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} delay - 延迟时间
 * @returns {Function}
 */
export function throttle(func, delay = 300) {
    let timer = null;
    return function(...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}
