# 快速上手

### 安装

```
# yarn
yarn add xmmp

# npm
npm i xmmp -S
```

请注意

> 本组件库内置安装了 vant@next ，且全局注册，所以你的项目无需额外安装 vant

### 使用官方模版

模版初始化了所有依赖项，无需额外配置。

第一步，先安装官方脚手架工具 `xmmp-cli`

```
yarn global add xmmp-cli

# npm
npm i xmmp-cli -g
```

第二步，初始化小程序模版

```
xmmp create mp2 <ProjectName>
```


## 引入组件库

### 方式一. 按需引入 

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

### 方式二. 讯盟App私有协议引入(推荐)

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
