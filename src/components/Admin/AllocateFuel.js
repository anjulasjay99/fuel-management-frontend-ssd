import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { useNavigate } from "react-router-dom";
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
import { Col, Row } from "react-bootstrap";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import AdminHeader from "../Common/AdminHeader";

function AllocateFuel() {
  const navigate = useNavigate();
  const [allocatedAmount, setallocatedAmount] = useState(0);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [customers, setcustomers] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState("");
  const [selectedVehicle, setselectedVehicle] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const cus = getSelectedCustomer();
    const data = {
      customerId: selectedCustomer,
      customerName: cus.name + " " + cus.surname,
      vehicleNumber: selectedVehicle,
      allocatedAmount,
      availableAmount: allocatedAmount,
      startDate,
      endDate,
    };

    axios
      .post("http://localhost:8070/fuelAllocations", data)
      .then((res) => {
        alert("Success");
        navigate("/fuel-allocations");
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err);
      });
  };

  const nextWeek = () => {
    let startd = new Date(startDate);

    startd.setDate(startd.getDate() + 7);
    console.log(startd);
    let endd = new Date(startd);
    endd.setDate(endd.getDate() + 6);
    setstartDate(startd.toISOString().split("T")[0]);
    setendDate(endd.toISOString().split("T")[0]);
  };

  const prevWeek = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    let startd = new Date(startDate);
    startd.setDate(startd.getDate() - 7);
    console.log(startd);
    if (startd >= now) {
      let endd = new Date(startd);
      endd.setDate(endd.getDate() + 6);
      setstartDate(startd.toISOString().split("T")[0]);
      setendDate(endd.toISOString().split("T")[0]);
    }
  };

  const getSelectedCustomer = () => {
    let cus = null;
    try {
      for (let i = 0; i < customers.length; i++) {
        if (customers[i]._id === selectedCustomer) {
          cus = customers[i];
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }

    return cus;
  };

  const getCustomers = () => {
    axios
      .get("http://localhost:8070/customers")
      .then((res) => {
        setcustomers(res.data);
        setselectedCustomer(res.data[0]._id);
        setselectedVehicle(res.data[0].vehicles[0].vehicleNumber);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("adminUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/admin-login");
    } else {
      getCustomers();
      const d = new Date();
      d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7));
      const d2 = new Date(d);
      d2.setDate(d2.getDate() + 6);
      setstartDate(d.toISOString().split("T")[0]);
      setendDate(d2.toISOString().split("T")[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (customers.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <AdminHeader />
        <PageTitle pageTitle={"Allocate Fuel"} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={styles.createAccForm}>
            <h3>Fuel Allocation</h3>
            <br />
            <Form onSubmit={(e) => submit(e)} style={{ width: "500px" }}>
              <FormGroup>
                <Label for="vehicleType">Customer*</Label>
                <Input
                  id="vehicleType"
                  name="vehicleType"
                  type="select"
                  value={selectedCustomer}
                  onChange={(e) => setselectedCustomer(e.target.value)}
                  required
                >
                  {customers.map((cus) => {
                    return (
                      <option value={cus._id}>
                        {cus.name + " " + cus.surname}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="vehicleType">Vehicle Number*</Label>
                <Input
                  id="vehicleType"
                  name="vehicleType"
                  type="select"
                  value={selectedVehicle}
                  onChange={(e) => setselectedVehicle(e.target.value)}
                  required
                >
                  {getSelectedCustomer().vehicles.map((v) => {
                    return (
                      <option value={v.vehicleNumber}>{v.vehicleNumber}</option>
                    );
                  })}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="amount">Amount*</Label>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Ex:- 2"
                    min={1}
                    value={allocatedAmount}
                    onChange={(e) => setallocatedAmount(e.target.value)}
                  />
                  <InputGroupText>Liters</InputGroupText>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="exampleDate">Effective Week*</Label>
                <Row>
                  <Col>
                    <Label for="exampleDate" style={{ fontSize: "12px" }}>
                      Week Starting Date
                    </Label>
                    <Row>
                      <Col xs={5}>
                        <Label>{startDate}</Label>
                      </Col>
                      <Col xs={1}>
                        <FaChevronUp
                          onClick={nextWeek}
                          style={{
                            cursor: "pointer",
                            border: "2px solid #ccc",
                          }}
                          title="Next Week"
                        />
                      </Col>
                      <Col xs={1}>
                        <FaChevronDown
                          onClick={prevWeek}
                          style={{
                            cursor: "pointer",
                            border: "2px solid #ccc",
                          }}
                          title="Previous Week"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Label for="exampleDate" style={{ fontSize: "12px" }}>
                      Week Ending Date
                    </Label>
                    <Row>
                      <Label>{endDate}</Label>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
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
                  onClick={() => navigate("/fuel-allocations")}
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
}

export default AllocateFuel;
