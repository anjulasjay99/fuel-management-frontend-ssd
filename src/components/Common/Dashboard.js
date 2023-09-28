import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../styles/fuelStation.module.css";

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
import { BsPeopleFill } from "react-icons/bs";
import { GiGasPump } from "react-icons/gi";
import { MdFeedback } from "react-icons/md";






function Dashboard() {
    const navigate = useNavigate();

  document.documentElement.classList.remove("nav-open");

  const clickMyCompalints = () => {
    navigate("/addcomplaint");
  };
 
  const clickCustomerManagement = () => {
    navigate("/customer-profile");
  };

  const clickBookingManagement = () => {
    navigate("/fuelBookings");
  };


var email;
useEffect (() =>{
    console.log(sessionStorage.getItem("customer"));
       if(sessionStorage.getItem("customer") == null){
            navigate("/customer-login");
       }  
       email = sessionStorage.getItem("customer");
       console.log(email);
   },[])

  return (
    <>
      
      <Header/>
            <PageTitle pageTitle="Dashboard" />
      <div className="main">
        <div className="edit-booking-content">
          <br></br>
          <div className="dashboard-content">
            <Row>
              <Col>
                <Card
                  className= "dashboard-card"
                  id="card1"
                  onClick={clickCustomerManagement}
                  style={{width:"18rem" , height : "30rem"}}
                >
                  <BsPeopleFill style={{ alignSelf : "center" , marginBottom : "2rem"}} size={40} />
                  <label style={{fontSize:"2rem"}}>CUSTOMER MANAGEMENT</label>
                  <label className="dashboard-card-subtitle" style={{marginTop : "1rem" , fontSize:"0.8rem" , fontWeight : "normal"}}>
                    Manage Customer information
                  </label>
                </Card>
              </Col>
              <Col>
                <Card
                  className="dashboard-card"
                  id="card1"
                  onClick={clickBookingManagement}
                  style={{width:"18rem" , height : "30rem"}}
                >
                  <GiGasPump style={{ alignSelf : "center" , marginBottom : "2rem"}} size={40} />
                   BOOKING MANAGEMENT
                  <label className="dashboard-card-subtitle" style={{marginTop : "1rem" , fontSize:"0.8rem" , fontWeight : "normal"}}>
                    Place and view your bookings.
                  </label>
                </Card>
              </Col>
              <Col>
                <Card
                  className="dashboard-card"
                  id="card2"
                  onClick={clickMyCompalints}
                  style={{width:"18rem" , height : "30rem"}}
                >
                  < MdFeedback style={{ alignSelf : "center" , marginBottom : "2rem"}} size={40}  />
                  COMPLAINTS MANAGEMENT
                  <label className="dashboard-card-subtitle" style={{marginTop : "1rem" , fontSize:"0.8rem" , fontWeight : "normal"}}>
                     Raise complaints, provide feedback.
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

export default Dashboard;