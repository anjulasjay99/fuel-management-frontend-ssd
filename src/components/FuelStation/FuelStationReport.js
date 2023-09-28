/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from "react";
import StationHeader from "../Common/StationHeader";
import PageTitle from "../PageTitle";
import styles from "../../styles/fuelStation.module.css";
import common from "../../styles/common.module.css";
import { FormGroup, Button, Input, Label, Form, Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { jsPDF } from "jspdf";

ChartJS.register(ArcElement, Tooltip, Legend);

function FuelStationReport() {
  const navigate = useNavigate();
  const [reportType, setreportType] = useState("monthly");
  const [date, setdate] = useState("");
  const [reportData, setreportData] = useState(null);
  const [user, setuser] = useState({});
  const [orderPieChart, setorderPieChart] = useState(null);
  const [ordersPieChartImg, setordersPieChartImg] = useState("");
  const [year, setyear] = useState("2022");
  const chartRef = useRef(null);
  const [loading, setloading] = useState(false);
  let doc;

  const onClickGenerate = () => {
    if (reportType === "monthly") {
      setloading(true);
      generateMonthlyReport(date, user.stationId);
    } else {
      setloading(true);
      generateAnnualReport(year, user.stationId);
    }
  };

  //called to get monthly report
  const generateMonthlyReport = (date, stationId) => {
    axios
      .get(
        `http://localhost:8070/fuelStationReport/monthly/generate?id=${stationId}&month=${moment(
          date
        ).format("MM")}&year=${moment(date).format("yyyy")}`
      )
      .then((res) => {
        setreportData(res.data);
        drawOrdersChart(res.data.orderSum.percentages);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  //called to get annual report
  const generateAnnualReport = (year, stationId) => {
    axios
      .get(
        `http://localhost:8070/fuelStationReport/annual/generate?id=${stationId}&year=${year}`
      )
      .then((res) => {
        setreportData(res.data);
        drawOrdersChart(res.data.orderSum.percentages);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data);
      });
  };

  //draw orders chart
  const drawOrdersChart = async (data) => {
    const chartData = [];
    const labels = [];
    data.map((d) => {
      labels.push(d.type);
      chartData.push(d.percentage);
    });

    const pieChartData = {
      labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setorderPieChart(pieChartData);
    setTimeout(() => {
      setordersPieChartImg(chartRef.current.toBase64Image());
      setloading(false);
    }, 1000);
  };

  //download report as PDF
  const downloadPDF = () => {
    doc = new jsPDF("p", "px", [1000, 800]);
    const source = document.getElementById("fuelReport");
    doc.html(source, {
      callback: function (pdf) {
        pdf.save("report.pdf");
      },
    });
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("fsUser"));
    if (userData == null || userData === undefined || userData === "") {
      navigate("/fuel-station-login");
    } else {
      const today = moment().format("yyyy-MM");
      setdate(today);
      setuser(userData);
      generateMonthlyReport(today, userData.stationId);
    }
  }, []);

  if (reportData) {
    return (
      <div>
        <StationHeader />
        <PageTitle pageTitle={"Report"} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            padding: "50px 100px 0px 100px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1300px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              columnGap: "40px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "50%",
              }}
            >
              <Form>
                <FormGroup>
                  <Label>Report Type</Label>
                  <Input
                    type="select"
                    value={reportType}
                    onChange={(e) => setreportType(e.target.value)}
                  >
                    <option value="monthly">Monthly Report</option>
                    <option value="annual">Annual Report</option>
                  </Input>
                </FormGroup>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "20px",
                  }}
                >
                  {reportType === "monthly" ? (
                    <FormGroup style={{ flexGrow: "1" }}>
                      <Label>Month & Year</Label>
                      <Input
                        type="month"
                        value={date}
                        onChange={(e) => setdate(e.target.value)}
                      />
                    </FormGroup>
                  ) : (
                    <FormGroup style={{ flexGrow: "1" }}>
                      <Label>Year</Label>
                      <Input
                        type="number"
                        min={2022}
                        value={year}
                        onChange={(e) => setyear(e.target.value)}
                      />
                    </FormGroup>
                  )}
                </div>
                <Button
                  className={common.btnPrimary}
                  style={{ marginRight: "10px" }}
                  onClick={onClickGenerate}
                >
                  Generate
                </Button>
                <Button className={common.btnSecondary} onClick={downloadPDF}>
                  Download as PDF
                </Button>
              </Form>
            </div>
            <div style={{ flexGrow: "1" }}>
              <div id="fuelReport" className={styles.fuelReport}>
                {loading ? (
                  <div className={styles.loadingReport}>
                    <Spinner className={styles.spinner} color="primary">
                      Loading...
                    </Spinner>
                  </div>
                ) : (
                  <div hidden></div>
                )}
                <div className={styles.fuelReportHeader}>
                  <h2>Fuel Station Report</h2>
                  <label>
                    {reportType === "monthly"
                      ? moment(reportData.month).format("MMMM") +
                        ", " +
                        reportData.year
                      : `Year ${reportData.year}`}
                  </label>
                </div>
                <div className={styles.fuelReportContent}>
                  <h5 style={{ width: "100%" }}>Fuel Orders</h5>
                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>Total No. of Orders</label>
                    <label>{reportData.orderSum.totalOrders}</label>
                  </div>

                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>
                      Total Litres of Fuel Ordered
                    </label>
                    <label>{reportData.orderSum.totalAmount.toFixed(2)}</label>
                  </div>
                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>
                      Total Payment Amount
                    </label>
                    <label>{`LKR ${reportData.orderSum.totalPayment.toFixed(
                      2
                    )}`}</label>
                  </div>
                  <div
                    className={styles.fuelReportSection}
                    style={{ width: "100%", alignItems: "center" }}
                  >
                    <div></div>

                    {orderPieChart ? (
                      <div>
                        <Pie
                          id="ordersChart"
                          className={styles.pie}
                          data={orderPieChart}
                          options={{ maintainAspectRatio: false }}
                          ref={chartRef}
                          hidden
                        />
                        <img
                          alt="orderChart"
                          src={ordersPieChartImg}
                          className={styles.pieImage}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <label style={{ color: "grey" }}>Ordered Fuel Types</label>
                  </div>
                </div>
                <div className={styles.fuelReportContent}>
                  <h5 style={{ width: "100%" }}>Fuel Consumption</h5>
                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>
                      Available Fuel Types
                    </label>
                    <label>
                      {reportData.consumeSum.types.map((d) => {
                        return `${d}, `;
                      })}
                    </label>
                  </div>
                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>
                      Total Litres of Fuel Pumped
                    </label>
                    <label>
                      {reportData.consumeSum.totalPumpedAmount.toFixed(2)}
                    </label>
                  </div>
                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>
                      Total Litres of Fuel Remaining
                    </label>
                    <label>
                      {reportData.consumeSum.remainingFuelAmount.toFixed(2)}
                    </label>
                  </div>
                  <div className={styles.fuelReportSection}>
                    <label style={{ color: "grey" }}>
                      Total No. of Consumers
                    </label>
                    <label>{`${reportData.consumeSum.totalCustomers}`}</label>
                  </div>

                  <div
                    className={styles.fuelReportSection}
                    style={{ marginTop: "40px" }}
                  >
                    <label style={{ color: "grey" }}>Date Generated</label>
                    <label>{`${reportData.dateGenerated}`}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <label>Loading..</label>;
  }
}

export default FuelStationReport;
