/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PageTitle from "../PageTitle";
import axios from "axios";
import {
  Button,
  Table,
  Input,
  Label,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import common from "../../styles/common.module.css";
import AdminHeader from "../Common/AdminHeader";
import { useNavigate } from "react-router-dom";
function ViewFuelStations() {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [modal, setModal] = useState(false);
  const [selecteStaion, setselecteStaion] = useState({});
  const [search, setsearch] = useState("");
  const [filterName, setfilterName] = useState(true);
  const [filterType, setfilterType] = useState(false);
  const [filterOwner, setfilterOwner] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const show = (station) => {
    setselecteStaion(station);
    setModal(true);
  };

  const onSearch = (val) => {
    setsearch(val);
    let filterArr = [];
    if (!filterName && !filterType && !filterOwner) {
      getStations();
    } else {
      if (val === "") {
        getStations();
      } else {
        if (filterName) {
          filterArr.push("stationName");
        }
        if (filterType) {
          filterArr.push("type");
        }
        if (filterOwner) {
          filterArr.push("ownerName");
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
      .get(`http://localhost:8070/fuelStations?val=${val}${params}`)
      .then((res) => {
        setdata(res.data.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const getStations = () => {
    axios
      .get("http://localhost:8070/fuelStations")
      .then((res) => {
        setdata(res.data.data);
        setselecteStaion(res.data.data[0]);
      })
      .catch((e) => {
        alert(e);
      });
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("adminUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/admin-login");
    } else {
      console.log(data);
      getStations();
    }
  }, []);

  if (data === undefined) {
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
          <PageTitle pageTitle="Fuel Stations" />
        </div>
      </div>
    );
  } else {
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
          <PageTitle pageTitle="Fuel Stations" />
          <div style={{ width: "80%", marginTop: "50px" }}>
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
                  checked={filterName}
                  onChange={(e) => setfilterName(!filterName)}
                />
                <Label check>Organization</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={filterType}
                  onChange={(e) => setfilterType(!filterType)}
                />
                <Label check>Type</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={filterOwner}
                  onChange={(e) => setfilterOwner(!filterOwner)}
                />
                <Label check>Owner</Label>
              </FormGroup>
            </div>
            <Table bordered striped className={common.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Station ID</th>
                  <th> Organization </th>
                  <th>Address</th>
                  <th>Owner</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((d, index) => {
                    return (
                      <tr key={data.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{d.stationId}</td>
                        <td>{d.stationName}</td>
                        <td>
                          {d.address +
                            ", " +
                            d.city +
                            ", " +
                            d.province +
                            ", " +
                            d.zipCode}
                        </td>
                        <td>{d.ownerName}</td>
                        <td>{d.type}</td>
                        <td>
                          <Button
                            className={common.btnOutline}
                            onClick={() => show(d)}
                            outline
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <label>No data to be displayed.</label>
                )}
              </tbody>
            </Table>
          </div>
          <Modal isOpen={modal} toggle={toggle} style={{ width: "600px" }}>
            <ModalHeader toggle={toggle}>Fuel Station Details</ModalHeader>
            <ModalBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  columnGap: "10px",
                }}
              >
                <div style={{ width: "50%" }}>
                  <Label className={common.subTitle}>Station Information</Label>
                  <br />
                  <br />
                  <Label className={common.subTitle2}>
                    Name of the Organization
                  </Label>
                  <br />
                  <Label>{selecteStaion.stationName}</Label>
                  <br />
                  <Label className={common.subTitle2}>Type</Label>
                  <br />
                  <Label>{selecteStaion.type}</Label>
                  <br />
                  <Label className={common.subTitle2}>Address</Label>
                  <br />
                  <Label>
                    {selecteStaion.address +
                      ", " +
                      selecteStaion.city +
                      ", " +
                      selecteStaion.province +
                      ", " +
                      selecteStaion.zipCode}
                  </Label>
                  <br />
                  <Label className={common.subTitle2}>Contact No.</Label>
                  <br />
                  <Label>{selecteStaion.contactNo}</Label>
                  <br />
                  <Label className={common.subTitle2}>Email</Label>
                  <br />
                  <Label>{selecteStaion.email}</Label>
                </div>
                <div style={{ width: "50%" }}>
                  <Label className={common.subTitle}>
                    Property Owner's Information
                  </Label>
                  <br />
                  <br />
                  <Label className={common.subTitle2}>Full Name</Label>
                  <br />
                  <Label>{selecteStaion.ownerName}</Label>
                  <br />
                  <Label className={common.subTitle2}>NIC</Label>
                  <br />
                  <Label>{selecteStaion.ownerNic}</Label>
                  <br />
                  <Label className={common.subTitle2}>
                    Personal Contact No.
                  </Label>
                  <br />
                  <Label>{selecteStaion.ownerContactNo}</Label>
                  <br />
                  <Label className={common.subTitle2}>Personal Email</Label>
                  <br />
                  <Label>{selecteStaion.ownerEmail}</Label>
                </div>
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
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ViewFuelStations;
