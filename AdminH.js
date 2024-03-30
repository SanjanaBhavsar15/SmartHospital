import React, { useState } from 'react';
import './HospitalLogin.css';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login,setLogin]=useState({})
    const handleLogin = (e) => {
        e.preventDefault();
        setLogin({"name":username,"pass": password})
        console.log("login",login)
        console.log('Username:', username);
        console.log('Password:', password);
    };
    let navigate=useNavigate()
    return (
        <>
        <center style={{fontFamily:'cursive'}}><h1>WELCOME TO SMART HOSPITAL</h1></center>
        <center><strong><h3>"HEAL WITH US,LIFE IS PRECIOUS..."</h3></strong></center>
        <div className="hospital-login-container">
            <div className="hospital-login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/admin/dashboard')}}>Login</button><br/><br/>
                    <button type='submit' className='btn btn-primary' onClick={()=>{navigate('/admin/registration')}}>Register</button>
                </form>
            </div>
        </div>
        </>
    );
};
export default AdminLogin;
