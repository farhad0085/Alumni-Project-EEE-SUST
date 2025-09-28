import React from "react";
import { useLocation } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar";
import AdminFooter from "components/Footers/AdminFooter";
import Sidebar from "components/Sidebar/Sidebar";
import logo from "../assets/img/brand/argon-react.png"

const Admin = ({ children }) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  console.log("children", children);

  const getBrandText = () => {
    return "Brand Text";
  };

  return (
    <>
      <Sidebar
        logo={{
          innerLink: "/admin/index",
          imgSrc: logo,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          brandText={getBrandText()}
        />
        {children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
