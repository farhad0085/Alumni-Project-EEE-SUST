import styles from "./styles.module.scss";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function Dashboard() {

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}
