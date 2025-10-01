import TopNavbar from "components/Navbars/TopNavbar";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

function RegularLayout({ children }) {
  return (
    <>
      <TopNavbar />
      <div className="main-content">{children}</div>
      {/* Footer */}
      <footer className="bg-dark text-center text-lg-start mt-5 border-top">
        <Container className="py-4">
          <Row className="align-items-center">
            <Col md="6" className="text-md-start text-center mb-3 mb-md-0">
              <h6 className="mb-0 fw-bold text-muted">EEE SUST Web Portal</h6>
              <small className="text-muted">
                Shahjalal University of Science & Technology
              </small>
            </Col>
            <Col md="6" className="text-md-end text-center">
              <a href="/admin/notices" className="text-muted mx-2 text-decoration-none">
                Notices
              </a>
              <a href="/admin/events" className="text-muted mx-2 text-decoration-none">
                Events
              </a>
              <a href="/admin/faculty" className="text-muted mx-2 text-decoration-none">
                Faculty
              </a>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <small className="text-muted">
                © {new Date().getFullYear()} Department of Electrical & Electronic Engineering, SUST. All Rights Reserved.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>

    </>
  );
}

export default RegularLayout