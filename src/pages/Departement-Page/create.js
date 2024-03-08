import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postData } from "../../utils/fetch";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { Card, Container, Row, Col } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import DepartementInput from "../../components/Departement-Input/DepartementInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import Footer from "../../components/Footer";

function CreateDepartement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    namaDepartement: "",
  });

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
      namaDepartement: form.namaDepartement,
    };

    const res = await postData(`/departement`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah departement ${res.data.data.namaDepartement}`
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
      <Container className="create-departement" fluid style={{minHeight: "80vh"}}>
        <BreadCrumb
          textSecound={"Departement"}
          urlSecound={"/departement-page"}
          textThird="Create"
        />
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="m-auto" style={{ width: "80%" }}>
              {alert.status && <SAlert type={alert.type} message={alert.message} />}
            </div>
            <Card className="card-departement m-auto mt-5">
              <Card.Body>
                <Card.Title className="title fw-bold color-palette-1 mb-10 text-center">Form Departement</Card.Title>
                <p className="label color-palette-1 text-center">Create New Departement</p>
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

export default CreateDepartement;
