import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/03b9fc150f9d4b12ba8dc44cb817c9e8",
});

export default instance;
