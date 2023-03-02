import React from "react";

import data from '../data.json';

export const GetUsers =() =>
 {
 const [users, setUser] = React.useState(data);
  return [users,setUser]; 
  
};
