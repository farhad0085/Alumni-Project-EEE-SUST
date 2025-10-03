import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";
import defaultMale from "assets/icons/default-male.jpg";
import defaultFemale from "assets/icons/default-female.jpg";
import { setPageTitle, toTitleCase } from "utils";

const FacultyProfilePage = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const response = await apiServices.loadFacultyById(id);
        setFaculty(response.data);
        setPageTitle(response.data.name)
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [id]);

  if (loading) {
    return (
      <RegularLayout>
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      </RegularLayout>
    );
  }

  if (!faculty) {
    return (
      <RegularLayout>
        <Container className="mt-5 text-center">
          <p className="text-muted">Faculty not found.</p>
          <Link to="/faculty-staffs">
            <Button color="primary">Back to Faculty List</Button>
          </Link>
        </Container>
      </RegularLayout>
    );
  }

  const photo =
    faculty.photo || (faculty.gender === "female" ? defaultFemale : defaultMale);

  return (
    <RegularLayout>
      <Container className="mt-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/faculty-staffs">Faculty & Staff</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{faculty.name}</BreadcrumbItem>
        </Breadcrumb>
        <Card className="shadow-lg">
          <CardBody>
            <Row>
              {/* Left Column: Info */}
              <Col md="7" className="order-2 order-md-1">
                <CardTitle tag="h2" className="text-primary mt-2">
                  {faculty.name}
                </CardTitle>

                <CardText>
                  <strong>Designation:</strong> {faculty.designation}
                  <br />
                  <br />
                  <strong>Role:</strong> {faculty.role_display}
                  <br />
                  <br />
                  {faculty.email && (
                    <>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
                      <br />
                      <br />
                    </>
                  )}
                  {faculty.phone && (
                    <>
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${faculty.phone}`}>{faculty.phone}</a>
                      <br />
                      <br />
                    </>
                  )}
                  {faculty.gender && (
                    <>
                      <strong>Gender:</strong> {toTitleCase(faculty.gender)}
                      <br />
                    </>
                  )}
                </CardText>
              </Col>

              {/* Right Column: Photo + Buttons */}
              <Col md="5" className="text-center order-1 order-md-2">
                <CardImg
                  top
                  src={photo}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      faculty.gender === "female"
                        ? defaultFemale
                        : defaultMale;
                  }}
                  alt={faculty.name}
                  style={{ maxHeight: "320px", objectFit: "contain" }}
                />
                <CardText className="font-weight-bold mt-2">
                  {faculty.name}
                </CardText>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  {faculty.email && (
                    <Button color="primary" href={`mailto:${faculty.email}`}>
                      <i className="fas fa-envelope mr-2"></i>Email
                    </Button>
                  )}
                  {faculty.phone && (
                    <Button color="success" href={`tel:${faculty.phone}`}>
                      <i className="fas fa-phone mr-2"></i>Call
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            {/* Faculty Description */}
            {faculty.description && (
              <Row>
                <Col>
                  <h2 className="text-dark mb-3">Profile</h2>
                  <hr />
                  <div dangerouslySetInnerHTML={{ __html: faculty.description }} />
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>


      </Container>
    </RegularLayout>
  );
};

export default FacultyProfilePage;
