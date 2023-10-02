import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Updatecomplaints from "./components/complaintManagement/updatecomplaints";
import FuelStationCreateAccount from "./components/FuelStation/FuelStationCreateAccount";
import FuelStationRegister from "./components/FuelStation/FuelStationRegister";
import Settings from "./components/FuelStation/Settings";
import Addcomplaint from "./components/complaintManagement/addcomplaint";
import StationLogin from "./components/FuelStation/StationLogin";
import ViewFuelStations from "./components/Admin/ViewFuelStations";
import Viewcomplaints from "./components/complaintManagement/viewcomplaints";
import CustomerRegistration from "./components/CustomerManagement/CustomerRegistration";
import CustomerProfile from "./components/CustomerManagement/CustomerProfile";

import AddVehicle from "./components/CustomerManagement/CustomerAddVehicle";
import ViewVehicles from "./components/CustomerManagement/CustomerViewVehicles";
import CustomerReport from "./components/CustomerManagement/CustomerReport";

import FuelStationHome from "./components/FuelStation/FuelStationHome";
import FuelOrders from "./components/FuelStation/FuelOrders";
import PlaceFuelOrder from "./components/FuelStation/PlaceFuelOrder";
import AllocateFuel from "./components/Admin/AllocateFuel";
import FuelAllocations from "./components/Admin/FuelAllocations";
import ComplaintReport from "./components/complaintManagement/complaintReport";
import ViewAdmincomplaints from "./components/complaintManagement/adminComplaint";
import FuelStationReport from "./components/FuelStation/FuelStationReport";

import NavBar from "./components/Common/navbar";
import FuelUsage from "./components/FuelStation/FuelUsage";
import AdminLogin from "./components/Admin/AdminLogin";
import CreateBooking from "./components/FuelBooking/createBooking";
import UpateBooking from "./components/FuelBooking/updateBooking";
import Dashboard from "./components/Common/Dashboard";
import AdminDashboard from "./components/Common/AdminDashboard";
import FuelBookings from "./components/FuelBooking/FuelBookings";
import FuelBookingReqs from "./components/FuelBooking/FuelBookingReq";
import LoginCustomer from "./components/CustomerManagement/LoginCustomer";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/addcomplaint" element={<Addcomplaint />} exact />
          <Route path="/viewcomplaint" element={<Viewcomplaints />} exact />
          <Route
            path="/viewadmincomplaint"
            element={<ViewAdmincomplaints />}
            exact
          />
          <Route
            path="/updatecomplaint/:id"
            element={<Updatecomplaints />}
            exact
          />
          <Route
            path="/complaintreport/:id"
            element={<ComplaintReport />}
            exact
          />
          <Route
            path="/fuel-station-create-account"
            element={<FuelStationCreateAccount />}
          />
          <Route
            path="/fuel-station-register"
            element={<FuelStationRegister />}
          />
          <Route path="/fuel-station-settings" element={<Settings />} />
          <Route path="/fuel-station-login" element={<StationLogin />} />
          <Route path="/fuel-stations" element={<ViewFuelStations />} />
          <Route path="/fuel-station-home" element={<FuelStationHome />} />
          <Route path="/fuel-orders" element={<FuelOrders />} />
          <Route path="/place-order" element={<PlaceFuelOrder />} />
          <Route path="/allocate-fuel" element={<AllocateFuel />} />
          <Route path="/fuel-allocations" element={<FuelAllocations />} />
          <Route
            path="/customer-registration"
            element={<CustomerRegistration />}
          />
          <Route path="/customer-profile" element={<CustomerProfile />} />

          <Route path="/customer-login" element={<LoginCustomer />} />
          <Route path="/customer-add-vehicle" element={<AddVehicle />} />
          <Route path="/customer-view-vehicles" element={<ViewVehicles />} />
          <Route path="/customer-report" element={<CustomerReport />} />

          <Route path="/fuel-report" element={<FuelStationReport />} />
          <Route path="/fuel-usages" element={<FuelUsage />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} exact />
          <Route path="/navbar" element={<NavBar />} />
          <Route path="/createBooking" element={<CreateBooking />} exact />
          <Route path="/updateBooking/:id" element={<UpateBooking />} exact />
          <Route path="/fuelBookings" element={<FuelBookings />} exact />
          <Route path="/fuel-station-home" element={<FuelStationHome />} />
          <Route
            path="/fuelBookingRequests"
            element={<FuelBookingReqs />}
            exact
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
