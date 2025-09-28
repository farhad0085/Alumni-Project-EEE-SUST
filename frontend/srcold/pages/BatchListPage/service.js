import axios from "../../utils/axios";

const apiServices = {
  loadBatchList: () =>
    axios.get("/api/batches/"),
};

export default apiServices;
