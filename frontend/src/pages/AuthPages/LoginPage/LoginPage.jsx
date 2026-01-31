import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../../components/AuthLayout";
import { loginUser } from "../services";
import { loginUser as loginUserToApp } from "../../../utils/auth";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleError = (message) => {
    toast.error(message || "Something went wrong", {
      position: "bottom-right",
      autoClose: 5000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    loginUser({ username, password })
      .then((res) => {
        loginUserToApp(res.data?.key);
        toast.success(res.data?.message || "Logged in successfully");
        history.push("/profile");
      })
      .catch(() => {
        handleError("Email or password is incorrect!");
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
                autoComplete="new-password"
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
