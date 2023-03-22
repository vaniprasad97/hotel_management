import React from 'react';
import { useEffect , useState} from 'react';
import instance from '../axiosconfig';
import "../Styles/HotelAdminPage.css"


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
    <div>
        <form className='assignhotelform'>
      {assignhotels.map((hotel) => (
        <div key={hotel._id}>
          <h2>{hotel.hotelName}</h2>
          <p>Admin ID: {hotel.adminId}</p>
          <p> {hotel.useername}</p>
          <button className='assignhotelbuuton' onClick={() => handleDelete(hotel._id)}>Delete</button>
        </div>
      ))}
      </form>
    </div>
  );
}

export default HotelAdminlist;
