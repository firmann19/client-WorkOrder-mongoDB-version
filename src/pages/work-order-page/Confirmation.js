/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ConfirmWOInput from "../../components/confirmWO-Input";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getData, putData } from "../../utils/fetch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import Footer from "../../components/Footer";

function ConfirmationWO() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [getManager, setGetManager] = useState(null);
  const [getNameManager, setGetNameManager] = useState(null);
  const lists = useSelector((state) => state.lists);
  const { id } = useParams();
  const [form, setForm] = useState({
    UserRequest: "",
    Departement: "",
    NamaBarang: "",
    KodeBarang: "",
    Permasalahan: "",
    UserApprove: "",
    Tindakan: "",
    GantiSparepart: "",
    HeadIT: "",
    StaffIT: "",
    Date_CompletionWO: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
    });
  };

  useEffect(() => {
    fetchOneWO();

    const fecthData = () => {
      let { user, userId, getManager, getNameManager } = localStorage.getItem(
        "auth"
      )
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setUser(user);
      setUserId(userId);
      setGetManager(getManager);
      setGetNameManager(getNameManager);
    };
    fecthData();
  }, [dispatch]);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      UserRequest: form.UserRequest,
      Departement: form.Departement,
      NamaBarang: form.NamaBarang,
      KodeBarang: form.KodeBarang,
      Permasalahan: form.Permasalahan,
      UserApprove: form.UserApprove,
      Tindakan: form.Tindakan,
      GantiSparepart: form.GantiSparepart,
      HeadIT: getManager,
      StaffIT: userId,
      Date_CompletionWO: form.Date_CompletionWO,
    };

    const res = await putData(`/checkout/${id}`, payload);
    if (res?.data?.data) {
      dispatch(setNotif(true, "success", "berhasil konfirmasi Work Order"));
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
      <Container md={12}>
        <BreadCrumb
          textSecound={"Work Order"}
          urlSecound={"/work-order-page"}
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "80%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "80%" }} className="m-auto mt-5 mb-5">
          <Card.Body>
            <Card.Title className="text-center mb-5">Work Order</Card.Title>
            <ConfirmWOInput
              user={user}
              getNameManager={getNameManager}
              form={form}
              isLoading={isLoading}
              lists={lists}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default ConfirmationWO;
