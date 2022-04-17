import axios from "../../utils/axios";

export const loadAlumniProfileData = (alumniId) => {
  return axios.get(`/api/alumni/${alumniId}`)
}

