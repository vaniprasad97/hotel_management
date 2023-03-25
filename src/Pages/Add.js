import React, { useEffect, useState } from "react";
import userData from "../assets/Userdata";
import instance from "../axiosconfig";

function Add() {
  const [users, setUsers] = useState([]);
  console.log(userData);
  useEffect(() => {
    instance
      .post("/users", userData)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    // useEffect hook that makes a Get request to retrieve data from the api/assignhotel.
    //And stores it in the AssignhotelAPI
  }, []);
  return <div>Add</div>;
}

export default Add;
