import React from 'react';
import Pdf from "react-to-pdf";
import { useState, useEffect } from "react";
import { Row, Col, Card, Container, Button } from "reactstrap";
import {useParams} from "react-router-dom"
import axios from 'axios';
import ComplaintHeader from './complaintHeader';
import PageTitle from '../PageTitle';
import logo from '../../images/ceypetco.png';
import styles from '../../Css/complaintReport.css'
import AdminHeader from '../Common/AdminHeader';
const ref = React.createRef();


const ComplaintReport = () =>{
  
  const [date, setdate] = useState();
  const [email, setemail] = useState("");
  const [dateofComplaint, setdateofComplaint] = useState("");
  const [reason, setreason] = useState("Issue in the shed");
  const [complaintDetails, setcomplaintDetails] = useState("");
  const {id} = useParams();

  useEffect(() => {
      let today = new Date().toISOString().slice(0, 10);
      setdate(today);
  }, []);

  useEffect(()=>{
    
    axios.get(`http://localhost:8070/complaints/get/${id}`).then((res)=>{
      
      console.log(res.data)
      setemail(res.data.email)
      setdateofComplaint(res.data.dateofComplaint)
      setreason(res.data.reason)
      setcomplaintDetails(res.data.complaintDetails)

    }).catch((err)=>{
      console.log(err)
    })
  
  },[])

  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [6,6]
};
    return(
        <>
       
       <AdminHeader/>
       <PageTitle pageTitle="Complaint Report"/> 
        <div className="my-tour-content">
          <br></br>
          <Row>
            <Col>
           
              <Card className="report-card" >
              <div className="Post" ref={ref}> 
              <div id="report-cont">
              
                  <Row>
                    <Col >
                      {" "}
                      
                    </Col>
                  </Row>
                  <Row>
                  <Col style={{float: "left" }}>
                  {" "}
                      <img style={{width:"100px",height:"100px"}} className="report-logo"
                        src={
                            logo
                        }
                        ></img>
                  </Col>         

                    <Col>
                      <p style={{textAlign:"right",fontSize:"13px"}}className="report-contact">
                        Tel No. : +94 77 614 0895<br></br><br></br>
                        Fax : +94 1154555400<br></br><br></br>
                        Email: secreatrialceypetco.gov.lk
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label style={{ float: "right", fontSize: "13px" }}>
                        <i>Date : {date}</i>
                      </label>
                      <br></br>
                      <hr></hr>
                    </Col>
                  </Row>

                  <br></br>
                  
                  <Row style={{float: "left"}}>
                    <Col >Email : {email}</Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Row style={{float: "left"}}> 
                    <Col>cancellation Date : {dateofComplaint}</Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Row style={{float: "left"}}>
                    <Col>Reason : {reason}</Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Row style={{float: "left"}}>
                    <Col>Complaint Details : {complaintDetails}</Col>
                  </Row>
                  
		 
                  <br></br>
                  <br></br>
              </div>
              </div>
              </Card>
             
            </Col>
          </Row>
          <br></br>
          <Container>
          <div className="reportdownload">
            <Row>
              <Col>
              <div>
                <Pdf targetRef={ref} filename="complaint-report.pdf" options={options} >
                {({ toPdf }) => 
                <button className="btn btn-primary" style={{float:"right",width : "28%", backgroundColor: "#ff762e"}} onClick={toPdf}
            > Capture as Pdf</button>}
                </Pdf>
                </div>
              </Col>
            </Row>
            </div>
          </Container>
            <br/>
          </div>
        </>
        
    );
}

export default ComplaintReport; 