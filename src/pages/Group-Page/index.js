import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/partikel/Button";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import SAlert from "../../components/partikel/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { fetchGroups } from "../../redux/groups/actions";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";
import Footer from "../../components/Footer";

function GroupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const groups = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(fetchGroups());
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
        const res = await deleteData(`/group/${id}`);
        if(res?.data?.data) {
        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus group ${res.data.data.namaGroup}`
          )
        );
        dispatch(fetchGroups());
      }
      }
    });
  };

  return (
    <>
    <Navbar />
    <Container className="mt-3" style={{ height: "80vh" }}>
      <Button action={() => navigate("/group-page/create-group")} >Tambah</Button>
      <BreadCrumb textSecound={"Group"} />
      <Row>
        <Col md="4">
          <SearchInput />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={groups.status}
        thead={["Group", "Aksi"]}
        data={groups.data}
        tbody={["namaGroup", "Aksi"]}
        editUrl={`/group-page/edit-group`}
        deleteAction={(id) => handleDelete(id)}
      />
    </Container>
    <Footer />
    </>
  );
}

export default GroupPage;
