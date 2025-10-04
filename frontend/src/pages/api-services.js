import axios from "utils/axios";

const apiServices = {
  loadFeaturedAlumni: () =>
    axios.get("/api/alumni/alumni/", {
      params: { is_featured: true, page_size: 9 },
    }),
  
  loadAlumniById: (id) => axios.get(`/api/alumni/alumni/${id}`),

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
  // Load event details
  loadEventById: (id) => axios.get(`/api/event/events/${id}`),

  // Load all faculty & staff
  loadFaculty: () =>
    axios.get("/api/faculty/faculty/"),

  // load faculty profile
  loadFacultyById: (id) => axios.get(`/api/faculty/faculty/${id}/`),

  // Load all labs
  loadLabs: (page = 1, page_size = 30) => axios.get("/api/faculty/labs/", {
    params: { page, page_size },
  }),

  // Load lab by ID
  loadLabById: (id) => axios.get(`/api/faculty/labs/${id}/`),

  // Load all projects
  loadProjects: (page = 1, page_size = 30) => axios.get("/api/faculty/projects/", {
    params: { page, page_size },
  }),

  // Load project by ID
  loadProjectById: (id) => axios.get(`/api/faculty/projects/${id}/`),
};

export default apiServices;
