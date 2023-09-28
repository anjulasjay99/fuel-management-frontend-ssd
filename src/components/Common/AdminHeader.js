import React, { useEffect } from "react";
// import { BiLogOut } from "react-icons/bi";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/common.module.css";
function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("adminUser"));
    if (userData == null || userData === undefined || userData === "") {
      console.log("ERR");
    } else {
      console.log(userData);
    }
  }, []);

  return (
    <Navbar
      sticky="top"
      bg="light"
      expand="lg"
      variant="light"
      className={styles.navbar}
    >
      <Container fluid>
        <Navbar.Brand href="/admin-dashboard">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link>
              <Link className={styles.navLink} to="/fuel-stations">
                Fuel Stations
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link className={styles.navLink} to="/fuel-allocations">
                Fuel Allocations
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link className={styles.navLink} to="/viewadmincomplaint">
                Complaints
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              id="nav-dropdown-light-example"
              menuVariant="light"
              title="Account"
            >
              <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
