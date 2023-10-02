import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ComplaintHeader from "./complaintHeader";
import PageTitle from "../PageTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
library.add(faPen);

const Viewcomplaints = () => {
  const [coomplaints, setComplaints] = useState([]);
  const [show, setshow] = useState(false);
  const [deletedata, setdeletedata] = useState({});
  const [searchVal, setSearchVal] = useState("");
  let { filterData } = useState();
  let email = sessionStorage.getItem("customer");

  const handleClose = () => {
    setshow(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    console.log(sessionStorage.getItem("customer"));
    if (sessionStorage.getItem("customer") == null) {
      navigate("/customer-login");
    }

    console.log(email);

    axios
      .get(`http://localhost:5000/complaints/get/user/${email}`)
      .then((response) => {
        console.log(response.data);
        setComplaints(response.data);
      });
  }, []);

  const getData = () => {
    console.log("aaa");
    console.log(email);
    axios
      .get(`http://localhost:5000/complaints/get/user/${email}`)
      .then((res) => {
        setComplaints(res.data);
      });
  };
  function updateComplaint(data) {
    console.log(data._id);
    navigate(`/updatecomplaint/${data._id}`);
  }

  const deletecomplaint = (data) => {
    setdeletedata(data);
    console.log(data._id);
    setshow(true);
  };

  const handleDelete = () => {
    console.log(deletedata);
    axios
      .delete(`http://localhost:5000/complaints/delete/${deletedata._id}`)
      .then((data) => {
        setshow(false);
        toast.success("Complaint Deleted!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getData();
      });
  };

  const filterComplaints = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      getData();
    }
  };

  const globalSearch = () => {
    filterData = coomplaints.filter((value) => {
      return (
        value.email.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.dateofComplaint.toLowerCase().includes(searchVal.toLowerCase()) ||
        value.complaintDetails
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        value.reason.toLowerCase().includes(searchVal.toLowerCase())
      );
    });
    console.log(filterData);
    setComplaints(filterData);
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <ComplaintHeader />
      <PageTitle pageTitle="My Complaints" />
      <div
        style={{
          backgroundColor: "#ff762e",
          textalign: "left",
          width: "100%",
          height: "2px",
        }}
      ></div>
      <br></br>
      <br></br>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure You Want To Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Action Cannot Be Undone !</Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#ff762e" }}
            variant="secondary"
            onClick={handleDelete}
          >
            Confirm
          </Button>
          <Button
            style={{ backgroundColor: " #082344" }}
            variant="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="panel-heading">
        <div class="input-group">
          <input
            style={{
              maxWidth: "200px",
              marginLeft: "1130px",
              border: "1px solid #082344",
            }}
            id="searchText"
            type="text"
            class="form-control"
            name="q"
            placeholder="Search Here"
            onChange={filterComplaints}
            allowClear
            value={searchVal}
          />
          <span class="input-group-btn">
            <a id="x" class="btn btn-default hide" href="#" title="Clear">
              <i class="glyphicon glyphicon-remove"></i>{" "}
            </a>
            <button
              onClick={globalSearch}
              style={{
                backgroundColor: "#082344",
                maxwidth: "200px",
                color: "white",
              }}
              class="btn btn-info"
              type="submit"
            >
              {" "}
              Search{" "}
            </button>
          </span>
        </div>
      </div>
      <br></br>
      <div
        className="container-xl"
        style={{
          padding: "2rem 0rem",
          alignItems: "center",
          justifyContent: "center",
          borderradius: "5px 5px 0 0",
        }}
      >
        <div className="row">
          <div className="col-12">
            <table className="table" style={{ minwidth: "100px" }}>
              <thead
                style={{
                  backgroundColor: "#082344",
                  color: "white",
                  textalign: "left",
                  fontweight: "bold",
                }}
              >
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date Of Complaint</th>
                  <th scope="col">Reason</th>
                  <th scope="col">Complaint Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {coomplaints.map((data, index) => {
                  return (
                    <tr style={{}}>
                      <td>{coomplaints.indexOf(data) + 1}</td>
                      <td>{data.email}</td>
                      <td>{data.dateofComplaint}</td>
                      <td>{data.reason}</td>
                      <td>{data.complaintDetails}</td>
                      <td>
                        <i
                          onClick={() => {
                            updateComplaint(data);
                          }}
                          class="fa fa-pencil-square"
                          aria-hidden="true"
                        ></i>
                        <a
                          onClick={() => {
                            deletecomplaint(data);
                          }}
                        >
                          <i
                            style={{ marginLeft: "20px", marginRight: "20px" }}
                            class="fa fa-trash"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewcomplaints;
