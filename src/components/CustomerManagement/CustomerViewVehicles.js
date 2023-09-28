import { useState , useEffect } from "react";
import Header from "../Common/Header";
import PageTitle from "../PageTitle";
import styles from "../../styles/customer.module.css";
import axios from "axios";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function ViewVehicles() {

    const [ vehicles , setVehicles ] = useState([]);
    let email = sessionStorage.getItem("customer");
    let {filterData} = useState();
    const [searchVal , setSearchVal] = useState("");
    
    useEffect(() =>{
        getVehicles();
    },[])

    const filterComplaints = e =>{
        setSearchVal(e.target.value);
        if(e.target.value === ""){
            getVehicles();
        }
      }

    function globalSearch() {
     
        filterData = vehicles.filter((value)=>{
            return(
                value.vehicleType.toLowerCase().includes(searchVal.toLowerCase()) ||
                value.vehicleChassis.toLowerCase().includes(searchVal.toLowerCase()) || 
                value.vehicleNumber.toLowerCase().includes(searchVal.toLowerCase())  
            )
        })
        setVehicles(filterData);
    }
    function DeleteVehicle(vehicleNumber){
        console.log(vehicleNumber);
        if(
            window.confirm(
                    "Are you sure you want to remove the selected vehicle ?"
                )
        )

        {
            const vid = {
                vehicleNumber
            }
            console.log(vid);
            console.log(email);
            axios.post(`http://localhost:8070/customers/removeVehicle/${email}` , vid ).then((res) =>{
                getVehicles();

                setTimeout(()=>{
                    toast.info('Vehicle Removed!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                },1000)

            }).catch((err) =>{
                console.log(err);
            });
        }

    }

    function getVehicles() {
        axios.get(`http://localhost:8070/customers/getVehicles/${email}`).then((res) =>{
            setVehicles(res.data.vehicles);
            console.log(res.data.vehicles);
        })
    }



    return(
        <div>
          <Header/>
          <PageTitle pageTitle="View Vehicles" />
          <div className={styles.TableContainer}>
          <div class="input-group">
                            <input style={{maxWidth:"200px",marginLeft:"1130px",border:"1px solid #082344"}} id="searchText"type="text" class="form-control" name="q" placeholder="Search Here" onChange = {filterComplaints} allowClear value={searchVal}/>
                            <span class="input-group-btn">
                                <a  id="x" class="btn btn-default hide" href="#" title="Clear"><i class="glyphicon glyphicon-remove"></i> </a>
                                <button onClick={globalSearch}style={{backgroundColor: "#082344",maxwidth:"200px",color:"white"}}class="btn btn-info" type="submit" >  Search  </button>
                            </span>
                        </div>
                        <br />
          <table class="table table-hover">
            <thead style={{backgroundColor: '#082344',color: 'white',textalign: 'left',fontweight: 'bold'}}>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Chassis Number</th>
                    <th scope="col">Number Plate</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {vehicles.map((vehicle , index) =>{
                    return(
                    <tr>
                        <th scope="row">{vehicles.indexOf(vehicle)+1}</th>
                        <td>{vehicle.vehicleType}</td>
                        <td>{vehicle.vehicleChassis}</td>
                        <td>{vehicle.vehicleNumber}</td>      
                        <td><i onClick = {()=>
                            { DeleteVehicle(vehicle.vehicleNumber)}} 
                            class="fa fa-trash" aria-hidden="true"></i></td>
                    </tr>
                    )
                })}
                
            </tbody>
          </table>

          </div>
          <ToastContainer></ToastContainer>
        </div>
    )
}

export default ViewVehicles;