import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import apiServices from "../../apis/events";
import PageNumberPagination from "../../components/common/Pagination/PageNumberPagination";
import { setPageTitle } from "../../utils";
import styles from "./styles.module.scss";
import { Spinner } from "reactstrap";
import { FaMapMarkerAlt } from "react-icons/fa";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const totalPages = Math.ceil(count / pageSize);
  setPageTitle("Events");

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await apiServices.loadEvents(page, pageSize);
        setEvents(response.data.results);
        setCount(response.data.count);
      } catch (err) {
        console.error("Failed to load events:", err);
        setEvents([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [page]);

  return (
    <div>

      <h1 className="page-title">Events</h1>
      {/* Loading */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.grid}>
            {events.length > 0 ? (
              events.map((event) => (
                <div className={styles.card} key={event.id}>
                  {event.banner && (
                    <img
                      src={event.banner}
                      alt={event.title}
                      className={styles.cardImage}
                    />
                  )}

                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{event.title}</h4>

                    <div className={styles.badgeRow}>
                      <span className={`${styles.badge} ${styles.badgeInfo}`}>
                        {new Date(event.date).toLocaleDateString()}
                      </span>

                      {event.time && (
                        <span className={`${styles.badge} ${styles.badgeSecondary}`}>
                          {event.time}
                        </span>
                      )}
                    </div>

                    {event.location && (
                      <p className={styles.location}>
                        <FaMapMarkerAlt className={styles.locationIcon} />
                        {event.location}
                      </p>
                    )}

                    <p className={styles.summary}>
                      {event.summary?.length > 150
                        ? event.summary.substring(0, 150) + "..."
                        : event.summary}
                    </p>

                    {event.description && (
                      <Link
                        to={`/events/${event.id}`}
                        className={styles.btnPrimary}
                      >
                        Learn More
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noEvents}>No upcoming events available.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <PageNumberPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              maxVisible={5}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
