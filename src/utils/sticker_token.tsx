const key = 'sticker-key'

const getSticker = () => {
  return localStorage.getItem(key)
}
const setSticker = (token: string) => {
  return localStorage.setItem(key, token)
}
const removeSticker = () => {
  return localStorage.removeItem(key)
}

export { getSticker, setSticker, removeSticker }
