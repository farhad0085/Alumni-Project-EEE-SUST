import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Badge,
} from "reactstrap";
import apiServices from "../../apis/alumni";
import defaultMale from "../../assets/images/default-male.jpg";
import defaultFemale from "../../assets/images/default-female.jpg";
import Layout from "../../components/layouts/Layout";
import styles from "./AlumniProfilePage.module.scss";

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
      <div className="text-center mt-5">
        <p className="text-muted">Alumni not found.</p>
        <Link to="/alumni">
          <Button color="primary">Back</Button>
        </Link>
      </div>
    );
  }

  const photo =
    alumni.profile_picture?.picture ||
    (alumni.gender === "female" ? defaultFemale : defaultMale);

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/alumni">Alumni</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{alumni.name}</BreadcrumbItem>
      </Breadcrumb>

      <Card className={`${styles.card} border-0 shadow-sm`}>
        <CardBody>
          <Row>
            {/* LEFT */}
            <Col md="4" className="text-center">
              <div className={styles.avatarWrapper}>
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
              </div>

              <h3 className={styles.name}>{alumni.name}</h3>

              <div className={styles.role}>
                {alumni.designation || "—"}{" "}
                {alumni.company && `@ ${alumni.company}`}
              </div>

              <div className="d-flex justify-content-center gap-2 mt-3">
                {alumni.email && (
                  <Button size="sm" color="primary" href={`mailto:${alumni.email}`}>
                    <i className="fas fa-envelope"></i> Email
                  </Button>
                )}
                {alumni.contact_number && (
                  <Button size="sm" color="success" href={`tel:${alumni.contact_number}`}>
                    <i className="fas fa-phone"></i> Call
                  </Button>
                )}
              </div>
            </Col>

            {/* RIGHT */}
            <Col md="8">
              <h4 className="mb-3">Profile Details</h4>

              <div className={styles.grid}>
                <div>
                  <span>Batch</span>
                  <strong>
                    {alumni.batch?.session} ({alumni.batch?.batch_name})
                  </strong>
                </div>

                <div>
                  <span>Graduation</span>
                  <strong>{alumni.graduation_year || "—"}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <Badge className="text-white" color={alumni.is_employed ? "success" : "secondary"}>
                    {alumni.is_employed ? "Employed" : "Unemployed"}
                  </Badge>
                </div>

                <div>
                  <span>Registration</span>
                  <strong>{alumni.registration_number || "—"}</strong>
                </div>

                <div>
                  <span>DOB</span>
                  <strong>
                    {alumni.date_of_birth
                      ? new Date(alumni.date_of_birth).toLocaleDateString()
                      : "—"}
                  </strong>
                </div>
              </div>

              <div className={styles.addressBlock}>
                <div>
                  <span>Present Address</span>
                  <p>
                    {alumni.present_address?.address},{" "}
                    {alumni.present_address?.city},{" "}
                    {alumni.present_address?.country}
                  </p>
                </div>

                <div>
                  <span>Permanent Address</span>
                  <p>
                    {alumni.permanent_address?.address},{" "}
                    {alumni.permanent_address?.city},{" "}
                    {alumni.permanent_address?.country}
                  </p>
                </div>
              </div>
            </Col>
          </Row>

          {alumni.biography && (
            <div className={styles.bio}>
              <h4>Biography</h4>
              <p>{alumni.biography}</p>
            </div>
          )}
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AlumniProfilePage;
