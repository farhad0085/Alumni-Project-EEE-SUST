import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  Badge,
} from "reactstrap";
import defaultMale from "../../assets/images/default-male.jpg";
import defaultFemale from "../../assets/images/default-female.jpg";
import { useHistory } from "react-router-dom";
import styles from "./AlumniCard.module.scss";

const AlumniCard = ({ alumni }) => {
  const history = useHistory();
  const profilePicture = alumni?.profile_picture?.picture;
  const fallbackImage =
    alumni.gender === "female" ? defaultFemale : defaultMale;

  return (
    <Card className={`${styles.card} h-100 border-0 shadow-sm`}>
      <div className={styles.imageWrapper}>
        <CardImg
          top
          alt={alumni.name}
          src={profilePicture || fallbackImage}
          className={styles.image}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <CardBody className="d-flex flex-column">
        <CardTitle tag="h5" className={styles.name}>
          {alumni.name}
        </CardTitle>

        <div className={styles.role}>
          {alumni.designation || "—"}{" "}
          {alumni.company && `@ ${alumni.company}`}
        </div>

        <div className={styles.meta}>
          <Badge color="primary" pill>
            {alumni.session || "N/A"}
          </Badge>
          <Badge color="secondary" pill>
            {alumni.passing_year || "N/A"}
          </Badge>
        </div>

        <CardText className={styles.address}>
          {alumni.present_address?.address || "No address provided"}
        </CardText>

        <div className={styles.actions}>
          <Button
            color="primary"
            size="sm"
            onClick={() => history.push(`/alumni/${alumni.id}`)}
          >
            View Profile
          </Button>

          <div className={styles.actionGroup}>
            <Button
              color="secondary"
              outline
              size="sm"
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
              Call
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AlumniCard;
