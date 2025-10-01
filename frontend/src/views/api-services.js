import axios from "utils/axios";

const apiServices = {
  loadFeaturedAlumni: () =>
    axios.get("/api/alumnies/", {
      params: { is_featured: true, page_size: 9 },
    }),
};

export default apiServices;
