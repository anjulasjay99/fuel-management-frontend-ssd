import React from "react";
import styles from "../styles/common.module.css";

function PageTitle({ pageTitle }) {
  return <div className={styles.pageTitleDiv}>{pageTitle}</div>;
}

export default PageTitle;
