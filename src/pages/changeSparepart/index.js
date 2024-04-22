import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import SearchInput from "../../components/partikel/SearchInput";
import Table from "../../components/partikel/TableWithAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/partikel/Button";
import SAlert from "../../components/partikel/Alert";
import Swal from "sweetalert2";
import { putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import Navbar from "../../components/navbar";
import { fetchPengajuan } from "../../redux/pengajuan/actions";
import Footer from "../../components/Footer";

function ChangeSparepartPage() {
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const pengajuans = useSelector((state) => state.pengajuans);

  useEffect(() => {
    dispatch(fetchPengajuan());
  }, [dispatch]);

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Ubah Status",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusPengajuan:
            status === "Diterima" ? "Belum Diketahui" : "Diterima",
        };
        const res = await putData(
          `/changeSparepart/${id}/statusPengajuan`,
          payload
        );

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil ubah status ChangeSparepart ${res.data.data.namaSparepart}`
          )
        );

        dispatch(fetchPengajuan());
      }
    });
  };

  const handleChangeStatusSecond = (id, status) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Ubah Status",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          statusPengajuan: status === "Ditolak" ? "Diterima" : "Ditolak",
        };
        const res = await putData(
          `/changeSparepart/${id}/statusPengajuan`,
          payload
        );

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil ubah status ChangeSparepart ${res.data.data.namaSparepart}`
          )
        );

        dispatch(fetchPengajuan());
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-3" style={{ height: "80vh" }}>
        <BreadCrumb textSecound={"Change Sparepart"} />
        <Row>
          <Col md="4">
            <SearchInput />
          </Col>
        </Row>

        {notif.status && (
          <SAlert type={notif.typeNotif} message={notif.message} />
        )}

        <Table
          status={pengajuans.status}
          thead={["Nama", "Departemen", "Sparepart", "Status", "Aksi"]}
          data={pengajuans.data}
          tbody={[
            "userRequestWO",
            "departementUser",
            "namaSparepart",
            "statusPengajuan",
            "Aksi",
          ]}
          customAction={(id, statusPengajuan = "") => {
            return (
              <Button
                className={"mx-2"}
                variant="success"
                size={"sm"}
                action={() => handleChangeStatus(id, statusPengajuan)}
                disabled={statusPengajuan === "Ditolak"}
              >
                Diterima
              </Button>
            );
          }}
          customActionSecond={(id) => handleChangeStatusSecond(id)}
          Detail={`/changeSparepart-page/historyChangeSparepart-page`}
        />
      </Container>
      <Footer />
    </>
  );
}

export default ChangeSparepartPage;
