import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiServices from "../../apis/events";
import { setPageTitle } from "../../utils";
import Spinner from "../../components/common/Spinner/Spinner";
import styles from "./styles.module.scss";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const EventDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await apiServices.loadEventById(id);
        setItem(response.data);
        setPageTitle(response.data.title);
      } catch (err) {
        console.error("Failed to load event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <Spinner />
    );
  }

  if (!item) {
    return (
      <div className={styles.notFound}>
        <p>Event not found.</p>
        <Link to="/events" className={styles.backBtn}>
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.left}>
          {item.banner && (
            <img
              src={item.banner}
              alt={item.title}
              className={styles.banner}
            />
          )}
        </div>

        <div className={styles.right}>
          <h2 className={styles.title}>{item.title}</h2>

          {item.summary && (
            <p className={styles.summary}>{item.summary}</p>
          )}

          <ul className={styles.meta}>
            {item.date && (
              <li>
                <FaCalendarAlt className={styles.icon} />
                {new Date(item.date).toLocaleDateString()}
              </li>
            )}
            {item.time && (
              <li>
                <FaClock className={styles.icon} />
                {item.time.substring(0, 5)}
              </li>
            )}
            {item.location && (
              <li>
                <FaMapMarkerAlt className={styles.icon} />
                {item.location}
              </li>
            )}
          </ul>

          {/* Tags (optional future feature) */}
          {item.tags?.length > 0 && (
            <div className={styles.tags}>
              {item.tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full Description */}
      {item.description && (
        <div className={styles.section}>
          <h3>About this Event</h3>
          <hr />
          <div
            dangerouslySetInnerHTML={{ __html: item.description }}
            className={styles.description}
          />
        </div>
      )}

      {/* Published */}
      {item.created_at && (
        <p className={styles.published}>
          <small>
            Published on{" "}
            {new Date(item.created_at).toLocaleDateString()}
          </small>
        </p>
      )}
    </div>
  );
};

export default EventDetailPage;
