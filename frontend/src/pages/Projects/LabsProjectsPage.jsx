import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import apiServices from "../../apis/labsProjects";
import PageNumberPagination from "../../components/common/Pagination/PageNumberPagination";
import { setPageTitle } from "../../utils";
import Layout from "../../components/Layout";
import styles from "./LabsProjects.module.scss";

const LabsProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("labs");

  const [labs, setLabs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const pageSize = 30;

  const totalPages = Math.ceil(count / pageSize);
  setPageTitle("Labs and Projects");

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
        <Card className={`${styles.card} h-100`}>
          <Link
            to={`/labs-projects/${isLab ? "lab" : "project"}/${item.id}`}
            className={styles.imageWrapper}
          >
            <CardImg
              top
              src={item.thumbnail}
              alt={isLab ? item.name : item.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </Link>

          <CardBody>
            <CardTitle
              tag="h5"
              className={`${styles.title} ${isLab ? "text-primary" : "text-success"
                }`}
            >
              <Link
                to={`/labs-projects/${isLab ? "lab" : "project"}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {isLab ? item.name : item.title}
              </Link>
            </CardTitle>

            <CardText className={styles.summary}>
              {item.summary?.length > 120
                ? item.summary.slice(0, 120) + "..."
                : item.summary}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    ));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Labs & Projects</BreadcrumbItem>
      </Breadcrumb>

      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Labs & Projects</h1>
          <p>Explore our research labs and innovative student projects</p>
        </div>

        <div className={styles.tabs}>
          <button
            className={`btn ${activeTab === "labs"
                ? "btn-primary"
                : "btn-outline-primary"
              } ${styles.tabBtn}`}
            onClick={() => handleTabChange("labs")}
          >
            🧪 Labs
          </button>
          <button
            className={`btn ${activeTab === "projects"
                ? "btn-success"
                : "btn-outline-success"
              } ${styles.tabBtn}`}
            onClick={() => handleTabChange("projects")}
          >
            🚀 Projects
          </button>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner color="primary" />
          </div>
        ) : (
          <>
            <Row>
              {activeTab === "labs"
                ? renderCards(labs, true)
                : renderCards(projects, false)}
            </Row>

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
      </div>
    </Layout>
  );
};

export default LabsProjectsPage;
