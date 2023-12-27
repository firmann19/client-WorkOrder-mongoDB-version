import React, { useEffect, useState } from "react";
import { RiCheckboxBlankFill } from "react-icons/ri";
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
                <div>
                  <div className="text-lg mt-1">
                    <RiCheckboxBlankFill
                      className="me-1"
                      style={{ color: "#3559E0" }}
                    />
                    Pending: {getAllPending} WorkOrder
                  </div>
                  <div className="text-lg mt-1">
                    <RiCheckboxBlankFill
                      className="me-1"
                      style={{ color: "#D8A900" }}
                    />
                    OnProgress: {getAllOnProgress} WorkOrder
                  </div>
                  <div className="text-lg mt-1">
                    <RiCheckboxBlankFill
                      className="me-1"
                      style={{ color: "#08DB43" }}
                    />
                    Close: {getAllClose} WorkOrder
                  </div>
                  <div className="text-lg mt-1">
                    <RiCheckboxBlankFill
                      className="me-1"
                      style={{ color: "#DB1414" }}
                    />
                    Total: {getAllWO} WorkOrder
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
