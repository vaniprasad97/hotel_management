import axios from "axios";

const instance = axios.create({
  baseURL: "https://crudcrud.com/api/e01434d244e64aaca796a5ceec2025c1",
});

export default instance;
