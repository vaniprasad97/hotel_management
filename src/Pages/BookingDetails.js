import React from 'react'
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

function BookingDetails() {
  return (
    <div><Header/>
    <Link to="/UserPage" relative="path">
        Back To User Page
      </Link>
      <h1> Hotel Booked succesfullly </h1>
        <p>Coming soon!!!!!!</p>
    </div> 

  )
}

export default BookingDetails