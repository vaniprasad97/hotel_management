import React, { useEffect, useState } from "react";
import userData from "../assets/Userdata";
import instance from "../axiosconfig";
import { encrypt } from "../utlis/encrypt";

function Add() {
  console.log(userData);
  useEffect(() => {
    userData.users.map((user) => {
      instance
        .post("/users", { ...user, password: encrypt(user.password) })
        .then((response) => {})
        .catch((error) => {
          // console.error(error);
        });
    });

    // useEffect hook that makes a Get request to retrieve data from the api/assignhotel.
    //And stores it in the AssignhotelAPI
  }, []);
  return <div>Add</div>;
}

export default Add;
