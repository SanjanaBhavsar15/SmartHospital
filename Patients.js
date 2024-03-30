import { Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './Appointment.css';
function Patients() {
    const [patientDetails,setPatientDetails]=useState({
        id:'',
        patientname:'',
        gender:'',
        dob:'',
        age:'',
        contact:'',
        email:'',
        height:'',
        weight:'',
        disease:'',
        prescription:'',
    })
    const [sequenceNumber, setSequenceNumber] = useState(1);
    const generateId = () => {
        // const id = `PAT-${sequenceNumber}`; // Example format: PAT-1, PAT-2, ...
        // setSequenceNumber(prevSequence => prevSequence + 1); // Increment the sequence number
        // return id;
        const generatedId = sequenceNumber.toString().padStart(3, '0'); // Generate ID with 3 digits
        setSequenceNumber(prevId => prevId + 1); // Increment the next ID
        return generatedId;
    };
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
    const handleChange1=(e)=>{
        const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
    }
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen,setIsProfileOpen]=useState(false)
    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };
    const ProfileDrawer=()=>{
      setIsProfileOpen(!isProfileOpen)
    }
    const [editProfile,setEditProfile]=useState(false)
    const handleEdit=()=>{
        setEditProfile(true)
    }
    const [newPatient,setNewPatient]=useState(false)
    const [patientData,setPatientData]=useState([])
    const [addAlert,setAddAlert]=useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [deleteAlert,setDeleteAlert]=useState(false)
    const handleChange=(e)=>{
       const{name,value}=e.target
       const id=generateId()
       setPatientDetails(prevState=>({
        ...prevState,id:id,
        [name]:value
       }))
    }
    const handleSubmit=(e)=>{
       e.preventDefault()
       if(selectedIndex!==null){
        const updatedPatientData=[...patientData]
        updatedPatientData[selectedIndex]=patientDetails
        setPatientData(updatedPatientData)
        setSelectedIndex(null)
        setUpdateAlert(true)
        setTimeout(() => {
          setUpdateAlert(false)
        }, 3000);
       }
       else{
        setPatientData([...patientData,patientDetails])
        setAddAlert(true)
        setTimeout(() => {
            setAddAlert(false)
        }, 3000);
       }
       setNewPatient(false)
       setPatientDetails({
        id:'',
        patientname:'',
        gender:'',
        dob:'',
        age:'',
        contact:'',
        email:'',
        height:'',
        weight:'',
        disease:'',
        prescription:'',
       })
    }
    const handleAdd=()=>{
        setNewPatient(true)
    }
    const handleClose=()=>{
        setNewPatient(false)
    }
    const [updateAlert,setUpdateAlert]=useState(false)
    const handleUpdate=(id)=>{
        const patientToUpdate = patientData.find(patient => patient.id === id);
        setPatientDetails({
            id: patientToUpdate.id,
            patientname: patientToUpdate.patientname,
            gender: patientToUpdate.gender,
            dob: patientToUpdate.dob,
            age: patientToUpdate.age,
            contact: patientToUpdate.contact,
            email: patientToUpdate.email,
            height: patientToUpdate.height,
            weight: patientToUpdate.weight,
            disease: patientToUpdate.disease,
            prescription: patientToUpdate.prescription
        });
        const indexToUpdate = patientData.findIndex(patient => patient.id === id);
        setSelectedIndex(indexToUpdate);
        setNewPatient(true)
    }
    const [deleteSuccessAlert,setDeleteSuccessAlert]=useState(false)
    const handleDelete=(id)=>{
        setDeleteAlert(true)
        // Set patientDetails to the patient being deleted
        const patientToDelete = patientData.find(patient => patient.id === id);
        setPatientDetails({ ...patientToDelete });
    }
    const handleAgree = () => {
        const updatedPatientData = patientData.filter(patient => patient.id !== patientDetails.id);
        setPatientData(updatedPatientData);
        setDeleteAlert(false);
        setDeleteSuccessAlert(true);
        setTimeout(() => {
          setDeleteSuccessAlert(false);
        }, 3000);
    };    
    const handleDisagree=()=>{
        setDeleteAlert(false)
    }
    const handleCancel=()=>{
        setEditProfile(false)
        setIsProfileOpen(false)
    }
    const handleCancel1=()=>{
        setNewPatient(false)
    }
    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    let navigate=useNavigate()
  return (
    <div >
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
                    <li><button className='buttons' onClick={()=>navigate('/admin/appointment')}>Appointments</button></li>
                    <li><button className='buttons' onClick={()=>{navigate('/admin/laboratory')}}>Laboratory</button></li>
                    <li><button className='buttons' onClick={()=>{navigate('/admin/doctors')}} >Doctors</button></li>
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
        <div><button onClick={()=>handleAdd()} className='button'>+ NEW PATIENT</button></div>
        {newPatient && <Dialog open={newPatient} onClose={handleClose}>
            <DialogTitle>Patient Details</DialogTitle>
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
                        value={patientDetails.patientname}
                        onChange={handleChange} required
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
                        value={patientDetails.gender}
                        onChange={handleChange} required
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </select>
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
                        value={patientDetails.dob}
                        onChange={handleChange} required
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
                        value={patientDetails.age}
                        onChange={handleChange} required
                    />
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
                        value={patientDetails.contact}
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
                        value={patientDetails.email}
                        onChange={handleChange} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Height  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Height" 
                        aria-label="height" 
                        aria-describedby="addon-wrapping"
                        id='height'
                        name='height'
                        value={patientDetails.height}
                        onChange={handleChange} required
                    />
                    </div><br/>               
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Weight  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Weight" 
                        aria-label="weight" 
                        aria-describedby="addon-wrapping"
                        id='weight'
                        name='weight'
                        value={patientDetails.weight}
                        onChange={handleChange} required
                    />
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
                        value={patientDetails.disease}
                        onChange={handleChange} required
                    />
                    </div><br/>
                    <div class="input-group flex-nowrap">
                    <span class="input-group-text" id="addon-wrapping">Prescription  : </span>
                    <input
                        style={{margin:'auto'}} 
                        type="text" 
                        class="form-control" 
                        placeholder="Prescription" 
                        aria-label="prescription" 
                        aria-describedby="addon-wrapping"
                        id='prescription'
                        name='prescription'
                        value={patientDetails.prescription}
                        onChange={handleChange} required
                    />
                    </div><br/>
                </form>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-primary' onClick={()=>handleCancel1()}>Cancel</button>
                    <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                </DialogActions>
        </Dialog>}
        {addAlert  &&  <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Patient Added Successfully!</Alert>
        </Stack>}
        {updateAlert && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Patient Details Updated Successfully!</Alert>
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
      <Alert severity="success">Patient Deleted Successfully!</Alert>
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
                <center><h2>Patients List</h2></center>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Patient Name</th>
                            <th>Gender</th>
                            <th>DOB</th>
                            <th>Age</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Disease</th>
                            <th>Prescription</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientData.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.patientname}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.age}</td>
                                <td>{patient.contact}</td>
                                <td>{patient.email}</td>
                                <td>{patient.height}</td>
                                <td>{patient.weight}</td>
                                <td>{patient.disease}</td>
                                <td>{patient.prescription}</td>
                                <td><button className='btn btn-primary' onClick={()=>handleUpdate(patient.id)}>Update</button>   <button className='btn btn-primary' onClick={()=>handleDelete(patient.id)}>Delete</button></td></tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </div>
  )
}

export default Patients