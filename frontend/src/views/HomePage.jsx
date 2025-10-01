import React from "react";
import RegularLayout from "layouts/Regular";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <RegularLayout>
      <Container className="mt-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="display-4">
              Welcome to the Electrical & Electronic Engineering Web Portal at SUST!
            </h1>
            <p className="text-muted">
              Explore alumni networks, access study resources, stay updated with notices, and connect with the EEE community.
            </p>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row className="g-4">
          <Col lg="4" md="6" className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <CardBody className="flex-grow-1">
                <CardTitle tag="h3">Alumni Profiles</CardTitle>
                <CardText>
                  Browse and search EEE department alumni profiles and connect with graduates.
                </CardText>
              </CardBody>
              {/* Centered button with top margin */}
              <div className="mb-3 mx-3 text-center">
                <Button color="primary" tag={Link} to="/alumni" className="w-100">
                  View Alumni
                </Button>
              </div>
            </Card>
          </Col>

          <Col lg="4" md="6" className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <CardBody className="flex-grow-1">
                <CardTitle tag="h3">Notice Board</CardTitle>
                <CardText>
                  Stay updated with the latest departmental announcements, exams, and events.
                </CardText>
              </CardBody>
              <div className="mb-3 mx-3 text-center">

                <Button color="primary" tag={Link} to="/notices" className="w-100">
                  View Notices
                </Button>
              </div>
            </Card>
          </Col>

          <Col lg="4" md="6" className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <CardBody className="flex-grow-1">
                <CardTitle tag="h3">Study Materials</CardTitle>
                <CardText>
                  Access lecture notes, tutorials, and reference materials uploaded by faculty.
                </CardText>
              </CardBody>
              <div className="mb-3 mx-3 text-center">

                <Button color="primary" tag={Link} to="/admin/study-materials" className="w-100">
                  Browse Materials
                </Button>
              </div>
            </Card>
          </Col>

          <Col lg="4" md="6" className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <CardBody className="flex-grow-1">
                <CardTitle tag="h3">Labs & Projects</CardTitle>
                <CardText>
                  Explore ongoing lab works, student projects, and research initiatives.
                </CardText>
              </CardBody>
              <div className="mb-3 mx-3 text-center">

                <Button color="primary" tag={Link} to="/admin/labs" className="w-100">
                  Explore Labs
                </Button>
              </div>
            </Card>
          </Col>

          <Col lg="4" md="6" className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <CardBody className="flex-grow-1">
                <CardTitle tag="h3">Events</CardTitle>
                <CardText>
                  Check upcoming seminars, workshops, and departmental events.
                </CardText>
              </CardBody>
              <div className="mb-3 mx-3 text-center">

                <Button color="primary" tag={Link} to="/admin/events" className="w-100">
                  View Events
                </Button>
              </div>
            </Card>
          </Col>

          <Col lg="4" md="6" className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column">
              <CardBody className="flex-grow-1">
                <CardTitle tag="h3">Faculty & Staff</CardTitle>
                <CardText>
                  Find information about faculty members, staff, and their contact details.
                </CardText>
              </CardBody>
              <div className="mb-3 mx-3 text-center">

                <Button color="primary" tag={Link} to="/admin/faculty" className="w-100">
                  View Faculty
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </RegularLayout>
  );
}

export default HomePage;
