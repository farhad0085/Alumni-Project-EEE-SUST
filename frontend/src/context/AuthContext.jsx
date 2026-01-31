import { createContext, useState, useContext } from 'react';
import { registerUser, loginUser, userInfo, updateProfileInfo, logoutUser } from 'apis/auth';
import { showErrorMessage, showSuccessMessage } from 'utils/toast';
import { AUTH_TOKEN_KEY } from '../utils/constants';


// Create a Context for the authentication state
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  // initially get the state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(AUTH_TOKEN_KEY));
  const [user, setUser] = useState({});

  const register = async (data) => {
    const response = await registerUser(data);
    setIsAuthenticated(true);
    setUser(response.data);
    localStorage.setItem(AUTH_TOKEN_KEY, response.data.key)
  };

  const loadUserInfo = async () => {
    const response = await userInfo();
    setUser(response.data);
  }

  const login = async (username, password) => {
    const response = await loginUser({ username, password });
    setIsAuthenticated(true);
    setUser(response.data);
    localStorage.setItem(AUTH_TOKEN_KEY, response.data.key)
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
        localStorage.removeItem(AUTH_TOKEN_KEY)
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
