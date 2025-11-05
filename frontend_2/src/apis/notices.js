import axios from "../utils/axios";

const noticeServices = {
  // Load notices with pagination
  loadNotices: (page = 1, page_size = 30) =>
    axios.get("/api/notice/notices/", {
      params: { page, page_size },
    }),
};

export default noticeServices;
