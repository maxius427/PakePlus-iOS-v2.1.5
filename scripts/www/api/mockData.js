/**
 * Mock测试数据
 * 当 USE_MOCK_DATA = true 时使用这些数据
 */

import { delay } from './utils.js';

// ==================== 首页数据 ====================

// 轮播图数据
export const mockBannerList = [
    {
        id: 1,
        title: '新春福利季',
        subtitle: '积分翻倍兑',
        desc: '精选好礼，福利加倍！全场商品积分兑换享受双倍优惠，限时3天！',
        image: '',
        link: '/seckill',
        bgColor: 'linear-gradient(135deg, #E60012 0%, #B5000E 100%)'
    },
    {
        id: 2,
        title: '会员专享日',
        subtitle: '折上折',
        desc: '会员尊享专属优惠，积分兑换更划算',
        image: '',
        link: '/category',
        bgColor: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)'
    },
    {
        id: 3,
        title: '品牌狂欢',
        subtitle: '大牌特惠',
        desc: '知名品牌齐聚，品质保证，价格优惠',
        image: '',
        link: '/products',
        bgColor: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
    }
];

// 快捷入口数据
export const mockQuickActions = [
    {
        id: 1,
        title: '签到',
        desc: '每日+10积分',
        icon: '📅',
        color: 'red',
        link: '/checkin'
    },
    {
        id: 2,
        title: '抽奖',
        desc: '赢好礼',
        icon: '🎁',
        color: 'blue',
        link: '/lottery'
    },
    {
        id: 3,
        title: '兑换',
        desc: '超值换购',
        icon: '🎫',
        color: 'orange',
        link: '/exchange'
    },
    {
        id: 4,
        title: '特惠',
        desc: '限时秒杀',
        icon: '⚡',
        color: 'green',
        link: '/seckill'
    },
    {
        id: 5,
        title: '新手',
        desc: '专享福利',
        icon: '🎊',
        color: 'purple',
        link: '/newbie'
    },
    {
        id: 6,
        title: '推荐',
        desc: '精品推荐',
        icon: '⭐',
        color: 'pink',
        link: '/recommend'
    }
];

// 用户积分数据
export const mockUserPoints = {
    available: 12580,
    total: 50000,
    todayEarned: 50,
    expiring: 580
};

// 分类数据
export const mockCategories = [
    {
        id: 1,
        name: '电子卡券',
        icon: '🎫',
        productCount: 156
    },
    {
        id: 2,
        name: '话费充值',
        icon: '📱',
        productCount: 89
    },
    {
        id: 3,
        name: '加油卡',
        icon: '⛽',
        productCount: 45
    },
    {
        id: 4,
        name: '影音会员',
        icon: '🎬',
        productCount: 67
    },
    {
        id: 5,
        name: '美食餐饮',
        icon: '🍔',
        productCount: 123
    },
    {
        id: 6,
        name: '生活服务',
        icon: '🏠',
        productCount: 234
    }
];

// 商品列表数据
export const mockProducts = [
    {
        id: 1,
        name: '京东E卡 100元面值 全场通用 即充即到',
        image: '🎫',
        price: 980,
        originalPrice: 100,
        tag: '热销',
        tagType: 'hot',
        sales: 5234
    },
    {
        id: 2,
        name: '中石化加油卡 200元 全国通用',
        image: '⛽',
        price: 1960,
        originalPrice: 200,
        tag: '特惠',
        tagType: 'new',
        sales: 3421
    },
    {
        id: 3,
        name: '全国移动 50元话费充值',
        image: '📱',
        price: 490,
        originalPrice: 50,
        tag: '新品',
        tagType: 'new',
        sales: 8932
    },
    {
        id: 4,
        name: '爱奇艺VIP会员年卡 观影无广告',
        image: '🎬',
        price: 1580,
        originalPrice: 198,
        tag: '爆款',
        tagType: 'hot',
        sales: 12543
    },
    {
        id: 5,
        name: '星巴克中杯饮品券',
        image: '☕',
        price: 280,
        originalPrice: 35,
        tag: '热销',
        tagType: 'hot',
        sales: 6789
    },
    {
        id: 6,
        name: 'QQ音乐豪华绿钻年卡 听歌无忧',
        image: '🎧',
        price: 1080,
        originalPrice: 158,
        tag: '',
        tagType: '',
        sales: 4521
    },
    {
        id: 7,
        name: '肯德基 50元电子代金券',
        image: '🍔',
        price: 450,
        originalPrice: 50,
        tag: '特惠',
        tagType: 'new',
        sales: 7823
    },
    {
        id: 8,
        name: '美团外卖红包 20元',
        image: '🥡',
        price: 180,
        originalPrice: 20,
        tag: '',
        tagType: '',
        sales: 15234
    },
    {
        id: 9,
        name: '腾讯视频VIP会员季卡',
        image: '📺',
        price: 480,
        originalPrice: 58,
        tag: '热销',
        tagType: 'hot',
        sales: 9654
    },
    {
        id: 10,
        name: '网易云音乐黑胶会员年卡',
        image: '🎵',
        price: 1180,
        originalPrice: 168,
        tag: '',
        tagType: '',
        sales: 5632
    }
];

// ==================== 分类页数据 ====================

