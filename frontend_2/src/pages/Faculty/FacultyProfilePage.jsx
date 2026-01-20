import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiServices from "../../apis/faculty";
import defaultMale from "../../assets/images/default-male.jpg";
import defaultFemale from "../../assets/images/default-female.jpg";
import { setPageTitle, toTitleCase } from "../../utils";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import Layout from "../../components/Layout";

const FacultyProfilePage = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const response = await apiServices.loadFacultyById(id);
        setFaculty(response.data);
        setPageTitle(response.data.name);
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className={styles.notFound}>
        <p>Faculty not found.</p>
        <Link to="/faculty-staffs" className={styles.btnPrimary}>
          Back to Faculty List
        </Link>
      </div>
    );
  }

  const photo =
    faculty.photo || (faculty.gender === "female" ? defaultFemale : defaultMale);

  return (
    <Layout>
      <div className={styles.card}>
        <div className={styles.cardBody}>
          <div className={styles.cardContent}>
            {/* Left Column: Info */}
            <div className={styles.left}>
              <h2 className={styles.title}>{faculty.name}</h2>

              <div className={styles.details}>
                <p>
                  <strong>Designation:</strong> {faculty.designation}
                </p>

                {faculty.email && (
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
                  </p>
                )}

                {faculty.phone && (
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${faculty.phone}`}>{faculty.phone}</a>
                  </p>
                )}

                {faculty.gender && (
                  <p>
                    <strong>Gender:</strong> {toTitleCase(faculty.gender)}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Photo + Buttons */}
            <div className={styles.right}>
              <img
                src={photo}
                alt={faculty.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    faculty.gender === "female"
                      ? defaultFemale
                      : defaultMale;
                }}
                className={styles.profileImage}
              />

              <p className={styles.facultyName}>{faculty.name}</p>

              <div className={styles.actionButtons}>
                {faculty.email && (
                  <a
                    href={`mailto:${faculty.email}`}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    <FaEnvelope className={styles.icon} />
                    Email
                  </a>
                )}
                {faculty.phone && (
                  <a
                    href={`tel:${faculty.phone}`}
                    className={`${styles.btn} ${styles.btnSuccess}`}
                  >
                    <FaPhone className={styles.icon} />
                    Call
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {faculty.description && (
            <div className={styles.section}>
              <h2>Profile</h2>
              <hr />
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: faculty.description }}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FacultyProfilePage;
