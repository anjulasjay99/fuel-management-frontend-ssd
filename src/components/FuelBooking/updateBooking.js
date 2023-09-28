
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import "../../Css/Addcomplaint.css"
import axios from 'axios';
import Header from '../Common/Header';
import { useParams } from "react-router-dom";

function UpdateBooking() {
    const navigate = useNavigate();
    const [vehicleType, setvehicleType] = useState("");
    const [bkgDate, setbookedDate] = useState("");
    const [vehicleNo, setvehicleNo] = useState("");
    const [litres, setlitres] = useState("");
    const [fuelType, setfuelTypes] = useState("");
    const [stationName, setstationName] = useState("");
    const [stationCity, setstationCity] = useState("");
    const { id } = useParams();

    const vehicleTypes = [{ value: 'Bike', label: 'Bike', }, { value: 'Car', label: 'Car', }, { value: 'Van', label: 'Van', }, { value: 'Lorry', label: 'Lorry', },];
    const Cities = [{ value: 'Ja - Ela', label: 'Ja - Ela', }, { value: 'Moratuwa', label: 'Moratuwa', }, { value: 'Malabe', label: 'Malabe', },
    { value: 'Dehiwala', label: 'Dehiwala', },];
    const Stations = [{ value: 'Eheliyagoda Associates', label: 'Eheliyagoda Associates', }, { value: 'Ss Kotalawala P Ltd', label: 'Ss Kotalawala P Ltd', },
    { value: 'Alliance Enterprises', label: 'Alliance Enterprises', }, { value: 'Ben Hewa Associates(pvt)ltd', label: 'Ben Hewa Associates(pvt)ltd', },];

    const handleChange = (event) => {
        setvehicleType(event.target.value);
    };

    const handleCityChange = (event) => {
        setstationCity(event.target.value);
    };

    const handleStationChange = (event) => {
        setstationName(event.target.value);
    };

    function UpdateBkg(e) {
        e.preventDefault();
        const updatedBkg = {
            vehicleType,
            vehicleNo,
            bkgDate,
            litres,
            fuelType,
            stationName,
            stationCity,
        }
        console.log(updatedBkg);
        axios.put(`http://localhost:8070/fuelBookings/update/${id}`, updatedBkg).then((res) => {
            console.log(res.data)
            alert("Booking Successfully Updated");
        }).catch((err) => {
            console.log(err);
            alert(err);
        })
    };

    useEffect(() => {

        axios.get(`http://localhost:8070/fuelBookings/get/${id}`).then((res) => {
            console.log(res.data);
            setvehicleType(res.data.vehicleType);
            setbookedDate(res.data.bkgDate);
            setvehicleNo(res.data.vehicleNo);
            setlitres(res.data.litres);
            setfuelTypes(res.data.fuelType);
            setstationName(res.data.stationName);
            setstationCity(res.data.stationCity);
        }).catch((err) => {
            console.log(err)
        })

    }, []);

    return (
        <>
            <Header />
            <div style={{ marginTop: "40px" }}>
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>CREATE ONLINE FUEL BOOKING</h2>
            </div>
            <div style={{ backgroundColor: '#ff762e', textalign: 'left', width: '100%', height: '6px' }}></div>
            <center>
                <div className="card" style={{
                    width: "50rem", borderRadius: "2em",
                    borderStyle: 'solid',
                    borderColor: ' #ff762e', margin: "100px", padding: "50px", marginTop: "50px",
                    display: 'flex',
                    justifyContent: 'center',
                }} >
                    <div className="card-body">
                        <div>
                            <form onSubmit={UpdateBkg} >
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1" style={{ float: "left", fontWeight: "bold" }}>Vehicle Type</label><br />

                                    <TextField required
                                        id="standard-select-currency"
                                        select
                                        label="Required"
                                        value={vehicleType}
                                        onChange={handleChange}
                                        helperText="Please select your vehicle" fullWidth
                                        variant="standard" style={{ float: "left", textAlign: "left" }} color="warning"
                                    >
                                        {vehicleTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div> <br /><br /><br /><br />

                                <div class="form-group" >
                                    <label for="exampleFormControlInput1" style={{ float: "left", fontWeight: "bold" }}>Vehicle No. </label><br />
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="Required"
                                        defaultValue="BCD-XXXX"
                                        variant="standard" color="warning" fullWidth
                                        value={vehicleNo} onChange={(e) => { setvehicleNo(e.target.value) }} style={{ float: "left" }}
                                    />

                                </div>
                                <br /> <br />  <br />

                                <div class="form-group">
                                    <label for="exampleFormControlInput1" style={{ float: "left", fontWeight: "bold" }}>Date</label>
                                    <input required value={bkgDate} onChange={(e) => { setbookedDate(e.target.value) }}
                                        type="date" class="form-control" id="exampleFormControlInput1" />
                                </div>
                                <br></br>
                                <label for="exampleFormControlInput1" style={{ float: "left", fontWeight: "bold" }}>Fuel Type</label><br />
                                <FormControl style={{ float: "left" }} value={fuelType} onChange={(e) => { setfuelTypes(e.target.value) }}>
                                    <FormLabel id="demo-radio-buttons-group-label" ></FormLabel>
                                    <RadioGroup required
                                        aria-labelledby="demo-radio-buttons-group-label"

                                        defaultValue="petrol"
                                        name="radio-buttons-group"
                                        row style={{ marginLeft: "1000" }}
                                    >
                                        <FormControlLabel value="petrol" control={<Radio />} label="Petrol" />
                                        <FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
                                    </RadioGroup>
                                </FormControl>

                                <br /><br /><br />
                                <div class="form-group">

                                    <label for="exampleFormControlTextarea1" style={{ float: "left", fontWeight: "bold" }}>Litres</label><br />
                                    <TextField required
                                        id="standard-number"
                                        label="Required"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard" value={litres} onChange={(e) => { setlitres(e.target.value) }}
                                        style={{ float: "left" }} color="warning" fullWidth
                                    />
                                </div>
                                <br /><br /><br />
                                <div class="form-group">
                                    <TextField required
                                        id="standard-select-currency"
                                        select
                                        label="City"
                                        value={stationCity}
                                        onChange={handleCityChange}
                                        helperText="Please select the city" fullWidth
                                        variant="standard" style={{ float: "left", width: "50%", textAlign: "left" }} color="warning"
                                    >
                                        {Cities.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField required
                                        id="standard-select-currency"
                                        select
                                        label="Filling Station"
                                        value={stationName}
                                        onChange={handleStationChange}
                                        helperText="Please select the filling station" fullWidth
                                        variant="standard" style={{ marginLeft: "10px", width: "48%", float: "left", textAlign: "left" }} color="warning"
                                    >
                                        {Stations.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div> <br /><br /><br /><br /><br />

                                <div class="form-group">
                                    <button style={{ width: "100%", height: "60px", backgroundColor: "#ff762e" }}
                                        type="submit" className="btn btn-primary" >
                                        UPDATE BOOKING
                                    </button>
                                    <br />
                                    <button style={{ width: "100%", height: "60px", marginTop: "10px", backgroundColor: " #082344", }}
                                        type="submit" className="btn btn-primary" onClick={() => navigate("/FuelBookings")}>
                                        CANCEL
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </center>
        </>
    );
}

export default UpdateBooking;
