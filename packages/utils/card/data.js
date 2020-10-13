import domtoimage from 'dom-to-image'
import { httpSub } from './api'

const isAndroid = /android/i.test(navigator.userAgent)

function getDate (date, spe = '/') {
  const zero = num => num > 9 ? num : `0${num}`
  const t = date ? new Date(date) : new Date()
  const y = t.getFullYear()
  const mt = t.getMonth() + 1
  const d = t.getDate()
  const h = t.getHours()
  const m = t.getMinutes()
  // const s = t.getSeconds()
  return y + spe + zero(mt) + spe + zero(d) + ' ' + zero(h) + ':' + zero(m)
  // + ':' + zero(s)
}

function paramToString (obj) {
  return Object.keys(obj).map(k => {
    return `${k}=${encodeURIComponent(obj[k])}`
  }).join('&')
}

function nativeScreenshot (domNode) {
  return new Promise((resolve, reject) => {
    window.xm.native('checkmethod', { method: ['screenshot'] }).then(usable => {
      if (usable[0]) {
        domNode.scrollIntoView(true)
        domNode.style.position = 'relative'
        domNode.style.zIndex = '99999999'
        const rect = domNode.getBoundingClientRect()
        setTimeout(() => {
          window.noPageShow = true
          window.xm.native('screenshot', {
            x: parseInt(rect.left) - 5, // 5 是阴影的距离
            y: parseInt(rect.top) + 44 - 5, // 44 是顶部导航的高度
            width: parseInt(rect.width) + 10,
            height: parseInt(rect.height) + 10
          }).then(data => {
            window.noPageShow = false
            domNode.style.position = ''
            domNode.style.zIndex = ''
            resolve(data)
          }).catch(() => {
            window.noPageShow = false
            domNode.style.position = ''
            domNode.style.zIndex = ''
            reject(new Error('screenshot 截图失败'))
          })
        })
      } else {
        console.log('客户端不支持 screenshot，用兜底方案')
        domScreen(domNode).then(data => {
          resolve(data)
        })
      }
    })
  })
}

async function upImg (base64) {
  if (isAndroid) {
    window.xm.showLoading()
  }
  const data = await window.xm.native('uploadimg', { base64 })
  if (isAndroid) {
    window.xm.hideLoading()
  }
  return data
}

async function getImage (cardId) {
  const domNode = document.querySelector(`.xm-card-${cardId}`)
  if (!domNode) {
    return console.warn('xmcard domNode 没有获取到')
  }
  return nativeScreenshot(domNode)
}

function domScreen (domNode, scale = 2) {
  return new Promise((resolve) => {
    domtoimage
      .toBlob(domNode, {
        bgcolor: '#fff',
        width: domNode.clientWidth * scale,
        height: domNode.clientHeight * scale,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left'
        },
        filter: node => {
          if (!node.classList) return true
          const cl = node.classList
          // 过滤三个点
          // 过滤专项的三个操作
          return !cl.contains('xm-card__trigger') &&
            !cl.contains('xm-card__footer') &&
            !cl.contains('sub-unsub-detail')
        }
      })
      .then((blob) => {
        const fileReader = new FileReader()
        fileReader.onload = e => {
          resolve(e.target.result.split(',')[1])
        }
        fileReader.readAsDataURL(blob)
      })
      .catch(() => {
        window.xm.showToast({ message: '截图失败' })
      })
  })
}

const getRoutePath = () => location.hash.split('?')[0].split('/').pop()

