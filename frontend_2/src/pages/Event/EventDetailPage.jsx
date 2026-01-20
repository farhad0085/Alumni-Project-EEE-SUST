import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiServices from "../../apis/events";
import { setPageTitle } from "../../utils";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
} from "reactstrap";
import Layout from "../../components/Layout";

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
      <Container className="text-center">
        <p className="text-muted">Event not found.</p>
        <Link to="/events">
          <button className="btn btn-primary">Back to Events</button>
        </Link>
      </Container>
    );
  }

  return (
    <Layout>
      <Container>
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

        <Card className="shadow-lg">
          <CardBody>
            <Row>
              {/* Left: Banner */}
              <Col md="5" className="text-center mb-3 mb-md-0">
                {item.banner && (
                  <CardImg
                    top
                    src={item.banner}
                    alt={item.title}
                    style={{
                      maxHeight: "320px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </Col>

              {/* Right: Info */}
              <Col md="7">
                <CardTitle tag="h2" className="text-primary mb-3">
                  {item.title}
                </CardTitle>

                {item.summary && (
                  <CardText className="text-muted mb-3">{item.summary}</CardText>
                )}

                {/* Event Meta */}
                <ul className="list-unstyled text-muted">
                  {item.date && (
                    <li>
                      <i className="fas fa-calendar-alt mr-2 text-primary"></i>
                      {new Date(item.date).toLocaleDateString()}
                    </li>
                  )}
                  {item.time && (
                    <li>
                      <i className="fas fa-clock mr-2 text-primary"></i>
                      {item.time.substring(0, 5)}
                    </li>
                  )}
                  {item.location && (
                    <li>
                      <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                      {item.location}
                    </li>
                  )}
                </ul>

                {/* Optional tags (if you add them later) */}
                {item.tags?.length > 0 && (
                  <div className="mt-2">
                    {item.tags.map((tag, i) => (
                      <Badge key={i} color="info" className="me-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </Col>
            </Row>

            {/* Full Description */}
            {item.description && (
              <Row>
                <Col>
                  <h3 className="mt-4 mb-2">About this Event</h3>
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </Col>
              </Row>
            )}

            {/* Published Date */}
            {item.created_at && (
              <Row>
                <Col>
                  <p className="text-muted mt-4">
                    <small>
                      Published on {new Date(item.created_at).toLocaleDateString()}
                    </small>
                  </p>
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};

export default EventDetailPage;
