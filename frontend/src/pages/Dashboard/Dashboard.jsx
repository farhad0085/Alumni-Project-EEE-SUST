import { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from 'react-router-dom'
import { HOME_PAGE } from "../../routes/urls";

export default function Dashboard() {
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
          <h1>Dashboard</h1>
          <p>
            Welcome to the Department of EEE Dashboard. This is where you will manage users, view reports, and configure settings. The dashboard is currently under construction.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>Users</h3>
              <p>Manage department users and access levels.</p>
            </div>
            <div className={styles.card}>
              <h3>Reports</h3>
              <p>View academic and administrative reports.</p>
            </div>
            <div className={styles.card}>
              <h3>Settings</h3>
              <p>Configure dashboard preferences and options.</p>
            </div>
            <div className={styles.card}>
              <h3>Notifications</h3>
              <p>Check system updates and alerts.</p>
            </div>
          </div>

          <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#555" }}>
            More features are coming soon. Stay tuned!
          </p>
        </section>
      </div>
    </div>
  );
}
