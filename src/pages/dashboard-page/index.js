import React from "react";
import Navbar from "../../components/navbar";
import CardDashboard from "../../components/CardDashboard-Input";
import CardPerformance from "../../components/CardPerformance";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <CardDashboard />
        <CardPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