export const mockCategoryList = [
    {
        id: 'holiday',
        name: '节日福利',
        icon: '🎁',
        subcategories: [
            { id: 1, name: '春节礼品', icon: '🧧' },
            { id: 2, name: '中秋礼盒', icon: '🥮' },
            { id: 3, name: '圣诞专区', icon: '🎄' },
            { id: 4, name: '生日礼品', icon: '🎂' },
            { id: 5, name: '情人节', icon: '💝' },
            { id: 6, name: '商务礼品', icon: '🎁' }
        ]
    },
    {
        id: 'card',
        name: '电子卡券',
        icon: '💳',
        subcategories: [
            { id: 1, name: '京东E卡', icon: '🎫' },
            { id: 2, name: '加油卡', icon: '⛽' },
            { id: 3, name: '话费充值', icon: '📱' },
            { id: 4, name: '游戏点卡', icon: '🎮' },
            { id: 5, name: '视频会员', icon: '🎬' },
            { id: 6, name: '音乐会员', icon: '🎵' }
        ]
    },
    {
        id: 'food',
        name: '生鲜水果',
        icon: '🍎',
        subcategories: [
            { id: 1, name: '新鲜水果', icon: '🍎' },
            { id: 2, name: '蔬菜生鲜', icon: '🥬' },
            { id: 3, name: '海鲜水产', icon: '🦐' },
            { id: 4, name: '肉类禽蛋', icon: '🥩' },
            { id: 5, name: '乳品烘焙', icon: '🥛' },
            { id: 6, name: '方便速食', icon: '🍜' }
        ]
    }
];

// ==================== 秒杀页数据 ====================

export const mockSeckillInfo = {
    sessionId: 3,
    status: 'active',  // upcoming 即将开始 | active 进行中 | ended 已结束
    startTime: '14:00',
    endTime: '16:00',
    countdown: {
        hours: 2,
        minutes: 45,
        seconds: 30
    }
};

export const mockSeckillProducts = [
    {
        id: 1,
        name: '京东E卡 100元面值 全场通用 即充即到',
        image: '🎫',
        seckillPrice: 880,
        originalPrice: 100,
        progress: 85,
        stock: 15,
        totalStock: 100
    },
    {
        id: 2,
        name: '中石化加油卡 200元 全国通用',
        image: '⛽',
        seckillPrice: 1760,
        originalPrice: 200,
        progress: 92,
        stock: 8,
        totalStock: 100
    },
    {
        id: 3,
        name: '星巴克中杯饮品券',
        image: '☕',
        seckillPrice: 250,
        originalPrice: 35,
        progress: 65,
        stock: 35,
        totalStock: 100
    },
    {
        id: 4,
        name: '爱奇艺VIP会员年卡 观影无广告',
        image: '🎬',
        seckillPrice: 1380,
        originalPrice: 198,
        progress: 78,
        stock: 22,
        totalStock: 100
    },
    {
        id: 5,
        name: '麦当劳 50元电子代金券',
        image: '🍔',
        seckillPrice: 400,
        originalPrice: 50,
        progress: 55,
        stock: 45,
        totalStock: 100
    },
    {
        id: 6,
        name: 'QQ音乐豪华绿钻年卡 听歌无忧',
        image: '🎧',
        seckillPrice: 980,
        originalPrice: 158,
        progress: 70,
        stock: 30,
        totalStock: 100
    }
];

// ==================== 购物车数据 ====================

export const mockCartList = [
    {
        shopId: 1,
        shopName: '京东自营',
        products: [
            {
                id: 1,
                name: '京东E卡 100元面值 全场通用',
                image: '🎫',
                spec: '面值：100元',
                price: 980,
                quantity: 1,
                checked: true
            },
            {
                id: 2,
                name: '中石化加油卡 200元面值',
                image: '⛽',
                spec: '面值：200元',
                price: 1960,
                quantity: 2,
                checked: true
            }
        ]
    },
    {
        shopId: 2,
        shopName: '星巴克官方旗舰店',
        products: [
            {
                id: 3,
                name: '星巴克中杯饮品券',
                image: '☕',
                spec: '规格：中杯',
                price: 280,
                quantity: 1,
                checked: false
            }
        ]
    }
];

// ==================== 用户数据 ====================

export const mockUserInfo = {
    userId: 10001,
    username: '鑫福利用户',
    avatar: '👤',
    level: '黄金会员',
    levelIcon: '🏅',
    points: {
        available: 12580,
        frozen: 0,
        total: 50000,
        expiring: 580
    },
    coupons: 3
};

export const mockUserOrders = {
    unpaid: 1,      // 待付款
    unshipped: 2,   // 待发货
    shipped: 0,     // 待收货
    unreview: 5     // 待评价
};

// ==================== 模拟API延迟 ====================

// 模拟网络请求延迟（300-800ms随机）
export const simulateDelay = () => {
    const delayTime = Math.random() * 500 + 300;
    return new Promise(resolve => setTimeout(resolve, delayTime));
};

// ==================== 模拟API响应 ====================

export const mockSuccess = (data) => {
    return {
        code: 200,
        message: 'success',
        data: data,
        timestamp: Date.now()
    };
};

export const mockError = (message = '请求失败', code = 500) => {
    return {
        code: code,
        message: message,
        data: null,
        timestamp: Date.now()
    };
};
