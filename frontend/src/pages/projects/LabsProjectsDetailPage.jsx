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
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";

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
      <RegularLayout>
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      </RegularLayout>
    );
  }

  if (!item) {
    return (
      <RegularLayout>
        <Container className="mt-5 text-center">
          <p className="text-muted">{type === "lab" ? "Lab" : "Project"} not found.</p>
          <Link to={`/${type === "lab" ? "labs" : "projects"}`}>
            <button className="btn btn-primary">Back</button>
          </Link>
        </Container>
      </RegularLayout>
    );
  }

  return (
    <RegularLayout>
      <Container className="mt-4">
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
                {item.description && (
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </RegularLayout>
  );
};

export default LabsProjectsDetailPage;
