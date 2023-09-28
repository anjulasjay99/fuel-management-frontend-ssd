import axios from "axios";
import { useState } from "react";
import { Button,FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

function CustomerUnreg({email}){

    const [ password , setPassword ] = useState("");
    
    const navigate = useNavigate();
    function unreg(){
        const pass = {
            password
        }
        console.log(pass);
        axios.post(`http://localhost:8070/customers/pass/${email}` , pass ).then((res) =>{
        
            console.log(res.data.status);
            if(res.data.status){
                axios.delete(`http://localhost:8070/customers/unregister/${email}`).then((res) =>{
                    console.log(res);
                    // Navigate to Reg Page
                    navigate("/customer-registration")
                }).catch((err) =>{
                    console.log(err);
                });
            }
            else{
                alert("Password is wrong !");
            }
        }).catch((err)=>{
            console.log(err);
        })




    }
    return(
        <div>

                    <FormGroup>
                        <Label for="password"><b>Confirm Password</b></Label>
                        <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </FormGroup>

                    <Button color="danger" style={{width:"29rem"}} onClick={()=>{
                        unreg();
                    }}>Unregister</Button>
                    
        </div>
    )
}

export default CustomerUnreg;