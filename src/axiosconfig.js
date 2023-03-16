import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/2ee54a7aa81a417d8608b23870b71868",
});

export default instance;
