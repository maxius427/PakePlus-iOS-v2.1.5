# 商城API接口系统

## 📁 文件结构

```
api/
├── config.js        # API配置文件（控制测试/生产模式）
├── api.js          # API接口封装（所有接口调用）
├── mockData.js     # Mock测试数据
├── utils.js        # 工具函数
├── example.js      # 使用示例
└── README.md       # 说明文档
```

---

## 🎯 核心功能

### 1. 配置开关控制

在 `config.js` 中通过 `USE_MOCK_DATA` 开关控制：

```javascript
const API_CONFIG = {
    // true = 使用测试数据（mockData.js）
    // false = 调用真实后端API接口
    USE_MOCK_DATA: true,
};
```

**切换到生产环境时：**
1. 将 `USE_MOCK_DATA` 改为 `false`
2. 修改 `ENV` 为 `'production'`
3. 配置正确的 `BASE_URL`

---

## 📖 使用方法

### 方法1：直接在HTML中使用

```html
<script type="module">
    import api from './api/api.js';

    // 获取轮播图
    const res = await api.getBannerList();
    if (res.code === 200) {
        const banners = res.data;
        console.log(banners);
    }
</script>
```

### 方法2：引用example.js中的函数

```html
<script type="module">
    import { loadHomePageData } from './api/example.js';

    // 加载首页所有数据
    loadHomePageData();
</script>
```

---

## 🔧 API接口列表

### 首页相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `getBannerList()` | GET | 获取轮播图列表 |
| `getQuickActions()` | GET | 获取快捷入口 |
| `getUserPoints()` | GET | 获取用户积分 |
| `getCategories()` | GET | 获取分类列表 |
| `getHotProducts(params)` | GET | 获取热销商品 |
| `getNewProducts(params)` | GET | 获取新品商品 |

### 分类相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `getCategoryList()` | GET | 获取分类列表（含子分类） |
| `getCategoryProducts(params)` | GET | 获取分类商品 |

### 秒杀相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `getSeckillInfo()` | GET | 获取秒杀活动信息 |
| `getSeckillProducts(params)` | GET | 获取秒杀商品列表 |

### 购物车相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `getCartList()` | GET | 获取购物车列表 |
| `addToCart(data)` | POST | 添加到购物车 |
| `updateCartQuantity(data)` | PUT | 更新购物车数量 |
| `deleteCartItem(id)` | DELETE | 删除购物车商品 |

### 用户相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `getUserInfo()` | GET | 获取用户信息 |
| `getUserOrders()` | GET | 获取用户订单统计 |

### 搜索相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `searchProducts(params)` | GET | 搜索商品 |
| `getHotKeywords()` | GET | 获取热门搜索词 |

### 订单相关
| 接口 | 方法 | 说明 |
|------|------|------|
| `createOrder(data)` | POST | 创建订单 |
| `getOrderDetail(id)` | GET | 获取订单详情 |
| `cancelOrder(id)` | POST | 取消订单 |

---

## 📝 响应格式

### 成功响应
```javascript
{
    code: 200,
    message: 'success',
    data: {
        // 实际数据
    },
    timestamp: 1234567890
}
```

### 错误响应
```javascript
{
    code: 500,
    message: '错误信息',
    data: null,
    timestamp: 1234567890
}
```

---

## 🔄 切换到真实API

### 步骤1：修改config.js

```javascript
const API_CONFIG = {
    USE_MOCK_DATA: false,  // 改为false

    ENV: 'production',     // 改为production

    BASE_URL: {
        development: 'http://localhost:3000/api',
        production: 'https://your-api-domain.com'  // 修改为你的API域名
    }
};
```

### 步骤2：确保后端API返回格式一致

后端API需要返回以下格式：
```json
{
    "code": 200,
    "message": "success",
    "data": { ... }
}
```

---

## 🎨 工具函数

从 `utils.js` 中导入使用：

```javascript
import { formatPoints, debounce, handleError } from './api/utils.js';

// 格式化积分
console.log(formatPoints(12580)); // "1.3万"

// 防抖函数
const search = debounce((keyword) => {
    api.searchProducts({ keyword });
}, 300);

// 错误处理
try {
    await api.getCartList();
} catch (error) {
    handleError(error, '加载失败');
}
```

---

## 📌 注意事项

1. **模块引入**：确保使用 `type="module"` 引入JS文件
2. **跨域问题**：真实API需要配置CORS或使用代理
3. **Token认证**：在 `config.js` 的 `getRequestConfig()` 中配置
4. **Mock数据**：可在 `mockData.js` 中自定义测试数据

---

## 🚀 快速开始

```html
<!DOCTYPE html>
<html>
<head>
    <title>商城首页</title>
</head>
<body>
    <div id="app"></div>

    <script type="module">
        import api from './api/api.js';

        async function init() {
            // 获取轮播图
            const bannersRes = await api.getBannerList();
            const banners = bannersRes.data;

            // 获取商品列表
            const productsRes = await api.getHotProducts();
            const products = productsRes.data.list;

            // 渲染页面...
            console.log('轮播图:', banners);
            console.log('商品:', products);
        }

        init();
    </script>
</body>
</html>
```

---

## 💡 常见问题

### Q: 为什么API调用失败？
A: 检查以下几点：
1. 确认 `USE_MOCK_DATA` 开关状态
2. 检查网络请求是否被CORS阻止
3. 查看浏览器控制台错误信息

### Q: 如何添加新的API接口？
A: 在 `api.js` 中添加新方法，参考现有接口格式：
```javascript
async newApiMethod(params) {
    if (this._isMock()) {
        await this._delay();
        return mockSuccess(mockData);
    }
    return get(this._getFullPath('/api/path'), params);
}
```

### Q: 如何自定义Mock数据？
A: 在 `mockData.js` 中修改或添加新的数据对象。

---

## 📞 技术支持

如有问题请查看 `example.js` 中的详细示例代码。
