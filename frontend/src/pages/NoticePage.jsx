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
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import RegularLayout from "layouts/Regular";
import apiServices from "./api-services";
import PageNumberPagination from "components/common/Pagination/PageNumberPagination";
import { setPageTitle } from "utils";
import { Link } from 'react-router-dom'

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30); // matches backend default
  setPageTitle("Notices")

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

  return (
    <RegularLayout>
      <Container className="mt-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Notices</BreadcrumbItem>
        </Breadcrumb>

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
                              <i className="fas fa-file-pdf mr-2"></i>
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

export default NoticePage;
