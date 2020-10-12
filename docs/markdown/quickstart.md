# 快速上手

### 安装

> 本组件库内置安装了 vant@next ，且全局注册，所以你的项目无需额外安装 vant

安装分为 2 种情况：

- 使用讯盟 App 作为容器的应用
- 非讯盟 App 的外部容器

#### 1.使用系统模版

无需手动安装，通过 xmmp 初始化的小程序应用模版已内置

#### 2.项目单独安装

```
yarn add xmmp
# npm i xmmp -S
```

## 引入组件库

### 方式一. 按需引入 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```bash
# 安装插件
npm i babel-plugin-import -D
```

```js
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "xmmp",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'xmmp',
      libraryDirectory: 'es',
      style: true
    }, 'xmmp']
  ]
};
```

```js
// 接着你可以在代码中直接引入 Vant 组件
// 插件会自动将代码转化为方式二中的按需引入形式
import { ColorBlock } from 'xmmp';
```

### 方式二. 讯盟App私有协议引入

在项目模版文件`index.html`中引入

```html
<script src="shinemosdk://10086/index.js"></script>
<link rel="stylesheet" href="shinemosdk://10086/index.css">
```

### 方式三. 一次性全量引入

```js
import { createApp } from 'vue'
import Xmmp from 'xmmp/lib/index.js'
import 'xmmp/lib/index.css'

createApp().use(Xmmp).mount('#app')
```
