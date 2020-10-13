import { httpCheckSub } from './api'
import { menu, menuActions } from './data'

function handleOpt (name, item, thirdAppId, relativeUrl) {
  const handle = (fn) => {
    fn(item, thirdAppId, relativeUrl)
  }
  console.log('回调', name)
  switch (name) {
    case 'xmcard-red': {
      handle(menuActions.createRedlight)
      break
    }
    case 'xmcard-urge': {
      handle(menuActions.createUrge)
      break
    }
    case 'xmcard-call': {
      handle(menuActions.call)
      break
    }
    case 'xmcard-sign': {
      handle(menuActions.createSign)
      break
    }
    case 'xmcard-unsub': {
      handle(menuActions.unsubscribe)
      break
    }
    case 'xmcard-sub': {
      handle(menuActions.subscribe)
      break
    }
    case 'xmcard-warn': {
      handle(menuActions.createWarning)
      break
    }
    case 'xmcard-share': {
      handle(menuActions.share)
      break
    }
    case 'xmcard-data': {
      handle(menuActions.toDataFrom)
      break
    }
    case 'xmcard-fank': {
      handle(menuActions.createFank)
      break
    }
  }
}

export default (item, config = window.xmcardConfig) => {
  if (item.id) {
    const _call = (nameArr) => {
      const items = nameArr.map(x => menu.find(y => y.name === `xmcard-${x}`)).filter(Boolean)
      window.xm.native('showBottomModal', { title: '卡片操作', items }).then(res => {
        handleOpt(res.name, item)
      })
    }
    const opts = config && Array.isArray(config.opts)
      ? config.opts
      : ['red', 'urge', 'fank', 'sign', 'sub', 'share', 'call', 'data']
      // : ['red', 'urge', 'warn', 'sign', 'sub', 'share', 'call', 'data']

    const subIndex = opts.findIndex(x => x === 'sub')
    if (subIndex > -1) {
      httpCheckSub(item.id).then(hasSub => {
        if (hasSub) {
          opts.splice(subIndex, 1, 'unsub')
        }
        _call(opts)
      })
    } else {
      _call(opts)
    }
  } else {
    window.xm.showToast({ message: '卡片 id 不存在' })
  }
}
