import { useState  } from "react";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Label, Input  } from "reactstrap";
import axios from "axios";




function EditProfile({user}){


    const [email, setemail] = useState(user.email);
    const [name, setname] = useState(user.name);
    const [surname, setsurname] = useState(user.surname);
    const [telNo, setTelNo] = useState(user.telNo);

    const editClick = (e) =>{
        e.preventDefault();
        const updatedData = {
            email,
            name,
            surname,
            telNo
        }
        axios.put("http://localhost:8070/customers/edit" , updatedData ).then((req,res) =>{
            toast.success('Details Updated!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.log(res);
            setTimeout(() => {
                window.location.reload();
              }, 5000);
        }).catch((err) =>{
            console.log(err);
        })
    }
    return(
        <div>
            <Form onSubmit={(e) => editClick(e)}>

            
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                        id="name"
                        className={styles.input}
                        name="name"
                        placeholder="Shehan"
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="name">Surname</Label>
                        <Input
                        id="surname"
                        className={styles.input}
                        name="name"
                        placeholder="Silva"
                        type="text"
                        value={surname}
                        onChange={(e) => setsurname(e.target.value)}
                        required
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="name">Email</Label>
                        <Input
                        id="email"
                        className={styles.input}
                        name="email"
                        placeholder="shehan@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="telNo">Telephone Number</Label>
                        <Input
                        id="telNo"
                        className={styles.input}
                        name="telNo"
                        placeholder="0763545432"
                        type="text"
                        value={telNo}
                        onChange={(e) => setTelNo(e.target.value)}
                        pattern="[0-9]{9,10}"
                        required
                        />
                    </FormGroup>
                        <Button className={common.btnSecondary} style={{width:"100%" , marginTop:"1rem"}} >Edit</Button>
                    
                    <ToastContainer></ToastContainer>
            </Form>
        </div>
    );
}

export default EditProfile;