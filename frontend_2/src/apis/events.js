import axios from "../utils/axios";

const eventServices = {
  // Load events with pagination (and optional upcoming filter)
  loadEvents: (page = 1, page_size = 30, upcoming = false) =>
    axios.get("/api/event/events/", {
      params: { page, page_size, upcoming },
    }),
  // Load event details
  loadEventById: (id) => axios.get(`/api/event/events/${id}`),
};

export default eventServices;
