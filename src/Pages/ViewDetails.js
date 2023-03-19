import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import instance from "../axiosconfig";

function ViewDetails() {
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    instance.get("/hotels")
      .then((response) => {
        setHotelsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      // useEffect hook that makes an GET request to retrieve a list of hotels from an API.
  }, []);

  console.log(hotelsData);

  const { id } = useParams();
  console.log(id);



  return (
    <div>
      <h1>Hotel Booked successfully</h1>
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
  );
}

export default ViewDetails;

