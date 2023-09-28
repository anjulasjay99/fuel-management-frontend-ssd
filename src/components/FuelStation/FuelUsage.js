/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import StationHeader from "../Common/StationHeader";
import PageTitle from "../PageTitle";
import common from "../../styles/common.module.css";
import {
  FormGroup,
  Button,
  Form,
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FuelUsage() {
  const [usages, setusages] = useState([]);
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [modal, setmodal] = useState(false);
  const [selectedVehicle, setselectedVehicle] = useState("");
  const [pumpedAmount, setpumpedAmount] = useState(0);
  const [customers, setcustomers] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState("");
  const [fuelAllocations, setfuelAllocations] = useState([]);
  const [selectedStartDate, setselectedStartDate] = useState("");
  const [searchText, setsearchText] = useState("");

  const toggle = () => {
    setmodal(!modal);
  };

  const getUsage = (id) => {
    axios
      .get(`http://localhost:8070/fuelUsage/${id}`)
      .then((res) => {
        setusages(res.data.data);
      })
      .catch((err) => {
        alert("Error!");
      });
  };

  const selectCustomer = (id) => {
    setselectedCustomer(id);
    getFuelAllocations(id);
  };

  const addFuelUsage = () => {
    if (pumpedAmount > 0) {
      const cus = getSelectedCustomer();
      const data = {
        stationId: user.stationId,
        customerId: selectedCustomer,
        customerName: cus.name + " " + cus.surname,
        vehicleNumber: selectedVehicle,
        pumpedAmount,
        startDate: selectedStartDate,
      };
      axios
        .post(`http://localhost:8070/fuelUsage`, data)
        .then((res) => {
          alert("Success");
          getUsage(user.stationId);
          setmodal(false);
          setpumpedAmount(0);
        })
        .catch((err) => {
          alert("Error!");
        });
    } else {
      alert("Amount should be greater than 0");
    }
  };

  const getSelectedCustomer = () => {
    let cus = null;
    for (let i = 0; i < customers.length; i++) {
      if (customers[i]._id === selectedCustomer) {
        cus = customers[i];
        break;
      }
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
        getFuelAllocations(res.data[0]._id);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const getFuelAllocations = (id) => {
    axios
      .get(`http://localhost:8070/fuelAllocations/${id}`)
      .then((res) => {
        setfuelAllocations(res.data.data);
        setselectedStartDate(res.data.data[0].startDate);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const onSearch = (val) => {
    setsearchText(val);
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/fuel-station-login");
    } else {
      setuser(userData);
      getUsage(userData.stationId);
      getCustomers();
    }
  }, []);

  if (
    usages.length === 0 ||
    customers.length === 0 ||
    fuelAllocations.length === 0
  ) {
    return (
      <div>
        <StationHeader />
        <PageTitle pageTitle={"Fuel Usage"} />
      </div>
    );
  } else {
    return (
      <div>
        <StationHeader />
        <PageTitle pageTitle={"Fuel Usage"} />
        <div
          style={{
            width: "100%",
            marginTop: "50px",
            padding: "0px 100px 0px 100px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
                width: "25%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              <Input
                id="search"
                name="search"
                className={common.searchInput}
                placeholder="Search"
                type="text"
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            <div>
              <Button className={common.btnPrimary} onClick={toggle}>
                Add New
              </Button>
            </div>
          </div>

          <Table bordered striped className={common.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>CUSTOMER NAME</th>
                <th>VEHICLE NUMBER </th>
                <th>PUMPED AMOUNT (LITERS)</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {usages.length > 0
                ? usages
                    .filter((data) => {
                      if (searchText !== "") {
                        if (
                          data.customerName
                            .trim()
                            .toLowerCase()
                            .includes(searchText.trim().toLowerCase())
                        ) {
                          return data;
                        }
                      } else {
                        return data;
                      }
                    })
                    .map((usg, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{usg.customerName}</td>
                          <td>{usg.vehicleNumber}</td>
                          <td>{usg.pumpedAmount}</td>
                          <td>{usg.date}</td>
                        </tr>
                      );
                    })
                : "No data available"}
            </tbody>
          </Table>
        </div>
        <Modal isOpen={modal} toggle={toggle} style={{ width: "600px" }}>
          <ModalHeader toggle={toggle}>Add Fuel Usage</ModalHeader>
          <ModalBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                columnGap: "10px",
              }}
            >
              <Form>
                <FormGroup>
                  <Label for="vehicleType">Customer*</Label>
                  <Input
                    id="vehicleType"
                    name="vehicleType"
                    type="select"
                    value={selectedCustomer}
                    onChange={(e) => selectCustomer(e.target.value)}
                    required
                  >
                    {customers
                      ? customers.map((cus) => {
                          return (
                            <option value={cus._id}>
                              {cus.name + " " + cus.surname}
                            </option>
                          );
                        })
                      : "----"}
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
                    {customers
                      ? getSelectedCustomer().vehicles.map((v) => {
                          return (
                            <option value={v.vehicleNumber}>
                              {v.vehicleNumber}
                            </option>
                          );
                        })
                      : "----"}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="startDate">Allocation Week Start Date*</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="select"
                    value={selectedStartDate}
                    onChange={(e) => setselectedStartDate(e.target.value)}
                    required
                  >
                    {customers
                      ? fuelAllocations.map((v) => {
                          return (
                            <option value={v.startDate}>{v.startDate}</option>
                          );
                        })
                      : "----"}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Amount*</Label>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="Ex:- 2"
                      value={pumpedAmount}
                      onChange={(e) => setpumpedAmount(e.target.value)}
                    />
                    <InputGroupText>Liters</InputGroupText>
                  </InputGroup>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className={common.btnSecondary}
              onClick={toggle}
            >
              Close
            </Button>
            <Button
              color="primary"
              className={common.btnPrimary}
              onClick={addFuelUsage}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FuelUsage;
