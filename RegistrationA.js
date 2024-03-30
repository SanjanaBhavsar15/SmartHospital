import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function RegistrationA() {
    const [data,setData]=useState({
        name:'',
        address:'',
        city:'',
        phoneNumber:'',
        email:'',
        password:'',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(data)
        try{
            axios.post('http://localhost:5000/hospital/register',data)
        }
        catch(err){
            console.log('err',err)
        }
    }
    const handleLogin=()=>{
        navigate('/admin/login')
    }
    let navigate=useNavigate()
  return (
    <div>
        <div className="container" style={{marginTop:"8%"}}>
            <div className="hospital-registration-form">
                <h2>Hospital Registration Form</h2>
                <form onSubmit={handleSubmit}>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Name  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Name" 
                        aria-label="Name" 
                        aria-describedby="addon-wrapping"
                        id='name'
                        name='name'
                        value={data.name}
                        onChange={handleChange} required
                    />
                </div><br/>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Address  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Address" 
                        aria-label="address" 
                        aria-describedby="addon-wrapping"
                        id='address'
                        name='address'
                        value={data.address}
                        onChange={handleChange} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">City  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="City" 
                        aria-label="city" 
                        aria-describedby="addon-wrapping"
                        id='city'
                        name='city'
                        value={data.city}
                        onChange={handleChange} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Phone Number  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Phone Number" 
                        aria-label="contact" 
                        aria-describedby="addon-wrapping"
                        id='phoneNumber'
                        name='phoneNumber'
                        value={data.phoneNumber}
                        onChange={handleChange} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Email  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Email" 
                        aria-label="email" 
                        aria-describedby="addon-wrapping"
                        id='email'
                        name='email'
                        value={data.email}
                        onChange={handleChange} required
                    />
                    </div><br/>              
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Password  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="password" 
                        class="form-control" 
                        placeholder="Password" 
                        aria-label="password" 
                        aria-describedby="addon-wrapping"
                        id='password'
                        name='password'
                        value={data.password}
                        onChange={handleChange} required
                    />
                    </div><br/>
                    <button type="submit" className='btn btn-primary'>Register</button><br/><br/>
                    <button type='submit' className='btn btn-primary' onClick={()=>handleLogin()}>Login</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default RegistrationA