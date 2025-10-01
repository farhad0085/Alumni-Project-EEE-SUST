import axios from "utils/axios";

const apiServices = {
  loadFeaturedAlumni: () =>
    axios.get("/api/alumnies/", {
      params: { is_featured: true, page_size: 9 },
    }),

  // Load notices with pagination
  loadNotices: (page = 1, page_size = 30) =>
    axios.get("/api/notice/notices/", {
      params: { page, page_size },
    }),
};

export default apiServices;
