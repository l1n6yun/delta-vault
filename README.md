# 三角洲装备库 (Delta Vault)

一个用于查看和查询游戏装备数据的 Web 应用，支持武器、护甲、配件等多种装备分类。

## 功能特性

- 🎯 **多类别装备查询**
  - 武器库
  - 道具库
  - 背包
  - 头盔
  - 护甲
  - 胸挂
  - 弹匣
  - 功能性配件
  - 后握把
  - 护木
  - 瞄具
  - 前握把
  - 枪管
  - 枪口
  - 枪托

- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🎨 **美观的界面** - 科技风设计
- 🔍 **装备详情** - 查看每件装备的详细属性
- 🏷️ **品质标识** - 不同颜色标识装备品质

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **路由**: Vue Router
- **样式**: 原生 CSS

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173/delta-vault/

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
delta-vault/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # Vue 组件
│   │   ├── GradeBadge.vue    # 品质徽章
│   │   ├── ItemCard.vue      # 装备卡片
│   │   ├── ItemDetail.vue    # 装备详情
│   │   ├── NavTabs.vue       # 导航标签
│   │   └── StatBar.vue       # 属性条
│   ├── data/              # 装备数据
│   ├── router/            # 路由配置
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html
├── package.json
└── vite.config.js
```

## 部署

项目配置了 GitHub Actions 自动部署，推送到 `main` 分支后会自动构建并部署到 GitHub Pages。

## 许可证

MIT
