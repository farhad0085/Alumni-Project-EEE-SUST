import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/scss/Auth.module.scss';

const Register = () => {
    return (
        <div className={styles.authContainer}>
            <div className={styles.authFormWrapper}>
                <h2>Create Account</h2>
                <form>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                     <div className={styles.formGroup}>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" required />
                    </div>
                    <button type="submit" className={styles.authBtn}>Register</button>
                </form>
                <div className={styles.authSwitch}>
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
                 <div className={styles.authSwitch}>
                    <p><Link to="/">Back to Home</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
