import React from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import defaultMale from "assets/icons/default-male.jpg";
import defaultFemale from "assets/icons/default-female.jpg";

const AlumniCard = ({ alumni, history }) => {
  const profilePicture = alumni?.profile_picture?.picture;

  return (
    <Card className="shadow-sm h-100">
      <CardImg
        top
        alt="Thumbnail"
        src={profilePicture || (alumni.gender === "female" ? defaultFemale : defaultMale)}
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop
          e.target.src = alumni.gender === "female" ? defaultFemale : defaultMale;
        }}
        style={{ height: "225px", objectFit: "cover" }}
      />
      <CardBody className="d-flex flex-column">
        <CardTitle tag="h5" className="mb-3 text-primary">
          {alumni.name}
        </CardTitle>
        <CardText className="flex-grow-1">
          <dl className="row mb-0">
            <dt className="col-5">Session</dt>
            <dd className="col-7">{alumni.session}</dd>

            <dt className="col-5">Passing Year</dt>
            <dd className="col-7">{alumni.passing_year}</dd>

            <dt className="col-5">Designation</dt>
            <dd className="col-7">
              {alumni.designation} at {alumni.company}
            </dd>

            <dt className="col-5">Address</dt>
            <dd className="col-7">{alumni.present_address?.address}</dd>
          </dl>
        </CardText>

        {/* Buttons Section */}
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            size="sm"
            onClick={() => history.push(`/alumnies/${alumni.id}`)}
          >
            View Profile
          </Button>
          <div>
            <Button
              color="secondary"
              outline
              size="sm"
              className="me-2"
              href={`mailto:${alumni.email}`}
            >
              Email
            </Button>
            <Button
              color="secondary"
              outline
              size="sm"
              href={`tel:${alumni.contact_number}`}
            >
              Phone
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default withRouter(AlumniCard);
