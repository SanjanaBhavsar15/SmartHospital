import React ,{useState} from 'react'
import { Dialog, DialogActions, DialogContent,DialogContentText, DialogTitle } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios'
function Laboratory() {
    const [labData,setLabData]=useState({
        name:'',
        cost:'',
        description:'',
    })
    const [labList,setLabList]=useState([])
    const handleChange=(e)=>{
        const {name,value}=e.target
        setLabData(prevState=>({
            ...prevState,
            [name]:value
        }))
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
        confirmPassword: ''
    });
    const handleChange1=(e)=>{
        const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
    }
    const [add,setAdd]=useState(false)
    const handleAdd=()=>{
        setAdd(true)
    }
    const [addAlert,setAddAlert]=useState(false)
    const [selectedIndex,setSelectedIndex]=useState(null)
    const [editProfile,setEditProfile]=useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen,setIsProfileOpen]=useState(false)
    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };
    const ProfileDrawer=()=>{
      setIsProfileOpen(!isProfileOpen)
    }
    const [deleteAlert,setDeleteAlert]=useState(false)
    const handleClose=()=>{
        setEditProfile(false)
    }
    const handleEdit=()=>{
        setEditProfile(true)
    }
    const handleCancel=()=>{
        setEditProfile(false)
        setIsProfileOpen(false)
    }
    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    const handleAddClose=()=>{
        setAdd(false)
    }
    const handleLabCancel=()=>{
        setAdd(false)
    }
    const handleLabSubmit=(e)=>{
        e.preventDefault();
        if(selectedIndex!=null){
            const updatedData=[...labList]
            updatedData[selectedIndex]=labData
            setLabList(updatedData)
            setSelectedIndex(null)
            setUpdateAlert(true)
            setTimeout(() => {
                setUpdateAlert(false)
            }, 3000);
            try{
                axios.post('http://localhost:5000/lab/update',labData)
                console.log("data updated")
            }
            catch(err){
                console.log('err',err)
            }
        }
        else{
        setLabList([...labList,labData])
        try{
            axios.post('http://localhost:5000/lab/create',labData)
            console.log("data sent")
        }
        catch(err){
            console.log('err',err)
        }
        setAddAlert(true)
        setTimeout(() => {
            setAddAlert(false)
        }, 3000);
        }
        setAdd(false)
        setLabData({
            name:'',
            cost:'',
            description:'',
        })
        console.log(labData)
    }
    const [updateAlert,setUpdateAlert]=useState(false)
    const handleLabUpdate = (index) => {
        setAdd(true); 
        setSelectedIndex(index);
        setLabData({
          name: labList[index].name,
          cost:labList[index].cost,
          description: labList[index].description
        });
    };    
    const [deleteSuccessAlert,setDeleteSuccessAlert]=useState(false)  
    const handleLabDelete=(index)=>{
        setSelectedIndex(index)
        setDeleteAlert(true)
    }
    const handleAgree=()=>{
        const updatedLabList = labList.filter((test, index) => index !== selectedIndex);
        setLabList(updatedLabList);
        setSelectedIndex(null)
        setDeleteAlert(false);
        console.log("button clicked")
        setDeleteSuccessAlert(true);
        setTimeout(() => {
            setDeleteSuccessAlert(false);
        }, 3000);
    }
    const handleDisagree=()=>{
        setDeleteAlert(false)
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
                <li><button className='buttons' onClick={()=>{navigate('/admin/doctors')}}>Doctors</button></li>
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
    <div><button onClick={()=>handleAdd()} className='button'>+ ADD LAB TESTS</button></div>
    {add && <Dialog open={add} onClose={handleAddClose}>
        <DialogTitle>Lab Tests</DialogTitle>
        <DialogContent>
            <form>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Name  : </span>
            <input
                type='text'
                style={{margin:'auto'}} 
                class="form-control" 
                id='name'
                name='name'
                value={labData.name}
                onChange={handleChange} required
                />
            </div><br/>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Cost  : </span>
            <input
                style={{margin:'auto'}} 
                class="form-control" 
                id='cost'
                name='cost'
                value={labData.cost}
                onChange={handleChange} required
            />
            </div><br/>
            <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">Description  : </span>
            <input
                type='text'
                style={{margin:'auto'}} 
                class="form-control" 
                id='description'
                name='description'
                value={labData.description}
                onChange={handleChange} required
                />
            </div>
            </form>
        </DialogContent>
        <DialogActions>
            <button className='btn btn-primary' onClick={handleLabCancel}>Cancel</button>
            <button className='btn btn-primary' onClick={handleLabSubmit}>Submit</button>
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
    <center><h2>Patient's Lab Test List</h2></center>
    <table className='table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Description</th>
                <th>Activity</th>
            </tr>
        </thead>
        <tbody>
            {labList.map((test,index)=>(
                <tr key={index}>
                    <td>{test?.name}</td>
                    <td>{test?.cost}</td>
                    <td>{test?.description}</td> 
                    <td><button className='btn btn-primary' onClick={()=>handleLabUpdate(index)}>Update</button> <button className='btn btn-primary' onClick={()=>handleLabDelete(index)}>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </>
  )
}
export default Laboratory 