import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/admin/login", { email, password })
      .then((res) => {
        if (res.data.status === true) {
          sessionStorage.setItem(
            "adminUser",
            JSON.stringify(res.data.userData)
          );
          navigate("/admin-dashboard");
        }
      })
      .catch((e) => {
        alert("Incorrect Credentials!");
      });
  };
  return (
    <div>
      <PageTitle pageTitle="Admin Login" />
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

export default AdminLogin;
