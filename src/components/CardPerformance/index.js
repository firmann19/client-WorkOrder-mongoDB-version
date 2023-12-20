import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo-hta.png";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

function CardPerformance() {
  const [getAllOnProgress, setGetAllOnProgress] = useState(null);
  const [getAllClose, setGetAllClose] = useState(null);
  const [getAllWO, setGetAllWO] = useState(null);
  const [getAllPending, setGetAllPending] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { getAllOnProgress, getAllClose, getAllWO, getAllPending } =
        localStorage.getItem("auth")
          ? JSON.parse(localStorage.getItem("auth"))
          : {};

      setGetAllOnProgress(getAllOnProgress);
      setGetAllClose(getAllClose);
      setGetAllWO(getAllWO);
      setGetAllPending(getAllPending);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ["pending", "OnProgress", "Close"],
    datasets: [
      {
        data: [getAllPending, getAllOnProgress, getAllClose],
        backgroundColor: ["#3559E0", "#D8A900", "#08DB43"],
      },
    ],
  };

  return (
    <div className="card-performance container-fluid">
      <div className="row">
        <div className="col">
          <div class="card card-wo-performance mt-5 ">
            <div class="card-header header-wo-performance text-2xl fw-semibold color-palette-1">
              WorkOrder Performance
            </div>
            <div class="card-body d-flex justify-content-around">
              <div className="my-auto">
                <Doughnut data={chartData} />
              </div>
              <div class="card-text mt-3">
                <div className="status-wo-performance">
                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#3559E0" }}
                    >
                      {getAllPending}
                    </p>
                    <p>Pending</p>
                  </div>

                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#D8A900" }}
                    >
                      {getAllOnProgress}
                    </p>
                    <p>OnProgress</p>
                  </div>

                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#08DB43" }}
                    >
                      {getAllClose}
                    </p>
                    <p>Close</p>
                  </div>

                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#DB1414" }}
                    >
                      {getAllWO}
                    </p>
                    <p>Total</p>
                  </div>
                </div>
                <div className="text-info">
                  <p style={{ color: "#0C145A" }}>
                    Total WorkOrder is {getAllWO} of {getAllClose} close and{" "}
                    {getAllOnProgress} OnProgress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <div class="card card-wo-performance mt-5">
            <div class="card-header header-wo-performance text-2xl fw-semibold color-palette-1">
              Staff IT Performance
            </div>
            <div class="card-body d-flex" style={{gap: "450px"}}>
              <div>
                <div className="d-flex mt-3">
                  <p className="me-2 my-auto">1.</p>
                  <img src={Logo} width="40px" height="40px" alt="logo" />
                  <p className="ms-2 my-auto">Firman</p>
                </div>
              </div>
              <div class="card-text">
                <div className="IT-performance">
                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#3559E0" }}
                    >
                      {getAllPending}
                    </p>
                    <p>Pending</p>
                  </div>

                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#D8A900" }}
                    >
                      {getAllOnProgress}
                    </p>
                    <p>OnProgress</p>
                  </div>

                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#08DB43" }}
                    >
                      {getAllClose}
                    </p>
                    <p>Close</p>
                  </div>

                  <div>
                    <p
                      className="value-wo-performance"
                      style={{ color: "#DB1414" }}
                    >
                      {getAllWO}
                    </p>
                    <p>Total</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPerformance;
