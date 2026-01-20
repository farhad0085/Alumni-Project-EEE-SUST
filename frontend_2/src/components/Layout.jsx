import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/scss/Layout.module.scss';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header />

      <main className={styles.main}>
        {isHomePage ? (
          children
        ) : (
          <div className={styles.pageContent}>
            <div className="container">
              {children}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
