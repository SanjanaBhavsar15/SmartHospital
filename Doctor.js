import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";
// import axios from "axios";
function Doctor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const storedEmailid = localStorage.getItem("email");
    const storedPasswords = localStorage.getItem("password");

    if (email === storedEmailid && password === storedPasswords) {
      // If email and password match, perform login action
      console.log("Login successful");
      // Redirect to dashboard or perform any other action
      navigate("/doctor/dashboard");
      alert("Login Successful");
    } else {
      // If email or password is incorrect, show error message
      alert("Incorrect email or password");
    }
    // if (email.trim() === '') {
    //     setIsAlert(true)
    //     setTimeout(() => {
    //         setIsAlert(false)
    //     }, 3000);
    //     return
    // }
    // if (password.trim() === '') {
    //     setIsAlert(true)
    //     setTimeout(() => {
    //         setIsAlert(false)
    //     }, 3000);
    //     return
    // }
    // else{
    // setLogin({"email":email,"pass": password});
    // console.log("login",login)
    // console.log('Email:', email);
    // console.log('Password:', password);
    // setIsAlert(false)
    // try{
    //     axios.post('http://localhost:5000/doctor/login',email,password)
    // }
    // catch(err){
    //     console.log('err',err)
    // }
    // navigation('/doctor/dashboard')
    // }
  };
  let navigate = useNavigate();
  return (
    <div>
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
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary" onClick={()=>handleLogin()}>
              Login
            </button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
