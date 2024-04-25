import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import SearchInput from "../../components/partikel/SearchInput";
import Table from "../../components/partikel/TableWithAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/partikel/Button";
import SAlert from "../../components/partikel/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import Navbar from "../../components/navbar";
import { fetchPengajuan, setKeyword } from "../../redux/pengajuan/actions";
import Footer from "../../components/Footer";

function ChangeSparepartPage() {
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const pengajuans = useSelector((state) => state.pengajuans);

  useEffect(() => {
    dispatch(fetchPengajuan());
  }, [dispatch, pengajuans.keyword]);

  // const handleChangeStatus = (id, status) => {
  //   Swal.fire({
  //     title: "Apa kamu yakin?",
  //     text: "",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Iya, Ubah Status",
  //     cancelButtonText: "Batal",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const payload = {
  //         statusPengajuan:
  //           status === "Belum Diketahui" ? "Diterima" : "Belum Diketahui",
  //       };
  //       const res = await putData(
  //         `/changeSparepart/${id}/approveStatusPengajuan`,
  //         payload
  //       );

  //       dispatch(
  //         setNotif(
  //           true,
  //           "success",
  //           `berhasil ubah status ChangeSparepart ${res.data.data.namaSparepart}`
  //         )
  //       );

  //       dispatch(fetchPengajuan());
  //     }
  //   });
  // };

  // const handleChangeStatusSecond = (id, status) => {
  //   Swal.fire({
  //     title: "Apa kamu yakin?",
  //     text: "",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Iya, Ubah Status",
  //     cancelButtonText: "Batal",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       const payload = {
  //         statusPengajuan:
  //           status === "Belum Diketahui" ? "Ditolak" : "Belum Diketahui",
  //       };
  //       const res = await putData(
  //         `/changeSparepart/${id}/rejectStatusPengajuan`,
  //         payload
  //       );

  //       dispatch(
  //         setNotif(
  //           true,
  //           "success",
  //           `berhasil ubah status ChangeSparepart ${res.data.data.namaSparepart}`
  //         )
  //       );

  //       dispatch(fetchPengajuan());
  //     }
  //   });
  // };

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
        if (result.isConfirmed) {
          const res = await deleteData(`/changeSparepart/${id}`);
          if (res?.data?.data) {
            dispatch(setNotif(true, "success", `Berhasil hapus pengajuan ganti sparepart`));
            dispatch(fetchPengajuan());
          }
        }
      }
    });
  };

  const handlePreviewHistory = (id) => {
    Swal.fire({
      html: `<iframe src="/changeSparepart-page/historyChangeSparepart-page/${id}" style="width:100%; height: 600px;"></iframe>`,
      width: "60%",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Batal",
    });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-3" style={{ height: "80vh" }}>
        <BreadCrumb textSecound={"Change Sparepart"} />
        <Row>
          <Col md="4">
            <SearchInput
              query={pengajuans.keyword}
              handleChange={(e) => dispatch(setKeyword(e.target.value))}
            />
          </Col>
        </Row>

        {notif.status && (
          <SAlert type={notif.typeNotif} message={notif.message} />
        )}

        <Table
          status={pengajuans.status}
          thead={["Pengaju", "Sparepart", "Kode", "Status", "Aksi"]}
          data={pengajuans.data}
          tbody={[
            "UserRequestName",
            "NamaPeralatan",
            "KodePeralatan",
            "StatusPengajuan",
            "Aksi",
          ]}
          customAction={(id, statusPengajuan = "") => {
            return (
              <Button
                className={"mx-2"}
                variant="success"
                size={"sm"}
                action={() => handlePreviewHistory(id, statusPengajuan)}
              >
                Preview
              </Button>
            );
          }}
          deleteAction={(id) => handleDelete(id)}
        />
      </Container>
      <Footer />
    </>
  );
}

export default ChangeSparepartPage;
