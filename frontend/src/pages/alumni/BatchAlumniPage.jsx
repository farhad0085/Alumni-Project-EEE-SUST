import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import RegularLayout from "layouts/Regular";
import apiServices from "../api-services";
import AlumniCard from "components/Alumni/AlumniCard";
import { setPageTitle } from "utils";

const BatchAlumniPage = () => {
  const { session } = useParams();
  const [loading, setLoading] = useState(true);
  const [alumniList, setAlumniList] = useState([]);
  const [batch, setBatch] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30);

  // first load batch data
  useEffect(() => {
    setLoading(true);
    apiServices
      .loadBatchList()
      .then(({ data }) => {
        const foundBatch = data.results?.find((b) => b.session === session) || null;
        setBatch(foundBatch);
      })
      .catch((error) => {
        console.error("Failed to fetch batches:", error);
      })
      .finally(() => setLoading(false));
  }, [session]);

  // then load alumni of that batch
  useEffect(() => {
    setPageTitle(`Batch ${session}`);

    const fetchBatchDetails = async () => {
      setLoading(true);
      try {
        const response = await apiServices.loadBatchAlumni(session, page);
        setAlumniList(response.data.results);
        setCount(response.data.count);
      } catch (error) {
        console.error("Failed to fetch batch details:", error);
        setAlumniList([])
        setCount(0)
      } finally {
        setLoading(false);
      }
    };

    fetchBatchDetails();
  }, [session]);

  if (loading) {
    return (
      <RegularLayout>
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      </RegularLayout>
    );
  }

  if (!batch) {
    setPageTitle("Batch not found")
    return (
      <RegularLayout>
        <Container className="mt-5 text-center">
          <p className="text-muted">Batch not found.</p>
          <Link to="/alumni" className="btn btn-primary">
            Back to Batches
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
            <Link to="/alumni">Batches</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{batch.session}</BreadcrumbItem>
        </Breadcrumb>

        {/* Batch Header */}
        <Card className="shadow-sm mb-4">
          <CardBody>
            <Row className="align-items-center">
              <Col md={8}>
                <CardTitle tag="h3" className="text-primary mb-2">
                  Batch {batch.session} {batch.batch_name ? `(${batch.batch_name})` : ""}
                </CardTitle>
                <CardText className="text-muted">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div>
                      <strong>Total Students:</strong> {batch.total_students}
                    </div>
                    {batch.total_alumnies !== undefined && (
                      <div>
                        <strong>Total Alumni:</strong> {batch.total_alumnies}
                      </div>
                    )}
                  </div>
                </CardText>
              </Col>
              {batch.batch_pictures?.length > 0 && (
                <Col md={4} className="text-md-right text-center">
                  <img
                    src={batch.batch_pictures[0].picture}
                    alt={batch.session}
                    style={{
                      height: "150px",
                      width: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.replaceWith(
                        Object.assign(document.createElement("div"), {
                          textContent: "No Image",
                          className: "text-muted small",
                          style:
                            "height:150px;width:100%;display:flex;align-items:center;justify-content:center;background:#f8f9fa;border-radius:8px;",
                        })
                      );
                    }}
                  />
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>

        {/* Alumni List */}
        <h4 className="mb-3 text-secondary">Alumni Members</h4>
        {alumniList.length === 0 ? (
          <p className="text-muted text-center">No alumni available for this batch.</p>
        ) : (
          <Row>
            {alumniList.map((alumni) => (
              <Col md={6} lg={4} key={alumni.id} className="mb-4">
                <AlumniCard alumni={alumni} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </RegularLayout>
  );
};

export default BatchAlumniPage;
