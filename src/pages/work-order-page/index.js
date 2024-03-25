import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "../../components/partikel/Button";
import SelectBox from "../../components/partikel/selectBox";
import BreadCrumb from "../../components/partikel/Breadcrumb";
import Table from "../../components/partikel/TableWithAction";
import SearchInput from "../../components/partikel/SearchInput";
import SAlert from "../../components/partikel/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckouts, setDepartement, setKeyword } from "../../redux/checkouts/actions";
import Swal from "sweetalert2";
import { putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { fetchListsDepartement } from "../../redux/lists/actions";

function WorkOrderPage() {
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const checkouts = useSelector((state) => state.checkouts);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(fetchCheckouts());
  }, [dispatch, checkouts.keyword, checkouts.Departement]);

  useEffect(() => {
    dispatch(fetchListsDepartement());
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
          StatusPengerjaan: status === "OnProgress" ? "Pending" : "OnProgress",
        };
        const res = await putData(`/checkout/${id}/statuspengerjaan`, payload);
        if (res?.data?.data) {
          dispatch(setNotif(true, "success", `berhasil ubah status WorkOrder`));
          dispatch(fetchCheckouts());
        }
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-3" style={{ height: "80vh" }}>
        <BreadCrumb textSecound={"Work Order"} />
        <Row>
          <Col>
            <SearchInput
              query={checkouts.keyword}
              handleChange={(e) => dispatch(setKeyword(e.target.value))}
            />
          </Col>
          <Col>
            <SelectBox
              placeholder={"Masukan pencarian Departement"}
              name="category"
              value={checkouts.Departement}
              options={lists.departements}
              isClearable={true}
              handleChange={(e) => dispatch(setDepartement(e))}
            />
          </Col>
        </Row>

        {notif.status && (
          <SAlert type={notif.typeNotif} message={notif.message} />
        )}

        <Table
          status={checkouts.status}
          thead={[
            "Nama",
            "Departement",
            "Peralatan",
            "Kode",
            "Status",
            "Durasi Pengerjaan",
            "Pengerjaan",
            "Aksi",
          ]}
          data={checkouts.data}
          tbody={[
            "UserRequestName",
            "DepartementName",
            "NamaPeralatan",
            "KodePeralatan",
            "Status_WO",
            "durationWO",
            "Status_Pengerjaan",
            "Aksi",
          ]}
          confirmationUrl={`/work-order-page/confirmation-wo`}
          Detail={`/work-order-page/history-wo`}
          customAction={(id, StatusPengerjaan = "", StatusWO) => {
            const isDisabled =
              StatusPengerjaan === "Close" ||
              StatusPengerjaan === "OnProgress" ||
              StatusWO !== "Approve";

            return (
              <Button
                className={"mx-2"}
                variant="primary"
                size={"sm"}
                action={() => handleChangeStatus(id, StatusPengerjaan)}
                disabled={isDisabled}
              >
                Change Status
              </Button>
            );
          }}
        />
      </Container>
      <Footer />
    </>
  );
}

export default WorkOrderPage;
