import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPasswordConfirm } from "../services";
import { toast } from "react-toastify";
import "./styles.css"

const ResetPasswordConfirmPage = (props) => {

  const [submitLoading, setSubmitLoading] = useState(false)
  const [new_password1, setPassword1] = useState("");
  const [new_password2, setPassword2] = useState("");
  const { uid, token } = props.match.params;

  const handleError = (message, duration) => {
    toast.error(message || "Something went wrong", {
      position: "bottom-right",
      autoClose: duration || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitLoading(true)

    resetPasswordConfirm({ token, uid, new_password1, new_password2 })
      .then(res => {
        setSubmitLoading(false)
        toast.success("Password has been reset with the new password.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(error => {
        setSubmitLoading(false)
        const errors = error?.response?.data || {}
        if (errors?.new_password2) {
          handleError("Password didn't match")
        }
        else {
          handleError("You've used an invalid or expired token.")
        }
      })
  }

  return (
    <div className="div-center">
      <div className="loginContent">
        <h3>Reset Password</h3>
        <hr />
        <form onSubmit={submitHandler}>
          <PasswordField
            required
            label="New Password"
            value={new_password1}
            onChange={setPassword1}
          />
          <PasswordField
            required
            label="Confirm Password"
            value={new_password2}
            onChange={setPassword2}
          />
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={submitLoading}>
              {submitLoading ? "Please wait..." : "Reset Password"}
            </button>
          </div>
        </form>
        <hr />
        <Link to="/login">Login Here</Link>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage;



const PasswordField = ({ label, value, onChange, error, ...rest }) => {
  return (
    <div className={"form-group"}>
      <label>
        {label}
      </label>
      <input
        type='password'
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete='new-password'
        {...rest}
      />

      {!!error && (
        <div className="errorMessage">
          {error}
        </div>
      )}

    </div>
  )
}