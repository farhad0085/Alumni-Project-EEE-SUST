import { useEffect, useState } from "react";
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
  Badge,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import apiServices from "../../apis/alumni";
import AlumniCard from "../../components/Alumni/AlumniCard";
import { setPageTitle } from "../../utils";
import PageNumberPagination from "../../components/common/Pagination/PageNumberPagination";
import Layout from "../../components/layouts/Layout";
import { HOME_PAGE } from "../../routes/urls";

const BatchAlumniPage = () => {
  const { session } = useParams();
  const [loading, setLoading] = useState(true);
  const [alumniList, setAlumniList] = useState([]);
  const [batch, setBatch] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(30);
  const totalPages = Math.ceil(count / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, count);

  useEffect(() => {
    setLoading(true);
    apiServices
      .loadBatchList()
      .then(({ data }) => {
        const foundBatch =
          data.results?.find((b) => b.session === session) || null;
        setBatch(foundBatch);
      })
      .finally(() => setLoading(false));
  }, [session]);

  useEffect(() => {
    setPageTitle(`Batch ${session}`);

    const fetchBatchDetails = async () => {
      setLoading(true);
      try {
        const response = await apiServices.loadBatchAlumni(session, page);
        setAlumniList(response.data.results);
        setCount(response.data.count);
      } catch {
        setAlumniList([]);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBatchDetails();
  }, [page, session]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center my-5">
        <Spinner color="primary" />
        <div className="text-muted mt-2">Loading alumni…</div>
      </div>
    );
  }

  if (!batch) {
    setPageTitle("Batch not found");
    return (
      <Container className="mt-5 text-center">
        <h4 className="mb-2">Batch not found</h4>
        <p className="text-muted">
          The batch you are looking for does not exist.
        </p>
        <Link to="/alumni" className="btn btn-primary mt-2">
          Back to Batches
        </Link>
      </Container>
    );
  }

  return (
    <Layout>
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb className="mb-3">
          <BreadcrumbItem>
            <Link to={HOME_PAGE}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/alumni">Batches</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{batch.session}</BreadcrumbItem>
        </Breadcrumb>

        {/* Hero Header */}
        <Card className="border-0 shadow-sm mb-4 overflow-hidden">
          <Row className="g-0 align-items-stretch">
            <Col md={8}>
              <CardBody className="d-flex flex-column justify-content-center h-100">
                <CardTitle tag="h2" className="mb-2">
                  Batch {batch.session}
                  {batch.batch_name && (
                    <span className="text-muted">
                      {" "}
                      — {batch.batch_name}
                    </span>
                  )}
                </CardTitle>

                <div className="text-muted mb-3">
                  Explore alumni who graduated in this session.
                </div>

                <div className="d-flex gap-3">
                  <Badge color="primary" pill>
                    {batch.total_students} Students
                  </Badge>
                  <Badge color="success" pill>
                    {batch.total_alumnies} Alumni
                  </Badge>
                </div>
              </CardBody>
            </Col>

            <Col md={4}>
              {batch.batch_pictures?.length > 0 ? (
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
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center bg-light text-muted">
                  No Image
                </div>
              )}
            </Col>
          </Row>
        </Card>

        {/* Alumni Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Alumni Members</h4>
          <span className="text-muted small">
            Showing {start} — {end} of {count}
          </span>
        </div>

        {alumniList.length === 0 ? (
          <Card className="border-0 shadow-sm text-center p-4">
            <h5>No alumni found</h5>
            <p className="text-muted mb-0">
              This batch has no registered alumni yet.
            </p>
          </Card>
        ) : (
          <>
            <Row>
              {alumniList.map((alumni) => (
                <Col md={6} lg={4} xl={4} key={alumni.id} className="mb-4">
                  <AlumniCard alumni={alumni} />
                </Col>
              ))}
            </Row>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <PageNumberPagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                  maxVisible={5}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </Layout>
  );
};

export default BatchAlumniPage;
