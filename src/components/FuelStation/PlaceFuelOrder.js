/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import StationHeader from "../Common/StationHeader";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import axios from "axios";

function PlaceFuelOrder() {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [type, settype] = useState("Petrol (92 Octane)");
  const [amount, setamount] = useState(0);
  const [timeOfDelivery, settimeOfDelivery] = useState("");
  const [payment, setpayment] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      stationId: user.stationId,
      type,
      amount,
      timeOfDelivery,
      email: user.email,
      address: user.address,
      province: user.province,
      city: user.city,
      zipCode: user.zipCode,
      contactNo: user.contactNo,
      payment,
    };

    console.log(data);

    const token = sessionStorage.getItem("fsToken");
    console.log(token);

    axios({
      method: "POST",
      url: "http://localhost:8070/fuelOrders",
      headers: {
        "x-access-token": token,
      },
      data,
    })
      .then((res) => {
        alert("Successful!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onChangeType = (type) => {
    settype(type);
    calcPayemnt(type, amount);
  };

  const onChangeAmount = (amount) => {
    setamount(amount);
    calcPayemnt(type, amount);
  };

  const calcPayemnt = (type, amount) => {
    axios
      .post("http://localhost:8070/fuelOrders/calculatePayment", {
        type,
        amount,
      })
      .then((res) => {
        setpayment(res.data.payment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/fuel-station-login");
    } else {
      setuser(userData);
    }
  }, []);

  return (
    <div>
      <StationHeader />
      <PageTitle pageTitle={"Order Fuel"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.createAccForm}>
          <h3>Order Fuel</h3>
          <br />
          <Form onSubmit={(e) => submit(e)} style={{ width: "500px" }}>
            <FormGroup>
              <Label for="email">Type*</Label>
              <Input
                id="fuelType"
                name="fuelType"
                type="select"
                value={type}
                onChange={(e) => onChangeType(e.target.value)}
                required
              >
                <option value="Petrol (92 Octane)">Petrol (92 Octane)</option>
                <option value="Petrol (95 Octane)">Petrol (95 Octane)</option>
                <option value="Diesel (Auto Diesel)">
                  Diesel (Auto Diesel)
                </option>
                <option value="Diesel (Lanka Super Diesel)">
                  Diesel (Lanka Super Diesel)
                </option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount*</Label>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="1000"
                  min={100}
                  value={amount}
                  onChange={(e) => onChangeAmount(e.target.value)}
                />
                <InputGroupText>Litres</InputGroupText>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Time of Delivery*</Label>
              <Input
                id="exampleDate"
                name="date"
                placeholder="date placeholder"
                type="date"
                value={timeOfDelivery}
                onChange={(e) => settimeOfDelivery(e.target.value)}
                required
              />
            </FormGroup>
            <Label className={styles.subTitle}>
              Location & Contact Information
            </Label>
            <div className={styles.infoSection}>
              <Label className={styles.name}>Location</Label>
              <Label className={styles.value}>
                {`${user.address}, ${user.city}, ${user.province}, ${user.zipCode}`}
              </Label>
            </div>
            <div className={styles.infoSection}>
              <Label className={styles.name}>Contact No.</Label>
              <Label className={styles.value}>{user.contactNo}</Label>
            </div>
            <div className={styles.infoSection}>
              <Label className={styles.name}>Email</Label>
              <Label className={styles.value}>{user.email}</Label>
            </div>
            <br />
            <Label>
              You can change these information from{" "}
              <Link to="/fuel-station-settings" className={styles.edit}>
                settings
              </Link>
            </Label>
            <br />
            <Label style={{ fontSize: "22px", fontWeight: "bold" }}>
              Payment : LKR{" "}
              {payment.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </Label>
            <br />

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Button
                className={common.btnSecondary}
                style={{
                  marginTop: "30px",
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
                onClick={() => navigate("/fuel-orders")}
              >
                Cancel
              </Button>
              <Button
                className={common.btnPrimary}
                style={{
                  marginTop: "30px",
                  marginBottom: "10px",
                }}
              >
                Confirm
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PlaceFuelOrder;
