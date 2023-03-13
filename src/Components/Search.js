import React, { useState } from "react";
import "../Styles/AdminPage.css"
import { useEffect } from "react";
import instance from "../axiosconfig";

const Search = ({ handleSearchResult }) => {
    const [hotelsData, setHotelsData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    instance.get("/hotels")
      .then((response) => {
        setHotelsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    // function to handle the user input and store it in a state called searchText
  }; 

  const handleSearch = () => {
    const searchResult = hotelsData.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchText.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchText.toLowerCase())
    );
    handleSearchResult(searchResult);
     // function to check whether the searching data matches with hotels data.
  };

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
