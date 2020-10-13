# Card 卡片面板

### 使用

```js
import { Card } from 'xmmp'
```

## 使用示例

### 普通卡片

```html
<template>
  <xm-card :="data">
    <p>hello xmmp!</p>
  </xm-card>
</template>

<script>
export default {
  data () {
    return {
      data: {
          label: '卡片标题',
          item: {
            id: 1
          }
        }
    }
  }
}  
</script>
```

### 带背景操作的卡片

```html
<template>
  <xm-card :="data">
    <p>hello xmmp!</p>
  </xm-card>
</template>

<script>
export default {
  data () {
    return {
      data: {
        label: '卡片标题',
        bg: 'rgba(246,98,59,0.05)',
        footer: [
          {
            label: '操作1',
            icon: 'https://',
            color: '#F6633D',
            action: () => {
            }
          },
          {
            label: '操作2',
            icon: 'https://',
            color: '#3C8FF6',
            action: () => {
            }
          },
          {
            label: '操作3',
            icon: 'https://',
            color: '#3C8FF6',
            action: () => {
            }
          }
        ]
      }
    }
  }
}  
</script>
```

### 加载状态

```html
<template>
  <xm-card :="data">
    <p>hello xmmp!</p>
  </xm-card>
</template>

<script>
export default {
  data () {
    return {
      data: {
          label: '卡片标题',
          item: {
            id: 1
          },
          loading: true
        }
    }
  }
}  
</script>
```

## API

### Props

字段名|说明|类型|默认值
----|----|----|----
label|标题|_string_|-
bg|卡片背景色|_string_|-
showLabelPre|是否显示标题前的色块|_boolean_|true
labelPreBg|色块色值|_string_|`#3b8ff6`
footer|底部操作项|_TypeOpt[]_|[]
optNames|右上角操作项|_string[]_|-
item|卡片数据，用于订阅等数据落库|_CardItem_|-

### CardItem 卡片数据

字段名|说明|类型|是否必须
----|----|----|----
id|卡片ID|_string_|必须

### TypeOpt

字段名|说明|类型|默认值
----|----|----|----
label|操作名称|_string_|-
icon|操作icon|_string_|-
color|名称显示的色值|_string_|-
action|回调|_() => void_|-

