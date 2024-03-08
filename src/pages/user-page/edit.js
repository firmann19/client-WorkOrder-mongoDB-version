/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchListsDepartement,
  fetchListsGroup,
  fetchListsPosisi,
  fetchListsRoles,
} from "../../redux/lists/actions";
import { getData, postData, putData } from "../../utils/fetch";
import { Card, Container, Col, Row } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import EditUserInput from "../../components/EditUser-Input/EditUserInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import Footer from "../../components/Footer";

function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    avatar: "",
    nama: "",
    email: "",
    password: "",
    role: "",
    posisi: "",
    departement: "",
    group: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/images", formData, true);
    return res;
  };

  const fetchOneUsers = async () => {
    const res = await getData(`/user/${id}`);

    setForm({
      ...form,
      avatar: res.data.data.image.name,
      nama: res.data.data.nama,
      email: res.data.data.email,
      departement: {
        label: res?.data?.data?.departement.namaDepartement,
        target: {
          name: "departement",
          value: res?.data?.data?.departement._id,
        },
        value: res?.data?.data?.departement._id,
      },
      group: {
        label: res?.data?.data?.group.namaGroup,
        target: {
          name: "group",
          value: res?.data?.data?.group._id,
        },
        value: res?.data?.data?.group._id,
      },
      posisi: {
        label: res?.data?.data?.posisi.jabatan,
        target: {
          name: "posisi",
          value: res?.data?.data?.posisi._id,
        },
        value: res?.data?.data?.posisi._id,
      },
      roles: {
        label: res?.data?.data?.role.role,
        target: {
          name: "role",
          value: res?.data?.data?.role._id,
        },
        value: res?.data?.data?.role._id,
      },
    });
  };

  useEffect(() => {
    fetchOneUsers();
  }, []);

  useEffect(() => {
    dispatch(fetchListsDepartement());
    dispatch(fetchListsGroup());
    dispatch(fetchListsPosisi());
    dispatch(fetchListsRoles());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (
      e.target.name === "departement" ||
      e.target.name === "group" ||
      e.target.name === "posisi" ||
      e.target.name === "role"
    ) {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      image: form.file,
      nama: form.nama,
      email: form.email,
      password: form.password,
      role: form.role.value,
      posisi: form.posisi.value,
      departement: form.departement.value,
      group: form.group.value,
    };

    const res = await putData(`/user/${id}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(true, "success", `berhasil ubah user ${res.data.data.nama}`)
      );
      navigate("/user-page");
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
      <Container fluid className="edit-user">
        <BreadCrumb
          textSecound={"User"}
          urlSecound={"/user-page"}
          textThird="Edit"
        />
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <div className="m-auto" style={{ width: "80%" }}>
              {alert.status && (
                <SAlert type={alert.type} message={alert.message} />
              )}
            </div>
            <Card className="m-auto mt-5 mb-5">
              <Card.Body>
                <Card.Title className="title fw-bold color-palette-1 mb-10 text-center">Form Update</Card.Title>
                <p className="label color-palette-1 text-center">Please update user data</p>
                <EditUserInput
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

export default EditUser;
