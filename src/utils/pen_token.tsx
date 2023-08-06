const key = 'pen-key'

const getPen = () => {
  return localStorage.getItem(key)
}
const setPen = (token: string) => {
  return localStorage.setItem(key, token)
}
const removePen = () => {
  return localStorage.removeItem(key)
}

export { getPen, setPen, removePen }
