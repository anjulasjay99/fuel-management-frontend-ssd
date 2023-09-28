import { useState  } from "react";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input   } from "reactstrap";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function AddVehicle({user}){

    const [vehicleType, settype] = useState("");
    const [vehicleChassis, setchassis] = useState("");
    const [vehicleNumber, setnumplate] = useState("");
    const [email, setemail] = useState(user.email);
    
    function submit(e){
        e.preventDefault();
        const Newvehicle = {
          vehicleType,
          vehicleChassis,
          vehicleNumber
        }
        axios.post(`http://localhost:8070/customers/addVehicle/${email}`, Newvehicle).then((res) =>{
          console.log(res);
          toast.success('Vehicle Added!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            e.target.reset();
        }).catch((err) =>{
          console.log(err);
        });
    }


    return(
        <div>
          <Form onSubmit={(e) => submit(e)}> 
            <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  style={{
                        width: "max",
                        marginBottom: "10px",
                        }}
                  id="type"
                  className={styles.input}
                  name="type"
                  placeholder="Enter vehicle type. Ex : Car"
                  type="text"
                  value={vehicleType}
                  onChange={(e) => settype(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="chassis">Chassis No.</Label>
                <Input
                                  style={{
                                    width: "max",
                                    marginBottom: "10px",
                                    }}
                  id="chassis"
                  className={styles.input}
                  name="chassis"
                  placeholder="Enter Chassis Number"
                  type="text"
                  value={vehicleChassis}
                  onChange={(e) => setchassis(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="numplate">Vehicle Number Plate</Label>
                <Input
                                  style={{
                                    width: "max",
                                    marginBottom: "10px",
                                    }}
                  id="numplate"
                  className={styles.input}
                  name="numplate"
                  placeholder="Enter Vehicle Number plate. Ex : CAP-3432"
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setnumplate(e.target.value)}
                  pattern="^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})"
                  required
                />
              </FormGroup>
              <Button
                className={common.btnPrimary}
                style={{
                  width: "100%",
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              >
                Add Vehicle
              </Button>
        </Form>      
          <ToastContainer></ToastContainer>
        </div>
    )
}

export default AddVehicle;