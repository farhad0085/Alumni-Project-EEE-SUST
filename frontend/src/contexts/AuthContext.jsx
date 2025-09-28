import React, { createContext, useState, useContext } from 'react';
import { registerUser, loginUser, userInfo, updateProfileInfo, logoutUser } from 'apis/auth';
import { showErrorMessage, showSuccessMessage } from 'utils/toast';


// Create a Context for the authentication state
const AuthContext = createContext();
const tokenKey = import.meta.env.VITE_APP_AUTH_TOKEN_KEY

// Create a Provider component
export const AuthProvider = ({ children }) => {
  // initially get the state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(tokenKey));
  const [user, setUser] = useState({});

  const register = async (data) => {
    const response = await registerUser(data);
    setIsAuthenticated(true);
    setUser(response.data);
    localStorage.setItem(tokenKey, response.data.key)
  };

  const loadUserInfo = async () => {
    const response = await userInfo();
    setUser(response.data);
  }

  const login = async (username, password) => {
    const response = await loginUser({ username, password });
    setIsAuthenticated(true);
    setUser(response.data);
    localStorage.setItem(tokenKey, response.data.key)
  };

  const updateProfile = async (data) => {
    try {
      const response = await updateProfileInfo(data);
      setUser(response.data?.data);
      showSuccessMessage("Changes saved successfully!")
    }
    catch (error) {
      throw error
    }

  };

  const logout = () => {
    logoutUser()
    .then(res => {
      setIsAuthenticated(false);
      setUser(null);
      // clear localStorage
      localStorage.removeItem(tokenKey)
    })
    .catch(() => {
      showErrorMessage()
    })

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout, loadUserInfo, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
