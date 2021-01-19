# Tab 导航栏

### 使用 

```js
import { createApp } from 'vue'
import { Tab, Tabs } from 'vant'

const app = createApp()
app.use(Tab)
app.use(Tabs)
```

## 示例

### 默认用法

```html
<van-tabs v-model:active="active">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
</van-tabs>
```
