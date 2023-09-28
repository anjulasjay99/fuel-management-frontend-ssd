import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import common from "../../styles/common.module.css";
import { Button, Label, Input, Table, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../Common/AdminHeader";

function FuelAllocations() {
  const [allocations, setallocations] = useState([]);
  const [startDates, setstartDates] = useState([]);
  const [selectedStartDate, setselectedStartDate] = useState("");
  const navigate = useNavigate();

  const navigateToNewAllocation = () => {
    navigate("/allocate-fuel");
  };

  const setStartDates = (data) => {
    let first = true;
    // eslint-disable-next-line array-callback-return
    data.forEach((d) => {
      if (!startDates.includes(d.startDate)) {
        startDates.push(d.startDate);
        if (first) {
          setselectedStartDate(d.startDate);
          first = false;
        }
      }
    });
  };

  const getAllocations = async () => {
    await axios
      .get(`http://localhost:8070/fuelAllocations`)
      .then((res) => {
        setallocations(res.data.data);
        setStartDates(res.data.data);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("adminUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/admin-login");
    } else {
      getAllocations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (allocations.length === 0) {
    return (
      <div>
        <AdminHeader />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: " center",
          }}
        >
          <PageTitle pageTitle="Fuel Allocations" />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <AdminHeader />
        <PageTitle pageTitle={"Fuel Allocations"} />
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
                width: "50%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "10px",
              }}
            >
              <Row>
                <Col xs={4}>
                  <Label>Allocations for week starting from : </Label>
                </Col>
                <Col>
                  <Input
                    id="search"
                    name="search"
                    className={common.searchInput}
                    type="select"
                    value={selectedStartDate}
                    onChange={(e) => setselectedStartDate(e.target.value)}
                    required
                  >
                    {startDates.length > 0 ? (
                      startDates.map((date) => {
                        return <option value={date}>{date}</option>;
                      })
                    ) : (
                      <option>--No Dates--</option>
                    )}
                  </Input>
                </Col>
              </Row>
            </div>
            <div>
              <Button
                className={common.btnPrimary}
                onClick={navigateToNewAllocation}
              >
                New Allocation
              </Button>
            </div>
          </div>

          <Table bordered striped className={common.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>CUSTOMER NAME</th>
                <th>VEHICLE NUMBER</th>
                <th>ALLOCATED AMOUNT (LITERS)</th>
                <th>AVAILABLE AMOUNT (LITERS)</th>
                <th>EFFECTIVE TIME PERIOD</th>
              </tr>
            </thead>
            <tbody>
              {allocations.length > 0 ? (
                allocations
                  // eslint-disable-next-line array-callback-return
                  .filter((data) => {
                    if (data.startDate === selectedStartDate) {
                      return data;
                    }
                  })
                  .map((order, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order.customerName}</td>
                        <td>{order.vehicleNumber}</td>
                        <td>{order.allocatedAmount}</td>
                        <td>{order.availableAmount}</td>
                        <td>
                          {"From " + order.startDate + " to " + order.endDate}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <Label>No data to be displayed.</Label>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default FuelAllocations;
