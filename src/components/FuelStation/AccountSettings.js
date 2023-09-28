import React, { useState, useEffect } from "react";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

function AccountSettings({ user, setuser }) {
  const [editemail, seteditemail] = useState(false);
  const [changepwd, setchangepwd] = useState(false);
  const [email, setemail] = useState("");
  const [oldpwd, setoldpwd] = useState("");
  const [password, setpassword] = useState("");
  const [confpwd, setconfpwd] = useState("");

  const updateEmail = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8070/fuelStations/updateEmail", {
        stationId: user.stationId,
        email,
      })
      .then((res) => {
        alert(res.data.msg);
        const usr = {
          ...user,
          email,
        };
        setuser(usr);
        sessionStorage.setItem("fsUser", JSON.stringify(usr));
        seteditemail(false);
      })
      .catch((e) => {
        alert("Error!");
      });
  };

  const updatePwd = (e) => {
    e.preventDefault();
    if (oldpwd === user.password) {
      if (confpwd === password) {
        axios
          .put("http://localhost:8070/fuelStations/updatePassword", {
            stationId: user.stationId,
            password,
          })
          .then((res) => {
            alert(res.data.msg);
            const usr = {
              ...user,
              password,
            };
            setuser(usr);
            sessionStorage.setItem("fsUser", JSON.stringify(usr));
            setchangepwd(usr);
          })
          .catch((e) => {
            alert("Error!");
          });
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Incorrect Old Password");
    }
  };

  useEffect(() => {
    if (user != null) {
      setemail(user.email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.stationSettingsDiv}>
      <Form style={{ width: "50%" }} onSubmit={(e) => updateEmail(e)}>
        {!editemail ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="email">Email : {user.email}</Label>
            <label className={styles.edit} onClick={() => seteditemail(true)}>
              Edit
            </label>
          </div>
        ) : (
          <>
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
            <div className={styles.btnContainer}>
              <Button
                className={common.btnSecondary}
                onClick={() => seteditemail(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className={common.btnPrimary}>
                Update
              </Button>
            </div>
          </>
        )}
      </Form>
      <br />
      <Form style={{ width: "50%" }} onSubmit={(e) => updatePwd(e)}>
        {!changepwd ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Label for="email">Password : ***********</Label>
            <label className={styles.edit} onClick={() => setchangepwd(true)}>
              Edit
            </label>
          </div>
        ) : (
          <>
            <FormGroup>
              <Label for="oldpassword">Old Password*</Label>
              <Input
                id="oldpassword"
                className={styles.input}
                name="oldpassword"
                placeholder="Enter a password"
                type="password"
                value={oldpwd}
                onChange={(e) => setoldpwd(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">New Password*</Label>
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
              <Label for="confPassword">Confirm Password*</Label>
              <Input
                id="confPassword"
                className={styles.input}
                name="confpassword"
                placeholder="Re-enter your passowrd"
                type="password"
                value={confpwd}
                onChange={(e) => setconfpwd(e.target.value)}
                required
              />
            </FormGroup>
            <div className={styles.btnContainer}>
              <Button
                className={common.btnSecondary}
                onClick={() => setchangepwd(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className={common.btnPrimary}>
                Update
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export default AccountSettings;
