import { AUTH_TOKEN_KEY } from "./constants"

export const loginUser = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const logoutUser = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}
