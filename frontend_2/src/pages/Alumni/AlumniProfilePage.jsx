import { useEffect, useState } from "react";
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
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import apiServices from "../../apis/alumni";
import defaultMale from "../../assets/images/default-male.jpg";
import defaultFemale from "../../assets/images/default-female.jpg";
import Layout from "../../components/Layout";

const AlumniProfilePage = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        const response = await apiServices.loadAlumniById(id);
        setAlumni(response.data);
      } catch (err) {
        console.error("Failed to load alumni:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!alumni) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-muted">Alumni not found.</p>
        <Link to="/alumni">
          <Button color="primary">Back to Alumni List</Button>
        </Link>
      </Container>
    );
  }

  const photo =
    alumni.profile_picture?.picture ||
    (alumni.gender === "female" ? defaultFemale : defaultMale);

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/alumni">Alumni</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{alumni.name}</BreadcrumbItem>
      </Breadcrumb>

      <Card className="shadow-lg">
        <CardBody>
          <Row>
            {/* Left Column: Photo */}
            <Col md="4" className="text-center mb-4 mb-md-0">
              <CardImg
                top
                src={photo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    alumni.gender === "female" ? defaultFemale : defaultMale;
                }}
                alt={alumni.name}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h4 className="mt-3">{alumni.name}</h4>
              {alumni.designation && (
                <p className="text-muted">{alumni.designation}</p>
              )}
              {alumni.company && (
                <p className="fw-bold text-primary">{alumni.company}</p>
              )}

              <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                {alumni.email && (
                  <Button
                    color="primary"
                    href={`mailto:${alumni.email}`}
                    className="mr-2"
                  >
                    <i className="fas fa-envelope mr-2"></i>Email
                  </Button>
                )}
                {alumni.contact_number && (
                  <Button
                    color="success"
                    href={`tel:${alumni.contact_number}`}
                  >
                    <i className="fas fa-phone mr-2"></i>Call
                  </Button>
                )}
              </div>
            </Col>

            {/* Right Column: Info */}
            <Col md="8">
              <CardTitle tag="h3" className="mb-3">
                Alumni Information
              </CardTitle>

              <CardText>
                {alumni.batch && (
                  <>
                    <strong>Batch:</strong> {alumni.batch.session} (
                    {alumni.batch.batch_name})
                    <br />
                  </>
                )}
                {alumni.graduation_year && (
                  <>
                    <strong>Graduation Year:</strong> {alumni.graduation_year}
                    <br />
                  </>
                )}
                {alumni.is_employed ? (
                  <>
                    <strong>Employment:</strong> Employed
                    <br />
                  </>
                ) : (
                  <>
                    <strong>Employment:</strong> Unemployed
                    <br />
                  </>
                )}
                {alumni.registration_number && (
                  <>
                    <strong>Registration No:</strong>{" "}
                    {alumni.registration_number}
                    <br />
                  </>
                )}
                {alumni.date_of_birth && (
                  <>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(alumni.date_of_birth).toLocaleDateString()}
                    <br />
                  </>
                )}
                {alumni.present_address && (
                  <>
                    <strong>Present Address:</strong>{" "}
                    {alumni.present_address.address},{" "}
                    {alumni.present_address.city},{" "}
                    {alumni.present_address.country}
                    <br />
                  </>
                )}
                {alumni.permanent_address && (
                  <>
                    <strong>Permanent Address:</strong>{" "}
                    {alumni.permanent_address.address},{" "}
                    {alumni.permanent_address.city},{" "}
                    {alumni.permanent_address.country}
                    <br />
                  </>
                )}
              </CardText>
            </Col>
          </Row>

          {/* Biography */}
          {alumni.biography && (
            <Row className="mt-4">
              <Col>
                <h4 className="text-dark mb-2">Biography</h4>
                <hr />
                <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
                  {alumni.biography}
                </p>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AlumniProfilePage;
