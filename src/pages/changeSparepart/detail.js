/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Container } from "react-bootstrap";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../utils/fetch";
import { useEffect } from "react";
import Navbar from "../../components/navbar";
import HistoryChangeInput from "../../components/HistoryChangeSparepart-input";
import Footer from "../../components/Footer";

function HistoryChangeSparepart() {
  const { id } = useParams();
  const [getNameManager, setGetNameManager] = useState(null);
  const [form, setForm] = useState({
    userRequestWO: "",
    departementUser: "",
    namaSparepart: "",
    harga: "",
    jumlahOrder: "",
    alasan: "",
    HeadIT: "",
  });

  const fetchOne = async () => {
    const res = await getData(`/changeSparepart/${id}`);

    setForm({
      ...form,
      userRequestWO: res.data.data.userRequestWO,
      departementUser: res.data.data.departementUser,
      namaSparepart: res.data.data.namaSparepart,
      harga: res.data.data.harga,
      jumlahOrder: res.data.data.jumlahOrder,
      alasan: res.data.data.alasan,
      HeadIT: res.data.data.HeadIT,
    });
  };

  useEffect(() => {
    const fecthData = () => {
      let { getNameManager } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setGetNameManager(getNameManager);
    };
    fecthData();
    fetchOne();
  }, []);

  return (
    <>
      <Navbar />
      <Container md={12} style={{ height: "80vh" }}>
        <BreadCrumb
          textSecound={"Change Sparepart"}
          urlSecound={"/changeSparepart-page"}
          textThird="Detail"
        />

        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center mb-5">Work Order</Card.Title>
            <HistoryChangeInput form={form} getNameManager={getNameManager} />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default HistoryChangeSparepart;
