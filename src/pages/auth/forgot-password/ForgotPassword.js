import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import { authService } from "@service/api/auth/auth.service";
import "@pages/auth/forgot-password/ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const forgotPassword = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await authService.forgotPassword(email);
      setEmail("");
      setShowAlert(false);
      setAlertType("alert-success");
      setResponseMessage(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setAlertType("alert-error");
      setLoading(false);
      setShowAlert(true);
      setResponseMessage(error?.response?.data?.message);
    }
  };

  return (
    <div className="container-wrapper">
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs" style={{ height: `${responseMessage ? "300px" : ""}` }}>
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="forgot-password-form" onSubmit={forgotPassword}>
                  <div className="form-input-container">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      labelText="Email"
                      placeholder="Enter Email"
                      handleChange={(e) => setEmail(e.target.value)}
                      style={{ border: `${showAlert ? "1px solid #fa9b8a" : ""}` }}
                    />
                  </div>
                  <Button
                    label={`${loading ? "FORGOT PASSWORD IN PROGRESS..." : "FORGOT PASSWORD"}`}
                    className="auth-button button"
                    disabled={!email}
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

export default ForgotPassword;
