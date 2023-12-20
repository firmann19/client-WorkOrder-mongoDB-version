import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postData } from "../../utils/fetch";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import DepartementInput from "../../components/Departement-Input/DepartementInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";

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
      <Container md={12}>
        <BreadCrumb
          textSecound={"Departement"}
          urlSecound={"/departement-page"}
          textThird="Create"
        />
        <div className="m-auto" style={{ width: "60%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Form Departement</Card.Title>
            <p className="text-center">Create New Departement</p>
            <DepartementInput
              form={form}
              isLoading={isLoading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CreateDepartement;
