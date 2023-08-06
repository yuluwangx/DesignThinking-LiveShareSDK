const key = 'pen-key-scen'

const getPenScen = () => {
  return localStorage.getItem(key)
}
const setPenScen = (token: string) => {
  return localStorage.setItem(key, token)
}
const removePenScen = () => {
  return localStorage.removeItem(key)
}

export { getPenScen, setPenScen, removePenScen }
