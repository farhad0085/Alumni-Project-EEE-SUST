import { useEffect, useState } from 'react';
import styles from '../../styles/scss/List.module.scss';
import noticeStyles from './styles.module.scss'
import { setPageTitle } from '../../utils';
import noticeServices from '../../apis/notices';
import PageNumberPagination from '../../components/common/Pagination/PageNumberPagination';
import { FaFilePdf } from "react-icons/fa";
import { Link } from 'react-router-dom'
import {
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import Layout from '../../components/layouts/Layout';
import { HOME_PAGE } from '../../routes/urls';

const NoticeBoard = () => {

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30); // matches backend default
  const totalPages = Math.ceil(count / pageSize);

  setPageTitle("Notices")

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await noticeServices.loadNotices(page);
        setNotices(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.error("Failed to load notices:", error);
        setNotices([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [page]);

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={HOME_PAGE}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Notices</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="page-title">Notice Board</h1>
      <p className="text-muted">
        Stay updated with the latest announcements and official notices.
      </p>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <div className={styles.listView}>
          {notices.length > 0 ? (
            notices.map(notice => (
              <div key={notice.id} className={styles.listItem}>
                <h3>{notice.title}</h3>
                <div className={styles.listItemMeta}>
                  <span>Date: {notice.date}</span>
                </div>
                <p>{notice.description}</p>

                {notice.pdf && (
                  <a
                    className={noticeStyles.pdfButton}
                    href={notice.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFilePdf className={noticeStyles.icon} />
                    View PDF
                  </a>
                )}
              </div>
            ))) : (
            <p className="text-muted">No notices available at the moment.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <PageNumberPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          maxVisible={5}
        />
      )}
    </Layout>
  );
};

export default NoticeBoard;
