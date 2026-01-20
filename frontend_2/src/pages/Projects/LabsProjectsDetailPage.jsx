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
        setPageTitle(response.data.name || response.data.title)
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
        <p className="text-muted">{type === "lab" ? "Lab" : "Project"} not found.</p>
        <Link to={"/labs-projects"}>
          <button className="btn btn-primary">Back</button>
        </Link>
      </Container>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={'/labs-projects'}>
            Labs & Projects
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{item.name || item.title}</BreadcrumbItem>
      </Breadcrumb>

      <Card className="shadow-lg">
        <CardBody>
          <Row>
            <Col md="5" className="text-center">
              <CardImg
                top
                src={item.thumbnail}
                alt={item.name || item.title}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Col>
            <Col md="7">
              <CardTitle tag="h2" className="text-primary mb-3">
                {item.name || item.title}
              </CardTitle>
              {item.summary && (
                <CardText className="text-muted mb-3">{item.summary}</CardText>
              )}
            </Col>
          </Row>
          {item.description && (
            <Row>
              <Col>
                <CardText tag={"h3"} className="mt-4 mb-0">
                  About
                </CardText>
                <hr className="mt-2" />
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    </Layout>
  );
};

export default LabsProjectsDetailPage;
