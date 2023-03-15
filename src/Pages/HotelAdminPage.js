import React, { useState, useEffect } from 'react';
import instance from '../axiosconfig';

function HotelAdminPage({ hotelId }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    async function fetchHotelData() {
      try {
        const response = await instance.get(`/assignhotel?name=${hotelId}`);
        //  const response = await instance.get(`/assignhotel/${hotelId}`);
         console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHotelData();
  }, [hotelId]);
  console.log(hotelId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await instance.post('`/rooms', {
    //     roomNumber,
    //     price,
    //   });
     try {
      const response = await instance.post(`/rooms/${hotelId}`, {
        roomNumber,
        price,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room number:
        <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <button type="submit">Add Room</button>
    </form>
  );
}

export default HotelAdminPage;
