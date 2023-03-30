import React, { useState } from "react";
import "../Styles/AdminPage.css";
import { useEffect } from "react";
import instance from "../axiosconfig";

const Search = ({ handleSearchResult }) => {
  const [hotelsData, setHotelsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchresult] = useState([]);

  useEffect(() => {
    instance
      .get("/hotels")
      .then((response) => {
        setHotelsData(response.data);
      })
      .catch((error) => {
        //    console.error(error);
      });
    // useEffect hook that makes an GET request to retrieve a list of hotels from an API.
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    // function to handle the user input and store it in a state called searchText
  };

  const handleSearch = () => {
    const searchTextLower = searchText.toLowerCase();
    const searchResult = hotelsData.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTextLower) ||
        hotel.location.toLowerCase().includes(searchTextLower)
    );

    setSearchresult(searchResult);
    handleSearchResult(searchResult);
    // The function first uses the filter() method to iterate over each hotel in the hotelsData array.
    // it checks whether the name or location contain the search text entered by the user.
    // The toLowerCase() method is for search case-insensitive.
    // If a hotel matches the search query, it is added to a new array called searchResult.
    // the handleSearchResult function is called and passed the searchResult array as an argument
  };

  return (
    <div className="search-container">
      <label>
        <h1>Search Hotel</h1>
        <input
          className="search-input"
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          required
        />
      </label>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
