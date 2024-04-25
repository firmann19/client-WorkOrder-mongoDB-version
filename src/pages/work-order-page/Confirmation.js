import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData, putData } from "../../utils/fetch";
import ConfirmWOInput from "../../components/confirmWO-Input";
import { Card, Container, Row, Col } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import Footer from "../../components/Footer";

function ConfirmationWO() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const lists = useSelector((state) => state.lists);
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
    selectedAction: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [getManager, setGetManager] = useState(null);
  const [getNameManager, setGetNameManager] = useState(null);

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
      selectedAction: form.selectedAction,
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
      <Container fluid className="confirmation-WorkOrder">
        <BreadCrumb
          textSecound={"Work Order"}
          urlSecound={"/work-order-page"}
          textThird="Confirmation"
        />
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="m-auto" style={{ width: "100%" }}>
              {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
              )}
            </div>
            <Card className="m-auto mt-5 mb-5">
              <Card.Body>
                <h2 className="title fw-bold color-palette-1 text-center mt-2">
                  Work Order
                </h2>
                <div className="border-top border-gray-200 pt-4 mt-4"></div>
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ConfirmationWO;
