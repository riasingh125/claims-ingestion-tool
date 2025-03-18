import React, { useState } from "react";
import "../styles/auth.css";

const AuthPage: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const loginFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login success:", data);
      } else {
        console.error("Login error:", data);
      }
    } catch (error) {
      console.error("Login exception:", error);
    }
  };

  const registerFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration success:", data);
      } else {
        console.error("Registration error:", data);
      }
    } catch (error) {
      console.error("Registration exception:", error);
    }
  };

  return (
    <div className="auth-container">
      {/* Login Section */}
      <div className="form-container">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form" onSubmit={loginFormSubmit}>
          <label className="auth-label" htmlFor="loginEmail">
            Email
          </label>
          <input
            className="auth-input"
            type="email"
            id="loginEmail"
            placeholder="Input here!"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <label className="auth-label" htmlFor="loginPassword">
            Password
          </label>
          <input
            className="auth-input"
            type="password"
            id="loginPassword"
            placeholder="Input here!"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Sign In
          </button>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
        </form>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Register Section */}
      <div className="form-container">
        <h2 className="auth-title">Register</h2>
        <form className="auth-form" onSubmit={registerFormSubmit}>
          <label className="auth-label" htmlFor="registerEmail">
            Email
          </label>
          <input
            className="auth-input"
            type="email"
            id="registerEmail"
            placeholder="Input here!"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />

          <label className="auth-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            className="auth-input"
            type="password"
            id="registerPassword"
            placeholder="Input here!"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

          <button className="auth-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
