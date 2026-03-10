import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./LogoutConfirmation.module.scss";
import Layout from "../../../components/layouts/Layout";
import { useAuth } from "../../../contexts/AuthContext";

const LogoutConfirmation = () => {
  const auth = useAuth();
  const [step, setStep] = useState("confirm");
  const history = useHistory();

  const handleLogout = () => {
    setStep("loading");

    setTimeout(() => {
      auth.logout();
      setStep("done");
    }, 800); // tiny delay for UX
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>

          {step === "confirm" && (
            <>
              <div className={styles.icon}>⚠️</div>
              <h2>Confirm Logout</h2>
              <p>Are you sure you want to log out?</p>

              <div className={styles.actions}>
                <button
                  className={styles.dangerBtn}
                  onClick={handleLogout}
                >
                  Yes, Logout
                </button>

                <button
                  className={styles.secondaryBtn}
                  onClick={() => history.goBack()}
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {step === "loading" && (
            <>
              <div className={styles.icon}>⏳</div>
              <h2>Logging you out...</h2>
              <p>Please wait a moment.</p>
            </>
          )}

          {step === "done" && (
            <>
              <div className={styles.icon}>👋</div>
              <h2>You’ve been logged out</h2>
              <p>Thank you for using our system.</p>

              <div className={styles.actions}>
                <Link to="/login" className={styles.primaryBtn}>
                  Login Again
                </Link>
                <Link to="/" className={styles.secondaryBtn}>
                  Go Home
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default LogoutConfirmation;
