import { Link } from 'react-router-dom';
import styles from '../styles/scss/Home.module.scss';
import { FiUsers, FiClipboard, FiBookOpen, FiCpu, FiCalendar, FiBriefcase } from 'react-icons/fi';

const cardData = [
  {
    title: 'Alumni Profiles',
    text: 'Connect with our talented alumni network.',
    link: '/alumni',
    icon: <FiUsers />,
  },
  {
    title: 'Notice Board',
    text: 'Stay updated with the latest announcements.',
    link: '/notice-board',
    icon: <FiClipboard />,
  },
  {
    title: 'Study Materials',
    text: 'Access course materials and lecture notes.',
    link: '/study-materials',
    icon: <FiBookOpen />,
  },
  {
    title: 'Labs & Projects',
    text: 'Explore our state-of-the-art labs and projects.',
    link: '/labs-projects',
    icon: <FiCpu />,
  },
  {
    title: 'Events',
    text: 'Join our workshops, seminars, and events.',
    link: '/events',
    icon: <FiCalendar />,
  },
  {
    title: 'Faculty & Staff',
    text: 'Meet our experienced faculty and staff.',
    link: '/faculty-staff',
    icon: <FiBriefcase />,
  },
];

const Home = () => {
  const scrollToExplore = (e) => {
    e.preventDefault();
    const el = document.getElementById('explore');
    if (!el) return;
    const headerOffset = 80; // adjust to match header height (px)
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: 'smooth' });
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Department of Electrical and Electronic Engineering</h1>
          <p>Pioneering the future of technology and innovation.</p>
          <a
            href="#explore"
            className={styles.heroBtn}
            onClick={scrollToExplore}
          >
            Explore now
          </a>
        </div>
      </section>

      <div id="explore" className={`page-content ${styles.pageContent}`}>
        <div className="container">
          <h2 className="section-title">Explore Our Department</h2>
          <div className={styles.homeCardsGrid}>
            {cardData.map((card, index) => (
              <Link to={card.link} key={index} className={styles.card}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <span className={styles.cardLink}>Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section
        className={styles.highlights}
        aria-labelledby="highlights-title"
      >
        <div className="container">
          <h2 id="highlights-title" className="section-title">
            Department Highlights
          </h2>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <h3>Research Excellence</h3>
              <p>
                Active research in power systems, embedded systems, and machine
                learning for engineering.
              </p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Industry Collaboration</h3>
              <p>
                Strong partnerships with leading tech companies and local industry
                for internships and projects.
              </p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Student Achievements</h3>
              <p>
                Award-winning student projects, competition wins, and a vibrant
                alumni network.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;