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
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import RegularLayout from "layouts/Regular";
import apiServices from "./api-services";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30); // matches backend default

  const totalPages = Math.ceil(count / pageSize);


  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await apiServices.loadNotices(page);
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

  // Function to generate page numbers with ellipsis
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
            <h1 className="display-5 text-primary">Notice Board</h1>
            <p className="text-muted">
              Stay updated with the latest departmental announcements, events, and circulars.
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
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <Col md="6" className="mb-4" key={notice.id}>
                    <Card className="shadow-sm h-100">
                      <CardBody>
                        <CardTitle tag="h4" className="mb-3">
                          {notice.title}{" "}
                          <Badge color="info" pill>
                            {new Date(notice.date).toLocaleDateString()}
                          </Badge>
                        </CardTitle>

                        <CardText className="text-muted">
                          {notice.description.length > 150
                            ? notice.description.substring(0, 150) + "..."
                            : notice.description}
                        </CardText>

                        <div className="d-flex gap-2">
                          {notice.pdf && (
                            <Button
                              color="danger"
                              size="sm"
                              href={notice.pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fas fa-file-pdf me-2"></i>
                              View PDF
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-muted">No notices available.</p>
                </Col>
              )}
            </Row>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <PaginationItem disabled={page === 1}>
                    <PaginationLink previous onClick={() => setPage(page - 1)} />
                  </PaginationItem>

                  {getPaginationNumbers(page, totalPages).map((p, idx) => {
                    if (p === "left-ellipsis" || p === "right-ellipsis") {
                      return (
                        <PaginationItem key={idx} disabled>
                          <PaginationLink>...</PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return (
                      <PaginationItem active={p === page} key={idx}>
                        <PaginationLink onClick={() => setPage(p)}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem disabled={page === totalPages}>
                    <PaginationLink next onClick={() => setPage(page + 1)} />
                  </PaginationItem>
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </RegularLayout>
  );
};

export default NoticePage;
