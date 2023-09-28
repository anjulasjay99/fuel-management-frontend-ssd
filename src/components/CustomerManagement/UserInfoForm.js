import { useState , useEffect } from "react";
import axios from "axios";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import EditProfile from "./EditProfile";
import { AiFillEdit } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomerUnreg from "./CustomerUnreg";
import { Button,  FormGroup, Label, Input ,  Modal , ModalBody , ModalHeader   } from "reactstrap";

function UserInfoForm({user}){

    const [modal , setModal] = useState(false);
    const [email, setemail] = useState(user.email);
    const [name, setname] = useState(user.name);
    const [surname, setsurname] = useState(user.surname);
    const [telNo, setTelNo] = useState(user.telNo);
    const [unregModal , setunregModal ] = useState(false);

    const navigate = useNavigate();

    function unregToggle(){
        setunregModal(!unregModal);
    }
    useEffect(() =>{
        
        axios.get(`http://localhost:8070/customers/${email}` ).then((res) =>{
            console.log(res.data);
         
             setemail(res.data.email);
             setname(res.data.name);
             setsurname(res.data.surname);
             setTelNo(res.data.telNo);
        }).catch((err) =>{
            console.log(err);
        })
    },[])

    function toggle(){
        setModal(!modal);
    }
    return(
        <div>
            <FormGroup>
                        <Label for="name"><b>Name</b></Label>
                        <Input
                        id="name"
                        className={styles.input}
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="name"> <b>Surname</b></Label>
                        <Input
                        id="surname"
                        className={styles.input}
                        name="name"
                        type="text"
                        value={surname}
                        onChange={(e) => setsurname(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="name"><b>Email</b></Label>
                        <Input
                        id="email"
                        className={styles.input}
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="telNo"><b>Telephone Number</b></Label>
                        <Input
                        id="telNo"
                        className={styles.input}
                        name="telNo"
                        type="text"
                        value={telNo}
                        onChange={(e) => setTelNo(e.target.value)}
                        required
                        disabled
                        />
                    </FormGroup>
                    <br />
                        <Button color="danger" 
                        onClick={unregToggle}
                        >Unregister <IoTrashBin size={19}/></Button>
                        <Button className={common.btnSecondary} style={{float:"right" , width : "6rem"}} onClick={toggle} >Edit <AiFillEdit size={19} /> </Button>
                    
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                            Edit Profile
                        </ModalHeader>
                        <ModalBody>
                            <EditProfile user = {user}/>
                        </ModalBody>

                    </Modal>

                    <Modal isOpen={unregModal} toggle={unregToggle}>
                        <ModalHeader toggle={unregToggle}>
                            Unregister
                        </ModalHeader>
                        <ModalBody>
                           <CustomerUnreg  email = {email}/>
                        </ModalBody>

                    </Modal>
        </div>
    );
    
}

export default UserInfoForm;