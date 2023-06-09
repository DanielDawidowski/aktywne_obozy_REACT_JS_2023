import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { authService } from "@service/api/auth/auth.service";
import "@pages/auth/reset-password/ResetPassword.scss";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [searchParams] = useSearchParams();

  const resetPassword = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const body = { password, confirmPassword };
      const response = await authService.resetPassword(searchParams.get("token"), body);
      setPassword("");
      setConfirmPassword("");
      setShowAlert(false);
      setAlertType("alert-success");
      setResponseMessage(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setAlertType("alert-error");
      setShowAlert(true);
      setResponseMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-wrapper">
      <div className="container-wrapper-auth">
        <div className="tabs reset-password-tabs" style={{ height: `${responseMessage ? "400px" : ""}` }}>
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="reset-password-form" onSubmit={resetPassword}>
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      labelText="New Password"
                      placeholder="New Password"
                      handleChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={confirmPassword}
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                      handleChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ border: `${showAlert ? "1px solid #fa9b8a" : ""}` }}
                    />
                  </div>
                  <Button
                    label={`${loading ? "RESET PASSWORD IN PROGRESS..." : "RESET PASSWORD"}`}
                    className="auth-button button"
                    disabled={!password || !confirmPassword}
                  />

                  <Link to={"/app/login"}>
                    <span className="login">
                      <FaArrowLeft className="arrow-left" /> Back to Login
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
