import { useState } from "react";
import styles from "./DashboardLayout.module.scss";
import { Link } from 'react-router-dom'
import { HOME_PAGE } from "../../routes/urls";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <Link to={HOME_PAGE} className={styles.logoLink}>
          <div className={styles.logoArea}>
            <img src="https://www.sust.edu/public/img/sust_logo_big.png" alt="logo" className={styles.logo} />
            <span className={`${styles.logoText} ${collapsed ? styles.hidden : ""}`}>Dept. of EEE</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.navItem} data-label="Dashboard">
            <i className="fas fa-home" />
            {!collapsed && <span>Dashboard</span>}
          </div>
          <div className={styles.navItem} data-label="Users">
            <i className="fas fa-users" />
            {!collapsed && <span>Users</span>}
          </div>
          <div className={styles.navItem} data-label="Reports">
            <i className="fas fa-chart-bar" />
            {!collapsed && <span>Reports</span>}
          </div>
          <div className={styles.navItem} data-label="Settings">
            <i className="fas fa-cog" />
            {!collapsed && <span>Settings</span>}
          </div>
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.toggleBtn}
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="fas fa-bars" />
          </button>
          <div className={styles.profile}>Admin</div>
        </header>

        <section className={styles.content}>
          {children}
        </section>
      </div>
    </div>
  );
}
