import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../../utils/fetch";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import { Card, Container, Row, Col } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import GroupInput from "../../components/Group-Input/GroupInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import "../../styles/group.css"

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
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil ubah group ${res.data.data.namaGroup}`
        )
      );
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
      <Container className="edit-grup" style={{ minHeight: "80vh" }}>
        <BreadCrumb
          textSecound={"Group"}
          urlSecound={"/group-page"}
          textThird="Edit"
        />
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="m-auto" style={{ width: "100%" }}>
              {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
              )}
            </div>
            <Card className="m-auto mt-5" style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title className="title fw-bold color-palette-1 mb-10 text-center">Form Group</Card.Title>
                <p className="label color-palette-1 text-center">Please Update Group</p>
                <GroupInput
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

export default EditGroup;
