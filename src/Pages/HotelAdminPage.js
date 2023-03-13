import { useState } from "react";
import instance from "../axiosconfig";
import Header from "../Components/Header";

function HotelAdminPage({ hotelId }) {
  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("selectedUser"));
  console.log(loggedInUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await instance.post(`/hotels/${hotelId}/rooms`, { name: roomName, price });
      setRoomName("");
      setPrice("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <Header/>

      <label htmlFor="roomName">Room name:</label>
      <input type="text" id="roomName" value={roomName} onChange={(event) => setRoomName(event.target.value)} />
      <label htmlFor="price">Price:</label>
      <input type="text" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
      <button type="submit">Add Room</button>
    </form>
  );
}

export default HotelAdminPage;
// const handleAddHotel = (event) => {
//   event.preventDefault();
//   const errors = validateForm();
//   if (Object.keys(errors).length === 0) {
//     instance
//       .post("/hotels", newHotel, {
//         headers: {
//           "Content-Type": "application/json; charset=utf-8",
//         },
//       })
//       .then((response) => {
//         setHotels([...hotels, { ...newHotel, id: response.data._id }]);
//         setNewHotel({
//           name: "",
//           description: "",
//           location: "",
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } else {
//     setErrors(errors);
//   }
// };
