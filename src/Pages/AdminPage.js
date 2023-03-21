import React from 'react'
import Header from '../Components/Header'
import { Link } from "react-router-dom";

function AdminPage() {
  
  return (
    <div>
      <div> <Header/></div>
    <h1>  Welcome to AdminPage</h1>
     To see the list of hotels -- add and delete operations.
    <Link to="/Hotellist" relative="path">
      Click here
    </Link>
   <p>To see the user bookings
    <Link to="/AdminBookingPage" relative="path">
      Click here
    </Link>
    </p> 
    <p>To Manage Hotel Admin
    <Link to="/AddHotelAdmin" relative="path">
      Click here
    </Link>
    </p> 
    <p>Add new users as Admin
    <Link to="/AdminBookingPage" relative="path">
      Click here
    </Link>
    </p> 
    
  
      </div>
  )
}

export default AdminPage