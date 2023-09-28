import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StationLogin() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/fuelStations/login", { email, password })
      .then((res) => {
        if (res.data.status === true) {
          sessionStorage.setItem("fsUser", JSON.stringify(res.data.userData));
          navigate("/fuel-station-home");
        }
      })
      .catch((e) => {
        alert("Incorrect Credentials!");
      });
  };
  return (
    <div>
      <PageTitle pageTitle="Fuel Station Login" />
      <div className={styles.createAccWrapper}>
        <div className={styles.createAccForm}>
          <h3>Log In</h3>
          <br />
          <Form onSubmit={(e) => submit(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                className={styles.input}
                name="email"
                placeholder="joe@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                className={styles.input}
                name="password"
                placeholder="Enter a password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </FormGroup>
            <Label>
              Don't have an account?{" "}
              <Link to="/fuel-station-create-account">Create Account</Link>
            </Label>
            <br />
            <Button
              className={common.btnPrimary}
              style={{
                width: "500px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Log In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default StationLogin;
