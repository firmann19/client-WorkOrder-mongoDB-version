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
import { getData, putData } from "../../utils/fetch";
import { Card, Container } from "react-bootstrap";
import SAlert from "../../components/partikel/Alert";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import EditUserInput from "../../components/EditUser-Input/EditUserInput";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";

function EditUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
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

  const fetchOneUsers = async () => {
    const res = await getData(`/user/${id}`);

    setForm({
      ...form,
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
    if (
      e.target.name === "departement" ||
      e.target.name === "group" ||
      e.target.name === "posisi" ||
      e.target.name === "role"
    ) {
      setForm({ ...form, [e.target.name]: e });
      console.log("e.target.name");
      console.log(e.target.name);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
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
      <Container md={12}>
        <BreadCrumb
          textSecound={"User"}
          urlSecound={"/register-page"}
          textThird="Edit"
        />
        <div className="m-auto" style={{ width: "60%" }}>
          {alert.status && <SAlert type={alert.type} message={alert.message} />}
        </div>
        <Card style={{ width: "60%" }} className="m-auto mt-5 mb-5">
          <Card.Body>
            <Card.Title className="text-center">Form Update</Card.Title>
            <p className="text-center">Please update user data </p>
            <EditUserInput
              form={form}
              isLoading={isLoading}
              lists={lists}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default EditUser;
