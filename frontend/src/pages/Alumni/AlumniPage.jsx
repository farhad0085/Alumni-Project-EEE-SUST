import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import apiServices from "../../apis/alumni";
import { setPageTitle } from "../../utils";
import Layout from "../../components/layouts/Layout";
import styles from "./AlumniPage.module.scss";
import { HOME_PAGE } from "../../routes/urls";

const AlumniPage = () => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);

  setPageTitle("Batches");

  useEffect(() => {
    setLoading(true);
    apiServices
      .loadBatchList()
      .then(({ data }) => {
        setBatches(data.results || []);
      })
      .catch((error) => {
        console.error("Failed to fetch batches:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const getBatchImage = (batch) => {
    const pictures = batch.batch_pictures?.map((p) => p.picture) || [];
    if (pictures.length > 0) {
      return (
        <img
          src={pictures[0]}
          alt={`${batch.session} thumbnail`}
          className="card-img-top"
          style={{ height: "225px", width: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.replaceWith(
              Object.assign(document.createElement("div"), {
                textContent: "Image failed to load",
                className: "text-muted small",
                style:
                  "height:225px;width:100%;font-style:italic;display:flex;align-items:center;justify-content:center;background:#f8f9fa;",
              })
            );
          }}
        />
      );
    }
    return (
      <div
        style={{
          height: "225px",
          width: "100%",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          fontSize: "0.9rem",
          fontStyle: "italic",
        }}
      >
        No Image
      </div>
    );
  };

  return (
    <Layout>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={HOME_PAGE}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Batches</BreadcrumbItem>
      </Breadcrumb>

      <div className={styles.header}>
        <h1>Our Batches</h1>
        <p className="text-muted">
          Browse alumni by graduating batch
        </p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      ) : batches.length === 0 ? (
        <p className="text-muted text-center">No batches available.</p>
      ) : (
        <Row>
          {batches.map((batch) => (
            <Col md={6} lg={4} key={batch.id} className="mb-4">
              <Card className={`${styles.card} h-100 border-0 shadow-sm`}>
                <div className={styles.imageWrapper}>
                  {getBatchImage(batch)}
                </div>

                <CardBody className="d-flex flex-column">
                  <CardTitle tag="h5" className={styles.title}>
                    {batch.session}
                    {batch.batch_name && (
                      <span className={styles.subtitle}>
                        {" "}({batch.batch_name})
                      </span>
                    )}
                  </CardTitle>

                  <CardText className={styles.meta}>
                    <div>
                      <strong>{batch.total_students}</strong>
                      <span> Students</span>
                    </div>
                    <div>
                      <strong>{batch.total_alumnies}</strong>
                      <span> Alumni</span>
                    </div>
                  </CardText>

                  <Button
                    color="primary"
                    size="sm"
                    tag={Link}
                    to={`/batches/${batch.session}`}
                    className="mt-auto"
                  >
                    View Alumni →
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Layout>
  );
};

export default AlumniPage;
