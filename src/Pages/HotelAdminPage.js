import React, { useState } from "react";
import instance from "../axiosconfig";
import Header from "../Components/Header";
import "../Styles/HotelAdminPage.css";

function HotelAdminPage() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState();
  const [Guest, SetGuest] = useState("");
// use assign hotel api to fetch the adminID
  const adminId = JSON.parse(localStorage.getItem("UserId"));
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      roomName,
      roomType,
      price,
      adminId,
      Guest
    };
    instance
      .post("/rooms", data)
      .then((response) => {
        console.log("room assigned successfully");
        setRoomName("");
        setRoomType("");
        setPrice("");
        SetGuest("");
      })
      .catch((error) => {
        console.log("Error adding room:", error);
      });
      // The function handleSubmit is called when a form is submitted.  
      //creates an object containing the data entered in the form fields and the user ID retrieved
      // from local storage, and then sends this data to the rooms api using POST method. After submitting  
      // the function clears the form fields.
  };
  


  return (
    <div>
      <Header />
      <form className="Addroomform" onSubmit={handleSubmit}>
        <label>
          Room name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Room type:
          <input
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          No: of Guest:
          <input
            type="number"
            value={Guest}
            onChange={(e) => SetGuest(e.target.value)}
          />
        </label>
        <br />
        <button className="Addroom" type="submit">
          Add room
        </button>
      </form>
    </div>
  );
}

export default HotelAdminPage;
