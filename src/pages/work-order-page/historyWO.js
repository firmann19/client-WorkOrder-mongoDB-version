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
import ApproveImg from "../../assets/images/approve-task.jpg";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";

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
    });
  };

  useEffect(() => {
    fetchOneWO();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

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
  };

  return (
    <>
      <Navbar />
      <section class="history-order mx-auto">
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
                  disabled={isLoading || typeof form.Tindakan !== 'undefined' || typeof form.GantiSparepart !== 'undefined'}
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
      </section>

      {/* <Container md={12}>        
  </Container> */}
    </>
  );
}

export default HistoryWO;
