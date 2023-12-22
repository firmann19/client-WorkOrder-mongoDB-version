import React from "react";
import Navbar from "../../components/navbar";
import CardDashboard from "../../components/CardDashboard-Input";
import CardPerformance from "../../components/CardPerformance";
import Footer from "../../components/Footer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="mt-3" style={{ height: "80vh" }}>
        <CardDashboard />
        <CardPerformance />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
