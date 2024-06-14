import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import SearchInput from "../../components/partikel/SearchInput";
import Table from "../../components/partikel/TableWithAction";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/partikel/Button";
import SAlert from "../../components/partikel/Alert";
import Swal from "sweetalert2";
import { deleteData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import Navbar from "../../components/navbar";
import { fetchPengajuan, setKeyword } from "../../redux/pengajuan/actions";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function ChangeSparepartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notif = useSelector((state) => state.notif);
  const pengajuans = useSelector((state) => state.pengajuans);

  useEffect(() => {
    dispatch(fetchPengajuan());
  }, [dispatch, pengajuans.keyword]);

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
            dispatch(
              setNotif(
                true,
                "success",
                `Berhasil hapus pengajuan ganti sparepart`
              )
            );
            dispatch(fetchPengajuan());
          }
        }
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    Swal.fire({
      html: `<iframe src="/changeSparepart-page/historyChangeSparepart-page/${id}" style="width:100%; height: 600px;"></iframe>`,
      width: "60%",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Diterima",
      cancelButtonText: "Ditolak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newStatus =
          status === "Diterima" ? "Belum Diketahui" : "Diterima";
        const payload = {
          statusPengajuan: newStatus,
        };
        const res = await putData(
          `/changeSparepart/${id}/approveStatusPengajuan`,
          payload
        );
        if (res?.data?.data) {
          dispatch(
            setNotif(true, "success", `Berhasil ubah status changeSparepart`)
          );
          dispatch(fetchPengajuan());
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Masukkan Alasan Penolakan",
          input: "textarea",
          inputPlaceholder: "Tulis alasan penolakan di sini...",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "Submit",
          cancelButtonText: "Batal",
        }).then(async (reasonResult) => {
          if (reasonResult.isConfirmed && reasonResult.value) {
            const payload = {
              statusPengajuan: "Ditolak",
              alasanReject: reasonResult.value,
            };
            const res = await putData(
              `/changeSparepart/${id}/rejectStatusPengajuan`,
              payload
            );
            if (res?.data?.data) {
              dispatch(
                setNotif(
                  true,
                  "success",
                  `Berhasil ubah status changeSparepart`
                )
              );
              dispatch(fetchPengajuan());
            }
          }
        });
      }
    });
  };

  const handleDetail = (id) => {
    navigate(`/changeSparepart-page/historyChangeSparepart-page/${id}`);
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
          thead={["Pengaju", "Sparepart", "Kode Peralatan", "Status", "Aksi"]}
          data={pengajuans.data}
          tbody={[
            "UserRequestName",
            "NamaSparepart",
            "KodePeralatan",
            "StatusPengajuan",
            "Aksi",
          ]}
          customAction={(id, statusPengajuan = "") => {
            return (
              <>
                <Button
                  size={"sm"}
                  action={() => handleChangeStatus(id, statusPengajuan)}
                >
                  Change Status
                </Button>
                <Button
                  size={"sm"}
                  variant={"success"}
                  action={() => handleDetail(id)}
                  className={"ms-2"}
                >
                  Detail
                </Button>
              </>
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
