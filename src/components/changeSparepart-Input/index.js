import React from "react";
import SButton from "../partikel/Button";
import { Col, Form, Row } from "react-bootstrap";

function ChangeSparepartInput({
  form,
  getNameManager,
  handleChange,
  handleSubmit,
  isLoading,
  user,
}) {
  return (
    <Form method="post" className="form-changeSparepart">
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Label className="label">Pengaju</Form.Label>
          <Form.Control
            name="StaffITRequest"
            value={user}
            type="text"
            disabled
            readOnly
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label className="label">Manager IT</Form.Label>
          <Form.Control
            name="HeadIT"
            value={getNameManager}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Label className="label">Nama Sparepart</Form.Label>
          <Form.Control
            name="namaSparepart"
            value={form?.namaSparepart}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
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

      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Label className="label">Harga Satuan</Form.Label>
          <Form.Control
            name="harga"
            value={form?.harga}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label className="label">Jumlah Order</Form.Label>
          <Form.Control
            name="jumlahOrder"
            value={form?.jumlahOrder}
            type="text"
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Form.Label className="label">Alasan</Form.Label>
          <Form.Control
            as="textarea"
            name="alasan"
            rows={3}
            value={form?.alasan}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <div className="mx-auto mt-5" style={{ maxWidth: "400px" }}>
        <SButton
          className="w-100 btn-changeSparepart"
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

export default ChangeSparepartInput;
