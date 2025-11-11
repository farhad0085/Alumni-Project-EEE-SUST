import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import defaultMale from "../../assets/images/default-male.jpg";
import defaultFemale from "../../assets/images/default-female.jpg";
import { useNavigate } from 'react-router-dom'

const AlumniCard = ({ alumni }) => {
  const profilePicture = alumni?.profile_picture?.picture;
  const navigate = useNavigate();

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
          <span className="row mb-0">
            <dt className="col-5">Session</dt>
            <dd className="col-7">{alumni.session || "N/A"}</dd>

            <dt className="col-5">Passing Year</dt>
            <dd className="col-7">{alumni.passing_year || "N/A"}</dd>

            <dt className="col-5">Designation</dt>
            <dd className="col-7">
              {alumni.designation} at {alumni.company}
            </dd>

            <dt className="col-5">Address</dt>
            <dd className="col-7">{alumni.present_address?.address}</dd>
          </span>
        </CardText>

        {/* Buttons Section */}
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            size="sm"
            onClick={() => navigate(`/alumni/${alumni.id}`)}
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

export default AlumniCard;
