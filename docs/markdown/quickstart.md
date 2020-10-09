### 安装

> 本组件库内置安装了 vant@next ，且全局注册，所以你的项目无需额外安装 vant

安装分为 2 种情况：

- 使用讯盟 App 作为容器的应用
- 非讯盟 App 的外部容器

#### 1.使用系统内置

讯盟 App 内置了小程序组件，可通过私有协议引入：

```html
<link rel="stylesheet" href="shinemosdk://10086/index.css">
<script src="shinemosdk://10086/index.js"></script>
```

通过 xmmp 初始化的小程序应用模版已内置

#### 2.项目单独安装

```
yarn add xmi
# npm i xmi -S
```

使用

```js
import Vue from 'vue'
import xmi from 'xmi'
import 'xmi/index.css'

Vue.use(xmi)
```

另外，组件库也支持按需引入，用法参考 vant。
