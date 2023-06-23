import { useState } from "react";
import { motion } from "framer-motion";
import Login from "@pages/auth/login/Login";
import "@pages/auth/auth-tabs/AuthTabs.scss";
import Register from "@pages/auth/register/Register";
import Layout from "@components/layout/Layout";

function AuthTabs() {
  const [type, setType] = useState("Sign In");

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth container">
          <div className="tabs">
            <ul className="tab-group">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
                className={`tab ${type === "Sign In" ? "active" : ""}`}
                onClick={() => setType("Sign In")}
              >
                <button className="login">Sign In</button>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.5 }}
                className={`tab ${type === "Sign Up" ? "active" : ""}`}
                onClick={() => setType("Sign Up")}
              >
                <button className="signup">Sign Up</button>
              </motion.li>
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
                <div className="tab-item">
                  <Register />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default AuthTabs;
