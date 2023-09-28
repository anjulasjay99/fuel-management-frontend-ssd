/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import StationHeader from "../Common/StationHeader";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import { useNavigate, Link } from "react-router-dom";
import { BsDropletHalf, BsGraphUp } from "react-icons/bs";
import { GiGasPump } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";

function FuelStationHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/fuel-station-login");
    }
  }, []);
  return (
    <div>
      <StationHeader />
      <PageTitle pageTitle={"Home"} />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          paddingTop: " 50px",
        }}
      >
        <div className={styles.homeContent} style={{ marginBottom: "10px" }}>
          <h3>Navigate</h3>
        </div>

        <div className={styles.homeContentCards}>
          <div className={styles.card} onClick={() => navigate("/fuel-orders")}>
            <BsDropletHalf />
            <h4>Fuel Orders</h4>
            <label>Place and view fuel orders.</label>
          </div>
          <div className={styles.card} onClick={() => navigate("/fuel-usages")}>
            <GiGasPump />
            <h4>Fuel Usage</h4>
            <label>Manage fuel usage.</label>
          </div>
          <div className={styles.card} onClick={() => navigate("/fuelBookingRequests")}>
            <GiGasPump />
            <h4>Fuel Bookings</h4>
            <label>Approve or reject customer fuel reservations.</label>
          </div>
          <div className={styles.card} onClick={() => navigate("/fuel-report")}>
            <BsGraphUp />
            <h4>Reports</h4>
            <label>
              Generate reports based on the fuel station activities.
            </label>
          </div>
          <div
            className={styles.card}
            onClick={() => navigate("/fuel-station-settings")}
          >
            <VscAccount />
            <h4>Account</h4>
            <label>Manage your account.</label>
          </div>
        </div>

        <div className={styles.homeContent} style={{ marginTop: "30px" }}>
          <h3>Quick Links</h3>
        </div>
        <div className={styles.homeContent}>
          <Link to="/place-order" className={styles.link}>
            Place Fuel Order
          </Link>
          <Link to="/fuel-usages" className={styles.link}>
            Add Fuel Usage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FuelStationHome;
