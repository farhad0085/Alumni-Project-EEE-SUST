import axios from "../../utils/axios";

const apiServices = {
  loadAlumnies: (session) =>
    axios.get("/api/alumnies/", {
      params: { "batch__session": session, page_size: 100 },
    }),
};

export default apiServices;
