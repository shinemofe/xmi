import openPanel from '../utils/card'

export default {
  name: 'xm-card',

  props: {
    label: String,
    bg: String,
    labelPreBg: {
      type: String,
      default: 'rgba(52,120,246,1)'
    },
    showLabelPre: {
      type: Boolean,
      default: true
    },
    showOpt: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Array,
      default: () => []
    },
    optNames: {
      type: Array
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    loading: Boolean
  },

  setup (props, ctx) {
    const handleShowPanel = () => {
      if (props.loading) {
        return
      }
      openPanel(
        {
          label: props.label,
          ...props.item
        },
        props.optNames ? { opts: props.optNames } : null
      )
    }

    return () => (
      <div
        class={['xm-card vw-plr15 vw-ptb20', `xm-card-${props.item.id || 0}`]}
        style={{ background: props.bg || '#fff' }}
      >
        { renderHead(props, handleShowPanel) }
        {
          props.loading
            ? <div class="c-999 tc f12 vw-ptb50">加载中...</div>
            : ctx.slots.default && ctx.slots.default()
        }
        { !!props.footer.length && renderFooter(props.footer) }
      </div>
    )
  }
}

function renderHead ({ showLabelPre, labelPreBg, label, showOpt }, handleShowPanel) {
  return (
    <div class="flex justify-between vw-mb10">
      <p class="vw-f16 b xm-card__title">
        {
          showLabelPre && (
            <span class="xm-card__title--pre" style={{ background: labelPreBg }}/>
          )
        }
        { label }
      </p>
      {
        showOpt && (
          <div class="xm-card__trigger flex-shrink-0" onClick={handleShowPanel}>
            <div class="height-100">{ ['', '', ''].map(() => <div class="xm-card__trigger-one dib-middle"/>) }</div>
          </div>
        )
      }
    </div>
  )
}

function renderFooter (footer) {
  return (
    <div class="flex bg-fff vw-mt10 xm-card__footer">
      {
        footer.map((item, i) => (
          <div
            key={i}
            class="f14 flex-center"
            style={{ width: `${(100 / footer.length).toFixed(2)}%` }}
            onClick={item.action}
          >
            <img src={item.icon} class="vw-mr5" style={{ width: '16px' }} />
            <span style={{ color: item.color }}>{ item.label }</span>
          </div>
        ))
      }
    </div>
  )
}
