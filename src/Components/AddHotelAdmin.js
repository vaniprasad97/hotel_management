import React, { useState, useEffect } from "react";
import hotelAdmins from "../assets/Userdata.json";
import Header from "./Header";
import { Link } from "react-router-dom";
import instance from "../axiosconfig";

function AddHotelAdmin() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.log("Error fetching hotels", error);
      });
      //This code uses the useEffect hook to fetch data from a server using an HTTP GET request
  // when the component mounts. The code creates an effect that sets the hotels state variable
  // with the data received from the server using the setHotels function.
  // . If the GET request fails, an error message is logged to the console.
  }, []);

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
        // function for handling the user input and store the data in the state selectedhotel
    // The function is for handling the userinput updates the state variable selectedHotel with the value of the selected hotel. This function
    // is used for handling the user input and storing the selected hotel data in the state variable selectedHotel.
  };

  const handleAdminChange = (event) => {
    setSelectedAdmin(event.target.value);
      //It calls the setSelectedAdmin function and passes it the value property of the event.target object.
    // This updates the state variable selectedAdmin with the new value selected by the user.
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
        setSuccessMessage("Hotel assigned successfully");
        setSelectedHotel("");
        setSelectedAdmin("");
      })
      .catch((error) => {
        console.log("Error assigning hotel:", error);
      });
         // It creates an object called data that contains two properties: hotelName and adminId. 
    //These properties are assigned values from the selectedHotel and selectedAdmin state variables, respectively.
    // Then it post the data to the api/assignhotel
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
      {successMessage && <p>{successMessage}</p>}
      <p>
    <Link to="/HotelAdminList" relative="path">
    Click here to see previously added hotelAdmins
    </Link>
    </p> 
    </div>
  );
}

export default AddHotelAdmin;

