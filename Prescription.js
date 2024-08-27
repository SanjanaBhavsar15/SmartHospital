import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./DrawerMenu.css";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import axios from "axios";
function Prescription() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [formData, setFormData] = useState({
    hospitalname: "",
    fullname: "",
    dob: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    username: "",
    password: "",
  });
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
  const [prescription, setPrescription] = useState({
    patientId: "",
    doctorId: "",
    prescription: "",
  });
  const [newPrescription, setNewPrescription] = useState([]);
  const [add, setAdd] = useState(false);
  const handleDialogClose = () => {
    setAdd(false);
  };
  const handleAdd = () => {
    setAdd(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    if (name === "patientId") {
      setPrescription((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    setPrescription((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDialogSubmit = async (e) => {
    console.log(prescription)
    // e.preventDefault();
    if (selectedIndex !== null) {
      const updatedPrescription = [...newPrescription];
      updatedPrescription[selectedIndex] = prescription;
      setNewPrescription(updatedPrescription);
      setSelectedIndex(null);
      try {
        await axios.post(
          "http://localhost:5000/prescription/update",
          prescription
        );
        console.log("Data updated successfully");
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    } else {
      setNewPrescription([...newPrescription, prescription]);
      try {
        axios.post("http://localhost:5000/prescription/create", prescription)
        console.log('added')
      
      } catch (err) {
        console.log("err", err);
      }
    }
    setAdd(false)
    setPrescription({
      patientId: '',
      doctorId: '',
      prescription: '',
    });
    console.log(prescription);
  };
  const handleDialogCancel = () => {
    setAdd(false);
  };
  const handleUpdate = (index) => {
    setAdd(true);
    setPrescription(newPrescription[index]);
    setSelectedIndex(index);
  };
  const [deleteAlert, setDeleteAlert] = useState(false);
  const handleDelete = (index) => {
    setSelectedIndex(index);
    setDeleteAlert(true);
  };
  const handleAgree = async () => {
    if (selectedIndex != null) {
      try {
        // Make the delete API call
        await axios.delete("http://localhost:5000/prescription/delete");
        console.log("Data deleted successfully");
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
      const updatePrescription = newPrescription.filter(
        (appointment, index) => index !== selectedIndex
      );
      setNewPrescription(updatePrescription);
      setSelectedIndex(null);
    }
    setDeleteAlert(false);
  };
  const handleDisagree = () => {
    setDeleteAlert(false);
  };
  const [doc, setDoc] = useState([]);
  const [pec, setPec] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/prescription/read');
        console.log("Appointments:", response.data);
        setNewPrescription(response.data.data);
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
  }, []);
  const getDoctorNameById = (id) => {
    const doctor = doc.find((d) => d.id === id);
    return doctor ? doctor.name : ` ${id}`;
  };

  const getPatientNameById = (id) => {
    const patient = pec.find((p) => p.id === id);
    return patient ? patient.name :  ` ${id}`;
  };
  let navigate = useNavigate();
  return (
    <div>
      <div className="drawer-menu-container">
        <button className="drawer-toggle-btn" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
          <button className="drawer-toggle-btn" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
          </button>
          <ul className="drawer-menu">
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/doctor/dashboard");
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/doctor/prescription");
                }}
              >
                Prescription
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/doctor/labtestassign");
                }}
              >
                Lab Test Assign
              </button>
            </li>
          </ul>
        </div>
        <div className="main-content"></div>
        <div className="drawer-menu-container">
          <button className="profile-btn-container" onClick={ProfileDrawer}>
            <FontAwesomeIcon icon={faUserCircle} />
          </button>
          <div className={`drawers ${isProfileOpen ? "open" : ""}`}>
            <button className="profile-btn-container" onClick={ProfileDrawer}>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ color: "white", paddingLeft: "200px" }}
              />
            </button>
            <ul className="drawers-menu">
              <li>
                <button className="profile-button" onClick={() => handleEdit()}>
                  Edit Profile
                </button>
              </li>
              <br></br>
              <li>
                <button
                  className="profile-button"
                  onClick={() => navigate("/doctor/login")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => handleAdd()} className="button">
          + PRESCRIPTIONS
        </button>
      </div>
      {add && (
        <Dialog open={add} onClose={handleDialogClose}>
          <DialogTitle>Lab Test Details</DialogTitle>
          <DialogContent>
            <form>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Patient Name :
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="patientId"
                  aria-describedby="addon-wrapping"
                  id="patientId"
                  name="patientId"
                  value={prescription.patientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Name</option>
                  {console.log("Pec", pec)}
                  {pec.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Doctor Name :
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="doctorId"
                  aria-describedby="addon-wrapping"
                  id="doctorId"
                  name="doctorId"
                  value={prescription.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Name</option>
                  {doc.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  prescription :
                </span>
                <textarea
                  style={{ margin: "auto" }}
                  cols={80}
                  rows={3}
                  class="form-control"
                  placeholder="prescription"
                  aria-label="prescription"
                  aria-describedby="addon-wrapping"
                  id="prescription"
                  name="prescription"
                  value={prescription.prescription}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-primary" onClick={handleDialogCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleDialogSubmit}>
              Submit
            </button>
          </DialogActions>
        </Dialog>
      )}
      {editProfile && (
        <Dialog open={editProfile} onClose={handleClose}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <form>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Hospital Name :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  class="form-control"
                  placeholder="Hospital Name"
                  aria-label="hospitalname"
                  aria-describedby="addon-wrapping"
                  id="hospitalname"
                  name="hospitalname"
                  value={formData.hospitalname}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Full Name :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  class="form-control"
                  placeholder="Full Name"
                  aria-label="fullname"
                  aria-describedby="addon-wrapping"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  DOB :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="date"
                  class="form-control"
                  placeholder="DOB"
                  aria-label="dob"
                  aria-describedby="addon-wrapping"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Age :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  class="form-control"
                  placeholder="Age"
                  aria-label="age"
                  aria-describedby="addon-wrapping"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Gender :{" "}
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="gender"
                  aria-describedby="addon-wrapping"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange1}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Contact :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  class="form-control"
                  placeholder="Contact"
                  aria-label="contact"
                  aria-describedby="addon-wrapping"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Email :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  aria-label="email"
                  aria-describedby="addon-wrapping"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Username :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="username"
                  aria-describedby="addon-wrapping"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Password :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="addon-wrapping"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Confirm Password :{" "}
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="password"
                  class="form-control"
                  placeholder="Confirm Password"
                  aria-label="password"
                  aria-describedby="addon-wrapping"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={formData.confirmPassword}
                  onChange={handleChange1}
                  required
                />
              </div>
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <button className="button" onClick={() => handleCancel()}>
              Cancel
            </button>
            <button className="button" onClick={handleSubmit1} type="submit">
              Submit
            </button>
          </DialogActions>
        </Dialog>
      )}
      {deleteAlert && (
        <Dialog
          open={deleteAlert}
          onClose={() => handleDisagree()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-prescription"
        >
          <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-prescription">
              Are you sure,you want to delete the data?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={() => handleDisagree()}
              className="btn btn-primary"
            >
              Disagree
            </button>
            <button
              onClick={() => handleAgree()}
              className="btn btn-primary"
              autoFocus
            >
              Agree
            </button>
          </DialogActions>
        </Dialog>
      )}
      <div className="appointments-table" style={{ margin: "2%" }}>
        <center>
          <h2>Prescription List</h2>
        </center>
        <table className="table" style={{ width: "120%" }}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>prescription</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {newPrescription.map((pres, index) => (
              <tr key={pres._id}>
                <td>{getPatientNameById(pres.patientId)}</td>
                <td>{getDoctorNameById(pres.doctorId)}</td>
                <td>{pres.prescription}</td>
                <td><button className="btn btn-primary" onClick={() => handleUpdate(index)}>Update</button>   <button className="btn btn-primary" onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Prescription;
