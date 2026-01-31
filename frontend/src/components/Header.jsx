import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from '../styles/scss/Header.module.scss';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);
  const auth = useAuth()

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeNav();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`${styles.header} ${navOpen ? styles.navOpen : ''}`} ref={headerRef}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo} onClick={closeNav}>
            <img src="https://www.sust.edu/public/img/sust_logo_big.png" alt="SUST Logo" className={styles.logoImg} />
            <div className={styles.logoText}>
              <h1>Dept. of EEE</h1>
              <h2>Shahjalal University of Science and Technology</h2>
            </div>
          </Link>
          <nav className={styles.mainNav}>
            <ul className={`${styles.navLinks} ${navOpen ? styles.active : ''}`}>
              <li><NavLink to="/" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Home</NavLink></li>
              <li className={`${styles.dropdown} ${activeDropdown === 'academics' ? styles.active : ''}`}>
                <button
                  className={styles.dropdownToggle}
                  onClick={() => toggleDropdown('academics')}
                  aria-expanded={activeDropdown === 'academics'}
                >
                  Academics
                  <span className={styles.dropdownArrow}>▼</span>
                </button>
                <ul className={styles.dropdownMenu}>
                  <li><NavLink to="/study-materials" onClick={closeNav}>Study Materials</NavLink></li>
                  <li><NavLink to="/labs-projects" onClick={closeNav}>Labs</NavLink></li>
                </ul>
              </li>
              <li><NavLink to="/notice-board" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Notices</NavLink></li>
              <li><NavLink to="/events" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Events</NavLink></li>
              <li><NavLink to="/faculty-staff" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Faculty</NavLink></li>
              <li><NavLink to="/alumni" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Alumni</NavLink></li>
              <li>
                {auth.isAuthenticated ? (
                  <NavLink to="/logout" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Logout</NavLink>
                ) : (
                  <NavLink to="/login" onClick={closeNav} className={({ isActive }) => isActive ? styles.active : ""}>Login</NavLink>
                )}
              </li>
            </ul>
          </nav>
          <button className={styles.mobileNavToggle} aria-label="Toggle navigation" onClick={toggleNav}>
            <span className={styles.hamburger}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
