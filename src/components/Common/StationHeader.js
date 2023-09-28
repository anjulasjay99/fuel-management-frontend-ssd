import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/common.module.css";
import { FaUserAlt } from "react-icons/fa";
function StationHeader() {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  // function logOut(){
  //     localStorage.clear();
  //     navigate('/login');
  // }

  const logout = () => {
    sessionStorage.removeItem("fsUser");
    navigate("/fuel-station-login");
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      console("ERROR");
    } else {
      setuser(userData);
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
        <Navbar.Brand href="/fuel-station-home">FMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="me-auto" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link>
              <Link className={styles.navLink} to="/fuel-station-home">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className={styles.navLink} to="/fuel-orders">
                Fuel Orders
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link className={styles.navLink} to="/fuel-usages">
                Fuel Usages
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link className={styles.navLink} to="/fuel-report">
                Report
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              id="nav-dropdown-light-example"
              title={user.stationName}
              menuVariant="light"
            >
              <NavDropdown.Item disabled>
                <div>
                  <FaUserAlt style={{ transform: "scale(1.5)" }} />
                  &nbsp;
                  {user.stationName}
                  <br />
                  <label style={{ fontSize: "14px", color: "gray" }}>
                    {user.email}
                  </label>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => navigate("/fuel-station-settings")}
              >
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StationHeader;
