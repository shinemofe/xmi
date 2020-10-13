// const getUrl = url => `http://baas.uban360.net:21006/smallapp/v1${url}`
// const getUrl = url => `http://10.0.19.100:21006/smallapp/v1${url}`
// const getUrl = url => `http://10.253.101.72:21006/smallapp/v1${url}`
const getUrl = url => `/smallapp/v1${url}`

export const myFetch = (url, method, data = {}) => new Promise((resolve, reject) => {
  window.xm
    .fetch(url, {
      method: method || 'GET',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: true,
      isRelative: true
    })
    .then(res => res.json())
    .then(res => {
      console.log('my fetch receive', res)
      if (res.success || res.retcode === 0) {
        resolve(res.data)
      } else {
        reject(res)
      }
    })
})

let userId = 0
export const httpSub = async (cardId, data, sub = true) => {
  if (userId === 0) {
    const user = await window.xm.getLoginUserInfo()
    userId = user.uid
  }
  await myFetch(
    getUrl('/subscribeManager/save.json'),
    'POST',
    {
      userId,
      cardId,
      subscribe: sub,
      config: data ? JSON.stringify(data) : ''
    }
  ).catch(err => {
    window.xm.showToast({
      message: err.msg
    })
  })
}

export const httpSubList = async () => {
  if (userId === 0) {
    const user = await window.xm.getLoginUserInfo()
    userId = user.uid
  }
  return myFetch(
    getUrl('/subscribeManager/list.json?userId=' + userId),
    'GET'
  )
}

export const httpCheckSub = async (cardId) => {
  if (userId === 0) {
    const user = await window.xm.getLoginUserInfo()
    userId = user.uid
  }
  return myFetch(
    getUrl('/subscribeManager/get.json'),
    'POST',
    {
      userId,
      cardId
    }
  )
}
