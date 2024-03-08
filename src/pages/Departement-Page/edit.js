import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { Card, Container, Row, Col } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import DepartementInput from "../../components/Departement-Input/DepartementInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";

function EditDepartement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form, setForm] = useState({
    namaDepartement: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneDepartement = async () => {
    const res = await getData(`/departement/${id}`);

    setForm({
      ...form,
      namaDepartement: res.data.data.namaDepartement,
    });
  };

  useEffect(() => {
    fetchOneDepartement();
  }, []);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      namaDepartement: form.namaDepartement,
    };

    const res = await putData(`/departement/${id}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil ubah departement ${res.data.data.namaDepartement}`
        )
      );
      navigate("/departement-page");
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
      <Container
        className="edit-departement"
        fluid
        style={{ minHeight: "80vh", marginTop: "60px", marginBottom: "30px" }}
      >
        <BreadCrumb
          textSecound={"Departement"}
          urlSecound={"/departement-page"}
          textThird="Edit"
        />
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="m-auto" style={{ width: "80%" }}>
              {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
              )}
            </div>
            <Card className="m-auto mt-5 card-departement">
              <Card.Body>
                <Card.Title className="text-center title fw-bold color-palette-1 mb-10">
                  Form Departement
                </Card.Title>
                <p className="label color-palette-1 text-center">Please Update Departement</p>
                <DepartementInput
                  form={form}
                  isLoading={isLoading}
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

export default EditDepartement;
