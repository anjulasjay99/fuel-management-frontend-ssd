import React from "react";
import styles from "../../styles/navbar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    <div className={styles.nav_main_container}>
      <div className={styles.nav_header}>
        <p className={styles.nav_heading_text}>My Fuel</p>
      </div>
      <div className={styles.nav_body}>
        <div className={styles.nav_link_section}>
          <p className={styles.nav_section_text}>Profile</p>
        </div>
        <NavLink to="/customer-profile" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <i class="fa fa-user" aria-hidden="true"></i>
            <p className={styles.nav_link_clearfix}>My Profile</p>
          </div>
        </NavLink>
        <NavLink to="/customer-view-vehicles" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <i class="fa fa-car" aria-hidden="true"></i>
            <p className={styles.nav_link_clearfix}>My Vehicles</p>
          </div>
        </NavLink>
        <NavLink to="/customer-report" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
            <p className={styles.nav_link_clearfix}>My Fuel Report</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.nav_body}>
        <div className={styles.nav_link_section}>
          <p className={styles.nav_section_text}>Bookings</p>
        </div>
        <NavLink to="" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <p className={styles.nav_link_clearfix}>My Bookings</p>
          </div>
        </NavLink>
        <NavLink to="" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <p className={styles.nav_link_clearfix}>Bookings Reports</p>
          </div>
        </NavLink>
      </div>
      <div className="nav_body ">
        <div className={styles.nav_link_section}>
          <p className={styles.nav_section_text}>Complaints</p>
        </div>
        <NavLink to="" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <p className={styles.nav_link_clearfix}>My Complaints</p>
          </div>
        </NavLink>
        <NavLink to="" className={styles.link_styles}>
          <div className={styles.nav_link_wrapper}>
            <p className={styles.nav_link_clearfix}>Complaints Report</p>
          </div>
        </NavLink>
      </div>
      <hr />
      <div className="nav_body ">
        <div className="nav_link_section ">
          <p className="nav_section_text">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
