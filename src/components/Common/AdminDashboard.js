import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../Css/styles-ttrmAdmin.css";

import {
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";

import Header from "../Common/Header";
import PageTitle from "../PageTitle";
import { ReactSession } from "react-client-session";
import AdminHeader from "./AdminHeader";

function AdminDashboard() {
  const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");

  const clickFuelStations = () => {
    navigate("/fuel-stations");
  };
  const clickAdminComplaints = () => {
    navigate("/viewadmincomplaint");
  };
  const clickFuelAllocations = () => {
    navigate("/fuel-allocations");
  };

  //   useEffect(() => {
  //     ReactSession.setStoreType("localStorage");
  //     if (ReactSession.get("user") != null) {
  //       document.body.classList.add("index");
  //       document.getElementById("card1").classList.remove("card");
  //       document.getElementById("card2").classList.remove("card");
  //       document.getElementById("card3").classList.remove("card");
  //       document.getElementById("card4").classList.remove("card");

  //       return function cleanup() {
  //         document.body.classList.remove("index");
  //       };
  //     } else {
  //         navigate("");
  //     }
  //   }, []);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("adminUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/admin-login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AdminHeader></AdminHeader>
      <PageTitle pageTitle="Dashboard" />
      <div className="main">
        <div className="edit-booking-content">
          <br></br>
          <div className="dashboard-content">
            <Row>
              <Col>
                <Card
                  className="dashboard-card"
                  id="card1"
                  onClick={clickFuelStations}
                >
                  Fuel Stations
                  <label className="dashboard-card-subtitle">
                    View & search all the registered fuel stations.
                  </label>
                </Card>
              </Col>
              <Col>
                <Card
                  className="dashboard-card"
                  id="card1"
                  onClick={clickFuelAllocations}
                >
                  Fuel Allocations
                  <label className="dashboard-card-subtitle">
                    Allocate fuel to customers.
                  </label>
                </Card>
              </Col>
              <Col>
                <Card
                  className="dashboard-card"
                  id="card2"
                  onClick={clickAdminComplaints}
                >
                  Complaints
                  <label className="dashboard-card-subtitle">
                    Generate complaint reports
                  </label>
                </Card>
              </Col>
            </Row>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
