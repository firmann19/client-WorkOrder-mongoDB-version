import React from "react";
import Navbar from "../../components/navbar";
import CardDashboard from "../../components/CardDashboard-Input";
import CardPerformance from "../../components/CardPerformance";
import Footer from "../../components/Footer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div
        className="overflow-auto h-screen"
        style={{
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <CardDashboard />
        <CardPerformance />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
