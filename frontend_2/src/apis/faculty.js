import axios from "../utils/axios";

const facultyServices = {
  // Load all faculty & staff
  loadFaculty: () =>
    axios.get("/api/faculty/faculty/"),

  // load faculty profile
  loadFacultyById: (id) => axios.get(`/api/faculty/faculty/${id}/`),
};

export default facultyServices;
