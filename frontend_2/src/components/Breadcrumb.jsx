import React from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import styles from '../styles/scss/Breadcrumb.module.scss';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // No breadcrumb on homepage
  if (!pathnames.length) return null;

  // Format string: kebab-case or camelCase to readable
  const formatCrumb = (str) => 
    str
      .replace(/-/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase());

  return (
    <div className="container">
    <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
      {/* Home link */}
      <Link to="/" className={styles.crumb}>Home</Link>

      {/* Dynamic path crumbs */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <FiChevronRight className={styles.separator} />
            {isLast ? (
              <span className={styles.crumbActive}>{formatCrumb(value)}</span>
            ) : (
              <Link to={to} className={styles.crumb}>{formatCrumb(value)}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
    </div>
  );
};

export default Breadcrumb;
