import React, { useState } from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";
import RegularLayout from "layouts/Regular";

// Dummy labs & projects data
const labs = [
  {
    id: 1,
    name: "Artificial Intelligence Lab",
    description: "Focused on research in machine learning, natural language processing, and computer vision.",
    image: "https://via.placeholder.com/400x250?text=AI+Lab",
    tags: ["AI", "ML", "Research"],
  },
  {
    id: 2,
    name: "Networking & Security Lab",
    description: "Explores network architectures, cybersecurity, and cryptography.",
    image: "https://via.placeholder.com/400x250?text=Networking+Lab",
    tags: ["Networking", "Security", "IoT"],
  },
];

const projects = [
  {
    id: 1,
    title: "Smart Campus System",
    description:
      "An IoT-driven project that integrates smart sensors and automation to create an intelligent campus environment.",
    image: "https://via.placeholder.com/400x250?text=Smart+Campus",
    tags: ["IoT", "Automation", "AI"],
  },
  {
    id: 2,
    title: "Healthcare Chatbot",
    description:
      "An AI-powered chatbot that assists patients with medical queries and schedules doctor appointments.",
    image: "https://via.placeholder.com/400x250?text=Chatbot",
    tags: ["AI", "Healthcare", "NLP"],
  },
];

const LabsProjectsPage = () => {
  const [activeTab, setActiveTab] = useState("labs");

  return (
    <RegularLayout>
      <Container className="mt-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Labs & Projects</BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-center mb-5">Labs & Projects</h1>

        {/* Tabs */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn ${activeTab === "labs" ? "btn-primary" : "btn-outline-primary"} mx-2`}
            onClick={() => setActiveTab("labs")}
          >
            Labs
          </button>
          <button
            className={`btn ${activeTab === "projects" ? "btn-primary" : "btn-outline-primary"} mx-2`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
        </div>

        {/* Labs Section */}
        {activeTab === "labs" && (
          <Row>
            {labs.map((lab) => (
              <Col md="6" lg="4" key={lab.id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <CardImg
                    top
                    src={lab.image}
                    alt={lab.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" className="text-primary">
                      {lab.name}
                    </CardTitle>
                    <CardText>{lab.description}</CardText>
                    <div className="mt-2">
                      {lab.tags.map((tag, i) => (
                        <Badge key={i} color="info" className="mr-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Projects Section */}
        {activeTab === "projects" && (
          <Row>
            {projects.map((proj) => (
              <Col md="6" lg="4" key={proj.id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <CardImg
                    top
                    src={proj.image}
                    alt={proj.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5" className="text-success">
                      {proj.title}
                    </CardTitle>
                    <CardText>{proj.description}</CardText>
                    <div className="mt-2">
                      {proj.tags.map((tag, i) => (
                        <Badge key={i} color="secondary" className="mr-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
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

export default LabsProjectsPage;
