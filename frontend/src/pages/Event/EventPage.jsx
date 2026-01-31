import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import apiServices from "../../apis/events";
import PageNumberPagination from "../../components/common/Pagination/PageNumberPagination";
import { setPageTitle } from "../../utils";
import { Badge, Breadcrumb, BreadcrumbItem, Spinner, Button } from "reactstrap";
import Layout from "../../components/Layout";
import styles from "./EventPage.module.scss";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const totalPages = Math.ceil(count / pageSize);
  setPageTitle("Events");

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
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Events</BreadcrumbItem>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-4">
        <h1 className={styles.pageTitle}>Upcoming Events</h1>
        <p className={styles.subtitle}>
          Stay engaged with departmental seminars, workshops, and special events.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      ) : events.length === 0 ? (
        <div className={styles.noEvents}>No upcoming events available.</div>
      ) : (
        <>
          <div className="row">
            {events.map(event => (
              <div className="col-md-6 col-lg-4 mb-4" key={event.id}>
                <div className={styles.eventCard}>
                  {event.banner ? (
                    <img
                      src={event.banner}
                      alt={event.title}
                      className={styles.cardImg}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.replaceWith(
                          Object.assign(document.createElement("div"), {
                            textContent: "No Image",
                            className: `${styles.cardImg} d-flex align-items-center justify-content-center bg-light text-muted`,
                          })
                        );
                      }}
                    />
                  ) : (
                    <div className={`${styles.cardImg} d-flex align-items-center justify-content-center bg-light text-muted`}>
                      No Image
                    </div>
                  )}
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{event.title}</h4>
                    <div className={styles.badges}>
                      <Badge color="success" pill>
                        {new Date(event.date).toLocaleDateString()}
                      </Badge>
                      {event.time && (
                        <Badge color="secondary" pill>
                          {event.time}
                        </Badge>
                      )}
                    </div>
                    {event.location && (
                      <div className={styles.location}>
                        <i className="fas fa-map-marker-alt"></i> {event.location}
                      </div>
                    )}
                    {event.summary && (
                      <div className={styles.summary}>
                        {event.summary.length > 150
                          ? event.summary.substring(0, 150) + "..."
                          : event.summary}
                      </div>
                    )}
                    {event.description && (
                      <Button
                        color="primary"
                        size="sm"
                        tag={Link}
                        to={`/events/${event.id}`}
                        className="mt-2 w-100"
                      >
                        Learn More
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
    </Layout>
  );
};

export default EventPage;
