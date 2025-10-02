import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Spinner,
  CardImg,
} from "reactstrap";
import RegularLayout from "layouts/Regular";
import apiServices from "./api-services";
import defaultThumb from "assets/icons/thumbnail.png";

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const response = await apiServices.loadFaculty(); // all members
        setFaculty(response.data.results);
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  // Split by role
  const head = faculty.find((m) => m.role === "head");
  const otherFaculty = faculty.filter((m) => ["faculty", "head"].includes(m.role));
  const staff = faculty.filter((m) => m.role === "staff");

  // Card component
  const FacultyCard = ({ member }) => (
    <Card className="shadow-sm h-100">
      <CardImg
        top
        alt="Profile"
        src={member.photo ? member.photo : defaultThumb}
        style={{ height: "220px", objectFit: "cover" }}
      />
      <CardBody>
        <CardTitle tag="h4">{member.name}</CardTitle>
        <CardText>
          <strong>{member.designation}</strong>
          <br />
          {member.department}
        </CardText>
        <div className="d-flex gap-2">
          {member.email && (
            <Button
              color="secondary"
              size="sm"
              href={`mailto:${member.email}`}
            >
              <i className="fas fa-envelope me-2"></i>Email
            </Button>
          )}
          {member.phone && (
            <Button
              color="secondary"
              size="sm"
              href={`tel:${member.phone}`}
            >
              <i className="fas fa-phone me-2"></i>Call
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <RegularLayout>
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="display-5 text-primary">Faculty & Staff</h1>
            <p className="text-muted">
              Meet the faculty members, department head, and office staff of the Department of Electrical & Electronic Engineering at SUST.
            </p>
          </Col>
        </Row>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            {/* Department Head */}
            {head && (
              <section className="mb-5">
                <h2 className="mb-4 text-dark">Department Head</h2>
                <Row>
                  <Col md="4">
                    <FacultyCard member={head} />
                  </Col>
                </Row>
              </section>
            )}

            {/* Faculty Members */}
            {otherFaculty.length > 0 && (
              <section className="mb-5">
                <h2 className="mb-4 text-dark">Faculty Members</h2>
                <Row>
                  {otherFaculty.map((member) => (
                    <Col md="4" sm="6" className="mb-4" key={member.id}>
                      <FacultyCard member={member} />
                    </Col>
                  ))}
                </Row>
              </section>
            )}

            {/* Office Staff */}
            {staff.length > 0 && (
              <section className="mb-5">
                <h2 className="mb-4 text-dark">Office Staffs</h2>
                <Row>
                  {staff.map((member) => (
                    <Col md="4" sm="6" className="mb-4" key={member.id}>
                      <FacultyCard member={member} />
                    </Col>
                  ))}
                </Row>
              </section>
            )}
          </>
        )}
      </Container>
    </RegularLayout>
  );
};

export default FacultyPage;
