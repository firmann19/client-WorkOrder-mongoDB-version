/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../utils/fetch";
import { useEffect } from "react";
import HistoryChangeInput from "../../components/HistoryChangeSparepart-input";

function HistoryChangeSparepart() {
  const { id } = useParams();
  const [getNameManager, setGetNameManager] = useState(null);
  const [form, setForm] = useState({
    StaffITRequest: "",
    namaSparepart: "",
    kodeSparepart: "",
    harga: "",
    jumlahOrder: "",
    alasan: "",
    HeadIT: "",
  });

  const fetchOne = async () => {
    const res = await getData(`/changeSparepart/${id}`);

    setForm({
      ...form,
      StaffITRequest: res.data.data.StaffITRequest.nama,
      namaSparepart: res.data.data.namaSparepart,
      kodeSparepart: res.data.data.kodeSparepart,
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
    <Container md={12} style={{ height: "100vh" }}>
      <Card style={{ width: "100%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center mb-5">Work Order</Card.Title>
          <HistoryChangeInput
            form={form}
            getNameManager={getNameManager}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HistoryChangeSparepart;
