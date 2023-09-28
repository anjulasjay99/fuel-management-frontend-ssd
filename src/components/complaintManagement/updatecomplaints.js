import { useState,useEffect } from "react";
import axios from 'axios';
import React from "react";
import "../../Css/Addcomplaint.css"
import {useParams} from "react-router-dom"
import ComplaintHeader from "./complaintHeader";
import PageTitle from "../PageTitle";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Updatecomplaints = () => {
  const [email, setemail] = useState("");
  const [dateofComplaint, setdateofComplaint] = useState("");
  const [reason, setreason] = useState("Issue in the shed");
  const [complaintDetails, setcomplaintDetails] = useState("");
  const [sucessfull, setSucessfull] = useState(false);
  const {id} = useParams();

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


  function UpdateComplaint(e){
    e.preventDefault();
    if(complaintDetails.length>=10){   
    setSucessfull(false);
    const newupdatedComplaint = {
        email,
        dateofComplaint,
        reason,
        complaintDetails
     }
     console.log(newupdatedComplaint)
     axios.post(`http://localhost:8070/complaints/update/${id}`,newupdatedComplaint).then((res)=>{
         console.log(res.status)
         e.target.reset();
         toast.success('Complaint Updated Successfully!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
     }).catch((err)=>{
      console.log(err)
    })}else{
      setSucessfull(true)
    }
  }

  return (
    <>
    <ToastContainer></ToastContainer>
    <ComplaintHeader/>
    <PageTitle pageTitle="Update Complaint"/> 
    <div style={{backgroundColor: '#ff762e',textalign: 'left', width: '100%', height: '2px'}}></div>
   <center>
   <div className="card" style={{width: "50rem",borderRadius: "2em",
    borderStyle: 'solid',
    borderColor: ' #ff762e',margin:"100px",padding:"50px",
    display: 'flex',
    justifyContent: 'center',
    }} 
 >
    <div className="card-body">
    <div>
    <form onSubmit={UpdateComplaint}>
      <div class="form-group">
      <label for="exampleFormControlInput1" style={{float:"left"}}>Email </label><br></br>
      <input value={email}  type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"  required="required"/>
      </div>
      <br></br>
      <div class="form-group">
      <label for="exampleFormControlInput1" style={{float:"left"}}>Date Of Complaint</label>
      <input value={dateofComplaint} onChange={(e)=>{setdateofComplaint(e.target.value)}}  type="date" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required="required"/>
      </div>
      <br></br>
      <div class="form-group">
      <label for="exampleFormControlSelect1" style={{float:"left"}}>Reason</label>
      <select value={reason} onChange={(e)=>{setreason(e.target.value)}} class="form-control form-select" required="required">
      <option>Issue in the shed</option>
      <option>Issue in the Queue</option>
      <option>Other</option>
      </select>
      </div>
      <br></br>
      <div class="form-group">
      <label for="exampleFormControlTextarea1" style={{float:"left"}}>Complaint Details</label>
      <textarea value={complaintDetails} onChange={(e)=>{setcomplaintDetails(e.target.value)}} class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Please enter your message briefly." required="required"></textarea>
      </div>
      <div>
      { sucessfull !== false &&
      <p style={{color:"red",float:"left"}}>Please enter more than 10 letters</p>
      }
      </div>
      <br></br> <br></br>
      <div class="form-group">
      <button style={{width : "100%", backgroundColor: "#ff762e",}} type="submit" className="btn btn-primary  ">Update Complaint</button>
      <br/>
      </div>
    </form>
    </div>
    </div> 
    </div>
   </center>   
   </>     
  )
}

export default Updatecomplaints
