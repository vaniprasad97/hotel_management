import React from 'react'
import { useEffect, useState } from 'react';
import instance from '../axiosconfig';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    instance.get("/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteRoom = roomId => {
    instance.delete(`/rooms/${roomId}`)
      .then(() => setRooms(prevRooms => prevRooms.filter(room => room._id !== roomId)))
      .catch(error => console.error(error));
  };

  return (
    <div> 
      <h2>Previously added rooms:</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <p> roomName : {room.roomName} </p> 
            <p> roomType : {room.roomType} </p>
            <p> roomPrice : {room.price} </p>
            <p> roomGuest : {room.guests} </p>
            <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RoomList;
