import { unitSize } from '../utils/util'
import { ref, computed } from 'vue'

export default {
  name: 'xm-table',

  props: {
    showIndex: Boolean,
    border: Boolean,
    indexText: {
      type: String,
      default: '序号'
    },
    columnWidth: {
      type: Array,
      default: () => [50, 70, 75, 70, 70]
    },
    size: {
      type: [String, Number]
    },
    head: {
      type: Array,
      default: () => []
    },
    body: {
      type: Array,
      default: () => []
    },
    headClass: String,
    headStyle: String,
    bodyClass: String,
    bodyStyle: String
  },

  setup (props) {
    const show = ref(false)
    const bodyData = computed(() => {
      if (!!props.size && !show.value) {
        return props.body.slice(0, Number(props.size))
      }
      return props.body
    })

    return () => (
      <div class="xm-table">
        { renderHead(props) }
        { renderBody(bodyData, props) }
        { !!props.size && renderMore(show) }
      </div>
    )
  }
}

function renderHead ({ head, columnWidth, headClass, headStyle, showIndex, indexText, border }) {
  const _head = head.slice()
  if (showIndex) {
    _head.unshift(indexText)
  }

  return (
    <div
      class={['xm-table__head flex-center-align bg-f7 vw-ptb10 c-666', headClass, { 'xm-table__border': border }]}
      style={headStyle}
    >
      {
        _head.map((item, i) => (
          <div
            class="flex-shrink-0"
            key={i}
            v-html={item}
            style={{ width: unitSize(columnWidth[i]) }}
          />
        ))
      }
    </div>
  )
}

function renderBody (bodyData, { head, columnWidth, bodyClass, bodyStyle, border, showIndex }) {
  const field = head.slice()
  const _bodyItem = (item, i) => {
    const _item = item.slice()
    if (showIndex) {
      field.unshift('')
      _item.unshift(i + 1)
    }
    return field.map((_, j) => (
      <div
        key={j}
        class="vw-ptb10 flex-shrink-0"
        style={{ width: unitSize(columnWidth[j]) }}
        v-html={_item[j]}
      />
    ))
  }

  return (
    <div class={['xm-table__body', bodyClass]} style={bodyStyle}>
      {
        bodyData.value.map((item, i) => (
          <div
            class={['xm-table__body-item flex-center-align', { 'xm-table__border': border }]}
            key={i}
          >
            { _bodyItem(item, i) }
          </div>
        ))
      }
    </div>
  )
}

function renderMore (show) {
  return (
    <div class="vw-ptb10 flex-center" onClick={() => { show.value = !show.value }}>
      <span class="vw-mr5 c-666">{ show.value ? '收起' : '查看全部' }</span>
      <img
        class={['xm-table__icon', { 'xm-table__icon--rotate': show.value }]}
        style={'width: 12px'}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAilBMVEUAAABcZnBaY2tcY2pgYG5cYmlTZmxeY21fZGlfZG5bYGpbZWpaY21eY21dYWtbZG1gZG1eYmtcYWpbY2xfY2xdYmpcYGlcYG1aY2tfY2tdZW1cZGxeYm5dZGxbY2taYmxaY21bYmxbY2xbYmxaYmxbYmxbYWxbYmxbYmtbYm1bYmxbYmxbYmxbYWwAzDYpAAAALnRSTlMAGR8kJScoMTMzNTU2Njc4ODk6Ozs8PT0+Pj9AQUJDrLLu7u/w8PHx8vLz9PX2NSEckwAAAHhJREFUGBnNwQsWQkAAQNHX/5+QkEo1DDOj/W+vOI6DLMC9jNVkRs9ySun5edBxK2JKq1dxp+VqxIbK+m0iGoERO2pbYUJqnk6PNA6J9qm4Sp5osaQ682NnuUOHneUOWFJ59LhKWvtE+/y56FSYkAGBKSIGzReM3RcQUwhzdp/LnAAAAABJRU5ErkJggg=="
        alt=""
      />
    </div>
  )
}
