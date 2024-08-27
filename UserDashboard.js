import React ,{ useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
function UserDashboard() {
    const [isProfileOpen,setIsProfileOpen]=useState(false)
    const ProfileDrawer=()=>{
        setIsProfileOpen(!isProfileOpen)
    }
    let navigate=useNavigate()
  return (
    <div>
        <div className="drawer-menu-container">
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
                {/* <li><button className='profile-button' onClick={()=>handleEdit()}>Edit Profile</button></li><br></br> */}
                <li><button className='profile-button' onClick={()=>navigate('/doctor/login')}>Logout</button></li>
              </ul>
              </div>
            </div>
        </div>
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Prescription</h5>
              {/* <p className="card-text">{userData?.Prescription || 'No data available'}</p> */}
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Lab Test</h5>
              {/* <p className="card-text">{userData?.LabTestAssign || 'no data'}</p> */}
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Upcoming Appointments </h5>
              {/* <p className="card-text">{userData?.Appointments || 'No data available'}</p> */}
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Other Details</h5>
              {/* <p className="card-text">BMI :{userData?.BMI || 'No data available'}</p>
              <p className="card-text">Height : {userData?.height || 'No data available'} </p>
              <p className="card-text">Weight : {userData?.weight || 'No data available'}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default UserDashboard