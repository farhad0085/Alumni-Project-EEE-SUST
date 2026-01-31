import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiServices from "../../apis/events";
import { setPageTitle } from "../../utils";
import { Spinner, Breadcrumb, BreadcrumbItem, Badge, Row, Col } from "reactstrap";
import Layout from "../../components/Layout";
import styles from "./EventDetailPage.module.scss";

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
      <div className="d-flex justify-content-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center my-5">
        <p className="text-muted">Event not found.</p>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  const eventDate = new Date(item.date).toLocaleDateString();

  return (
    <Layout>
      <div className="container my-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/events">Events</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{item.title}</BreadcrumbItem>
        </Breadcrumb>

        {/* Card */}
        <div className={styles.cardWrapper}>
          <Row>
            {/* Left: Banner */}
            {item.banner && (
              <Col md="5" className="mb-3 mb-md-0 text-center">
                <img
                  src={item.banner}
                  alt={item.title}
                  className={styles.banner}
                />
              </Col>
            )}

            {/* Right: Info */}
            <Col md={item.banner ? 7 : 12}>
              <h2 className={styles.title}>{item.title}</h2>
              {item.summary && <div className={styles.summary}>{item.summary}</div>}

              {/* Meta info */}
              <ul className={styles.metaList}>
                {item.date && (
                  <li>
                    <i className="fas fa-calendar-alt"></i> {eventDate}
                  </li>
                )}
                {item.time && (
                  <li>
                    <i className="fas fa-clock"></i> {item.time.substring(0, 5)}
                  </li>
                )}
                {item.location && (
                  <li>
                    <i className="fas fa-map-marker-alt"></i> {item.location}
                  </li>
                )}
              </ul>

              {/* Tags */}
              {item.tags?.length > 0 && (
                <div className={styles.tags}>
                  {item.tags.map((tag, i) => (
                    <Badge key={i}>{tag}</Badge>
                  ))}
                </div>
              )}
            </Col>
          </Row>

          {/* Full Description */}
          {item.description && (
            <>
              <div className={styles.sectionTitle}>
                <h3>Description</h3>
                <hr />
              </div>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </>
          )}

          {/* Published */}
          {item.created_at && (
            <div className={styles.published}>
              Published on {new Date(item.created_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </Layout >
  );
};

export default EventDetailPage;
