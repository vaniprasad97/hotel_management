import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import instance from "../axiosconfig";
import React, { useEffect, useState } from "react";

export default function Example(props) {
  const [range, setRange] = useState();
  const [bookingsData, setBookingsData] = useState([]);
  const [disabledDates, setDisabledates] = useState([]);
  const [filteredDetail, setFilteredDetails] = useState([]);
  const bookedStyle = { border: "2px solid currentColor" };
  const disabledDays = [
    { from: new Date("2023-04-18"), to: new Date("2023-04-29") },
    { from: new Date("2023-05-18"), to: new Date("2023-05-29") },
  ];
  let footer = <p> Marked dates are booked</p>;

  useEffect(() => {
    instance
      .get("/bookings")
      .then((response) => {
        const filteredDetails = response.data.filter(
          (item) => item.hotelId == props.selectedHotelId
        );
        const disabledDates = filteredDetails.map((booking) => {
          return {
            from: new Date(booking.checkInDate),
            to: new Date(booking.checkOutDate),
          };
        });

        setFilteredDetails(filteredDetails);
        setDisabledates(disabledDates);
        setBookingsData(response.data);
      })
      .catch((error) => {
        //  console.error(error);
      });
    // get the data from bookings api.the callback function then filters the response data to get booking details that
    // match the props.selectedHotelId value.It then transforms the booking data into an array of disabled dates in the
    //format of from: to:, which is needed for a date picker component. It also sets the filteredDetails,disabledates,
    // and bookingsData states using the setFilteredDetails, setDisabledates, and setBookingsData methods respectively.
  }, [props.selectedHotelId]);

  const getDisabledDays = () => {
    const disabledDates = filteredDetail.map((booking) => {
      return {
        from: new Date(booking.checkInDate),
        to: new Date(booking.checkOutDate),
      };
    });
    return disabledDates;
    // it sets the disabled dates and returns the disabled dates.
  };

  return (
    <DayPicker
      mode="single"
      min={3}
      max={6}
      modifiers={{ booked: getDisabledDays() }}
      modifiersStyles={{ booked: bookedStyle }}
      // selected={range}
      // onSelect={setRange}
      footer={footer}
      disabled={getDisabledDays()}
    />
  );
}
