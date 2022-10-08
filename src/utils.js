export const isJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isInteger = (str) => {
  let n = Math.floor(Number(str))
  return n !== Infinity && String(n) === str && n >= 0
}
