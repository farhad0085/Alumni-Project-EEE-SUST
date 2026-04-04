import styles from '../styles/scss/Footer.module.scss';

const Footer = () => (
  <footer className={styles.mainFooter}>
    <div className="container">
      <p style={{ marginBottom: 0 }}>&copy; {new Date().getFullYear()} Department of EEE, SUST. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
