import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function HistoryChangeInput({ form, getNameManager }) {
  return (
    <Form method="post" className="form-register">
      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>User</Form.Label>
          <Form.Control
            name="userRequestWO"
            value={form?.userRequestWO}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col className="me-3">
          <Form.Label>Departement</Form.Label>
          <Form.Control
            name="departementUser"
            value={form?.departementUser}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Nama Sparepart</Form.Label>
          <Form.Control
            name="namaSparepart"
            value={form?.namaSparepart}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col className="me-3">
          <Form.Label>Harga Satuan</Form.Label>
          <Form.Control
            name="harga"
            value={form?.harga}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Jumlah Order</Form.Label>
          <Form.Control
            name="jumlahOrder"
            value={form?.jumlahOrder}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col className="me-3">
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

      <Form.Group className="ms-2 me-3">
        <Form.Label>Alasan</Form.Label>
        <Form.Control
          as="textarea"
          name="alasan"
          rows={3}
          value={form?.alasan}
          readOnly
          disabled
        />
      </Form.Group>
    </Form>
  );
}

export default HistoryChangeInput;
