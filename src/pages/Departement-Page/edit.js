/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { Card, Container } from "react-bootstrap";
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
      <Container md={12} style={{ height: "80vh" }}>
        <BreadCrumb
          textSecound={"Departement"}
          urlSecound={"/departement-page"}
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "60%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Form Departement</Card.Title>
            <p className="text-center">Please Update Departement</p>
            <DepartementInput
              form={form}
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

export default EditDepartement;
