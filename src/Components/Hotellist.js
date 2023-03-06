import React, { useState } from "react";
import Header from "../Components/Header";
import hotelsData from "../assets/Hoteldata.json";
import "../Styles/AdminPage.css";
import { Link } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState(hotelsData);

  return (
    <div>
      <div>
        <Header />
        <Link to="/AdminPage" relative="path">
          Back To Admin Page
        </Link>
      </div>

      <h2>Hotel List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.description}</td>
              <td>{hotel.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;
