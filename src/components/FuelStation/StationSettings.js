import React, { useState, useEffect } from "react";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

function StationSettings({ user, setuser }) {
  const [stationName, setstationName] = useState("");
  const [type, settype] = useState("Lanka IOC");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [zipCode, setzipCode] = useState(0);
  const [contactNo, setcontactNo] = useState(0);
  const [ownerName, setownerName] = useState("");
  const [ownerNic, setownerNic] = useState("");
  const [ownerContactNo, setownerContactNo] = useState(0);
  const [ownerEmail, setownerEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const data = {
      stationId: user.stationId,
      stationName,
      type,
      address,
      city,
      province,
      zipCode,
      contactNo,
      ownerName,
      ownerNic,
      ownerContactNo,
      ownerEmail,
    };

    axios({
      method: "PUT",
      url: "http://localhost:8070/fuelStations/updateInfo",
      headers: {
        "x-access-token": sessionStorage.getItem("fsToken"),
      },
      data,
    })
      .then((res) => {
        alert(res.data.msg);
        const usr = {
          ...user,
          data,
        };
        sessionStorage.setItem("fsUser", JSON.stringify(usr));
        setuser(usr);
      })
      .catch((e) => {
        alert("Error!");
      });
  };

  useEffect(() => {
    console.log(user);
    if (user != null) {
      setstationName(user.stationName);
      settype(user.type);
      setaddress(user.address);
      setcity(user.city);
      setprovince(user.province);
      setzipCode(user.zipCode);
      setcontactNo(user.contactNo);
      setownerName(user.ownerName);
      setownerNic(user.ownerNic);
      setownerEmail(user.ownerEmail);
      setownerContactNo(user.ownerContactNo);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.stationSettingsDiv}>
      <Form className={styles.form} onSubmit={(e) => submit(e)}>
        <div className={styles.section}>
          <Label className={styles.subTitle}>Station Information</Label>
          <FormGroup>
            <Label for="stationName">Name of the Station* </Label>
            <Input
              id="stationName"
              className={styles.input}
              name="stationName"
              placeholder="Type station name..."
              type="text"
              value={stationName}
              onChange={(e) => setstationName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="type">Type*</Label>
            <Input
              id="type"
              name="type"
              type="select"
              value={type}
              onChange={(e) => settype(e.target.value)}
            >
              <option value="Lanka IOC">Lanka IOC</option>
              <option value="Ceypetco">Ceypetco</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address*</Label>
            <Input
              id="address"
              className={styles.input}
              name="address"
              placeholder="Type station address..."
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              required
            />
          </FormGroup>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: "20px",
            }}
          >
            <FormGroup>
              <Label for="city">City*</Label>
              <Input
                id="city"
                className={styles.inputSm}
                name="city"
                placeholder="Colombo"
                type="text"
                value={city}
                onChange={(e) => setcity(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="province">Province*</Label>
              <Input
                id="province"
                className={styles.inputSm}
                name="province"
                placeholder="Western"
                type="text"
                value={province}
                onChange={(e) => setprovince(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="zipcode">Zip Code*</Label>
              <Input
                id="zipcode"
                className={styles.inputSm}
                name="zipcode"
                placeholder="11000"
                type="text"
                value={zipCode}
                onChange={(e) => setzipCode(e.target.value)}
                pattern="[0-9]+"
                required
              />
            </FormGroup>
          </div>
          <FormGroup>
            <Label for="contactNo">Contact No.*</Label>
            <Input
              id="contactNo"
              className={styles.input}
              name="contactNo"
              placeholder="0112236346"
              type="phone"
              value={contactNo}
              onChange={(e) => setcontactNo(e.target.value)}
              pattern="[0-9]{9,10}"
              required
            />
          </FormGroup>
        </div>
        <div className={styles.section}>
          <Label className={styles.subTitle}>
            Property Owner's Information
          </Label>
          <FormGroup>
            <Label for="fullname">Full Name*</Label>
            <Input
              id="fullname"
              className={styles.input}
              name="fullname"
              placeholder="Joe Smith"
              type="text"
              value={ownerName}
              onChange={(e) => setownerName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="nic">NIC*</Label>
            <Input
              id="nic"
              className={styles.input}
              name="nic"
              placeholder="Type owner NIC..."
              type="text"
              value={ownerNic}
              onChange={(e) => setownerNic(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="personalContactNo">Personal Contact No.*</Label>
            <Input
              id="personalContactNo"
              className={styles.input}
              name="personalContactNo"
              placeholder="0112236346"
              type="text"
              value={ownerContactNo}
              onChange={(e) => setownerContactNo(e.target.value)}
              pattern="[0-9]{9,10}"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="personalEmail">Personal Email*</Label>
            <Input
              id="personalEmail"
              className={styles.input}
              name="personalEmail"
              placeholder="joe@gmail.com"
              type="email"
              value={ownerEmail}
              onChange={(e) => setownerEmail(e.target.value)}
              required
            />
          </FormGroup>
        </div>
        <div className={styles.btnContainer}>
          <Button type="submit" className={common.btnPrimary}>
            Update Station Details
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default StationSettings;
