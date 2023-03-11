import React, { useState } from "react";
import "../Styles/AdminPage.css"
import axios from "axios";
import { useEffect } from "react";

const Search = ({ handleSearchResult }) => {
    const [hotelsData, setHotelsData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get("https://crudcrud.com/api/59f0fd0edf8c44458af13e3b0ff47a90/hotels")
      .then((response) => {
        setHotelsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  }; // function to handle the user input and store it in a state called searchText

  const handleSearch = () => {
    const searchResult = hotelsData.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchText.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchText.toLowerCase())
    );
    handleSearchResult(searchResult);
  }; // function to check whether the searching data matches with hotels data.

  return (
    <div className="search-container">
      <label>
        <h1>Search Hotel</h1>
        <input className="search-input" type="text" value={searchText} onChange={handleSearchTextChange}
        required />
      </label>
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
