import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/ace400d2a2da485195dc80102b8901db",
});

export default instance;
