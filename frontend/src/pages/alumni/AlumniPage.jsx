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
import { Link, useHistory } from "react-router-dom";
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";
import { setPageTitle } from "utils";

const BatchList = () => {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const history = useHistory();

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
                      <dl className="mb-2">
                        <dt>Total Students:</dt>
                        <dd>{batch.total_students}</dd>
                      </dl>
                      <dl className="mb-2">
                        <dt>Total Alumni:</dt>
                        <dd>{batch.total_alumnies || "N/A"}</dd>
                      </dl>
                    </CardText>

                    <Button
                      color="outline-primary"
                      block
                      onClick={() => history.push(`/batches/${batch.session}`)}
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
