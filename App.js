import React from 'react'
import HospitalLogin from './LoginH'
import HospitalRegistrationForm from './RegistrationH'
import AdminLogin from './AdminH'
import TemporaryDrawer from './MenuAH'
import Appointments from './Appointments'
import Patients from './Patients'
import Laboratory from './Laboratory'
import Doctors from './Doctors'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import RegistrationA from './RegistrationA'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<HospitalLogin/>}></Route>
          <Route path='/username/login' element={<HospitalLogin/>}></Route>
          <Route path='/username/registration' element={<HospitalRegistrationForm/>}></Route>
          <Route path='/admin/login' element={<AdminLogin/>}></Route>
          <Route path='/admin/registration' element={<RegistrationA/>}></Route>
          <Route path='/admin/dashboard' element={<TemporaryDrawer/>}></Route>
          <Route path='/admin/appointment' element={<Appointments/>}></Route>
          <Route path='/admin/patient' element={<Patients/>}></Route>
          <Route path='/admin/laboratory' element={<Laboratory/>}></Route>
          <Route path='/admin/doctors' element={<Doctors/>}></Route>
        </Routes>
      </div> 
    </Router>
  )
}
export default App 

