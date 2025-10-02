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

  // Load events with pagination (and optional upcoming filter)
  loadEvents: (page = 1, page_size = 30, upcoming = false) =>
    axios.get("/api/event/events/", {
      params: { page, page_size, upcoming },
    }),
};

export default apiServices;
