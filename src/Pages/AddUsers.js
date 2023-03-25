import React, { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import instance from "../axiosconfig";

export default function Example(props) {
  const [range, setRange] = useState();
  const [bookingsData, setBookingsData] = useState([]);
  const [disabledDates, setDisabledates] = useState([]);
  const [checkInDate, setCheckInDate] = useState();

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
        debugger;
        setDisabledates(disabledDates);
        setBookingsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.selectedHotelId]);

  const disabledDays = [
    { from: new Date("2023-04-18"), to: new Date("2023-04-29") },
    { from: new Date("2023-05-18"), to: new Date("2023-05-29") },
  ];
  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <DayPicker
      min={3}
      max={6}
      selected={range}
      onSelect={setRange}
      footer={footer}
      disabled={disabledDays}
    />
  );
}
