
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import "../../Css/Addcomplaint.css"
import PageTitle from '../PageTitle';
import ComplaintHeader from './complaintHeader';

import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Addcomplaint(){
    const [dateofComplaint, setdateofComplaint] = useState("");
    const [reason, setreason] = useState("Issue in the shed");
    const [complaintDetails, setcomplaintDetails] = useState("");
    const [csrfTokenState,setCsrfTokenState] = useState("");
    // const [handletextarea, sethandletextarea] = useState(false)
    const [sucessfull, setSucessfull] = useState(false);
    var navigate = useNavigate();
    var [email, setemail] = useState("");

    useEffect (() =>{
      console.log(sessionStorage.getItem("customer"));
         if(sessionStorage.getItem("customer") == null){
              navigate("/customer-login");
         }  
         var emailStorage = sessionStorage.getItem("customer");
         setemail(emailStorage)
         console.log(email);
         //getCSRFToken()
          getCallToForm()
     },[])

  //    const getCSRFToken = async () => {
  //     const response = await axios.get('http://localhost:8070/getCSRFToken');
  //     axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
  //     console.log(response.data.CSRFToken)
  //     setcsrfToken(response.data.CSRFToken)
  //  };
  const domainUrl = `http://localhost:8070`

  async function getCallToForm(e) {
    const url = `/complaints/getCSRFToken`;
    let fetchGetResponse = await axios(`${domainUrl}${url}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "xsrf-token": localStorage.getItem('xsrf-token'),
        },
        credentials: "include",
        mode: 'cors'
    })
    console.log(fetchGetResponse.data.CSRFToken)
    //let parsedResponse = await fetchGetResponse.json();
  
    setCsrfTokenState(fetchGetResponse.data.CSRFToken)
}

     console.log(email);

    //  async function testCsurfClicked() {
    //   const url = `/process`;
    
    //   const newComplaint = {
    //       csrfTokenState
    //   };

    //   // Create headers with the CSRF token
    //   const headers = {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     'X-Requested-With': 'XMLHttpRequest',
    //   };

      
    //   // Send a POST request with the CSRF token included in the headers
    //   const fetchPostResponse = await axios.post(`${domainUrl}${url}`,newComplaint, {
    //     //headers: headers, // Use the headers with the CSRF token
    //     credentials: "include",
    //     mode: "cors",
    //   });
    
    //   console.log(fetchPostResponse.data);
    // }
    
     

  
     async function  submitComplaint(e){
      e.preventDefault();
      // console.log(complaintDetails.length)
      console.log(csrfTokenState)
      console.log("hi")
      if(complaintDetails.length>=10){   
            setSucessfull(false) 
            const newComplaint = {
              email,
              dateofComplaint,
              reason,
              complaintDetails,
              csrfTokenState
            };
            console.log(newComplaint)
            const headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
              'X-CSRFToken': csrfTokenState,
            };
            const url = `/complaints`;
            

            await axios.post(`${domainUrl}${url}`,newComplaint,{
               headers: headers, // Use the headers with the CSRF token
               credentials: "include",
               mode: "cors",
             })
              .then((res) => {
               
                toast.success('Complaint Added!', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                console.log(res.data)  
                setdateofComplaint("");
                setreason("Issue in the shed");
                setcomplaintDetails("");
                setSucessfull(false);
                
              })
              .catch((err) => {
                alert(err);
              });
            
      }else{
        setSucessfull(true)
        //alert("Please enter more than 10 characters.")
      }
   }



    //  function  submitComplaint(e){
    //     e.preventDefault();
    //     // console.log(complaintDetails.length)
  
    //     if(complaintDetails.length>=10){   
    //           setSucessfull(false) 
    //           const newComplaint = {
    //             email,
    //             dateofComplaint,
    //             reason,
    //             complaintDetails,
                
    //           };
    //           console.log(newComplaint)
    //            axios
    //             .post("http://localhost:8070/complaints", newComplaint)
    //             .then((res) => {
                 
    //               toast.success('Complaint Added!', {
    //                 position: "bottom-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 });
    //               console.log(res.data)  
    //               setdateofComplaint("");
    //               setreason("Issue in the shed");
    //               setcomplaintDetails("");
    //               setSucessfull(false);
                  
    //             })
    //             .catch((err) => {
    //               alert(err);
    //             });
              
    //     }else{
    //       setSucessfull(true)
    //       //alert("Please enter more than 10 characters.")
    //     }
    //  }

    // async function submitComplaint(e) {
    //   e.preventDefault();
    //   const url = `/complaints/post`;
    //   setSucessfull(true)

    //   await axios({
    //       method: "post",
    //       //method: "POST",
    //       url: `http://localhost:8070/complaints/post`,
    //       headers: { 'X-CSRFToken': csrfTokenState },
    //       data: {}
    //       // headers: {
    //       //     Accept: "application/json",
    //       //     "Content-Type": "application/json",
    //       //     //"xsrf-token": localStorage.getItem('xsrf-token'),
    //       // },
    //       //credentials: "include",
    //       //mode: 'cors'
    //   }).then((res) => {
               
    //     toast.success('Complaint Added!', {
    //       position: "bottom-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       });
    //     console.log(res.data)  
    //     setdateofComplaint("");
    //     setreason("Issue in the shed");
    //     setcomplaintDetails("");
    //     setSucessfull(false);
        
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    //   setSucessfull(true)
  //}

    function clear(){
        setdateofComplaint("");
        setreason("Issue in the shed");
        setcomplaintDetails("");
        setSucessfull(false)
    }

    return(
        <>
        <ComplaintHeader/>
        <PageTitle pageTitle="Add New Complaint"/> 
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
        <p className="card-text" style={{textAlign: "left"}}>  Please Send us details about the inceident you would like to report. Our Complaint Center will analyze your complaint and take the appropriate measure in order that the reported situation will not oocur at any time the future.</p>
        <hr/> 
        <div>
        <form onSubmit={submitComplaint} >
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Email </label>
          <input  value={email} type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" title="follow requested format Ex:([name@example.com])"  required="required" />
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlInput1" style={{float:"left"}}>Date Of Complaint</label>
          <input value={dateofComplaint} onChange={(e)=>{setdateofComplaint(e.target.value)}}  type="date" class="form-control" id="exampleFormControlInput1" required/>
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlSelect1" style={{float:"left"}}>Reason</label>
          <select value={reason} onChange={(e)=>{setreason(e.target.value)}} class="form-control form-select" required>
          <option>Issue in the shed</option>
          <option>Issue in the Queue</option>
          <option>Other</option>
      </select>
        </div>
        <br></br>
        <div class="form-group">
          <label for="exampleFormControlTextarea1" style={{float:"left"}}>Complaint Details</label>
          <textarea value={complaintDetails} onChange={(e)=>{setcomplaintDetails(e.target.value)}} class="form-control" id="exampleFormControlTextarea1"  rows="3" placeholder="Please enter your message briefly."  required></textarea>
          <div>
                    { sucessfull !== false &&
                        <p style={{color:"red",float:"left"}}>Please enter more than 10 letters</p>
                    }
            </div>
        </div>     
        <div class="form-group">
       
         
        </div>
        <br></br> <br></br>
        <div class="form-group">
          
        <button style={{width : "100%", backgroundColor: "#ff762e"}} type="submit"  className="btn btn-primary  ">Add Complaint</button>
        <ToastContainer></ToastContainer>
        <button style={{width : "100%", backgroundColor: " #082344",marginTop:"10px"}}  onClick={()=>{clear()}} className="btn btn-primary ">Reset</button>
        </div>
        </form>
        {/* <button onClick={testCsurfClicked}>Test Csurf Post Call</button> */}
        </div>
        </div>    
        </div>
        </center>        
        </>     
    );
}

export default Addcomplaint;
