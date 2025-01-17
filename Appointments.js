import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./DrawerMenu.css";
import "./Appointment.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
function Appointments() {
  const [add, setAdd] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    patientId: "",
    doctorId: "",
    time: "",
  });
  const [formData, setFormData] = useState({
    hospitalName: "",
    fullname: "",
    DOB: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    username: "",
    password: "",
  });
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [addAlert, setAddAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [doc, setDoc] = useState([]);
  const [pec, setPec] = useState([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ProfileDrawer = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAdd = () => {
    setAdd(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIndex !== null) {
      const updatedAppointmentsList = [...appointmentsList];
      updatedAppointmentsList[selectedIndex] = appointmentData;
      setAppointmentsList(updatedAppointmentsList);
      setSelectedIndex(null);
      try {
        await axios.put(
          "http://localhost:5000/appointment/update",
          appointmentData
        );
        console.log("Appointment updated successfully");
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
      setUpdateAlert(true);
      setTimeout(() => {
        setUpdateAlert(false);
      }, 3000);
    } else {
      setAppointmentsList([...appointmentsList, appointmentData]);
      try {
        axios.post("http://localhost:5000/appointment/create", appointmentData);
        console.log("data sent");
      } catch (err) {
        console.log("err", err);
      }
      setAddAlert(true);
      setTimeout(() => {
        setAddAlert(false);
      }, 3000);
    }
    setAdd(false);
    setAppointmentData({
      patientId: "",
      doctorId: "",
      time: "",
    });
    console.log(appointmentData);
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleUpdate = (index) => {
    setAdd(true);
    setAppointmentData(appointmentsList[index]);
    setSelectedIndex(index);
  };
  const handleDelete = (index) => {
    setSelectedIndex(index);
    setSelectedAppointmentId(appointmentsList[index]._id);
    setDeleteAlert(true);
  };
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const handleAgree = async () => {
    if (selectedAppointmentId) {
      try {
        await axios.delete(
          `http://localhost:5000/appointment/delete?doctorId=${selectedAppointmentId}`
        );
        console.log("Appointment deleted successfully");
        setAppointmentsList((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== selectedAppointmentId
          )
        );
        setDeleteSuccessAlert(true);
        setTimeout(() => {
          setDeleteSuccessAlert(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
    setDeleteAlert(false);
  };

  const handleDisagree = () => {
    setDeleteAlert(false);
  };
  const handleEdit = () => {
    setEditProfile(true);
  };
  const handleClose = () => {
    setEditProfile(false);
  };
  const handleClose1 = () => {
    setAdd(false);
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    setEditProfile(false);
    setIsProfileOpen(false);
  };
  const handleCancel1 = () => {
    setAdd(false);
  };
  let navigate = useNavigate();
  useEffect(() => {
    // Fetch appointments data when component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/appointment/read"
        );
        console.log("Appointments:", response.data);
        setAppointmentsList(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchData();
    axios
      .get("http://localhost:5000/doctor/read")
      .then((data) => {
        console.log("Doctors:", data);
        const doctorNames = data.data.data.map((ele) => ({
          id: ele._id,
          name: ele.name,
        }));
        setDoc(doctorNames);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/patient/read")
      .then((data) => {
        console.log("Patients:", data);
        const patientNames = data.data.data.map((ele) => ({
          id: ele._id,
          name: ele.name,
        }));
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
    return patient ? patient.name : ` ${id}`;
  };
  return (
    <>
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
                  navigate("/admin/dashboard");
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/admin/patient");
                }}
              >
                Patients
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/admin/appointment");
                }}
              >
                Appointments
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/admin/laboratory");
                }}
              >
                Lab Test Master
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => {
                  navigate("/admin/doctors");
                }}
              >
                Doctors
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
                  onClick={() => navigate("/admin/login")}
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
          + ADD APPOINTMENTS
        </button>
      </div>
      {add && (
        <Dialog open={add} onClose={handleClose1}>
          <DialogTitle>Appointment</DialogTitle>
          <DialogContent>
            <form>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Patient Name :{" "}
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="patientId"
                  aria-describedby="addon-wrapping"
                  id="patientId"
                  name="patientId"
                  value={appointmentData.patientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Name</option>
                  {pec.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Doctor Name :{" "}
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="doctorId"
                  aria-describedby="addon-wrapping"
                  id="doctorId"
                  name="doctorId"
                  value={appointmentData.doctorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Name</option>

                  {doc.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Time :
                </span>
                <input
                  style={{ margin: "auto" }}
                  type="text"
                  className="form-control"
                  id="time"
                  name="time"
                  value={appointmentData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <button className="btn btn-primary" onClick={() => handleCancel1()}>
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
            <br />
            <br />
          </DialogActions>
        </Dialog>
      )}
      {addAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Appointment Added Successfully!</Alert>
        </Stack>
      )}
      {updateAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Appointment Updated Successfully!</Alert>
        </Stack>
      )}
      {deleteAlert && (
        <Dialog
          open={deleteAlert}
          onClose={() => handleDisagree()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
      {deleteSuccessAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">Appointment Deleted Successfully!</Alert>
        </Stack>
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
                  value={formData.hospitalName}
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
                  value={formData.DOB}
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
      <div className="appointments-table" style={{ margin: "2%" }}>
        <center>
          <h2>Appointments List</h2>
        </center>
        <table className="table" style={{ width: "120%" }}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Time</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {appointmentsList.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{getPatientNameById(appointment.patientId)}</td>
                <td>{getDoctorNameById(appointment.doctorId)}</td>
                <td>{appointment.time}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(index)}
                  >
                    Update
                  </button>{" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Appointments;
