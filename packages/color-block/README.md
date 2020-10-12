# ColorBlock 色块

### 使用

```
import { ColorBlock } from 'xmi'
```

## 示例

### 模版代码

```html
<template>
  <p class="c-999">普通示例</p>
  <xm-color-block :blocks="data1" />

  <p class="c-999">固定宽度</p>
  <xm-color-block :blocks="data2" />

  <p class="c-999">带icon</p>
  <xm-color-block :blocks="data3" />

  <p class="c-999">文本与数字位置对调</p>
  <xm-color-block :blocks="data4" />
</template>
```

## 数据结构

### 普通示例

```js
[
  {
    label: '示例色块1',
    value: '100,000',
    unit: '万元',
    bg: '#ff4d00'
  },
  {
    label: '示例色块2',
    value: '200',
    unit: '家',
    bg: '#66cc32'
  }
]
```

### 固定宽度

```js
[
    {
      label: '示例色块1',
      value: '100,000',
      unit: '万元',
      bg: '#ff4d00',
      width: 160
    },
    {
      label: '示例色块2',
      value: '200',
      unit: '家',
      bg: '#66cc32',
      width: 160
    },
    {
      label: '示例色块3',
      value: '200',
      unit: '家',
      bg: '#5A9CE5'
    }
]
```

### 带icon

```js
[
    {
      label: '示例色块1',
      value: '100,000',
      unit: '万元',
      bg: '#ff4d00',
      icon: 'http://file.iming.work/f50505d02fab39a2465a.png'
    },
    {
      label: '示例色块2',
      value: '200',
      unit: '家',
      bg: '#66cc32',
      icon: 'http://file.iming.work/f50505d02fab39a2465a.png'
    }
]
```

### 文本与数字位置对调

```js
[
    {
      label: '示例色块1',
      value: '100,000',
      unit: '万元',
      bg: '#ff4d00',
      reverse: true
    },
    {
      label: '示例色块2',
      value: '200',
      unit: '家',
      bg: '#66cc32',
      reverse: true
    }
]
```

## API

### Props

字段名|说明|类型|默认值
----|----|----|----
blocks|数据|_Array\<BlockItem\>_|[]

### BlockItem 的结构

字段名|说明|类型|默认值
----|----|----|----
label|标题|_string_|-
value|数值|_string_|-
unit|单位|_string_|-
bg|背景，色值或 http 的图片|_string_|-
reverse|标题和数值是否位置对调|_string_|false
width|宽度，传入数字会被转为 _vw_ <br>传入 _px_ 则不做处理|_number \| string_|-
height|高度，传入数字会被转为 _vw_ <br>传入 _px_ 则不做处理|_number \| string_|-
