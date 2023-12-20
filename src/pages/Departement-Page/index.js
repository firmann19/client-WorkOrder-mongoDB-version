import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/partikel/Button";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import SAlert from "../../components/partikel/Alert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../utils/fetch";
import { fetchDepartements } from "../../redux/departements/actions";
import Navbar from "../../components/navbar";
import { setNotif } from "../../redux/notif/actions";

function DepartementPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const notif = useSelector((state) => state.notif);
  const departements = useSelector((state) => state.departements);

  useEffect(() => {
    dispatch(fetchDepartements());
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
        const res = await deleteData(`/departement/${id}`);
        if(res?.data?.data){
        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus departement ${res.data.data.namaDepartement}`
          )
        );
        dispatch(fetchDepartements());
       }
      }
    });
  };

  return (
    <>
    <Navbar />
    <Container className="mt-3">
      <Button action={() => navigate("/departement-page/create-departement")}>
        Tambah
      </Button>
      <BreadCrumb textSecound={"Departement"} />
      <Row>
        <Col md="4">
          <SearchInput />
        </Col>
      </Row>

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}

      <Table
        status={departements.status}
        thead={["Departement", "Aksi"]}
        data={departements.data}
        tbody={["namaDepartement", "Aksi"]}
        editUrl={`/departement-page/edit-departement`}
        deleteAction={(id) => handleDelete(id)}
      />
    </Container>
    </>
  );
}

export default DepartementPage;
