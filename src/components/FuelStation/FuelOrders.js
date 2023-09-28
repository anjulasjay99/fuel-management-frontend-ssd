/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import StationHeader from "../Common/StationHeader";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { FormGroup, Button, Input, Label, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FuelOrders() {
  const navigate = useNavigate();
  const [orders, setorders] = useState();
  const [user, setuser] = useState({});
  const [refNo, setrefNo] = useState(true);
  const [type, settype] = useState(false);
  const [status, setstatus] = useState(false);
  const [search, setsearch] = useState("");

  const onSearch = (val) => {
    setsearch(val);
    let filterArr = [];
    if (!refNo && !type && !status) {
      getOrders(user.stationId);
    } else {
      if (val === "") {
        getOrders(user.stationId);
      } else {
        if (refNo) {
          filterArr.push("refNo");
        }
        if (type) {
          filterArr.push("type");
        }
        if (status) {
          filterArr.push("status");
        }
        let filterParam = "";
        filterArr.forEach((filter) => {
          filterParam += `&filter=${filter}`;
        });
        getSeachResults(val, filterParam);
      }
    }
  };

  const getSeachResults = (val, params) => {
    axios
      .get(
        `http://localhost:8070/fuelOrders/${user.stationId}?val=${val}${params}`
      )
      .then((res) => {
        setorders(res.data.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const getOrders = (id) => {
    axios
      .get(`http://localhost:8070/fuelOrders/${id}`)
      .then((res) => {
        setorders(res.data.data);
        console.log(orders);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const navigateToNewOrder = () => {
    navigate("/place-order");
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/fuel-station-login");
    } else {
      setuser(userData);
      getOrders(userData.stationId);
    }
  }, []);

  if (orders === undefined) {
    return (
      <div>
        <StationHeader />
        <PageTitle pageTitle={"Fuel Orders"} />
      </div>
    );
  } else {
    return (
      <div>
        <StationHeader />
        <PageTitle pageTitle={"Fuel Orders"} />
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
              <Input
                id="search"
                name="search"
                className={common.searchInput}
                placeholder="Search"
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
              />
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={refNo}
                  onChange={(e) => setrefNo(!refNo)}
                />
                <Label check>Ref. No.</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={type}
                  onChange={(e) => settype(!type)}
                />
                <Label check>Type</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setstatus(!status)}
                />
                <Label check>Status</Label>
              </FormGroup>
            </div>
            <div>
              <Button
                className={common.btnPrimary}
                onClick={navigateToNewOrder}
              >
                New Order
              </Button>
            </div>
          </div>

          <Table bordered striped className={common.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>REF N0.</th>
                <th>TYPE </th>
                <th>LITRES</th>
                <th>TIME OF DELIVERY</th>
                <th>PAYMENT (LKR)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0
                ? orders.map((order, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order.refNo}</td>
                        <td>{order.type}</td>
                        <td>{order.amount}</td>
                        <td>{order.timeOfDelivery}</td>
                        <td>
                          {order.payment.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td>
                          <span
                            style={{
                              background:
                                order.status === "Completed"
                                  ? "#43a047"
                                  : order.status === "Canceled"
                                  ? "#e53935"
                                  : "#f9a825",
                            }}
                            className={styles.status}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : "No data available"}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default FuelOrders;
