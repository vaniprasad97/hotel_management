import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axiosconfig";
import Header from "../Components/Header";
import "../Styles/HotelAdminPage.css";

function HotelAdminlist() {
  const [assignhotels, setAssignhotels] = useState([]);
  console.log(assignhotels);

  useEffect(() => {
    instance
      .get("/assignhotel")
      .then((response) => {
        setAssignhotels(response.data);
      })
      .catch((error) => {
        console.log("Error fetching hotels", error);
      });
  }, []);
  console.log(assignhotels);
  const handleDelete = (id) => {
    instance
      .delete(`/assignhotel/${id}`)
      .then(() => {
        setAssignhotels(assignhotels.filter((hotel) => hotel._id !== id));
      })
      .catch((error) => {
        console.log("Error deleting hotel", error);
      });
  };
  console.log(assignhotels);
  return (
    <div className="hotel-admin-list-container">
      <Header />
      <Link to={"/AdminPage"}> Back to Admin Page</Link>
      <form className="assignhotelform">
        <div className="hotel-box-container">
          {assignhotels.map((hotel) => (
            <div key={hotel._id} className="hotel-box">
              <p>Admin ID: {hotel._id}</p>
              <p> hotelName :{hotel.hotelName}</p>
              <button
                className="assignhotelbuuton"
                onClick={() => handleDelete(hotel._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default HotelAdminlist;
