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
    <Form method="post" className="form-register">
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Pengaju</Form.Label>
          <Form.Control
            name="StaffITRequest"
            value={user}
            type="text"
            disabled
            readOnly
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Manager IT</Form.Label>
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
          <Form.Label>Nama Sparepart</Form.Label>
          <Form.Control
            name="namaSparepart"
            value={form?.namaSparepart}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Kode Peralatan</Form.Label>
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
          <Form.Label>Harga Satuan</Form.Label>
          <Form.Control
            name="harga"
            value={form?.harga}
            type="text"
            onChange={handleChange}
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Jumlah Order</Form.Label>
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
          <Form.Label>Alasan</Form.Label>
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
          className="w-100"
          loading={isLoading}
          disabled={isLoading}
          action={handleSubmit}
          variant="danger"
        >
          Submit
        </SButton>
      </div>
    </Form>
  );
}

export default ChangeSparepartInput;
