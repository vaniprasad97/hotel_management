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
        console.log("filtered dates", disabledDates);
        console.log("constant date", disabledDays);
        setFilteredDetails(filteredDetails);
        setDisabledates(disabledDates);
        setBookingsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.selectedHotelId]);

  const getDisabledDays = () => {
    const disabledDates = filteredDetail.map((booking) => {
      return {
        from: new Date(booking.checkInDate),
        to: new Date(booking.checkOutDate),
      };
    });
    return disabledDates;
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
