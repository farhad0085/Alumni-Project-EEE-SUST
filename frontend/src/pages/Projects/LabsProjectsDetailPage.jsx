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
} from "reactstrap";
import apiServices from "../../apis/labsProjects";
import { setPageTitle } from "../../utils";
import Layout from "../../components/Layout";
import styles from "./LabsProjectsDetail.module.scss";

const LabsProjectsDetailPage = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response =
          type === "lab"
            ? await apiServices.loadLabById(id)
            : await apiServices.loadProjectById(id);
        setItem(response.data);
        setPageTitle(response.data.name || response.data.title);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, type]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <Container className="mt-5 text-center">
        <p className="text-muted">
          {type === "lab" ? "Lab" : "Project"} not found.
        </p>
        <Link to="/labs-projects" className="btn btn-primary">
          Back
        </Link>
      </Container>
    );
  }

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/labs-projects">Labs & Projects</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{item.name || item.title}</BreadcrumbItem>
      </Breadcrumb>

      <div className={styles.wrapper}>
        <Card className="border-0 bg-transparent">
          <CardBody>
            <Row className="align-items-center">
              <Col md="5" className="text-center mb-3 mb-md-0">
                <CardImg
                  top
                  src={item.thumbnail}
                  alt={item.name || item.title}
                  className={styles.heroImage}
                  style={{ maxHeight: "340px", objectFit: "cover" }}
                />
              </Col>

              <Col md="7">
                <span
                  className={`${styles.badge} ${type === "lab" ? styles.lab : styles.project
                    }`}
                >
                  {type === "lab" ? "Lab" : "Project"}
                </span>

                <CardTitle tag="h2" className={styles.title}>
                  {item.name || item.title}
                </CardTitle>

                {item.summary && (
                  <CardText className={styles.summary}>
                    {item.summary}
                  </CardText>
                )}
              </Col>
            </Row>

            {item.description && (
              <Row>
                <Col>
                  <h3 className={`mt-4 ${styles.sectionTitle}`}>About</h3>
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </Col>
              </Row>
            )}
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default LabsProjectsDetailPage;
