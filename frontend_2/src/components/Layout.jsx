import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import styles from '../styles/scss/Layout.module.scss';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header />

      <main className={styles.main}>
        {!isHomePage && <Breadcrumb />}

        {isHomePage ? (
          <Outlet />
        ) : (
          <div className={styles.pageContent}>
            <div className="container">
              <Outlet />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
