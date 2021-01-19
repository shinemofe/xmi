# Table 表格

### 使用

```js
import { Table } from 'xmmp'
```

## 使用示例

### 默认表格

```html
<template>
  <xm-table :="data1" />
</template>

<script>
export default {
  data () {
    return {
      data1: {
          head: ['字段1', '字段2', '字段3', '字段4'],
          body: [
            ['值1', 12, 8, 9167],
            ['值2', 696, 6, 6900]
          ]
        }
    }   
  }
}
</script>
```

### 显示序号

```html
<template>
  <xm-table :="data2" />
</template>

<script>
export default {
  data () {
    return {
      data2: {
          head: ['字段1', '字段2', '字段3', '字段4'],
          body: [
            ['值1', 12, 8, 9167],
            ['值2', 696, 6, 6900]
          ],
          showIndex: true
        }
    }   
  }
}
</script>
```

### 显示操作 - 查看全部

```html
<template>
  <xm-table :="data3" />
</template>

<script>
export default {
  data () {
    return {
      data3: {
         head: ['字段1', '字段2', '字段3', '字段4'],
         body: [
           ['值1', 12, 8, 9167],
           ['值2', 696, 6, 6900]
         ],
         showIndex: true,
         indexText: '自定义',
         size: 1
       }
    }   
  }
}
</script>
```

### 边框表格、自定义列宽

```html
<template>
  <xm-table :="data" />
</template>

<script>
export default {
  data () {
    return {
      data: {
        head: ['单位详细名称', '参保人数', '控股企业数', '控股企业总投资额'],
        body: [
          ['中东长春轨迹客车股份有限公司', 12853, 8, 91678.08],
          ['长春华翔轿车消声器有限责任公司', 696, 6, 69000]
        ],
        columnWidth: [30, 80, 80, 70, 70],
        showIndex: true,
        border: true
      }
    }   
  }
}
</script>
```

### 自定义表头样式

```html
<template>
  <xm-table :="data" />
</template>

<script>
export default {
  data () {
    return {
      data: {
        head: ['单位详细名称', '参保人数', '控股企业数', '控股企业总投资额'],
        body: [
          ['中东长春轨迹客车股份有限公司', 12853, 8, 91678.08],
          ['长春华翔轿车消声器有限责任公司', 696, 6, 69000]
        ],
        columnWidth: [30, 80, 80, 70, 70],
        showIndex: true,
        border: true,
        size: 1,
        headStyle: 'background:#3b8ff6;color:#fff;border-radius:25px 25px 0 0'
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
head|表头|_Array\<string>_|[]
body|表格数据，二维数组|_Array\<[]string>_|[]
showIndex|是否显示排序|_boolean_|false
indexText|排序文本|_string_|序号
border|边框|_boolean_|false
size|显示多少条，查看更多|_number_|-
columnWidth|列宽|_Array\<string \| number>_|`[50, 70, 75, 70, 70]`
headClass|样式|_string_|-
headStyle|样式|_string_|-
bodyClass|样式|_string_|-
bodyStyle|样式|_string_|-

> 关于列宽 `columnWidth` ，每一列宽度会被转化为 `vw` 单位，可以使用 `px` 单位，则不会被转化，例如：['50px', '30px']
