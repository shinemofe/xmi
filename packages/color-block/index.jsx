function renderItem (list, slots) {
  const baseCls = 'flex c-fff ptb10 mb10 br4'
  return list.map((item, i) => {
    const cls = [
      baseCls,
      {
        'flex-grow-1': !item.width,
        'flex-center-between flex-column': !item.icon,
        'justify-between': item.icon
      }
    ]
    const style = {
      background: /http/.test(item.bg) ? `url(${item.bg}) center / 100% 100%` : item.bg,
      marginRight: item.width ? null : (i < list.length - 1 ? '10px' : ''),
      width: item.width,
      height: item.height,
      color: item.color
    }
    if (slots.default) {
      return slots.default({ ...item, i })
    }
    const children = []
    if (item.icon) {
      children.push(renderItemIcon(item))
    } else {
      const _renderNum = (item) => item.num && (
        <span>
          <span style="font-size: 26px">{ item.num }</span>
          <span class="f12">{ item.unit }</span>
        </span>
      )
      children.push(
        <span class={item.num ? 'f14' : 'f18'} style={{ fontSize: item.labelFontSize + 'px' }}>{item.label}</span>
      )
      if (item.reverse) {
        children.unshift(_renderNum(item))
      } else {
        children.push(_renderNum(item))
      }
    }
    return (
      <div class={cls} style={style} key={item.id || i} v-slots={slots}>
        { children }
      </div>
    )
  })
}

function renderItemIcon (item) {
  return (
    <>
      <div class="ml10">
        <p class="f14 mb10">{ item.label }</p>
        <p class="f20">
          <span class="b">{ item.num }</span>
          <span class="f12">{ item.unit }</span>
        </p>
      </div>
      <div class="pr10">
        <img src={ item.icon } style="width:32px" />
      </div>
    </>
  )
}

export default {
  name: 'xm-color-block',

  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  },

  setup (props, context) {
    return () => {
      const flexWrap = !!props.blocks[0].width
      const cls = [
        'flex justify-between mt10',
        {
          'flex-wrap': flexWrap
        }
      ]

      return (
        <div class={cls}>
          {renderItem(props.blocks, context.slots)}
        </div>
      )
    }
  }
}
