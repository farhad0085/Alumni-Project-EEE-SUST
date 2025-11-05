import { Link } from 'react-router-dom';
import styles from '../styles/scss/Auth.module.scss';

const Login = () => {
    return (
        <div className={styles.authContainer}>
            <div className={styles.authFormWrapper}>
                <h2>Login</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className={styles.authBtn}>Login</button>
                </form>
                <div className={styles.authSwitch}>
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                </div>
                 <div className={styles.authSwitch}>
                    <p><Link to="/">Back to Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
