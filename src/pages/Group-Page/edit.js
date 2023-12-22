/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import GroupInput from "../../components/Group-Input/GroupInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";

function EditGroup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [form, setForm] = useState({
    namaGroup: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneGroup = async () => {
    const res = await getData(`/group/${id}`);

    setForm({
      ...form,
      namaGroup: res.data.data.namaGroup,
    });
  };

  useEffect(() => {
    fetchOneGroup();
  }, []);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      namaGroup: form.namaGroup,
    };

    const res = await putData(`/group/${id}`, payload);
    if (res?.data?.data) {
      dispatch(setNotif(true, "success",  `berhasil ubah group ${res.data.data.namaGroup}`));
      navigate("/group-page");
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
          textSecound={"Group"}
          urlSecound={"/group-page"}
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "50%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5">
          <Card.Body>
            <Card.Title className="text-center">Form Group</Card.Title>
            <p className="text-center">Please Update Group</p>
            <GroupInput
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

export default EditGroup;
