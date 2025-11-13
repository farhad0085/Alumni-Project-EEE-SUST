import { useEffect, useState } from 'react';
import styles from '../../styles/scss/Faculty.module.scss';
import { Link } from 'react-router-dom'
import { setPageTitle } from '../../utils';
import apiServices from '../../apis/faculty'
import defaultMale from "../../assets/images/default-male.jpg";
import defaultFemale from "../../assets/images/default-female.jpg";
import { Spinner } from "reactstrap";

const FacultyStaff = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  setPageTitle("Faculty & Staffs");

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const response = await apiServices.loadFaculty(); // all members
        setFaculty(response.data.results);
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  // Split by role
  const head = faculty.find((m) => m.role === "head");
  const otherFaculty = faculty.filter((m) => ["faculty"].includes(m.role));
  const staffs = faculty.filter((m) => m.role === "staff");

  const FacultyCard = ({ member }) => {
    return (
      <div key={member?.id} className={styles.facultyCard}>
        <img
          src={member?.photo || (member?.gender === "female" ? defaultFemale : defaultMale)}
          alt={member?.name || "Profile"}
          onError={(e) => {
            e.target.onerror = null; // prevent infinite loop
            e.target.src = member.gender === "female" ? defaultFemale : defaultMale;
          }}
          className={styles.profileImage}
        />
        <h3>{member?.name}</h3>
        <p>{member?.designation}</p>
        <Link to={`/faculty-profile/${member?.id}`}>View Profile</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Our Faculty & Staff</h1>
      <p>Our department is proud to have a team of dedicated and experienced faculty members who are experts in their respective fields.</p>
      <br />
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <>
          <div className={styles.facultyGrid}>
            <FacultyCard member={head} />
          </div>
          <h2 className={styles.sectionTitle}>Other Faculty Members</h2>
          <div className={styles.facultyGrid}>
            {otherFaculty.map((member) => (
              <FacultyCard member={member} />
            ))}
          </div>
          <h2 className={styles.sectionTitle}>Our Staffs</h2>
          <div className={styles.facultyGrid}>
            {staffs.map((member) => (
              <FacultyCard member={member} />
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default FacultyStaff;
