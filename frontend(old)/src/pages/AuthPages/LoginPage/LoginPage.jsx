import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthLayout from "../../../components/layouts/AuthLayout";
import styles from "./LoginPage.module.scss";
import { useAuth } from "../../../contexts/AuthContext";
import { showErrorMessage, showSuccessMessage } from "../../../utils/toast";
import { DASHBOARD_PAGE } from "../../../routes/urls";

const LoginPage = () => {
  const auth = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    auth.login(username, password)
      .then((res) => {
        showSuccessMessage(res.data?.message || "Logged in successfully");
        history.push(DASHBOARD_PAGE);
      })
      .catch(() => {
        showErrorMessage("Email or password is incorrect!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome Back!</h1>
          <p className={styles.subtitle}>
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                type="email"
                aria-label="Email address"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            <div className={styles.field}>
              <input
                type="password"
                aria-label="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <div className={styles.links}>
            <Link to="/reset-password">Forgot password?</Link>
            <span>
              New here? <Link to="/register">Create an account</Link>
            </span>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
