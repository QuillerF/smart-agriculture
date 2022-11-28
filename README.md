## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - 快，且更快！
- 💪 [Typescript](https://www.typescriptlang.org/) - 当然！必不可少
- 🎉 [Element Plus 开箱即用](https://github.com/element-plus/element-plus) - 基于 Vue.js 3 的强大 UI 库
- 🔥 [Axios 配置和封装](https://github.com/axios/axios) - 基于 Promise 的 HTTP 请求库
- 💡 [Vue Router 4](https://router.vuejs.org/zh/) - Vuejs 的官方路由
- 📦 [组件自动按需加载](https://github.com/antfu/unplugin-vue-components) - 自动按需注册组件, 无需 import
- 📥 [API 自动按需加载](https://github.com/antfu/unplugin-auto-import) - 无需手动 import 进行引入
- 🍍 [Pinia 状态管理](https://pinia.esm.dev/) - 你将会喜欢上的 Vue Store
  <!-- - 🎨 [Windi CSS](https://github.com/windicss/windicss) - 下一代实用的原子 css 框架 -->
  <!-- - 😃 [icones](https://github.com/antfu/unplugin-icons) - 强大的图标库，各种图标集为你所用 -->
  <!-- - 🌍 [I18n 国际化开箱即用](./locales) - 想要翻译？是的，都可以！ -->
- 👩‍🎨 [NProgress](https://github.com/rstacruz/nprogress) - 页面加载进度反馈
- 😃 [SVG 支持](https://github.com/jpkleemans/vite-svg-loader) - 支持以 组件形式使用 SVG 图片
<!-- - 📑 [Markdown 支持](https://github.com/antfu/vite-plugin-md) - 随意的在页面中嵌入 Markdown -->
- 🔑 完整支持的代码风格规范和代码提交规范
- ☁️ 支持零配置部署 Netlify

## 已配置

### UI 框架

- [ElementPlus](https://github.com/element-plus/element-plus) - 基于 Vue.js 3 的强大 UI 库

### 插件

- [Vue Router 4](https://router.vuejs.org/zh/) - Vuejs 的官方路由
- [Pinia](https://pinia.esm.dev) - 新一代的 Vue Store 状态管理
- [Axios](https://github.com/axios/axios) - 基于 Promise 的 HTTP 请求库
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) - 自动按需加载组件
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) - 自动按需加载 API
- [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader) - 支持以 组件形式使用 SVG 图片

### 编码风格

- [ESLint](https://eslint.org/) 配置为 [Airbnb Style](https://github.com/airbnb/javascript)

### 开发工具

- [TypeScript](https://www.typescriptlang.org/)
- [Netlify](https://www.netlify.com/) - 零配置的部署
- [VS Code 扩展](./.vscode/extensions.json)
  - [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) - Vue 3 IDE 支持
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示和自动补全
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 代码质量和规则检查
  - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 专注于代码格式化、美化代码
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 编码风格检查

## 现在可以试试!

### GitHub 模板

[使用这个模板创建仓库](https://github.com/nekobc1998923/vitecamp/generate).

### 克隆到本地

```bash
git clone []
cd smart-agriculture
pnpm i
pnpm run dev
```

## 清单

使用此模板时，请尝试按照清单正确更新你自己的信息

- [ ] 在 `LICENSE` 中改变作者名
- [ ] 在 `package.json` 中改变作者名
- [ ] 在 `.env` 中改变标题
- [ ] 在 `public` 目录下改变 favicon
- [ ] 整理 `README `并删除路由

然后，你就可以享受编写代码的乐趣了 :)

## 使用

### 开发

只需要执行以下命令就可以在 http://localhost:8099 中看到

```bash
pnpm run dev
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm run build
```

然后你会看到用于发布的 `dist` 文件夹被生成。
