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
} from "reactstrap";
import RegularLayout from "layouts/Regular";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated API fetch
  useEffect(() => {
    const mockNotices = [
      {
        id: 1,
        title: "Final Exam Routine (Fall 2023)",
        date: "2023-11-15",
        description:
          "The final exam routine for the Fall 2023 semester has been published. Please check your course schedules and prepare accordingly.",
        pdf: "/files/final_exam_fall_2023.pdf",
      },
      {
        id: 2,
        title: "EEE Alumni Meet 2023",
        date: "2023-12-05",
        description:
          "We are pleased to announce the upcoming EEE Alumni Meet. All graduates are encouraged to join and reconnect with friends and faculty.",
        pdf: "/files/alumni_meet_2023.pdf",
      },
      {
        id: 3,
        title: "Lab Safety Guidelines",
        date: "2023-10-20",
        description:
          "New lab safety protocols have been introduced. All students are required to review and follow the updated guidelines strictly.",
        pdf: null, // no PDF, only text
      },
    ];

    setTimeout(() => {
      setNotices(mockNotices);
      setLoading(false);
    }, 800);
  }, []);

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
                            <i className="fas fa-file-pdf me-2"></i> View PDF
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
        )}
      </Container>
    </RegularLayout>
  );
};

export default NoticePage;
