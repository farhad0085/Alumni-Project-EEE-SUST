import axios from "../../utils/axios";

const apiServices = {
  loadFeaturedAlumnies: () =>
    axios.get("/api/alumnies/", {
      params: { is_featured: true, page_size: 8 },
    }),
};

export default apiServices;
