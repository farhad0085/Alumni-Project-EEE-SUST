import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge,
  Spinner,
  Button,
  CardImg,
} from "reactstrap";
import { Link } from 'react-router-dom'
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";
import PageNumberPagination from "components/common/Pagination/PageNumberPagination";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const totalPages = Math.ceil(count / pageSize);

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

  // Pagination helper
  const getPaginationNumbers = (current, total, maxVisible = 5) => {
    const pages = [];
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(current - 2, 1);
      let end = Math.min(start + maxVisible - 1, total);

      if (end - start < maxVisible - 1) start = Math.max(end - maxVisible + 1, 1);

      if (start > 1) pages.push(1, "left-ellipsis");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < total) pages.push("right-ellipsis", total);
    }
    return pages;
  };

  return (
    <RegularLayout>
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="display-5 text-primary">Upcoming Events</h1>
            <p className="text-muted">
              Stay engaged with departmental seminars, workshops, and special events.
            </p>
          </Col>
        </Row>

        {/* Loading */}
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            <Row>
              {events.length > 0 ? (
                events.map((event) => (
                  <Col md="6" lg="4" className="mb-4" key={event.id}>
                    <Card className="shadow-sm h-100">
                      {event.banner && (
                        <CardImg
                          top
                          alt={event.title}
                          src={event.banner}
                          style={{ height: "180px", objectFit: "cover" }}
                        />
                      )}
                      <CardBody>
                        <CardTitle tag="h4" className="mb-2">
                          {event.title}
                        </CardTitle>

                        <div className="mb-2">
                          <Badge color="info" pill className="me-2">
                            {new Date(event.date).toLocaleDateString()}
                          </Badge>
                          {event.time && (
                            <Badge color="secondary" pill>
                              {event.time}
                            </Badge>
                          )}
                        </div>

                        {event.location && (
                          <p className="text-muted mb-2">
                            <i className="fas fa-map-marker-alt mr-2 text-danger"></i>
                            {event.location}
                          </p>
                        )}

                        {/* Summary instead of description */}
                        <CardText className="flex-grow-1">
                          {event.summary?.length > 150
                            ? event.summary.substring(0, 150) + "..."
                            : event.summary}
                        </CardText>

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
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-muted">No upcoming events available.</p>
                </Col>
              )}
            </Row>

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
      </Container>
    </RegularLayout>
  );
};

export default EventPage;
