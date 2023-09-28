import { useState , useEffect } from "react";
import PageTitle from "../PageTitle";
import common from "../../styles/common.module.css";
import styles2 from "../../styles/cusprofile.module.css";
import { ImProfile } from "react-icons/im";
import { FaCar } from "react-icons/fa";
import UserInfoForm from "./UserInfoForm";
import VehicleInfoForm from "./VehicleInfoForm";
import Header from "../Common/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row , Col   } from "reactstrap";
function CustomerProfile(){


    const navigate = useNavigate();
    const [userClick , setUserClick] = useState();
    const [data , setData] = useState();
    const [quota , setQuota ] = useState();
    let email;
    useEffect (() =>{
        console.log(sessionStorage.getItem("customer"));
           if(sessionStorage.getItem("customer") == null){
                navigate("/customer-login");
           }  
           email = sessionStorage.getItem("customer");
           console.log(email);

           // Get customer Details
           axios.get(`http://localhost:8070/customers/${email}` ).then((res) =>{
               console.log(res.data._id);
               setData(res.data);

               // Get Fuel Quota
               axios.get(`http://localhost:8070/customers/getFuel/${res.data._id}`).then((r) =>{
                console.log(r.data[0].availableAmount);
        
                setQuota(r.data[0].availableAmount);
               }).catch((e) =>{
                console.log(e);
               })
           }).catch((err) =>{
               console.log(err);
           })

           
           
       },[])

    function ProfileClick() {
        setUserClick(!userClick);
    }
    return(
        <div>
            
            <Header/>
           
            <PageTitle pageTitle="MY PROFILE" />
            <div className="container" style={{marginTop : "5rem" , height : "100%" }}>
                <Row>
                    <Col md= {6}>
                        <Row md = {6}>
                            
                            <div className={common.card_div} onClick={() => ProfileClick()}>
                                <div>
                                    <ImProfile className={common.card_icon} />
                                </div>
                                <div>
                                    <h4>Personal Info</h4>
                                </div>
                            </div>
                        </Row>
                        <Row md = {6}>
                        <div className={common.card_div} onClick={() => ProfileClick()}>
                                <div>
                                    <FaCar className={common.card_icon} />
                                </div>
                                <div>
                                    <h4>Code and Vehicle Info</h4>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    <Col style={{marginLeft:"2rem" , marginTop : "1rem", borderStyle:"groove" , borderRadius:"10px" , paddingTop:"2rem"}}>
                        {userClick === true ? <UserInfoForm user = {data}/> : userClick === false ? <VehicleInfoForm user = {data}/> :  console.log("Hi")  }
                    </Col>
                </Row>
            </div>

            <div className={styles2.fuel_container}>
                <h1>Total Available Fuel Quota : {quota} l</h1>
            </div>
            
        </div>
    );

}

export default CustomerProfile;