import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../axiosconfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/BookingForm.css";

function ViewDetails() {
  const [hotelsData, setHotelsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const { id } = useParams();
  const [value, onChange] = useState(new Date());
  console.log(bookingsData);
  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotelsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`/bookings?hotelId=${id}`)
      .then((response) => {
        setBookingsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const bookedDates = bookingsData.map((booking) => {
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    return { start: checkInDate, end: checkOutDate };
  });

  return (
    <div>
      <div>
        {hotelsData.map((hotel) => {
          if (hotel._id === id) {
            return (
              <div key={hotel._id}>
                <h2>{hotel.name}</h2>
                <p>{hotel.description}</p>
                <p>{hotel.location}</p>
              </div>
            );
          }
          return null;
        })}
        <Link to="/UserPage">Back to user page</Link>
      </div>
      <div>
        <Calendar
          onChange={onChange}
          value={value}
          tileContent={({ date, view }) =>
            view === "month" &&
            bookedDates.map(
              (bookedDate) => date >= bookedDate.start && date <= bookedDate.end
            ) && <div className="booked-day"></div>
          }
        />
      </div>
    </div>
  );
}

export default ViewDetails;
