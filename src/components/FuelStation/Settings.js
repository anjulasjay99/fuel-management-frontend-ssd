import React, { useState, useEffect } from "react";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import StationSettings from "./StationSettings";
import AccountSettings from "./AccountSettings";
import Unregister from "./Unregister";
import { useNavigate } from "react-router-dom";
import StationHeader from "../Common/StationHeader";

function Settings() {
  const navigate = useNavigate();
  const [tabIndex, settabIndex] = useState(0);
  const [user, setuser] = useState();
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/fuel-station-login");
    } else {
      setuser(userData);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (user !== undefined) {
    return (
      <div>
        <StationHeader />
        <div className={styles.settingsWrapper}>
          <PageTitle pageTitle="Settings" />
          <div className={styles.settingsDiv}>
            <div className={styles.tabs}>
              <div
                className={tabIndex === 0 ? styles.tabSelected : styles.tab}
                onClick={() => settabIndex(0)}
              >
                Station
              </div>
              <div
                className={tabIndex === 1 ? styles.tabSelected : styles.tab}
                onClick={() => settabIndex(1)}
              >
                Account
              </div>
              <div
                className={tabIndex === 2 ? styles.tabSelected : styles.tab}
                onClick={() => settabIndex(2)}
              >
                Unregister
              </div>
            </div>
            <div className={styles.tabContent}>
              {tabIndex === 0 ? (
                <StationSettings user={user} setuser={setuser} />
              ) : tabIndex === 1 ? (
                <AccountSettings user={user} setuser={setuser} />
              ) : (
                <Unregister user={user} setuser={setuser} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default Settings;
