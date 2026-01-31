import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../utils/axios";
import AuthLayout from "../../../components/AuthLayout";
import { FileUploader } from "react-drag-drop-files";
import defaultMale from "../../../assets/images/default-male.jpg";
import { registerUser } from "../services";
import { loginUser } from "../../../utils/auth";
import styles from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([]);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [profilePicture, setProfilePicture] = useState();
  const [preview, setPreview] = useState();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    axios.get("/api/alumni/batches/")
      .then(res => setAvailableSessions(res.data?.results || []))
      .catch(() => toast.error("Failed to load sessions"));
  }, []);

  useEffect(() => {
    if (!profilePicture) return setPreview(undefined);
    const url = URL.createObjectURL(profilePicture);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profilePicture]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("batch", session);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    registerUser(formData)
      .then(res => {
        loginUser(res.data?.key);
        toast.success("Account created");
        history.push("/profile");
      })
      .catch(() => toast.error("Registration failed"))
      .finally(() => setLoading(false));
  };

  return (
    <AuthLayout>
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join and complete your profile</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Avatar */}
            <div className={styles.avatar}>
              {/* <img src={preview || defaultDp} alt="profile" /> */}
              <img src={preview || defaultMale} alt="profile" />
              <FileUploader
                name="profile"
                handleChange={setProfilePicture}
                types={["JPEG", "PNG", "GIF"]}
              />
            </div>

            {/* Full name */}
            <div className={styles.field}>
              <input required onChange={(e) => setFullName(e.target.value)} />
              <label>Full Name</label>
            </div>

            {/* Email */}
            <div className={styles.field}>
              <input type="email" required onChange={(e) => setEmail(e.target.value)} />
              <label>Email Address</label>
            </div>

            {/* Passwords */}
            <div className={styles.grid2}>
              <div className={styles.field}>
                <input
                  type={showPassword1 ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  onChange={(e) => setPassword1(e.target.value)}
                />
                <label>Password</label>
                <button
                  type="button"
                  className={styles.eye}
                  onClick={() => setShowPassword1(v => !v)}
                >
                  👁
                </button>
              </div>

              <div className={styles.field}>
                <input
                  type={showPassword2 ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <label>Confirm Password</label>
                <button
                  type="button"
                  className={styles.eye}
                  onClick={() => setShowPassword2(v => !v)}
                >
                  👁
                </button>
              </div>
            </div>

            {/* Session */}
            <select
              className={styles.select}
              value={session}
              onChange={(e) => setSession(e.target.value)}
              required
            >
              <option value="">Select session</option>
              {availableSessions.map(s => (
                <option key={s.id} value={s.id}>
                  {s.session}
                </option>
              ))}
            </select>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Creating account…" : "Register"}
            </button>

            <div className={styles.links}>
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
