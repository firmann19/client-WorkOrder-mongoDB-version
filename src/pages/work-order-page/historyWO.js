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
import Swal from "sweetalert2";
// import ApproveImg from "../../assets/images/approve-task.jpg";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";

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
        <Card
          className="mx-auto mt-5 card-historyWO"
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)", // Bayangan pada setiap sisi
            borderRadius: "10px 10px 0 0", // Sudut bulatan pada kartu
            padding: "20px",
          }}
        >
          <h2 className="title fw-bold color-palette-1 text-center">Work Order</h2>
          <div className="border-top border-gray-200 pt-4 mt-4">
            <HistoryWOInput form={form} isLoading={isLoading} />
          </div>
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

      {/* <section class="history-order mx-auto">
        <div class="row">
          <div class="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
            <div class="container mx-auto">
              <img
                src={ApproveImg}
                width="502"
                height="391.21"
                class="img-fluid pb-50"
                alt=""
              />
              <h2 class="text-4xl text-center fw-bold color-palette-1 mb-10">
                History Work Order
              </h2>
              <p class="text-lg text-center color-palette-1 m-0">
                Silahkan selesaikan laporan work order
              </p>
              <div className="button-group d-flex flex-column mx-auto mt-3">
                <SButton
                  loading={isLoading}
                  disabled={isLoading || isCloseDisabled}
                  variant="primary"
                  className="btn btn-sign-in fw-medium text-lg bg-danger text-white rounded-5 "
                  action={handleSubmit}
                >
                  Close Laporan
                </SButton>
              </div>
            </div>
          </div>
          <div class="col-xxl-7 col-lg-6 bg-blue pt-lg-145 pb-lg-145 d-lg-block d-none">
            <Card style={{ width: "80%" }} className="m-auto mt-5 mb-5">
              <Card.Body>
                <Card.Title className="text-center mb-5">
                  History Work Order
                </Card.Title>
                <HistoryWOInput form={form} isLoading={isLoading} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  );
}

export default HistoryWO;
