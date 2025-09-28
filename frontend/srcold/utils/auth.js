export const loginUser = (token) => {
  localStorage.setItem(import.meta.env.VITE_APP_AUTH_TOKEN_KEY, token)
}

export const logoutUser = () => {
  localStorage.removeItem(import.meta.env.VITE_APP_AUTH_TOKEN_KEY)
}
