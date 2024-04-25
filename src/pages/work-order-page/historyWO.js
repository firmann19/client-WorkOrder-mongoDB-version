/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getData, putData } from "../../utils/fetch";
import { useEffect } from "react";
import HistoryWOInput from "../../components/HistoryWO-Input";
import Navbar from "../../components/navbar";
import moment from "moment";
import SButton from "../../components/partikel/Button";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Swal from "sweetalert2";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function HistoryWO() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    UserRequest: "",
    Departement: "",
    NamaBarang: "",
    KodeBarang: "",
    Permasalahan: "",
    UserApprove: "",
    Date_RequestWO: "",
    Tindakan: "",
    GantiSparepart: "",
    HeadIT: "",
    StaffIT: "",
    Date_CompletionWO: "",
    StatusPengerjaan: "",
    selectedAction: "",
  });

  const [isCloseDisabled, setIsCloseDisabled] = useState(false);

  const [role, setRole] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const fetchOneWO = async () => {
    const res = await getData(`/checkout/${id}`);

    setForm({
      ...form,
      UserRequest: res.data.data.UserRequest.nama,
      Departement: res.data.data.Departement.namaDepartement,
      NamaBarang: res.data.data.NamaBarang,
      KodeBarang: res.data.data.KodeBarang,
      Permasalahan: res.data.data.Permasalahan,
      UserApprove: res.data.data.UserApprove.nama,
      Date_RequestWO: moment(res.data.data.Date_RequestWO).format(
        "DD-MM-YYYY, h:mm:ss a"
      ),
      Tindakan: res.data.data.Tindakan,
      GantiSparepart: res.data.data.GantiSparepart,
      HeadIT: res.data.data.HeadIT.nama,
      StaffIT: res.data.data.StaffIT.nama,
      Date_CompletionWO: moment(res.data.data.Date_CompletionWO).format(
        "DD-MM-YYYY, h:mm:ss a"
      ),
      StatusPengerjaan: res.data.data.StatusPengerjaan,
      selectedAction: res.data.data.selectedAction,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { role } = JSON.parse(localStorage.getItem("auth")) || {};
      setRole(role);
    };
    fetchData();

    setIsCloseDisabled(form.StatusPengerjaan === "Close");
    fetchOneWO();
  }, [form.StatusPengerjaan]);

  const handleSubmit = async () => {
    setIsLoading(true);

    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Close Work Order",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          StatusPengerjaan: form.StatusPengerjaan,
        };

        const res = await putData(`/checkout/${id}/statusProgress`, payload);
        if (res?.data?.data) {
          dispatch(setNotif(true, "success", "berhasil Close Work Order"));
          navigate("/work-order-page");
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: res.response.data.msg,
          });
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  const downloadPDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 10, 10, width - 20, height - 20); // Add margin on each side
      pdf.save("history_wo.pdf");
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="history-wo workOrder h-screen"
        style={{
          minHeight: "95vh",
          marginBottom: "3rem",
        }}
      >
        <BreadCrumb
          textSecound={"Work Order"}
          urlSecound={"/work-order-page"}
          textThird="Detail"
        />

        <div className="save d-flex justify-content-end mb-2">
          <div className="p-2">
            <button className="btn btn-primary" onClick={downloadPDF}>
              <i className="icon-download"></i> Download
            </button>
          </div>
          <div className="p-2">
            <a href="#" className="btn btn-secondary">
              <i className="icon-printer"></i> Print
            </a>
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
            Work Order
          </h2>
          <div className="pt-4 mt-4">
            <HistoryWOInput form={form} isLoading={isLoading} />
          </div>
          </Card.Body>
        </Card>
        <SButton
          className="btn btn-dark btn-lg card-footer-btn text-uppercase-bold-sm hover-lift-light w-100 d-flex justify-content-center"
          loading={isLoading}
          action={handleSubmit}
          disabled={isLoading || isCloseDisabled || role !== "Manager IT"}
        >
          <span className="svg-icon text-white me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="512"
              viewBox="0 0 512 512"
            >
              <title>ionicons-v5-g</title>
              <path
                d="M336,208V113a80,80,0,0,0-160,0v95"
                style={{
                  fill: "none",
                  stroke: "#000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "32px",
                }}
              ></path>
              <rect
                x="96"
                y="208"
                width="320"
                height="272"
                rx="48"
                ry="48"
                style={{
                  fill: "none",
                  stroke: "#000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "32px",
                }}
              ></rect>
            </svg>
          </span>
          Close
        </SButton>
      </div>
      <Footer />
    </>
  );
}

export default HistoryWO;