export const menuActions = {
  async subscribe (item) {
    const { type, label, bgReal, bg, baseComponentNames, dataArr, componentName } = item
    if (!componentName) {
      console.error('订阅操作出错：当前卡片组件的名称 componentName 未传！')
      return
    }

    const routePath = getRoutePath()
    const { appId, color, name } = await window.xm.native('getsmallappinfo')
    await httpSub(item.id, {
      appName: name,
      appId,
      color,
      type,
      routePath,
      label,
      bgReal,
      bg,
      baseComponentNames,
      dataArr,
      componentName
    })
    window.xm.showToast({
      message: '订阅成功！'
    })
  },

  async unsubscribe (item) {
    await httpSub(item.id, undefined, false)
    window.xm.emit('onChangeList', {
      type: 'decrease',
      cardId: item.id
    })
    window.xm.showToast({
      message: '取消订阅成功！'
    })
  },

  async createRedlight (item, redLightAppId, relativeUrl) {
    const { type, id, label, appName } = item
    const base64 = await getImage(id, 2)
    const data = await upImg(base64)
    const { appId, color, name } = await window.xm.native('getsmallappinfo')
    const routePath = getRoutePath()
    const param = {
      img: data,
      appId,
      color,
      type: type,
      path: routePath,
      label,
      appName: appName || name || document.title
    }
    window.xm.openApp({
      appid: redLightAppId || '70640883',
      relativeUrl: (relativeUrl || 'index.html#/page/red-light/page-1588732321267') + `?${paramToString(param)}`
    })
  },

  async createUrge (item, urgeAppId, relativeUrl) {
    const { type, id } = item
    const routePath = getRoutePath()
    const base64 = await getImage(id)
    const img = await upImg(base64)
    const { name, appId, color } = await window.xm.native('getsmallappinfo')
    await window.xm.setStorage({
      key: 'urge-data',
      value: JSON.stringify({
        targetUrl: img,
        taskParam: {
          jobName: '指标卡片异常确认',
          // firstUsers: [{ uid: '1001', username: '李三', name: '李三', mobile: '18766666666' }],
          firstUsers: [],
          beginTime: getDate(undefined, '-'),
          endTime: getDate(Date.now() + 2 * 24 * 3600 * 1000, '-'),
          secondUsers: [],
          firstDepts: [],
          secondDepts: [],
          content: '',
          attachments: []
        },
        appId,
        color,
        type,
        path: routePath
      }),
      isGlobal: true
    })
    window.xm.openApp({
      appid: urgeAppId || '72385353',
      relativeUrl: relativeUrl || 'index.html#/new-form/5/add/0',
      param: {
        name: encodeURIComponent(name),
        ioc: encodeURIComponent(JSON.stringify({
          appId,
          color,
          type,
          path: routePath
        }))
      }
    })
  },

  async createSign (item) {
    const { id } = item
    const base64 = await getImage(id)
    const img = await upImg(base64)
    await window.xm.native('shareimg', { base64: img })
  },

  call (telNumber) {
    window.xm.makePhoneCall({
      dialNumber: telNumber
    })
  },

  async share () {
    const { appIcon, name, appId } = await window.xm.native('getsmallappinfo')
    await window.xm.native('share', {
      // appIcon,
      // appName: name,
      // relativeUrl: 'index.html' + location.hash
      logo: appIcon,
      title: name,
      relativeUrl: appId === 10000 && !/special|monthly/.test(location.hash) ? '' : 'index.html' + location.hash,
      description: '邀请您使用' + name
    })
  },

  async createWarning (item, warningAppId, relativeUrl) {
    const { id, type } = item
    const routePath = getRoutePath()
    const base64 = await getImage(id, 2)
    const data = await upImg(base64)
    const { appId, color } = await window.xm.native('getsmallappinfo')
    window.xm.openApp({
      appid: warningAppId || '38842751',
      relativeUrl: `${relativeUrl || 'index.html#/page/ioc-warning/page-1590635420653'}?img=${encodeURIComponent(data)}&appId=${appId}&color=${color}&type=${type}&path=${routePath}`
    })
  },

  async createFank (item) {
    const { id, label } = item
    const base64 = await getImage(id, 2)
    const data = await upImg(base64)
    const { name } = await window.xm.native('getsmallappinfo')
    window.xm.openApp({
      appid: '10007',
      relativeUrl: `index.html#/page/fank/page-1600309344816?img=${encodeURIComponent(data)}&name=${encodeURIComponent(name + '-' + label)}`
    })
  },

  // 卡片权属
  toDataFrom (item, appId) {
    const { id } = item
    window.xm.openApp({
      appid: appId || '61727289', // baas 测试环境
      relativeUrl: `index.html#/page/ioc_card_property/page-1593676602721?cardId=${id}&orgId=`
    })
  },

  openMonitor (item, appId) {
    // const { id } = item
    window.xm.openApp({
      appid: appId || '62344381'
    })
  }
}

