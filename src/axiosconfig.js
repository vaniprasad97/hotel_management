import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/91b23fa6aed741f884be234f5fea3914",
});

export default instance;
