import React, { useEffect, useState } from "react";
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
        <div className="col-6">
          <div class="card card-wo-performance mt-5 ">
            <div class="card-header header-wo-performance text-2xl fw-semibold color-palette-1">
              WorkOrder Performance
            </div>
            <div className="card-body d-flex justify-content-around">
              <div className="my-auto">
                <Doughnut data={chartData} />
              </div>
              <div className="card-text mt-3">
                <div className="container">
                  <div className="column text-lg" style={{ color: "#3559E0" }}>
                    {getAllPending}
                  </div>
                  <div className="column text-lg" style={{ color: "#D8A900" }}>
                    {getAllOnProgress}
                  </div>
                  <div className="column text-lg" style={{ color: "#08DB43" }}>
                    {getAllClose}
                  </div>
                  <div className="column text-lg" style={{ color: "#DB1414" }}>
                    {getAllWO}
                  </div>
                </div>

                <div className="container">
                  <div className="column text-lg">Pending</div>
                  <div className="column text-lg">OnProgress</div>
                  <div className="column text-lg">Close</div>
                  <div className="column text-lg">Total</div>
                </div>

                <div className="container">
                  <div className="column text-lg" colspan="4">
                    Total WorkOrder is {getAllWO} of {getAllClose} close and {getAllOnProgress} OnProgress
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
