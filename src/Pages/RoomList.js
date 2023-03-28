import React from "react";
import { useEffect, useState } from "react";
import instance from "../axiosconfig";
import Header from "../Components/Header";
import "../Styles/HotelAdminPage.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    instance
      .get("/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteRoom = (roomId) => {
    instance
      .delete(`/rooms/${roomId}`)
      .then(() =>
        setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId))
      )
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Header />
      <h2>Previously added rooms:</h2>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Room Type</th>
            <th>Price</th>
            <th>Guests</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomName}</td>
              <td>{room.roomType}</td>
              <td>{room.price}</td>
              <td>{room.guests}</td>
              <td>
                <button onClick={() => handleDeleteRoom(room._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomList;
