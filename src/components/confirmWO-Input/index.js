import React from "react";
import SButton from "../partikel/Button";
import { Col, Form, Row } from "react-bootstrap";
import "../../styles/workOrder.css"

function ConfirmWOInput({
  form,
  getNameManager,
  user,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <Form method="post" className="form-confirmation">
      <Row className="mt-4 mb-4 d-flex flex-wrap">
        <Col xs={12} md={6} className="mb-3 flex-column">
          <Form.Label className="label">User</Form.Label>
          <Form.Control
            name="UserRequest"
            value={form?.UserRequest}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col xs={12} md={6} className="mb-3 flex-column">
          <Form.Label className="label">Nama Peralatan</Form.Label>
          <Form.Control
            name="NamaBarang"
            value={form?.NamaBarang}
            type="text"
            className="form-control"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4 d-flex flex-wrap">
        <Col xs={12} md={6} className="mb-3 flex-column">
          <Form.Label className="label">Departemen</Form.Label>
          <Form.Control
            name="Departement"
            value={form?.Departement}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col xs={12} md={6} className="mb-3 flex-column">
          <Form.Label className="label">Kode Peralatan</Form.Label>
          <Form.Control
            name="KodeBarang"
            value={form?.KodeBarang}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Label className="label">Permasalahan</Form.Label>
          <Form.Control
            as="textarea"
            className="text-black"
            type="text"
            rows={3}
            value={form?.Permasalahan}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Row className="mt-4 d-flex flex-wrap">
        <Col className="">
          <Form.Label className="label">Tindakan :</Form.Label>
        </Col>
        <Col xs={12} md={2} className="mb-1 flex-column">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Perbaikan`}
          />
        </Col>

        <Col xs={12} md={2} className="mb-1 flex-column">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Pergantian`}
          />
        </Col>

        <Col xs={12} md={2} className="mb-1 flex-column">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Request_Data`}
          />
        </Col>

        <Col xs={12} md={2} className="mb-1 flex-column">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Others`}
          />
        </Col>
      </Row>
      <Form.Control
        id="Tindakan"
        name="Tindakan"
        type="text"
        value={form?.Tindakan}
        onChange={handleChange}
        as="textarea"
        rows={3}
      />

      <Row className="mb-4 mt-4">
        <Col>
          <Form.Label className="label">Sparepart yang diganti</Form.Label>
          <Form.Control
            id="gantiSparepart"
            name="GantiSparepart"
            type="text"
            value={form?.GantiSparepart}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
        </Col>
      </Row>

      <SButton
        className="w-40 btn-confirmation"
        href="/create-changeSparepart"
      >
        Ajukan Pergantian
      </SButton>

      <Row className="mt-4 mb-4 d-flex flex-wrap">
        <Col xs={12} md={3} className="mb-3 flex-column">
          <Form.Label className="label">Pemohon</Form.Label>
          <Form.Control
            name="UserRequest"
            value={form?.UserRequest}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col xs={12} md={3} className="mb-3 flex-column">
          <Form.Label className="label">Disetujui</Form.Label>
          <Form.Control
            name="UserApprove"
            value={form?.UserApprove}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col xs={12} md={3} className="mb-3 flex-column">
          <Form.Label className="label">Dikerjakan Oleh</Form.Label>
          <Form.Control
            name="nama"
            value={user}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col xs={12} md={3} className="mb-3 flex-column">
          <Form.Label className="label">Diketahui</Form.Label>
          <Form.Control
            name="HeadIT"
            value={getNameManager}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <div className="mx-auto w-50 mt-5">
        <SButton
          className="w-100 btn-confirmation rounded-5"
          loading={isLoading}
          disabled={isLoading}
          action={handleSubmit}
        >
          Submit
        </SButton>
      </div>
    </Form>
  );
}

export default ConfirmWOInput;
