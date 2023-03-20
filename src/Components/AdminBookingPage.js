import React from 'react'
import Header from './Header';
import { Link } from 'react-router-dom';

function AdminBookingPage() {
  return (
  
    <div><Header/>
     <Link to="/AdminPage" relative="path">
          Back To Admin Page
        </Link>
    <h1> No Bookings!!!!!!!</h1>
    </div>
  )
}

export default AdminBookingPage