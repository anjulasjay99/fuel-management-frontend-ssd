import React, { useEffect, useState } from "react";
import StationHeader from "../Common/StationHeader";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Input, Table, Label, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowCounterclockwise, BsCheckSquareFill, BsFileExcelFill, BsArrowRepeat, BsFileEarmarkPdf } from "react-icons/bs";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


function FuelBookingReqs() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [user, setuser] = useState({});
    var [email, setemail] = useState("");
    const [bookingId, setBookingId] = useState(true);
    const [vehicleNo, setvehicleNo] = useState(false);
    const [status, setstatus] = useState(false);
    const [search, setsearch] = useState("");
    
    const bkgSearch = (val) => {
        setsearch(val);

        if (val === "") {
            getBookings(email);
        } else {
            getBkgSearch(val);
        }
    };

    function reloadPage() {
        window.location.reload();
    }

    const modifyBkg = (id, status) => {
        const updatedBkg = {
            status,
        }
        console.log(updatedBkg);
        axios.put(`http://localhost:8070/fuelBookingRequests/update/${id}`, updatedBkg).then((res) => {
            console.log(res.data);
            alert("Booking " + status + " Successfully");
        }).catch((err) => {
            console.log(err);
            alert(err);
        })
        reloadPage();
    };


    const getBookings = (id) => {
        axios
            .get(`http://localhost:8070/fuelBookingRequests/${id}`)
            .then((res) => {
                setBookings(res.data.data);
                console.log(bookings);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const printDocument = () => {
        const input = document.getElementById('fuelBkgReport');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("l", "px", [300, 750]);
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("bkg_report.pdf");
            })
            ;
    }

    const getBkgSearch = (val) => {
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

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("fsUser"));
        if (userData == null || userData === undefined || userData === "") {
            navigate("/fuel-station-login");
        } else {
            console.log(userData.stationName);
            console.log(userData);
            setuser(userData);
            getBookings(userData.stationName);
        }

    }, []);

    if (bookings.length === 0) {
        return (
            <div>
                <StationHeader />
                <PageTitle pageTitle={"Fuel Bookings"} />
                <div style={{
                    marginTop: "400px",
                    marginLeft: "800px",
                    fontSize: "50px",
                }}>
                    Bookings not available yet...
                    <BsArrowCounterclockwise size={70} style={{ backgroundColor: "darkgrey", borderRadius: "7px" }} onClick={reloadPage} />
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <StationHeader />
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
                            />   <BsArrowRepeat size={40} onClick={reloadPage} />
                            <FormGroup check>
                                <Input
                                    type="checkbox"
                                    checked={bookingId}
                                    onChange={(e) => setBookingId(e.target.value)}
                                />
                                <Label check>Booking Ref.</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    type="checkbox"
                                    checked={vehicleNo}
                                    onChange={(e) => setvehicleNo(e.target.value)}
                                />
                                <Label check>Vehicle No.</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input
                                    type="checkbox"
                                    checked={status}
                                    onChange={(e) => setstatus(e.target.value)}
                                />
                                <Label check>Status</Label>
                            </FormGroup>
                        </div>
                    </div>

                    <Table bordered striped className={common.table} id="fuelBkgReport">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Booking Reference</th>
                                <th>Vehicle Type </th>
                                <th>Vehicle No</th>
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
                                                    className={styles.status} >
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <BsCheckSquareFill size={40} style={{ marginLeft: "15px", color: "green" }}
                                                    // onClick = {approveBkg(booking._id)}
                                                    onClick={() => { modifyBkg(booking._id, "Approved") }} /> Approve
                                                <BsFileExcelFill size={40} style={{ marginLeft: "15px", color: "red" }}
                                                    onClick={() => { modifyBkg(booking._id, "Rejected") }} /> Reject
                                            </td>
                                        </tr>
                                    );
                                })
                                : "No data available"}
                        </tbody>
                    </Table>
                    <div style={{ fontSize: "20px", }} onClick={printDocument}>Download as a pdf <BsFileEarmarkPdf size={40} /></div>
                </div>
            </div>
        );
    }
}

export default FuelBookingReqs;
