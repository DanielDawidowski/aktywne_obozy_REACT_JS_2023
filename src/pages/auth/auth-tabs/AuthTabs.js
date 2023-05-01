import { useState } from "react";
import Login from "../login/Login";
import "./AuthTabs.scss";
function AuthTabs() {
  const [type, setType] = useState("Sign In");

  return (
    <div className="auth container center">
      <div className="tabs">
        <ul className="tab-group">
          <li className={`tab ${type === "Sign In" ? "active" : ""}`} onClick={() => setType("Sign In")}>
            <button className="login">Sign In</button>
          </li>
          <li className={`tab ${type === "Sign In" ? "active" : ""}`} onClick={() => setType("Sign Up")}>
            <button className="signup">Sign Up</button>
          </li>
        </ul>
        {type === "Sign In" && (
          <div className="tab-item">
            <div className="tab-item">
              <Login />
            </div>
          </div>
        )}
        {type === "Sign Up" && (
          <div className="tab-item">
            <div className="tab-item">register component</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthTabs;
