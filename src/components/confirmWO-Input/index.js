import React from "react";
import SButton from "../partikel/Button";
import { Col, Form, Row } from "react-bootstrap";

function ConfirmWOInput({
  form,
  getNameManager,
  user,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <Form method="post" className="form-register">
      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>User</Form.Label>
          <Form.Control
            name="UserRequest"
            value={form?.UserRequest}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col className="me-3">
          <Form.Label>Nama Peralatan</Form.Label>
          <Form.Control
            name="NamaBarang"
            value={form?.NamaBarang}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Departemen</Form.Label>
          <Form.Control
            name="Departement"
            value={form?.Departement}
            type="text"
            onChange={handleChange}
            disabled
            readOnly
          />
        </Col>

        <Col className="me-3">
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

      <Form.Group className="mb-3">
        <Form.Label>Permasalahan</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form?.Permasalahan}
          disabled
          readOnly
        />
      </Form.Group>

      <Row className="mt-4">
        <Col className="ms-3">
          <Form.Label>Tindakan :</Form.Label>
        </Col>
        <Col>
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Perbaikan`}
          />
        </Col>

        <Col className="me-3">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Pergantian`}
          />
        </Col>

        <Col className="me-3">
          <Form.Check // prettier-ignore
            type={"checkbox"}
            id={``}
            label={`Request_Data`}
          />
        </Col>

        <Col className="me-3">
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
        value={form?.Tindakan}
        onChange={handleChange}
        as="textarea"
        rows={3}
      />

      <Form.Group className="mb-4 mt-4">
        <Form.Label>Sparepart yang diganti</Form.Label>
        <Form.Control
          id="gantiSparepart"
          name="GantiSparepart"
          value={form?.GantiSparepart}
          onChange={handleChange}
          as="textarea"
          rows={3}
        />
      </Form.Group>

      <SButton
        className="w-40"
        variant="primary"
        href="/create-changeSparepart"
      >
        Ajukan Pergantian
      </SButton>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <Form.Label>Pemohon</Form.Label>
          <Form.Control
            name="UserRequest"
            value={form?.UserRequest}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col className="ms-2">
          <Form.Label>Disetujui</Form.Label>
          <Form.Control
            name="UserApprove"
            value={form?.UserApprove}
            type="text"
            onChange={handleChange}
            readOnly
            disabled
          />
        </Col>

        <Col className="ms-2">
          <Form.Label>Dikerjakan Oleh</Form.Label>
          <Form.Control
            name="nama"
            value={user}
            type="text"
            readOnly
            disabled
          />
        </Col>

        <Col className="ms-2">
          <Form.Label>Diketahui</Form.Label>
          <Form.Control
            name="HeadIT"
            value={getNameManager}
            type="text"
            readOnly
            disabled
          />
        </Col>
      </Row>

      <div className="mx-auto w-25 mt-5">
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

export default ConfirmWOInput;
