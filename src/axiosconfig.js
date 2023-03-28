import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/206a35c4a5fd4c0caafe8b833115b847",
});

export default instance;
