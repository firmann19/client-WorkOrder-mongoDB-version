import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function HistoryChangeInput({ form, getNameManager, handleChange, options }) {
  return (
    <Form method="post" className="form-register">
      <Row>
        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Pengaju</Form.Label>
          <Form.Control
            name="StaffITRequest"
            value={form?.StaffITRequest}
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
            readOnly
            disabled
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Kode Peralatan</Form.Label>
          <Form.Control
            name="kodeSparepart"
            value={form?.kodeSparepart}
            type="text"
            readOnly
            disabled
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
            readOnly
            disabled
          />
        </Col>

        <Col xs={12} md={6} className="mb-3">
          <Form.Label>Jumlah Order</Form.Label>
          <Form.Control
            name="jumlahOrder"
            value={form?.jumlahOrder}
            type="text"
            readOnly
            disabled
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
            readOnly
            disabled
          />
        </Col>
      </Row>
    </Form>
  );
}

export default HistoryChangeInput;
