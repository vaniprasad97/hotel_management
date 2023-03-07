import React, { useState } from "react";
import Header from "../Components/Header";
import hotelsData from "../assets/Hoteldata.json";
import "../Styles/AdminPage.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";

const HotelList = () => {
  const [hotels, setHotels] = useState(hotelsData);
  const [newHotel, setNewHotel] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const PAGE_SIZE = 3; 
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(hotels.length / PAGE_SIZE);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getPageHotels = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return hotels.slice(startIndex, endIndex);
  };

  const handleInputChange = (event) => {
    setNewHotel({ ...newHotel, [event.target.name]: event.target.value });
  };

  const handleAddHotel = (event) => {
    event.preventDefault();
    setHotels([...hotels, { ...newHotel, id: hotels.length + 1 }]);
    setNewHotel({
      name: "",
      description: "",
      location: "",
    });
  };

  const handleDeleteHotel = (id) => {
    setShowModal(true);
    setHotelToDelete(id);
  };

  const handleConfirmDelete = () => {
    const updatedHotels = hotels.filter((item) => item.id !== hotelToDelete);
    setHotels(updatedHotels);
    setShowModal(false);
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
            <tr key={hotel.id}>
              <td>{hotel.name}</td>
              <td>{hotel.description}</td>
              <td>{hotel.location}</td>
              <td>
                <button onClick={() => handleDeleteHotel(hotel.id)}>
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
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newHotel.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={newHotel.location}
            onChange={handleInputChange}
            required
          />
        </label>
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
