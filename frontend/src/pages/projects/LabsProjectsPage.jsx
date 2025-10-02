import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";
import PageNumberPagination from "components/common/Pagination/PageNumberPagination";

const LabsProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("labs");

  const [labs, setLabs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 30;

  const totalPages = Math.ceil(count / pageSize);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "labs") {
          const res = await apiServices.loadLabs(page, pageSize);
          setLabs(res.data.results);
          setCount(res.data.count);
        } else {
          const res = await apiServices.loadProjects(page, pageSize);
          setProjects(res.data.results);
          setCount(res.data.count);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, page]);

  const renderCards = (items, isLab = true) =>
    items.map((item) => (
      <Col md="6" lg="4" key={item.id} className="mb-4">
        <Card className="h-100 shadow-sm">

          {item.thumbnail && (
            <Link to={`/labs-projects/${isLab ? "lab" : "project"}/${item.id}`} style={{ textDecoration: "none" }}>
              <CardImg
                top
                src={item.thumbnail}
                alt={isLab ? item.name : item.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
            </Link>
          )}
          <CardBody>
            <CardTitle tag="h5" className={isLab ? "text-primary" : "text-success"}>
              <Link to={`/labs-projects/${isLab ? "lab" : "project"}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                {isLab ? item.name : item.title}
              </Link>
            </CardTitle>
            <CardText>{item.summary}</CardText>
          </CardBody>
        </Card>
      </Col>
    ));

  // Reset page number when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <RegularLayout>
      <Container className="mt-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Labs & Projects</BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-center mb-5">Labs & Projects</h1>

        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn ${activeTab === "labs" ? "btn-primary" : "btn-outline-primary"} mx-2`}
            onClick={() => handleTabChange("labs")}
          >
            Labs
          </button>
          <button
            className={`btn ${activeTab === "projects" ? "btn-primary" : "btn-outline-primary"} mx-2`}
            onClick={() => handleTabChange("projects")}
          >
            Projects
          </button>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            <Row>
              {activeTab === "labs" ? renderCards(labs, true) : renderCards(projects, false)}
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

export default LabsProjectsPage;
