import React, { useState } from "react";
import Navbar from "../../components/navbar";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import ChangeSparepartInput from "../../components/changeSparepart-Input";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData} from "../../utils/fetch";
import { useEffect } from "react";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";

function CreateChangeSparepart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [getManager, setGetManager] = useState(null);
  const [getNameManager, setGetNameManager] = useState(null);
  const [form, setForm] = useState({
    StaffITRequest: "",
    HeadIT: "",
    namaSparepart: "",
    kodeSparepart: "",
    harga: "",
    jumlahOrder: "",
    alasan: "",
  });

  const fetchOneWO = async () => {
    const res = await getData(`/checkout/${id}`);

    setForm({
      ...form,
      KodeBarang: res.data.data.KodeBarang,
    });
  };

  useEffect(() => {
    const fecthData = () => {
      let { user, userId, getManager, getNameManager } = localStorage.getItem(
        "auth"
      )
        ? JSON.parse(localStorage.getItem("auth"))
        : {};
      setGetManager(getManager);
      setGetNameManager(getNameManager);
      setUser(user);
      setUserId(userId);
    };
    fecthData();
    fetchOneWO();
  }, []);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      StaffITRequest: userId,
      namaSparepart: form.namaSparepart,
      kodeSparepart: form.KodeBarang,
      harga: form.harga,
      jumlahOrder: form.jumlahOrder,
      alasan: form.alasan,
      HeadIT: getManager,
    };

    const res = await postData(`/changeSparepart/${id}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah ChangeSparepart ${res.data.data.NamaBarang}`
        )
      );
      navigate("/changeSparepart-page");
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
      <Container md={12} style={{ height: "100vh" }}>
        <BreadCrumb
          textSecound={"Work Order"}
          urlSecound={"/work-order-page"}
          textThird="Change Sparepart"
        />
        <div className="m-auto" style={{ width: "60%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card className="m-auto mb-5 card-changeSparepart">
          <Card.Body>
            <h2 className="title fw-bold color-palette-1 text-center mb-5">
              Pergantian Sparepart
            </h2>
            <ChangeSparepartInput
              user={user}
              form={form}
              getNameManager={getNameManager}
              isLoading={isLoading}
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

export default CreateChangeSparepart;
