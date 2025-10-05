import React, { useEffect, useState } from "react";
import {
  Container,
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
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";
import { setPageTitle } from "utils";

const BatchList = () => {
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
    <RegularLayout>
      <Container className="mt-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Batches</BreadcrumbItem>
        </Breadcrumb>

        <h1 className="display-5 text-primary mb-4">Our Batches</h1>

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
                <Card className="shadow-sm h-100">
                  {getBatchImage(batch)}

                  <CardBody>
                    <CardTitle tag="h5" className="text-primary">
                      {batch.session}
                      {batch.batch_name ? ` (${batch.batch_name})` : ""}
                    </CardTitle>

                    <CardText className="text-muted">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Total Students:</strong> {batch.total_students}
                        </div>
                        <div>
                          <strong>Total Alumni:</strong> {batch.total_alumnies}
                        </div>
                      </div>
                    </CardText>

                    <Button
                      color="primary"
                      block
                      size="sm"
                      tag={Link}
                      to={`/batches/${batch.session}`}
                    >
                      View Alumni
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </RegularLayout>
  );
};

export default BatchList;
