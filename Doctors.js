import React,{useState ,useEffect} from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle ,DialogContentText} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'
function Doctors() {
    const [doctorData,setDoctorData]=useState({
        name:'',
        contact:'',
        email:'',
        speciality:'',
        availability:'',
        password:'',
    })
    const [doctorList,setDoctorList]=useState([])
    const handleChange=(e)=>{
        const{name,value}=e.target
        setDoctorData(prevState=>({
            ...prevState,
            [name]: value
          }))
    }
    const [addAlert,setAddAlert]=useState(false)
    const [add,setAdd]=useState(false)
    const handleAdd=()=>{
        setAdd(true)
    }
    const handleCancel1=()=>{
        setAdd(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedIndex !== null) {
            const updatedDoctorData = [...doctorList];
            updatedDoctorData[selectedIndex] = doctorData;
            try {
                await axios.post('http://localhost:5000/doctor/update', doctorData);
                console.log('Data updated successfully');
                setDoctorList(updatedDoctorData);
                setUpdateAlert(true);
                setTimeout(() => {
                    setUpdateAlert(false);
                }, 3000);
            } catch (error) {
                console.error('Error updating doctor:', error);
            }
        } else {
            try {
                await axios.post('http://localhost:5000/doctor/create', doctorData);
                console.log("data sent successfully");
                localStorage.setItem("email",doctorData.email)
                localStorage.setItem("password",doctorData.password)
                setDoctorList([...doctorList, doctorData]);
                setAddAlert(true);
                setTimeout(() => {
                    setAddAlert(false);
                }, 3000);
            } catch (err) {
                console.log('err', err);
            }
        }
        handleCancel1();
    }

    const [selectedIndex,setSelectedIndex]=useState(null)
    const [updateAlert,setUpdateAlert]=useState(false)
    const handleUpdate=(index)=>{
        setAdd(true)
        setSelectedIndex(index)
        setDoctorData({
            name:doctorList[index].name,
            contact:doctorList[index].contact,
            email:doctorList[index].email,
            speciality:doctorList[index].speciality,
            availability:doctorList[index].availability
        })
    }
    const [deleteSuccessAlert,setDeleteSuccessAlert]=useState(false)
    const [deleteAlert,setDeleteAlert]=useState(false)
    const handleDelete=(index)=>{
        setSelectedIndex(index)
        setDeleteAlert(true)
    }
    const handleAgree = async (_id) => {
        console.log("clicked")
        if (selectedIndex!== null) {
          try {
            await axios.delete(`http://localhost:5000/doctor/delete/${_id}`);
            console.log('Data deleted successfully');
            const dataToDelete = doctorList.filter((doctor, index) => index!== selectedIndex);
            setDoctorList(dataToDelete);
            setSelectedIndex(null);
            setDeleteAlert(false);
            setDeleteSuccessAlert(true);
            setTimeout(() => {
              setDeleteSuccessAlert(false);
            }, 3000);
          } catch (error) {
            console.error('Error deleting doctor:', error);
          }
        }
      }

    const handleDisagree=()=>{
        setDeleteAlert(false)
    }
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
    });
    const handleChange1=(e)=>{
        const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
    }
    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    const handleCancel=()=>{
        setEditProfile(false)
        setIsProfileOpen(false)
    }
    const [editProfile,setEditProfile]=useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen,setIsProfileOpen]=useState(false)
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
    let navigate=useNavigate()
    useEffect(() => {
        // Fetch appointments data when component mounts
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/doctor/read');
            console.log("aaa----,", response.data)
            setDoctorList(response.data.data);
          } catch (error) {
            console.error('Error fetching appointments:', error);
          }
        };
    
        fetchData();
      }, []);
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
                    <li><button className='buttons' onClick={()=>{navigate('/admin/laboratory')}}>Lab Test Master</button></li>
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
    <div><button onClick={()=>handleAdd()} className='button'>+ ADD DOCTORS</button></div>
    {add && <Dialog open={add}>
        <DialogTitle>Doctor's Data</DialogTitle>
        <DialogContent>
            <form>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Name  : </span>
            <input
                style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Name" 
                aria-label="name" 
                aria-describedby="addon-wrapping"
                id='name'
                name='name'
                value={doctorData.name}
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
                value={doctorData.contact}
                onChange={handleChange} required
                />
            </div><br/>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Email  : </span>
            <input
                style={{margin:'auto'}} 
                type="email" 
                class="form-control" 
                placeholder="Email" 
                aria-label="email" 
                aria-describedby="addon-wrapping"
                id='email'
                name='email'
                value={doctorData.email}
                onChange={handleChange} required
                />
            </div><br/>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Speciality  : </span>
            <input
                style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Speciality" 
                aria-label="speciality" 
                aria-describedby="addon-wrapping"
                id='speciality'
                name='speciality'
                value={doctorData.speciality}
                onChange={handleChange} required
                />
            </div><br/>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Availability  : </span>
            <input
                style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Availability" 
                aria-label="availability" 
                aria-describedby="addon-wrapping"
                id='availability'
                name='availability'
                value={doctorData.availability}
                onChange={handleChange} required
                />
            </div><br/>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Password  : </span>
            <input
                style={{margin:'auto'}} 
                type="text" 
                class="form-control" 
                placeholder="Password" 
                aria-label="password" 
                aria-describedby="addon-wrapping"
                id='password'
                name='password'
                value={doctorData.password}
                onChange={handleChange} required
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
      <Alert severity="success">Data Added Successfully!</Alert>
    </Stack>}
    {updateAlert && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Data Updated Successfully!</Alert>
    </Stack>}
    {deleteSuccessAlert && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Data Deleted Successfully!</Alert>
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
                  </form>
        </DialogContent>
        <DialogActions>
          <button className='button' onClick={()=>handleCancel()}>Cancel</button>
          <button className='button' onClick={handleSubmit1} type="submit">Submit</button>
        </DialogActions>
    </Dialog>}
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
          <button onClick={()=>handleAgree()} className='btn btn-primary' >
            Agree
          </button>
        </DialogActions>
    </Dialog>} 
    <div className="appointments-table" style={{margin:'2%'}}>
                <center><h2>Doctors List</h2></center>
                <table className="table" style={{width: '120%'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Availability</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorList.map((doctor, index) => (  
                            <tr key={index}>
                                <td>{doctor.name}</td>
                                <td>{doctor.contact}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <td>{doctor.availability}</td>
                                <td><button className='btn btn-primary' onClick={()=>handleUpdate(index)}>Update</button>   <button className='btn btn-primary' onClick={()=>handleDelete(index)}>Delete</button></td>                            </tr>
                        ))}
                    </tbody>
                </table>
    </div>
   </>
  )
}
export default Doctors