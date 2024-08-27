import React from 'react'
import HospitalLogin from './LoginH'
import AdminLogin from './AdminH'
import RegistrationA from './RegistrationA'
import TemporaryDrawer from './MenuAH'
import Appointments from './Appointments' 
import Patients from './Patients'
import Laboratory from './Laboratory'
import Doctors from './Doctors'
import Doctor from './Doctor'
import Doctorhome from './Doctorhome'
import Prescription from './Prescription'
import LabTestAssign from './LabTestAssign'
import UserDashboard from './UserDashboard'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<HospitalLogin/>}></Route>
          <Route path='/user/login' element={<HospitalLogin/>}></Route>
          <Route path='/user/dashboard' element={<UserDashboard/>}></Route>
          <Route path='/admin/login' element={<AdminLogin/>}></Route>
          <Route path='/admin/registration' element={<RegistrationA/>}></Route>
          <Route path='/admin/dashboard' element={<TemporaryDrawer/>}></Route>
          <Route path='/admin/appointment' element={<Appointments/>}></Route>
          <Route path='/admin/patient' element={<Patients/>}></Route>
          <Route path='/admin/laboratory' element={<Laboratory/>}></Route>
          <Route path='/admin/doctors' element={<Doctors/>}></Route>
          <Route path='/doctor/login' element={<Doctor/>}></Route>
          <Route path='/doctor/dashboard' element={<Doctorhome/>}></Route>
          <Route path='/doctor/prescription' element={<Prescription/>}></Route>
          <Route path='/doctor/labtestassign' element={<LabTestAssign/>}></Route>
        </Routes>
      </div> 
    </Router>
  )
}
export default App 

