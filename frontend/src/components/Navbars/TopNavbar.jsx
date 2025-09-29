import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

const TopNavbar = () => {
  const isLoggedIn = true;
  const [isOpen, setIsOpen] = useState(false);
  const collapseRef = useRef(null);

  const toggleNavbar = () => setIsOpen(!isOpen);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        collapseRef.current &&
        !collapseRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close navbar when clicking a link (mobile)
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <Navbar className="navbar-top navbar-dark bg-primary" expand="md">
      <Container>
        {/* Left: App Logo */}
        <NavbarBrand tag={Link} to="/" className="text-white">
          EEE SUST Portal
        </NavbarBrand>

        {/* Mobile Toggler */}
        <NavbarToggler onClick={toggleNavbar} />

        {/* Right: links */}
        <Collapse navbar isOpen={isOpen} innerRef={collapseRef}>
          <Nav className="ml-auto" navbar>
            {!isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/auth/login" onClick={handleLinkClick}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/auth/register" onClick={handleLinkClick}>
                    Register
                  </NavLink>
                </NavItem>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/admin" onClick={handleLinkClick}>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#logout" onClick={(e) => e.preventDefault()}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
