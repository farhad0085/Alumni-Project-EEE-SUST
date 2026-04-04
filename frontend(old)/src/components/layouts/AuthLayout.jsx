import Header from '../Header';
import Footer from '../Footer';
import styles from '../../styles/scss/Layout.module.scss';

const AuthLayout = ({ children }) => {

  return (
    <>
      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </>
  );
};

export default AuthLayout;
