import React, { useState } from "react";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FuelStationCreateAccount() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/fuelStations/checkEmail", {
        email,
      })
      .then((res) => {
        if (res.data.status) {
          alert("An account with the same email exists!");
        } else {
          if (password === confPassword) {
            navigate("/fuel-station-register", { state: { email, password } });
          } else {
            alert("Password does not match!");
          }
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <PageTitle pageTitle="Fuel Station Registraion" />
      <div className={styles.createAccWrapper}>
        <div className={styles.createAccForm}>
          <h3>Create Account</h3>
          {/* <Button color="primary" onClick={demo} outline>
            Demo
          </Button> */}
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
                pattern=".{8,}"
                required
              />
              <FormText>Password must contain atleast 8 characters</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="confPassword">Confirm Password</Label>
              <Input
                id="confPassword"
                className={styles.input}
                name="password"
                placeholder="Re-enter your passowrd"
                type="password"
                value={confPassword}
                onChange={(e) => setconfPassword(e.target.value)}
                pattern=".{8,}"
                required
              />
            </FormGroup>
            <Button
              className={common.btnPrimary}
              style={{
                width: "500px",
                marginTop: "30px",
                marginBottom: "10px",
              }}
            >
              Confirm & Continue
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default FuelStationCreateAccount;
