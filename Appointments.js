import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './DrawerMenu.css'; 
import './Appointment.css'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Appointments() {
  const [add,setAdd]=useState(false)
  const [appointmentData,setAppointmentData]=useState({
    patientname:'',
    age:'',
    gender:'',
    disease:'',
    description:'',
    date:'',
    time:''
  })
  const [formData, setFormData] = useState({
    hospitalName: '',
    fullname:'',
    DOB:'',
    age:'',
    gender:'',
    contact:'',
    email: '',
    username:'',
    password: '',
    confirmPassword: ''
});
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [addAlert,setAddAlert]=useState(false)
  const [updateAlert,setUpdateAlert]=useState(false)
  const [deleteAlert,setDeleteAlert]=useState(false)
  const [deleteSuccessAlert,setDeleteSuccessAlert]=useState(false)
  const [editProfile,setEditProfile]=useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen,setIsProfileOpen]=useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ProfileDrawer=()=>{
    setIsProfileOpen(!isProfileOpen)
  }
  const handleChange=(e)=>{
    const {name,value}= e.target;
    setAppointmentData(prevState=>({
      ...prevState,
      [name]: value
    }))
  }
  const handleAdd=()=>{
    setAdd(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex !== null) {
      const updatedAppointmentsList = [...appointmentsList];
      updatedAppointmentsList[selectedIndex] = appointmentData;
      setAppointmentsList(updatedAppointmentsList);
      setSelectedIndex(null);
      setUpdateAlert(true)
      setTimeout(() => {
        setUpdateAlert(false)
      }, 3000);
    }
    else {
      setAppointmentsList([...appointmentsList, appointmentData]);
      setAddAlert(true)
      setTimeout(() => {
        setAddAlert(false)
      }, 3000);
    }
    setAdd(false);
    setAppointmentData({
        patientname: '',
        age: '',
        gender: '',
        disease: '',
        description: '',
        date: '',
        time: ''
    });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(formData);
}
  const handleUpdate=(index)=>{
    setAdd(true);
    setAppointmentData(appointmentsList[index]);
    setSelectedIndex(index);
  }
  const handleDelete=(index)=>{
    setSelectedIndex(index);
    setDeleteAlert(true)
  }
  const handleAgree = () => {
    if (selectedIndex !== null) {
      // Create a new array excluding the appointment data to be deleted
      const updatedAppointmentsList = appointmentsList.filter((appointment, index) => index !== selectedIndex);
  
      // Set the state of appointmentsList to the filtered array
      setAppointmentsList(updatedAppointmentsList);
  
      // Reset selectedIndex to null
      setSelectedIndex(null);
  
      // Display a success message or perform any other actions after deletion
      setDeleteSuccessAlert(true);
      setTimeout(() => {
        setDeleteSuccessAlert(false);
      }, 3000);
    }
  
    // Close the delete alert dialog
    setDeleteAlert(false);
  };
  
  const handleDisagree=()=>{
    setDeleteAlert(false)
  }
  const handleEdit=()=>{
    setEditProfile(true)
  }
  const handleClose=()=>{
    setEditProfile(false)
  }
  const handleClose1=()=>{
    setAdd(false)
  }
  const handleChange1=(e)=>{
    const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
  }
  const handleCancel=()=>{
    setEditProfile(false)
    setIsProfileOpen(false)
  }
  const handleCancel1=()=>{
    setAdd(false)
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
                    <li><button className='buttons' onClick={()=>{navigate('/admin/dashboard')}}>Home</button></li>
                    <li><button className='buttons' onClick={()=>{navigate('/admin/patient')}}>Patients</button></li>
                    <li><button className='buttons' onClick={()=>{navigate('/admin/appointment')}}>Appointments</button></li>
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
      <div><button onClick={()=>handleAdd()} className='button'>+ ADD APPOINTMENTS</button></div>
      {add && <Dialog open={add} onClose={handleClose1}>
        <DialogTitle>Appointment</DialogTitle>
        <DialogContent>
          <form>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Patient Name  : </span>
            <input
                style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Patient Name" 
                aria-label="patientname" 
                aria-describedby="addon-wrapping"
                id='patientname'
                name='patientname'
                value={appointmentData.patientname}
                onChange={handleChange} required
                />
          </div><br/>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Age : </span>
            <input 
                style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Age" 
                aria-label="age" 
                aria-describedby="addon-wrapping"
                id='age'
                name='age'
                value={appointmentData.age}
                onChange={handleChange} required
                />
          </div><br/>
          <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Gender : </span>
            <select
            style={{margin:'auto'}} 
            className='form-control'
            id='gender'
            name='gender'
            value={appointmentData.gender}
            onChange={handleChange}
            required
            >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            </select>
          </div><br/>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Disease  : </span>
            <input 
            style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Disease" 
                aria-label="disease" 
                aria-describedby="addon-wrapping"
                id='disease'
                name='disease'
                value={appointmentData.disease}
                onChange={handleChange} required
                />
          </div><br/>
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Description  : </span>
            <input 
            style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Description" 
                aria-label="description" 
                aria-describedby="addon-wrapping"
                id='description'
                name='description'
                value={appointmentData.description}
                onChange={handleChange} required
                />
          </div><br/>
          <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Date  : </span>
            <input 
            style={{margin:'auto'}} 
                type='date'
                className='form-control'
                id='date'
                name='date'
                value={appointmentData.date}
                onChange={handleChange}
                required
            />
          </div><br/>
          <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">Time  : </span>
            <input 
            style={{margin:'auto'}} 
                type='time'
                className='form-control'
                id='time'
                name='time'
                value={appointmentData.time}
                onChange={handleChange}
                required
            />
          </div><br/>
          </form>
        </DialogContent>
        <DialogActions>
        <button className='btn btn-primary' onClick={()=>handleCancel1()}>Cancel</button>
        <button type="submit" onClick={handleSubmit} className='btn btn-primary'>Submit</button><br/><br/>
        </DialogActions>
        </Dialog>}
      {addAlert  &&  <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Appointment Added Successfully!</Alert>
      </Stack>}
      {updateAlert && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Appointment Updated Successfully!</Alert>
      </Stack>}
      {deleteAlert && <Dialog
        open={deleteAlert}
        onClose={()=>handleDisagree()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure,you want to delete the data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={()=>handleDisagree()} className='btn btn-primary'>Disagree</button>
          <button onClick={()=>handleAgree()} className='btn btn-primary' autoFocus>
            Agree
          </button>
        </DialogActions>
      </Dialog>}
      {deleteSuccessAlert && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Appointment Deleted Successfully!</Alert>
      </Stack>}
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
                        value={formData.hospitalName}
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
                        value={formData.DOB}
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
      <div className="appointments-table" style={{margin:'2%'}}>
                <center><h2>Appointments List</h2></center>
                <table className="table" style={{width: '120%'}}>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Disease</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsList.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.patientname}</td>
                                <td>{appointment.age}</td>
                                <td>{appointment.gender}</td>
                                <td>{appointment.disease}</td>
                                <td>{appointment.description}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td><button className='update' onClick={()=>handleUpdate(index)}>Update</button>   <button className='update' onClick={()=>handleDelete(index)}>Delete</button></td>                            </tr>
                        ))}
                    </tbody>
                </table>
      </div>
      </>
  )
}
export default Appointments