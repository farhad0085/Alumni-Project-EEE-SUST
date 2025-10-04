import React, { useEffect, useState } from "react";
import { Container, Col, Row, Spinner } from "reactstrap";
import RegularLayout from "layouts/Regular";
import AlumniCard from "components/Alumni/AlumniCard";
import apiServices from "../api-services";
import { setPageTitle } from "utils";

const AlumniPage = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  setPageTitle("Alumni")

  useEffect(() => {
    setLoading(true)
    apiServices.loadFeaturedAlumni()
      .then(({ data }) => {
        setAlumniList(data.results)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch alumni:", error);
        setLoading(false)
      })
  }, [])

  return (
    <RegularLayout>
      <Container className="mt-4">
        <h1 className="display-5 mb-4 text-primary">Our Alumni</h1>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner color="primary" />
          </div>
        ) : (
          <Row>
            {alumniList.length > 0 ? (
              alumniList.map((alumni) => (
                <Col lg={4} md={4} className="mb-4">
                  <AlumniCard key={alumni.id} alumni={alumni} />
                </Col>
              ))
            ) : (
              <p className="text-muted">No alumni found.</p>
            )}
          </Row>
        )}
      </Container>
    </RegularLayout>
  );
};

export default AlumniPage;
