import React, { useState } from "react";
import "./HospitalLogin.css"; // Import custom CSS for hospital theme
import { useNavigate } from "react-router-dom";
// import axios from "axios";
const HospitalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      // If email and password match, perform login action
      console.log("Login successful");
      // Redirect to dashboard or perform any other action
      navigate("/user/dashboard");
      alert("Login Successful")
    } else {
      // If email or password is incorrect, show error message
      alert("Incorrect email or password");
    }
    // axios
    //   .post("http://localhost:5000/patient/login", {email,password})
    //   .then((res) => {
    //     if (res.data.data === "incorrect email") {
    //       alert("incorrect email");
    //     } else if (res.data.data === "incorrect password") {
    //       alert("incorrect password");
    //     } else {
    //       console.log(res.data);
    //       let token = res.data.token1;
    //       localStorage.setItem("token", token);
    //       navigate("/user/dashboard");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data: ", error);
    //   });
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
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => handleLogin()}
            >
              Login
            </button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
};

export default HospitalLogin;
