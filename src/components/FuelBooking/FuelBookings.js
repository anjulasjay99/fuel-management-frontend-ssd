import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Button, Input, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../Common/Header';
import { BsPencilSquare, BsTrash } from "react-icons/bs";

function FuelBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  var [email, setemail] = useState("");
  const [search, setsearch] = useState("");

  const bkgSearch = (val) => {
    setsearch(val);

    if (val === "") {
      getBookings(email);
    } else {
      getBkgSeach(val);
    }
  };

  function updateBkg(booking) {
    console.log(booking._id)
    navigate(`/updateBooking/${booking._id}`)
  }

  const deleteBkg = (booking) => {
    console.log(booking)
    axios.delete(`http://localhost:8070/fuelBookings/delete/${booking._id}`).then((data) => {
      console.log(data);
      window.location.reload();
      alert("Booking Successfully Deleted");
    }).catch((err) => {
      console.log(err);
      alert(err);
    })
  }

  const getBkgSeach = (val) => {
    axios
      .get(
        `http://localhost:8070/fuelBookings/${email}?val=${val}`
      )
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const getBookings = (id) => {
    axios
      .get(`http://localhost:8070/fuelBookings/${id}`)
      .then((res) => {
        setBookings(res.data.data);
        console.log(bookings);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const createNewBkg = () => {
    navigate("/createBooking");
  };

  useEffect(() => {
    var userData = sessionStorage.getItem("customer");
    if (userData == null) {
      navigate("/customer-login");
    }
    setemail(userData);
    getBookings(userData);
  }, []);

  if (bookings.length === 0) {
    return (
      <div>
        <Header />
        <PageTitle pageTitle={"Fuel Bookings"} />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <PageTitle pageTitle={"Fuel Bookings"} />
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
                onChange={(e) => bkgSearch(e.target.value)}
              />
            </div>
            <div>
              <Button
                className={common.btnPrimary}
                onClick={createNewBkg} >
                Create Booking
              </Button>
            </div>
          </div>

          <Table bordered striped className={common.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Booking Reference</th>
                <th>Vehicle Type </th>
                <th>Vehicle No</th>
                <th>Filling Station</th>
                <th>Booking Date</th>
                <th>Litres</th>
                <th>Status</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0
                ? bookings.map((booking, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{booking.bookingId}</td>
                      <td>{booking.vehicleType}</td>
                      <td>{booking.vehicleNo}</td>
                      <td>{booking.stationName}</td>
                      <td>{booking.bkgDate}</td>
                      <td>{booking.litres}</td>
                      <td>
                        <span
                          style={{
                            background:
                              booking.status === "Approved"
                                ? "#43a047"
                                : booking.status === "Rejected"
                                  ? "#e53935"
                                  : "#f9a825",
                          }}
                          className={styles.status}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ float: "left" }}>
                          <div>
                            {booking.status === "Pending"
                              ? <div> <BsPencilSquare onClick={() => { updateBkg(booking) }} size={40} style={{ marginLeft: "5px", float: "left" }} /> Edit
                                <BsTrash onClick={() => { deleteBkg(booking) }} size={40} style={{ marginLeft: "20px" }} /> Delete
                              </div>
                              : booking.status === "Rejected"
                                ? <div><BsTrash onClick={() => { deleteBkg(booking) }} size={40} style={{ marginLeft: "94px" }} /> Delete </div>
                                : <div><BsTrash onClick={() => { deleteBkg(booking) }} size={40} style={{ marginLeft: "94px" }} /> Delete </div>
                            } </div>
                        </div>
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

export default FuelBookings;
