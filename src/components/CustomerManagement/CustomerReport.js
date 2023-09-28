import { useState , useEffect  } from "react";
import React from "react";
import Pdf from "react-to-pdf";
import Header from "../Common/Header";
import PageTitle from "../PageTitle";
import common from "../../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/customer.module.css";
import axios from "axios";
import { Button,FormGroup, Label, Input  } from "reactstrap";


const ref = React.createRef();

function CustomerReport(){

    const navigate = useNavigate();
    const [ allocations , setAllocations ] = useState([]);
    const [ pumpings , setPumbings ] = useState([]);
    const [date, setdate] = useState();
    const [ fromDate , setFromdate ] = useState("");
    const [ toDate , setTodate ] = useState("");
    const [ isGenerate , setGenerate ] = useState(false); 

    let cusid;

    function generate(){
        setGenerate(!isGenerate);
    }
    function getFuelAllocations(){
        const dates = {
            toDate,
            fromDate
        }
        axios.post(`http://localhost:8070/fuelAllocations/byCus/${cusid}` , dates).then((res) =>{
            console.log("Fuel Allocation");
            console.log(dates);
            setAllocations(res.data);
            console.log(res.data);
        }).catch((err) =>{
            console.log(err);
        });
    }

    function getFuelPumpings(){
        const dates = {
            toDate,
            fromDate
        }
        axios.post(`http://localhost:8070/fuelUsage/getPumpings/${cusid}` , dates).then((res)=>{
            console.log("Fuel Pumping");
            console.log(dates);
            setPumbings(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    }
    useEffect(() => {
        if(sessionStorage.getItem("customer") == null){
            navigate("/customer-login");
       }  
        cusid = (sessionStorage.getItem("CusId"));
        let today = new Date().toISOString().slice(0, 10);
        setdate(today);
    }, );

    useEffect(() =>{
        let td = new Date(toDate);
        let fd = new Date(fromDate);
        if(td <= fd){
            alert("To Date should be greater than From Date");
        }
        else{
            getFuelAllocations();
            getFuelPumpings();
        }

    },[isGenerate]);

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [12,6]
    };
    return(
        <div>
            <Header/>
            <PageTitle pageTitle="Usage Report" />
            <div style={{display : "flex" , margin:"3rem" , float:"right" , borderStyle:"groove" , padding:"2rem" , boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" , borderRadius:"1rem"}} >

                <div style={{marginRight : "3rem"}}>
                <FormGroup>
                <Label for="fDate">From Date</Label>
                <Input
                  style={{
                        width: "max",
                        marginBottom: "10px",
                        }}
                  id="fromDate"
                  name="fromDate"
                  placeholder="Select Date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromdate(e.target.value)}
                  required
                />
              </FormGroup>
                </div>

                <div>
                <FormGroup>
                <Label for="tDate">To Date</Label>
                <Input
                  style={{
                        width: "max",
                        marginBottom: "10px",
                        }}
                  id="toDate"
                  name="toDate"
                  placeholder="Select Date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setTodate(e.target.value)}
                  required
                />
              </FormGroup>
                </div>

                <div style={{marginLeft : "2rem" , marginTop : "2rem"}}>
                    <Button className={common.btnPrimary} onClick={()=>{
                        generate();
                    }}>Generate</Button>
                </div>
            </div>
            
            <br /><br /><br /> <br /><br />
            <div className={styles.TableContainer} ref = {ref}>
            
            <h2>Fuel Allocations</h2>     
            <table className="table table-hover">
                        <thead style={{backgroundColor: '#082344',color: 'white',textalign: 'left',fontweight: 'bold'}}>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Vehicle</th>
                                <th scope="col">Allocated Amount</th>
                                <th scope="col">Available Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {allocations.map((allocation,index) =>(
                             <tr>
                                <th scope="row">{allocation.startDate}</th>
                                <td>{allocation.vehicleNumber}</td>
                                <td>{allocation.allocatedAmount}</td>
                                <td>{allocation.availableAmount}</td>
                                            
                            </tr>
                        ))}    

                        </tbody>
            </table>   
            <h2>Fuel Pumpings</h2>
                <table className="table table-hover">
                        <thead style={{backgroundColor: '#082344',color: 'white',textalign: 'left',fontweight: 'bold'}}>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Vehicle</th>
                                <th scope="col">Pumped Amount</th>
                                <th scope="col">Fuel Station</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pumpings.map((pumping , index)=>(
                                <tr>
                                    <th scope="row">{pumping.date}</th>
                                    <td>{pumping.vehicleNumber}</td>
                                    <td>{pumping.pumpedAmount} L</td>
                                    <td>{pumping.fuel_pumpings[0].stationName}</td>                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
           </div>                    
            <div>
                <Pdf targetRef={ref} filename="fuel-report.pdf" options={options} >
                {({ toPdf }) => 
                <button className="btn btn-primary" style={{width : "100%", backgroundColor: "#ff762e" , marginTop:"2rem" , marginBottom:"2rem"}} onClick={toPdf}
            > Capture as Pdf</button>}
                </Pdf>
            </div>
            

        </div>
    )
}

export default CustomerReport;