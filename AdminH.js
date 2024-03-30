import React, { useState } from 'react';
import './HospitalLogin.css';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'
const AdminLogin = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login,setLogin]=useState({})
    const [isAlert,setIsAlert]=useState(false)
    const handleLogin = () => {
        if (email.trim() === '') {
            setIsAlert(true)
            setTimeout(() => {
                setIsAlert(false)
            }, 3000);
            return
        }
        if (password.trim() === '') {
            setIsAlert(true)
            setTimeout(() => {
                setIsAlert(false)
            }, 3000);
            return
        }
        else{
        setLogin({"email":email,"pass": password});
        console.log("login",login)
        console.log('Email:', email); 
        console.log('Password:', password);
        setIsAlert(false)
        navigate('/admin/dashboard')  
        }  
        try{
            axios.post('http://localhost:5000/hospital/login',email,password)
        }
        catch(err){
            console.log('err',err)
        }
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
                    </div>
                    {isAlert && <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="error">Please enter details.</Alert>
                    </Stack>}<br/>
                    <button type="submit" className="btn btn-primary" onClick={()=>handleLogin()}>Login</button><br/><br/>
                    <button type='submit' className='btn btn-primary' onClick={()=>{navigate('/admin/registration')}}>Register</button>
                </form>
            </div>
        </div>
        </>
    );
};
export default AdminLogin;
