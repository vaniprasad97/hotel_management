import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "../Styles/AdminPage.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Search from "../Components/Search";
import instance from "../axiosconfig";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const PAGE_SIZE = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // fetch the data from the api/hotels and store it in a state called Hotels
  }, []);

  const totalPages = Math.ceil(hotels.length / PAGE_SIZE);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    //whenever clicks the button, the pagenumber is passed as argument and set current page number
    // to the state CurrentPage.
  };

  const getPageHotels = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return hotels.slice(startIndex, endIndex);
    // Function to find the start and end element to be displayed on the page.
    //Start index is the index of the
    //element displayed first on the current page and
    //endindex is the element should displayed on the last of the page and slice it.
    // and slice based on the start.
  };

  const validateForm = () => {
    let errors = {};
    if (
      newHotel.name.trim() === "" ||
      newHotel.description.trim() === "" ||
      newHotel.location.trim() === ""
    ) {
      errors.name =
        "Name, Location and description can't be empty!! Please fill all the details..";
    }
    return errors;
    // Function to check whether the values ith the adding new hotel form is empty or not.
    //if it is empty it shows the error message
  };

  const handleSearchResult = (searchResult) => {
    setHotels(searchResult);
    // the functions takes searchResult as argument and store it in state Hotels.
  };

  const handleInputChange = (event) => {
    setNewHotel({ ...newHotel, [event.target.name]: event.target.value });
    // Function for handling the user input and store it to the state NewHotel
  };

  const handleAddHotel = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const nameExists = hotels.some(hotel => hotel.name === newHotel.name);
      if (nameExists) {
        setErrors({ name: "A hotel with this name already exists" });
      } else {
        instance
          .post("/hotels", newHotel, {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then((response) => {
            setHotels([...hotels, { ...newHotel, id: response.data._id }]);
            setNewHotel({
              name: "",
              description: "",
              location: "",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
      setErrors(errors);
    }
    //when the user submits a form to add a new hotel, this function 
    // validate the form data, check if the hotel name already exists, and add the new hotel to the list of hotels.
    // It also check the error. if there is no error, it will post data to the api
    // else store the errors in the error state.
    //If the new hotel name already exists,
    // it sets an error message in the errors state object using the setErrors function.
  };
  

  const handleDeleteHotel = (id) => {
    setShowModal(true);
    setHotelToDelete(id);
    // function to delete hotel, pass id as paramter for deletion and
    //store the value true to the state showmodal and
    //current id save to the state state Hoteltodelete.
  };

  const handleConfirmDelete = () => {
    instance
      .delete(`/hotels/${hotelToDelete}`)
      .then(() => {
        const updatedHotels = hotels.filter(
          (item) => item.id !== hotelToDelete
        );
        setHotels(updatedHotels);
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
      });
   // Inside the function, the instance.delete() method is called with a URL parameter to 
   //delete the hotel with a specific id (hotelToDelete). If the delete request is successful, 
   //the hotels state is updated by filtering out the deleted hotel.
  };

  return (
    <div>
      <div>
        <Header />
        <Link to="/AdminPage" relative="path">
          Back To Admin Page
        </Link>
      </div>
      <h1>Hotel List</h1>
      <Search handleSearchResult={handleSearchResult} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getPageHotels().map((hotel) => (
            <tr key={hotel._id}>
              <td>{hotel.name}</td>
              <td>{hotel.description}</td>
              <td>{hotel.location}</td>
              <td>
                <button onClick={() => handleDeleteHotel(hotel._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <h1>Add hotel to the List</h1>
      <form className="Addform" onSubmit={handleAddHotel}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newHotel.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newHotel.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={newHotel.location}
            onChange={handleInputChange}
          />
        </label>

        <p style={{ color: "red" }}>{errors.name} </p>

        <button className="addhotel" type="submit">
          Add Hotel
        </button>
      </form>
      <Modal isOpen={showModal}>
        <div className="modal-content">
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete this hotel?</p>
          <div className="modal-buttons">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleConfirmDelete}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default HotelList;
