import React, { useState } from "react";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Button, Form, FormGroup, Label, Input, Alert, Col } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Unregister({ user }) {
  const navigate = useNavigate();
  const [reason, setreason] = useState("");
  const [password, setpassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (password === user.password) {
      axios
        .delete("http://localhost:8070/fuelStations", {
          data: { stationId: user.stationId },
        })
        .then((res) => {
          alert("Success");
          saveReason();
          sessionStorage.removeItem("fsUser");
          navigate("/fuel-station-login");
        })
        .catch((e) => {
          alert("Error!");
        });
    } else {
      alert("Incorrect Password!");
    }
  };

  const saveReason = () => {
    axios
      .post("http://localhost:8070/unregisterStation", {
        stationId: user.stationId,
        stationName: user.stationName,
        reason,
      })
      .then((res) => {
        console.log(res.data.msg);
      })
      .catch((e) => {
        console.log("Error!");
      });
  };

  return (
    <div className={styles.stationSettingsDiv}>
      <Alert color="warning">
        When you unregister from the system, all your data will be permanently
        deleted!
      </Alert>
      <Form onSubmit={(e) => submit(e)}>
        <FormGroup row>
          <Label for="reason" sm={12}>
            Reason (Optional)
          </Label>
          <Col sm={12}>
            <Input
              id="reason"
              name="text"
              type="textarea"
              value={reason}
              onChange={(e) => setreason(e.target.value)}
              className={styles.textarea}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={12}>
            Password*
          </Label>
          <Col sm={12}>
            <Input
              id="password"
              name="password"
              placeholder="password placeholder"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
            />
          </Col>
        </FormGroup>
        <div className={styles.btnContainer}>
          <Button type="submit" className={common.btnPrimary}>
            Unregister
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Unregister;
