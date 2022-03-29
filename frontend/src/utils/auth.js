export const loginUser = (token) => {
  localStorage.setItem("alumniUserToken", token)
}

export const logoutUser = () => {
  localStorage.removeItem("alumniUserToken")
}
