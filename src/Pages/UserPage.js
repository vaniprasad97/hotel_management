
import React, { useState , useEffect } from 'react';
import Header from '../Components/Header';
import instance from '../axiosconfig';


function UserPage() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // useEffect hook that makes an HTTP GET request to retrieve a list of hotels from  api/hotels
    // ans store it in a state called hotels.
  }, []);

  return (
    <div> <Header/>
      <h2>Hotel List</h2>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
            <button className='viewdetails'> view details  
            </button>
          </li>     
        ))}
      </ul>

     
    </div>
  );
}

export default UserPage;




