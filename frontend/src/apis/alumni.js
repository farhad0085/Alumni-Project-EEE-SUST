import axios from "../utils/axios";

const alumniServices = {
  loadFeaturedAlumni: () =>
    axios.get("/api/alumni/alumni/", {
      params: { is_featured: true, page_size: 9 },
    }),

  loadBatchList: () => axios.get("/api/alumni/batches/", {
    params: { page_size: 100 } // usually we'll not have more than 30 batches in next 10 years
  }),
  loadBatchAlumni: (session, page = 1, page_size = 30) =>
    axios.get("/api/alumni/alumni/", {
      params: { "batch__session": session, page, page_size },
    }),

  loadAlumniById: (id) => axios.get(`/api/alumni/alumni/${id}`),
};

export default alumniServices;
