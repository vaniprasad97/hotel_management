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
      <table className="hotel-table">
        <thead>
          <tr>
            <th>Admin ID</th>
            <th>Hotel Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignhotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>{hotel._id}</td>
              <td>{hotel.hotelName}</td>
              <td>
                <button
                  className="assignhotelbuuton"
                  onClick={() => handleDelete(hotel._id)}
                >
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

export default HotelAdminlist;
