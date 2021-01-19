export const vw = num => /\d/.test(num) ? `${(num / 3.75).toFixed(2)}vw` : undefined
export const unitSize = param => /px/.test(param) ? param : vw(param)
