import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import instance from "../axiosconfig";

function AddnewUser() {
  const [username, setUsername] = useState("");
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };
  const handleAdminChange = (event) => {
    setSelectedAdmin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      hotelName: selectedHotel,
      adminId : selectedAdmin,
    };
    instance
      .post("/assignhotel", data)
      .then((response) => {
        setSuccessMessage("Hotel admin added successfully");
        setUsername("");
        setSelectedHotel("");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Error adding hotel admin");
        console.log("Error adding hotel admin:", error);
      });
  };

  return (
    <div>
      <Header />
      <h2>Add a new hotel admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="username">Assign AdminId</label>
          <input
            type="text"
            id="adminid"
            name="adminid"
            value={selectedAdmin}
            onChange={handleAdminChange}
          />
        </div>
        <div>
          <label htmlFor="hotel">Select a hotel:</label>
          <select id="hotel" name="hotel" onChange={handleHotelChange}>
            <option value="">Select a hotel</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel.hotelName}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Hotel Admin</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AddnewUser;
