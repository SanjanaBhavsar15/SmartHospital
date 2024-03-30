import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './DrawerMenu.css'; 
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const DrawerMenu = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen,setIsProfileOpen]=useState(false)
    const [editProfile,setEditProfile]=useState(false)
    const [formData, setFormData] = useState({
      hospitalname: '',
      fullname:'',
      dob:'',
      age:'',
      gender:'',
      contact:'',
      email: '',
      username:'',
      password: '',
      confirmPassword: ''
  });
    const handleChange1 = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const ProfileDrawer=()=>{
      setIsProfileOpen(!isProfileOpen)
    }
    const handleEdit=()=>{
      setEditProfile(true)
    }
    const handleClose=()=>{
      setEditProfile(false)
    }
    const handleCancel=()=>{
      setEditProfile(false)
      setIsProfileOpen(false)
    }
    const handleSubmit1=(e)=>{
      e.preventDefault();
      console.log(formData);
    }
    let navigate=useNavigate()
    return (
        <>
          <div className="drawer-menu-container">
            <button className="drawer-toggle-btn" onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
                <button className="drawer-toggle-btn" onClick={toggleDrawer}>
                  <FontAwesomeIcon icon={faBars} style={{color:'white'}}/>
                </button>
                <ul className="drawer-menu">
                    <li><button className='buttons'>Home</button></li>
                    <li><button className='buttons' onClick={()=>{navigate('/admin/patient')}}>Patients</button></li>
                    <li><button onClick={()=>{navigate('/admin/appointment')}} className='buttons'>Appointments</button></li>
                    <li><button className='buttons' onClick={()=>{navigate('/admin/laboratory')}}>Laboratory</button></li>
                    <li><button className='buttons'onClick={()=>{navigate('/admin/doctors')}}>Doctors</button></li>
                </ul>
            </div>
            <div className="main-content">
            </div>
            <div className='drawer-menu-container'>
              <button className='profile-btn-container' onClick={ProfileDrawer}>
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
              <div className={`drawers ${isProfileOpen?'open':''}`}>
              <button className='profile-btn-container' onClick={ProfileDrawer}>
                <FontAwesomeIcon icon={faUserCircle} style={{color:'white',paddingLeft:'200px'}} />
              </button>
              <ul className='drawers-menu'>
                <li><button className='profile-button' onClick={()=>handleEdit()}>Edit Profile</button></li><br></br>
                <li><button className='profile-button' onClick={()=>navigate('/admin/login')}>Logout</button></li>
              </ul>
              </div>
            </div>
          </div>
          {editProfile &&  <Dialog
        open={editProfile}
        onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
        <form>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Hospital Name  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Hospital Name" 
                        aria-label="hospitalname" 
                        aria-describedby="addon-wrapping"
                        id='hospitalname'
                        name='hospitalname'
                        value={formData.hospitalname}
                        onChange={handleChange1} required
                    />
                </div><br/>
                <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Full Name  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Full Name" 
                        aria-label="fullname" 
                        aria-describedby="addon-wrapping"
                        id='fullname'
                        name='fullname'
                        value={formData.fullname}
                        onChange={handleChange1} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">DOB  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="date" 
                        class="form-control" 
                        placeholder="DOB" 
                        aria-label="dob" 
                        aria-describedby="addon-wrapping"
                        id='dob'
                        name='dob'
                        value={formData.dob}
                        onChange={handleChange1} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Age  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Age" 
                        aria-label="age" 
                        aria-describedby="addon-wrapping"
                        id='age'
                        name='age'
                        value={formData.age}
                        onChange={handleChange1} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Gender  : </span>
                    <select
                        style={{margin:'auto'}} 
                        className='form-control' 
                        aria-label="gender" 
                        aria-describedby="addon-wrapping"
                        id='gender'
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange1} required
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </select>
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Contact  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Contact" 
                        aria-label="contact" 
                        aria-describedby="addon-wrapping"
                        id='contact'
                        name='contact'
                        value={formData.contact}
                        onChange={handleChange1} required
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
                        value={formData.email}
                        onChange={handleChange1} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Username  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Username" 
                        aria-label="username" 
                        aria-describedby="addon-wrapping"
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange1} required
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
                        value={formData.password}
                        onChange={handleChange1} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Confirm Password  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="password" 
                        class="form-control" 
                        placeholder="Confirm Password" 
                        aria-label="password" 
                        aria-describedby="addon-wrapping"
                        id='confirmpassword'
                        name='confirmpassword'
                        value={formData.confirmPassword}
                        onChange={handleChange1} required
                    />
                    </div><br/>                
                  </form>
        </DialogContent>
        <DialogActions>
          <button className='button' onClick={()=>handleCancel()}>Cancel</button>
          <button className='button' onClick={handleSubmit1} type="submit">Submit</button>
        </DialogActions>
      </Dialog>}
        </>
    );
};
export default DrawerMenu;