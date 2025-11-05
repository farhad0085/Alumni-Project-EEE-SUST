import axios from "utils/axios";

const labsProjectsServices = {
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

export default labsProjectsServices;
