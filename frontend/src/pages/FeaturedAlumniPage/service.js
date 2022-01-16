import axios from "../../utils/axios";

const apiServices = {
  loadAlumnies: () => axios.get("/api/alumnies/"),
};

export default apiServices;