export const menu = [
  {
    label: '发起红灯',
    id: 3,
    icon: 'https://global.uban360.com/sfs/file?digest=fid24e38ebfa945ee80606d896c7cc050e7&fileType=2',
    base64: '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',
    name: 'xmcard-red'
  },
  {
    label: '发起督办',
    id: 5,
    icon: 'https://global.uban360.com/sfs/file?digest=fida8579e3cc0ee5b0086c854a174cd50e5&fileType=2',
    base64: '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',
    name: 'xmcard-urge'
  },
  {
    label: '一键电联',
    id: 4,
    base64: 'iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAACPVBMVEUAkf4Akv4Ak/4AlP4Elf4HlP4Klf4Nlv4Ql/4Slv4Vl/4XmP4bmP4dmf0emP4gmf0hmv0jm/0kmv0mm/0nnP0om/0qnP0rnf0snP0unf0unf4vnv0vnv4wn/4xnv0xnv4zn/40nv00oP41n/42oP02oP43of44oP45of05of45ov47ov48o/49ov4+o/4/pP5Ao/1Ao/5BpP1BpP5Cpf5DpP1DpP5Dpv5Epf5Fpv5Hpv5Ip/5JqP5Kp/5LqP1LqP5Mqf5NqP1NqP5Nqv9Oqf5Pqf1Pqv9Rqv9Sqv5Sq/9Tq/9TrP9UrP5UrP9WrP5Wrf1Wrf9XrfxZrf1arv1br/1csP1esP1fsP5gsf5isf1jsv5ksv5ns/1ptf1qtv5stvxstv1ut/5vuP1yuf10uf17vfyAv/yBwPyCwfyFwvyIw/yKxPyMxfyMxf2NxfyNxvyPx/yQxvyQyP2SxvyUyPyVyPyVyfyVyf2WyfuXyvyZyvuay/ybyvuby/udzPudzfygzfuhzvyk0Pyl0Pyp0vyq0/yr0vys0/yt1Py11/u32fu42vu62vu72/u93Pu+3Pu/3fvB3fvC3vvD3vvE3/vF4PvH4PvI4frI4vrJ4vrK4/rL4vrM4/rP5frQ5frR5vrT5/rU6PrW6PrX6frY6frZ6vra6/rb6/rc6vre7Pnh7fni7fnj7vnk7vnl7/nm8Prn8Prp8Prq8fnq8frr8fnr8vnw9Pjw9fjx9fny9vn09vn19/n29/n2+Pn3+PmH7ibEAAADKUlEQVRIx8XW+VcSURQH8EFQFDEVBDc0w8BYjbQURoKSNDKMbC/b932zzTbby8o22zcTCirbKMum7G/rLQMOzeA8Op3T+3k+53vve29mLvXrLxf1H+GX0+vXHHufPny5OhgMtK2Mpgv7lwQDgTa/f3k0PXg+iF1ry7JoGpA5AN08f2trS7NvaYQcHoft+bHzehdHSGF/vMxm4DweelGEDDLrIPOjOI+niabpjggR7A+0se15Z3vcNO1yORdESODuRHugTOgaGuvnvyaAq2CZLc0gDpbpcgJXV7dBHH7C7flQey6nsxE6h/2dKAyBMn2wTDeKa6ivr6t12O0hUfgEu6YmtkzoHFZ6RBQ+hYeOykRuBsyzWs6K9/giXibeFhAH3KFRcfgZ5LkRa8BxdqvtHNEFaGfLZJ3V6rhCduU2csoEcRZzD+ElP4V2sxGXabOYTY8I4Z3EKYA44Iykr9U3HzyFWtSe2WQyGkKk7+PWsfZMRqNBf4sU3sZlImfQ66uPkMIf7fDQwbYYawz66uqquT9JvzlnUJlmE3RVFRW6PlI47Lax7QGn0+naGdLvarcF7iZg0JWVFXeRwmEP6yYCV1qsLbn553Mjg0OCX/KL8fZAXIlWo5n0OPmxEyqpdGFUADIr9KhMXVmxtkijVheW3+A+tVMqlWZklIYFfjoDNag9EAdcoaqgQHVwbIdOIpchKQkL/Oa6K3B7MA+4/DzlrOvseV7KxE5CFYX5kOmEeUUakAdZnlKpVEzf2zf46n6XHDMJRVGaMP+P/HYajNOoC6CboFTmKrLl8qwsmRTWiRlXcmaAh5WwPZQHGOsyUXtxxpHc4eGyGpWJnEKRAxyO47qETJo6ujlODp2MdVzIyuRxZQ9qL5fTHo+BpR3iwdFdY+3JUjmK2iwwIB1NtBc/PL6jpghNVhfyFQKnkLymCo5k98pxHMqjBNc24VnuTYcsk38KnFUZSzEEMvvl47mcgdTT47OZqR3VO97YyfSoUjDqsMi8GtuRLeg2iQ+6sX1avtvCkEzITG9nVhKb3Es8Wn+9tn2OAqvStVe/pzmTf3z+4O7Ah380zP8GJZ9FMPkwkM4AAAAASUVORK5CYII=',
    icon: 'https://global.uban360.com/sfs/file?digest=fidc1e2d47440275c9eab36ed34c465a298&fileType=2',
    name: 'xmcard-call'
  },
  {
    label: '圈阅',
    id: 11,
    icon: 'https://global.uban360.com/sfs/file?digest=fid585f7262f60482b6ca277d5c79a33a6e&fileType=2',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAB+FBMVEX39fb39vf39/j3+Pn47Oj47Or48fH49PT57Or57ev64Nr65+T73df739r74t375OD819D82NH9z8X90Mf+ysD+zML+0Mj+0cj+0cn+0sn+0sr/VCf/VCn/VSn/VSr/Vir/Viz/WCv/WC3/WC//WS7/WTD/WjD/WjH/WzH/WzP/XTT/XjT/XjX/Xjf/Xzf/Xzj/YDj/YDn/YTn/YTv/YTz/Yzz/Yz3/ZD3/ZT7/ZUD/akb/a0b/a0f/a0j/bEf/bEj/bEn/bUn/bUv/bkr/bkz/b0z/b03/cU3/cU7/cU//ck//clD/c1D/c1L/dFH/dFP/dFT/dVT/dVX/dlX/dlb/d1b/d1f/eVf/eVj/elj/elr/elv/e1v/e1z/fF3/fV3/f2D/f2L/gWP/gWT/gmT/gmX/g2X/g2b/hGf/hWj/hWn/hmn/hmv/h2r/h2z/iGz/iG3/iW7/iW//im//inD/i2//i3D/jHH/jXL/jnP/j3T/j3X/j3b/kHf/kXn/k3v/lHv/nIb/nYb/oIv/ppH/qZb/qZf/qpf/qpj/q5j/q5n/rJn/rJr/rZv/rZz/rpz/r53/r57/sZ7/sZ//sp//tKL/taX/tqb/t6f/uKj/uKn/uan/uar/uqr/uqv/u6z/vK7/vbD/v7L/wrT/wrX/xbn/xrr/yL2s5fjJAAADG0lEQVRIx82WzYscVRTFT0/1RBRdZDOzEVuiUcS9O3ETZkb8A7IaQVSi2USCKxciuFGQCBKTqEG6XLmKIBJDl7jRDEYcI36BIIqCCE6PGr9QJu/8XLxXHz1T3dM9q1TTm+r+1b333HNvvU6mvV1zuibB/OzewLx4/7W9gHlh3nt1djAvjClemRXMB8bYF87MBuYDMADnT88Cdr8BG9v2O6dmAK8+17NlbMPbp2ZI1c/3bBvAvPXydOD+eUl+4UDABmPO1WQ2nsznVi5Z4qMHhpGz+erJ87tG7A/44fi8JJ84CLaxQnjz5G4R+wXmt/s/tsSllaHBMoSvh1sTI+YFgL99Yl6STx7EdjAhO/LPxIj5IGW3ubxuiU+WNzCE7MjqxFTzAcEYw+bKuiXWlzZGuHYwH2CRyOHSZUtcXtpocq1gPsDYGLA1XPrMEp8ubzY4dbIWPU35ARO44+yWpM7+XzUJHOFMAHPn61vb/7Yj1X5BHU3JaxuHvvAug9wvSj1tFJJGfPlQmAz2CwdSPByiRiZk924vqbt9TyQ/V0Uaa6QPbWB/EHU0oIoLauFGwH5Rzh2pjTaW5lq4JljnaSUOsLttXAPsR85WwuOqcdbK1WDK05Q2lQ2B7LFVTQLfuFBXlvQM4upYrgI/p/JXaTZ5fLwK3PdTXIElZ8KkPGvw+giotBgWgc54rpyOlz6wbIWkZ4BGnguSSF9J6L+/qoi/JCitXtyMd3PzvsHHni7B7nc1Z7GtD837xriu8YZ/q4dGkYK7dX2VD8EWUI/Vi1F/yuENdJu6ABBtKNsNVX+sCoud8AhnQmqUZdNQlQevNOaQQOfo6m6v+K4k3XjFFiEmE5iGizWetgmRM9NxMeL3qPS2erfd+vgUXAR/DjJ47q6FA498OOVZrpNJ+w453HT3wrObjRW48OgfsXNCkBpSXvc9HCNed0/v6N/nmo9bPHzxXVtObUj2rX6+PaX65zOj+3Xx8NpFAhBIdil9NvG4snjslrW4hwMQzyo7uR3g4vHeGs0lUp4bxsxjxT0FCKR2WeJ14vfW9+O1epj/H4gSqzD7X3RfAAAAAElFTkSuQmCC',
    name: 'xmcard-sign'
  },
  {
    label: '取消订阅',
    id: 0,
    icon: 'https://global.uban360.com/sfs/file?digest=fidd9d8f6cad5c7d8395cb0adc31ad453bb&fileType=2',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABoVBMVEUAAAD/pQD/pQD/qQD/tR7/pQD/tAD/swD/rgD/rgD/rQD/vyH/sQD/rQD/pgD/tgD/pgD/txf/vBv/pwD/qAD/vSz/ogD/pQD/uAL/vij/pQD/qwD/vCX/tgH/pwD/uRD/uQb/rAD/vQ7/tgr/vgD/tAb/uQb/twb/1kL/rQD/vin/vSz/x1H/tQD/xk3/vSn/wkP/vCX/pAD/vCX/vSb/tQD/tgD/tQD/twD/ogD/pwD/rAD/wkD/vzf/pgD/vzL/tQD/vSD/rQD/pAD/vB3/oQD/wkD/vBr/vjH/rwD/tQD/wTj/swD/twD/wDb/vi//tQD/w0n/pwD/wTv/ogD/uhn/sAD/ugz/rQD/rwD/rwD/tAD/tQD/vCX/sQD/wDT/tQD/pAD/vSf/sgD/tAD/rQD/pwD/rAD/rwD/tgD/pQD/sQD/twL/vCn/qQD/uhn/twr/ogD/uyH/uA7/vSz/vCX/uyP/uBb/uBL/vjD/uhz/vjT/ux7/wDz/wT//pAD/w0j/wkb/vzf/oQD/xlP/xU//xEv/vzj/wkP/wDr/wUIGhhdnAAAAY3RSTlMA/jInC7GGXi4jHwb60pwzLBUJ/Pnv7ujm5ePavaijTT84NisnGhIPA/z79PLr6unj4N7b19bJv7WsqqihlXx0amFYUUL8+/r39fHf39zXzcvKxMK9s7CmpKKglpKQjYN5c2rGfFOAAAAC5klEQVRIx83WZ1fiQBQGYAIIKIq99+7ade1r1+29926BaAQRkN42IMuv3juTEJiUOUv84v0I5+G9N5O5B8MNLaPxGrii4hrBDGPUH5xgdUfbGJZlbDrxKgulM7qOQbhRX/Qa0KOjozU91sQI+GxQB+7BFvAdHcGNoj2+ZdIRLNrj47KjKxslW350D9gCPvxQnq1qwlSwh9WVZWFHiYX6WH6wZJ1lRTtI63R++k9oNu5uNkk9i7jaYu0fpamGur1Nx6tW8XyLuVAnJ7+hpl50W6y1ZlLZTXs/HW86mPNEgmVJCyXZAyiX6/S0bQn9hh13uTp/9w/UOZRkYV5UUi7Gor0IXoajAf94exfM0d+CqMwqc4vW7QbLcRO9eM21UCyZ6/J4LiDX6+d8E31AsZYsW+xZNdeDewbb3CctnFbCnmk8Kxey7qg3AHYAmKTpPRfshThvcy1x9TvIQ9Kwl2ADHDdjk93fDkUuFGlh3jDKnRlU3IV52byygdH5usPegN/XPqRykzopz1ns2Qu57ao3bLiTtESuZOeqDKpVX6PZswf37Pdzt4eVrqhV7Cnk4nkpFmqkRsUCxj3DGS3UGyg12ql2RnAZoujlmBsxUAui5blghVzfgoFeD52yQxLmxdb3gG5NityiDYUig1S8q7CeILJ+bCM7VGxRPOeC9YUi6auvVPwOWfnC8nJC7lWsi4oX5ed7KfaMcmOxxzQ7Vk1YTxCsV+w5/TcWv2enYJt8UZbkgo3nBijYSpwvLFnIFeZNY5v6RcHfyJ7vd78fxz1HYN54PpdKblDwSunSca/Ayhh6GxLnzedTqeRrCn5Scr7L4oYc6IrgeSE3mZ3Vtg0H0nJf6it+vP8cNY1sJmPWxP2F5b7YS37R+ywHPWezGX5fE28LuU+tyq92ZpHN8Fua+DPCbdtjqu/P1nSG5/l1Tbx84Jr6ofkS2b9P8vxLTdz2yGKm/l3ZmJzWfNhfYEfRq369wXAT6h8t5ToOi5nF0gAAAABJRU5ErkJggg==',
    name: 'xmcard-unsub'
  },
  {
    label: '订阅',
    id: 1,
    icon: 'https://global.uban360.com/sfs/file?digest=fide1e383233de32faf8981e03f9330782d&fileType=2',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAdVBMVEUAAACVnKWWn6iVm6WYnqeWnaiip6qVm6WVnKWVnaaqqrOwxMSVnKWVnKWUm6WUnKWUm6WUnKWUnKWVm6WVnKWUnKWWnqeWnKmXnaeVnKWTnKWUm6STnKWVnKWUnKWWnKaVnKaaoKugoK2TnKWTnKWVnqeUm6QZwQAVAAAAJnRSTlMA+x/oMCkN8K1PCATd1dDJp6GalYR1Niwl4+DZvLJ6XFUZFMFqQkeuUjIAAAGJSURBVEjHzdbXsoIwFAVQQ2/Se7ed///Eyzg4gVzZQnxxP4rLnTCJc04/Gk37AnfdF8VE8tUWkSVrC5pSSOKQpoRyVqdndNli6eqS5pQSOHrhSKKYvTArZYqlqxXGMVMO4pgWiSWKcTUuxtW4WLo6ISHJTmhoY89EzPpRM5ByCjuLbyptRr3FmV04a+Xqdpa0Fe1M1SaZrbvPVVoeI4kwz5r2kZskFTOfqrHGdoqmHreqdppTqIdtsfi7Ug9afXX1qyO2KoXTXO+3tfLvLnh7rTdZMZdmn20u3Cz0eY89c7vK1f9s/auosMaWxwiwDeCdNs5wv5NFCWDxCcdE2MRWIRgFYhtjG+Ie4x7iEOMQYh9jH1mXYcxcPADh6ACPn/AIcCqsMkmEfaRw2FwmUqZTExEPHkWb5ffm/enLX2y2rcMX2eb847zlG3HAfD0neKwfPObLhubvYb629ptDP1/0Ab9sb3Dfnp/Bw6+7I1LvnIr8rhJ1m7g2MwcOHplZbz5LjY/TTuqcfiF/HsXK71EcuTUAAAAASUVORK5CYII=',
    name: 'xmcard-sub'
  },
  {
    label: '预警',
    icon: 'https://global.uban360.com/sfs/file?digest=fid3880f3c8cd9f2147d4f41fa21e91460c&fileType=2',
    id: 9,
    base64: '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',
    name: 'xmcard-warn'
  },
  {
    label: '分享',
    id: 6,
    icon: 'https://global.uban360.com/sfs/file?digest=fidf1a8cc60632b5aefdd6e19c629972a11&fileType=2',
    base64: 'iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAACDVBMVEUAuI4AuI8AuY8AuZAAupEAupIAu5IAu5MAvJQAvJUAvZUAvZYAvZcAvpcAvpgAv5gAv5kAv5oAwJoAwJsAwJwAwZsAwZwAwZ0Awp0Awp4Awp8Aw54Aw58Aw6AAxKAAxKEAxKMAxaEAxaIIxqMUx6YWxqYbxqYex6cix6UkyKYuyKowyao0yqs1yas3yqw5yqw7y6w8zK49y61BzK5Cy65Eza9IzbBKzbBKzbFMzbFMzrFQzrJSzrJU0LRW0LRX0bVX0bZY0LVf0rdi07lj0rhk07ll07po1Ltw1L1w1L5x1b501r911sB82MN92MJ92MN/2MOA2MOD2cWE2sWF2saI2seI28eL28iM28iM3MmN3MmO3cqR3cuS3cuV3syW3s6Z38+a38+a39Cb39Cb4M+c4NGf4dCf4dKi4dOj4tOk4tSl49Wm49Wo49Wq5Net5Nev5div5dmw5dmw5tmx5tm25tu25ty259y359y45ty559y5592+6N+/6d/A6eDC6eHC6uHD6uHF6uLG6+PH6+PI6+TJ7OTM7OXP7efQ7ujS7ujT7ujT7+jU7+nV7+rW7+rZ8Ova8Ova8Ozc8ezc8e3e8u7g8u7h8u/h8+/i8u/i8+/j8/Dn8/Hn8/Lp9PPq9PPr9fTs9fTu9fTu9fXv9fXw9vXw9vbx9vby9vby9vfz9/f19/j29/j2+Pj3+PmrB0X1AAAC2UlEQVRIx53X91/TQBQA8NQW0jamKanE1EZqi4h7oCDWPXBQFUUttopYceBWxImzooiodS+UilZF0fyN5i6XXcyF93O+n/de7t1LS4gTDML2iWLvoZZUV94pLHbUxmPRqqqqNf2O4NtVcegEQZh+3AEs1MfjUegikXD4FD7cLpcJXITnhTwuHNBcmOd5rgkXpmOoTOA4juOHMWGj/FoUVxm6ggnnqO3Jjj2BCWcKqE7IQiH2KCZcgtrjuUrJsSzbjQl3gNMDZcJ0bDD4HhPeBY7TXAP2AKzlUT4WOOYeNnxVzSntBRlmt4MhTyInpWOax/BhSm2PiZ1xcK1SIN3+A+vqVmy9VHRwkWG+TuerIwXK7HS+c/7vxofAsUecbzk7Z4R/CoW/yIFTyOLt1cH25dFIRKjbmRPFfeDwslgLOb9F3mRgNuuT9k6BZ2PqRkJDlsX6BLQZNguYsQ6sb8dprUzkgi04cDAqmK96MHAZA27S2lPuQiBQ+9sW9hvbkx1Nn7OFbSgdWJywTMlJcL0tXKyegpwO5qOoilEb+EMwtwed3/fCBr4pxSi/35szPdq3K7FwdesjFb62OFpiPq/3loE9nE3IsWgAwS+G9mhYJnDex3rX5SaUIC+il1OjOwXUHnBkY+v5p8pG7HYRWrhvyzCJhoVR2oOMJMvLPB5vzYbMjXfiJ4rQR0URwushyJgAqhM4L3AS9Ljdk1wuaiphjAyEY/OCujKVfPRKATDgCEtUy7N6FZWpT1eeFsWR+8e2LZhMlIqv8rVqDujbg2XO/6W8zw/XMkst8JkMRxtgOgoxyc0Y0p/FAwvMow3wfbMuneTmGpz40QKL6rI6KWhlUnvNd3Gayc3Srcdvh5f5QDoynhqyTPQeE2w3LuThXE/Pnc+lrsIIbXBTfuL80IVx061zZX0iNhQvkKrz9YoOoPhEOczEc9ERlL4S6Y2JpoMvsX/MT/hfwDjxD6vuyB4ynsyBAAAAAElFTkSuQmCC',
    name: 'xmcard-share'
  },
  {
    label: '卡片属性',
    id: 12,
    icon: 'https://global.uban360.com/sfs/file?digest=fid4f04451d4b88278a826e155df3fb016e&fileType=2',
    base64: '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',
    name: 'xmcard-data'
  },
  {
    label: '反馈',
    id: 13,
    icon: 'https://global.uban360.com/sfs/file?digest=fidd51a25b08a5204a00c6714666941a3db&fileType=2',
    base64: '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',
    name: 'xmcard-fank'
  }
]
