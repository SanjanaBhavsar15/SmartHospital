import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './DrawerMenu.css';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import axios from 'axios';

function LabTestAssign() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [formData, setFormData] = useState({
        hospitalname: '',
        fullname: '',
        dob: '',
        age: '',
        gender: '',
        contact: '',
        email: '',
        username: '',
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
    const ProfileDrawer = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const handleEdit = () => {
        setEditProfile(true);
    };
    const handleClose = () => {
        setEditProfile(false);
    };
    const handleCancel = () => {
        setEditProfile(false);
        setIsProfileOpen(false);
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const [add, setAdd] = useState(false);
    const handleAdd = () => {
        setAdd(true);
    };
    const handleCloseDialog = () => {
        setAdd(false);
    };
    const [labDetails, setLabDetails] = useState({
        doctorId: '',
        patientId: '',
        labTestId: '',
    });
    const [newDetails, setNewDetails] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLabDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCancel1 = () => {
        setAdd(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedIndex !== null) {
            const updatedLabDetails = [...newDetails];
            updatedLabDetails[selectedIndex] = labDetails;
            setNewDetails(updatedLabDetails);
            setSelectedIndex(null);
            try {
                await axios.put('http://localhost:5000/labtestassign/update', labDetails);
                console.log('Data updated successfully');
            } catch (error) {
                console.error('Error updating appointment:', error);
            }
        } else {
            setNewDetails([...newDetails, labDetails]);
            try {
                axios.post('http://localhost:5000/labtestassign/create', labDetails);
                console.log('data sent');
            } catch (err) {
                console.log('err', err);
            }
        }
        setAdd(false);
        setLabDetails({
            doctorId: '',
            patientId: '',
            labTestId: '',
        });
        console.log(labDetails);
    };
    const handleUpdate = (index) => {
        setAdd(true);
        setLabDetails(newDetails[index]);
        setSelectedIndex(index);
    };
    const handleDelete = (index) => {
        setSelectedIndex(index);
        setDeleteAlert(true);
    };
    const [deleteAlert, setDeleteAlert] = useState(false);
    const handleDisagree = () => {
        setDeleteAlert(false);
    };
    const handleAgree = async (id) => {
        if (selectedIndex !== null) {
            try {
                await axios.delete('http://localhost:5000/labtestassign/delete');
                console.log('data deleted successfully');
            } catch (error) {
                console.error('Error deleting appointment:', error);
            }
            const updatedNewDetails = newDetails.filter((appointment, index) => index !== selectedIndex);
            setNewDetails(updatedNewDetails);
            setSelectedIndex(null);
        }
        setDeleteAlert(false);
    };
    const [doc, setDoc] = useState([]);
    const [pec, setPec] = useState([]);
    const [labs, setLabs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/labtestassign/read');
                console.log("aaa----,", response.data);
                setNewDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchData();
        axios.get('http://localhost:5000/doctor/read')
        .then((data) => {
          console.log("Doctors:", data);
          const doctorNames = data.data.data.map((ele) => ({ id: ele._id, name: ele.name }));
          setDoc(doctorNames);
        })
        .catch((err) => {
          console.log(err);
        });
  
        axios.get('http://localhost:5000/patient/read')
        .then((data) => {
          console.log("Patients:", data);
          const patientNames = data.data.data.map((ele) => ({ id: ele._id, name: ele.name }));
          setPec(patientNames);
        })
        .catch((err) => {
          console.log(err);
        });

        axios.get('http://localhost:5000/lab/read')
            .then((data2) => {
                console.log("lab data", data2);
                const labid = data2.data.data.map((ele)=>({id:ele._id,name:ele.name}))
                setLabs(labid);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    const getDoctorNameById = (id) => {
        const doctor = doc.find((d) => d.id === id);
        return doctor ? doctor.name : ` ${id}`;
      };
    
      const getPatientNameById = (id) => {
        const patient = pec.find((p) => p.id === id);
        return patient ? patient.name :  ` ${id}`;
      };
      const getLabNameById=(id)=>{
        const lab=labs.find((l)=>l.id===id)
        return lab?lab.name: `${id}`; 
      }
    let navigate = useNavigate();
    return (
        <div>
            <div className="drawer-menu-container">
                <button className="drawer-toggle-btn" onClick={toggleDrawer}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}> 
                    <button className="drawer-toggle-btn" onClick={toggleDrawer}>
                        <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} />
                    </button>
                    <ul className="drawer-menu">
                        <li><button className='buttons' onClick={() => { navigate('/doctor/dashboard') }}>Home</button></li>
                        <li><button className='buttons' onClick={() => { navigate('/doctor/prescription') }}>Prescription</button></li>
                        <li><button className='buttons' onClick={() => { navigate('/doctor/labtestassign') }}>Lab Test Assign</button></li>
                    </ul>
                </div>
                <div className="main-content">
                </div>
                <div className='drawer-menu-container'>
                    <button className='profile-btn-container' onClick={ProfileDrawer}>
                        <FontAwesomeIcon icon={faUserCircle} />
                    </button>
                    <div className={`drawers ${isProfileOpen ? 'open' : ''}`}>
                        <button className='profile-btn-container' onClick={ProfileDrawer}>
                            <FontAwesomeIcon icon={faUserCircle} style={{ color: 'white', paddingLeft: '200px' }} />
                        </button>
                        <ul className='drawers-menu'>
                            <li><button className='profile-button' onClick={() => handleEdit()}>Edit Profile</button></li><br></br>
                            <li><button className='profile-button' onClick={() => navigate('/doctor/login')}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div><button onClick={() => handleAdd()} className='button'>+ LAB TEST</button></div>
            {add && <Dialog open={add} onClose={handleCloseDialog}>
                <DialogTitle>Lab Test Details</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Patient Name  : </span>
                            <select
                                style={{ margin: 'auto' }}
                                className='form-control'
                                aria-label="patientId"
                                aria-describedby="addon-wrapping"
                                id='patientId'
                                name='patientId'
                                value={labDetails.patientId}
                                onChange={handleChange} required
                            >
                                <option value="">Select Name</option>
                                {pec.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                            </select>
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Doctor Name : </span>
                            <select
                                style={{ margin: 'auto' }}
                                className='form-control'
                                aria-label="doctorId"
                                aria-describedby="addon-wrapping"
                                id='doctorId'
                                name='doctorId'
                                value={labDetails.doctorId}
                                onChange={handleChange} required
                            >
                                <option value="">Select Name</option>
                                {doc.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                            </select>
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">LabTest Name : </span>
                            <select
                                style={{ margin: 'auto' }}
                                className='form-control'
                                aria-label="labTestId"
                                aria-describedby="addon-wrapping"
                                id='labTestId'
                                name='labTestId'
                                value={labDetails.labTestId}
                                onChange={handleChange} required
                            >
                                <option value="">Select Name</option>
                                {labs.map((lab) => (
                                    <option key={lab.id} value={lab.id}>{lab.name}</option>
                                ))}
                            </select>
                        </div><br />
                    </form>
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-primary' onClick={() => handleCancel1()}>Cancel</button>
                    <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                </DialogActions>
            </Dialog>}
            {editProfile && <Dialog
                open={editProfile}
                onClose={handleClose}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <form>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Hospital Name  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="text"
                                className="form-control"
                                placeholder="Hospital Name"
                                aria-label="hospitalname"
                                aria-describedby="addon-wrapping"
                                id='hospitalname'
                                name='hospitalname'
                                value={formData.hospitalname}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Full Name  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
                                aria-label="fullname"
                                aria-describedby="addon-wrapping"
                                id='fullname'
                                name='fullname'
                                value={formData.fullname}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">DOB  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="date"
                                className="form-control"
                                placeholder="DOB"
                                aria-label="dob"
                                aria-describedby="addon-wrapping"
                                id='dob'
                                name='dob'
                                value={formData.dob}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Age  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="text"
                                className="form-control"
                                placeholder="Age"
                                aria-label="age"
                                aria-describedby="addon-wrapping"
                                id='age'
                                name='age'
                                value={formData.age}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Gender  : </span>
                            <select
                                style={{ margin: 'auto' }}
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
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Contact  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="text"
                                className="form-control"
                                placeholder="Contact"
                                aria-label="contact"
                                aria-describedby="addon-wrapping"
                                id='contact'
                                name='contact'
                                value={formData.contact}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Email  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                aria-label="email"
                                aria-describedby="addon-wrapping"
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Username  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                aria-label="username"
                                aria-describedby="addon-wrapping"
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Password  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                aria-label="password"
                                aria-describedby="addon-wrapping"
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange1} required
                            />
                        </div><br />
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Confirm Password  : </span>
                            <input
                                style={{ margin: 'auto' }}
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                aria-label="password"
                                aria-describedby="addon-wrapping"
                                id='confirmpassword'
                                name='confirmpassword'
                                value={formData.confirmPassword}
                                onChange={handleChange1} required
                            />
                        </div><br />
                    </form>
                </DialogContent>
                <DialogActions>
                    <button className='button' onClick={() => handleCancel()}>Cancel</button>
                    <button className='button' onClick={handleSubmit1} type="submit">Submit</button>
                </DialogActions>
            </Dialog>}
            {deleteAlert && <Dialog
                open={deleteAlert}
                onClose={() => handleDisagree()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Confirm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to delete the data?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => handleDisagree()} className='btn btn-primary'>Disagree</button>
                    <button onClick={() => handleAgree()} className='btn btn-primary' autoFocus>
                        Agree
                    </button>
                </DialogActions>
            </Dialog>}
            <div className="appointments-table" style={{ margin: '2%' }}>
                <center><h2>Lab Test Assigned List</h2></center>
                <table className="table" style={{ width: '120%' }}>
                    <thead>
                        <tr>
                            <th>Doctor Name</th>
                            <th>Patient Name</th>
                            <th>Lab Test Name</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newDetails.map((lab, index) => (
                            <tr key={lab._id}>
                                <td>{getDoctorNameById(lab.doctorId)}</td>
                                <td>{getPatientNameById(lab.patientId)}</td>
                                <td>{getLabNameById(lab.labTestId)}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleUpdate(index)}>Update</button>   <button className='btn btn-primary' onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LabTestAssign;
