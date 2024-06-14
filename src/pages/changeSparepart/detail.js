/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getData } from "../../utils/fetch";
import { useEffect } from "react";
import HistoryChangeInput from "../../components/HistoryChangeSparepart-input";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
      statusPengajuan: res.data.data.statusPengajuan,
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

  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 10, 10, width - 20, height - 20);
      pdf.save("change_sparepart.pdf");
    });
  };

  const printDocument = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Work Order</title></head><body>"
      );
      printWindow.document.write(
        `<img id="print-img" src="${imgData}" style="width: 100%; height: auto;" />`
      );
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.document.getElementById("print-img").onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    });
  };

  return (
    <Container md={12} style={{ height: "100vh" }}>
      <div className="save d-flex justify-content-end mb-2">
        <div className="p-2">
          <button className="btn btn-primary" onClick={downloadPDF}>
            <i className="icon-download"></i> Download
          </button>
        </div>
        <div className="p-2">
          <button onClick={printDocument} className="btn btn-secondary">
            <i className="icon-printer"></i> Print
          </button>
        </div>
      </div>
      <Card
        id="pdf-content"
        className="mx-auto card-historyWO"
        style={{
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Card.Body
          style={{
            backgroundColor: "white",
            borderColor: "white",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2 className="title fw-bold color-palette-1 text-center">
            Change Sparepart
          </h2>
          <div className="pt-4 mt-4">
            <HistoryChangeInput form={form} getNameManager={getNameManager} />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HistoryChangeSparepart;
