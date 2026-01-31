import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import Routes from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import { showErrorMessage } from './utils/toast';


function App() {
  const { isAuthenticated, loadUserInfo } = useAuth()

  useEffect(() => {
    async function callUserInfo() {
      if (isAuthenticated) {
        try {
          await loadUserInfo();
        } catch (error) {
          showErrorMessage(`Error loading user info: ${error}`)
        }
      }
    }
    callUserInfo()
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <Routes />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
