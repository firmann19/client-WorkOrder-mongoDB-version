import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/partikel/Button";
import SelectBox from "../../components/partikel/selectBox";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import { setNotif } from "../../redux/notif/actions";
import SearchInput from "../../components/partikel/SearchInput";
import SAlert from "../../components/partikel/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListsDepartement,
  fetchListsGroup,
} from "../../redux/lists/actions";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import {
  fetchUsers,
  setDepartement,
  setGroup,
} from "../../redux/users/actions";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

function UserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const user = useSelector((state) => state.user);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListsDepartement());
    dispatch(fetchListsGroup());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/user/${id}`);
        if (res?.data?.data) {
          dispatch(setNotif(true, "success", "berhasil hapus user"));
          dispatch(fetchUsers());
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-3" style={{ height: "80vh" }}>
        <Button action={() => navigate("/user-page/create-user")}>
          Tambah
        </Button>
        <BreadCrumb textSecound={"User"} />
        <Row>
          <Col>
            <SearchInput />
          </Col>
          <Col>
            <SelectBox
              placeholder={"Masukan pencarian Departement"}
              name="category"
              value={user.DepartementId}
              options={lists.departements}
              handleChange={(e) => dispatch(setDepartement(e))}
            />
          </Col>
          <Col>
            <SelectBox
              placeholder={"Masukan pencarian Group"}
              name="category"
              value={user.GroupId}
              options={lists.groups}
              handleChange={(e) => dispatch(setGroup(e))}
            />
          </Col>
        </Row>

        {notif.status && (
          <SAlert type={notif.typeNotif} message={notif.message} />
        )}

        <Table
          status={user.status}
          thead={[
            "Nama",
            "Email",
            "Posisi",
            "Role",
            "Departement",
            "Group",
            "Aksi",
          ]}
          data={user.data}
          tbody={[
            "namaUser",
            "emailUser",
            "posisiUser",
            "roleUser",
            "departementUser",
            "groupUser",
            "Aksi",
          ]}
          editUrl={`/user-page/edit-user`}
          deleteAction={(id) => handleDelete(id)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default UserPage;
