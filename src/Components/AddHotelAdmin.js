import React, { useState, useEffect } from "react";
import hotelAdmins from "../assets/Userdata.json";
import Header from "./Header";
import { Link } from "react-router-dom";
import instance from "../axiosconfig";

function AddHotelAdmin() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  console.log(hotelAdmins);
  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.log("Error fetching hotels", error);
      });
  }, []);

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
    // function for handling the user input and store the data in the state selectedhotel
  };

  const handleAdminChange = (event) => {
    setSelectedAdmin(event.target.value);
    //function for handling the user input and store the data in the state selectedAdmin
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      hotelName: selectedHotel,
      adminId: selectedAdmin,
    };
    instance
      .post("/assignhotel", data)
      .then((response) => {
        console.log("Hotel assigned successfully");
      })
      .catch((error) => {
        console.log("Error assigning hotel:", error);
      });
    // while clicking submit function, it stores the name of hotel, admin and their corresponding id.
  };

  return (
    <div>
      <Header />
      <p>
        Back to Admin home page
        <Link to="/AdminPage" relative="path">
          Click here
        </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="hotel">Select a hotel:</label>
        <select id="hotel" name="hotel" onChange={handleHotelChange}>
          <option value="">Select a hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>

        <label htmlFor="admin">Select a hotel admin:</label>
        <select id="admin" name="admin" onChange={handleAdminChange}>
          <option value="">Select a hotel admin</option>
          {hotelAdmins.users.map((admin) => (
            <option key={admin.id} value={admin.id}>
              {admin.username}
            </option>
          ))}
        </select>

        <button type="submit">Assign Hotel</button>
      </form>
    </div>
  );
}

export default AddHotelAdmin;
