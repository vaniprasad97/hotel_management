import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/64b3865645984b50b7560aea112fc734",
});

export default instance;
