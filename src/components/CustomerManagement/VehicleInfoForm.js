import { useState , useEffect } from "react";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Label, Input ,  Modal , ModalBody , ModalHeader  } from "reactstrap";
import AddVehicle from "./CustomerAddVehicle";


const QRCode = require('qrcode')
function VehicleInfoForm({user}){

    const [code, setcode] = useState("");
    const [vehicles , setVehicles] = useState(user.vehicles[0]);
    const [modal , setModal] = useState(false);

    const navigate = useNavigate();

    function toggle(){
        setModal(!modal);
    }



    useEffect(() =>{
        QRCode.toDataURL(user.email).then((data) =>{
            setcode(data);
        })
    })
    return(
        <div>
            <FormGroup>
                        <Label for="name"><b>Vehicle QR Code</b></Label>

                        <div>
                            <img src={code} style={{marginLeft:"12rem" , height:"13rem"}}  />
                        </div>
                       
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label for="name"><b>Vehicle Type</b></Label>
                        <Input
                        id="type"
                        className={styles.input}
                        name="type"
                        placeholder="Car"
                        type="text"
                        value={vehicles.vehicleType}
                        onChange={(e) => setVehicles(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="name"><b>Vehicle Number</b></Label>
                        <Input
                        id="vehicleNo"
                        className={styles.input}
                        name="vehicleNo"
                        placeholder="CAP 4985"
                        type="text"
                        value={vehicles.vehicleNumber}
                        onChange={(e) => setVehicles(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="telNo"><b>Chassis Number</b></Label>
                        <Input
                        id="chassisNo"
                        className={styles.input}
                        name="chassisNo"
                        placeholder="0763545432"
                        type="text"
                        value={vehicles.vehicleChassis}
                        onChange={(e) => setVehicles(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>
                    <br />
                        <Button className={common.btnPrimary} onClick={()=>{
                            navigate("/customer-view-vehicles");
                        }}>View Vehicles</Button>
                        <Button className={common.btnPrimary} style={{float:"right"}} onClick={toggle}>Add Vehicle</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                            Add Vehicle
                        </ModalHeader>
                        <ModalBody>
                            <AddVehicle user = {user} />
                        </ModalBody>
                    </Modal>    
           
        </div>
    );
    
}

export default VehicleInfoForm;