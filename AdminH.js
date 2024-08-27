import React, { useState } from "react";
import "./HospitalLogin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    axios
      .post("http://localhost:5000/hospital/login", { email, password })
      .then((res) => {
        if (res.data.data === "incorrect email") {
          alert("incorrect email");
        } else if (res.data.data === "incorrect password") {
          alert("incorrect password");
        } else {
          console.log(res.data);
          let token = res.data.token1;
          localStorage.setItem("token", token);
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  let navigate = useNavigate();
  return (
    <>
      <center style={{ fontFamily: "cursive" }}>
        <h1>WELCOME TO SMART HOSPITAL</h1>
      </center>
      <center>
        <strong>
          <h3>"HEAL WITH US,LIFE IS PRECIOUS..."</h3>
        </strong>
      </center>
      <div className="hospital-login-container">
        <div className="hospital-login-form">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>{" "}
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => handleLogin()}
          >
            Login
          </button>
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              navigate("/admin/registration");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};
export default AdminLogin;
