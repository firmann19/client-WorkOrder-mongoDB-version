import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function HistoryWOInput({ form, handleSubmit, handleChange, isLoading }) {
  return (
    <>
      <Form method="post" className="form-history-wo">
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

          <Col xs={12} md={6} className="mb-3 flex-column d-flex flex-wrap">
            <Form.Label className="label">Nama Peralatan</Form.Label>
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

        <Row className="mt-4 mb-4 d-flex flex-wrap">
          <Col xs={12} md={6} className="mb-3 flex-column">
            <Form.Label className="label">Tanggal Work Order</Form.Label>
            <Form.Control
              name="Date_RequestWO"
              value={form?.Date_RequestWO}
              type="text"
              onChange={handleChange}
              disabled
              readOnly
            />
          </Col>

          <Col xs={12} md={6} className="mb-3 flex-column">
            <Form.Label className="label">Tanggal Pengerjaan</Form.Label>
            <Form.Control
              name="KodeBarang"
              value={form?.Date_CompletionWO}
              type="text"
              onChange={handleChange}
              disabled
              readOnly
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="label">Permasalahan</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form?.Permasalahan}
            disabled
            readOnly
          />
        </Form.Group>

        <Row className="mt-4 flex flex-wrap">
          <Col xs={12} md={2} className="mb-1 flex-column">
            <Form.Label className="label">Tindakan :</Form.Label>
          </Col>
          <Col>
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
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            id="Tindakan"
            name="Tindakan"
            value={form?.Tindakan}
            onChange={handleChange}
            disabled
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-4 mt-4">
          <Form.Label className="label">Sparepart yang diganti</Form.Label>
          <Form.Control
            id="GantiSparepart"
            name="GantiSparepart"
            value={form?.GantiSparepart}
            onChange={handleChange}
            as="textarea"
            rows={3}
            disabled
            readOnly
          />
        </Form.Group>

        <Row className="mt-4 mb-4 d-flex flex-wrap">
          <Col xs={12} md={3} className="mb-3 flex-column">
            <Form.Label className="label">Pemohon</Form.Label>
            <Form.Control
              name="UserRequst"
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
              name="StaffIT"
              value={form?.StaffIT}
              type="text"
              onChange={handleChange}
              readOnly
              disabled
            />
          </Col>

          <Col xs={12} md={3} className="mb-3 flex-column">
            <Form.Label className="label">Diketahui</Form.Label>
            <Form.Control
              name="HeadIT"
              value={form?.HeadIT}
              type="text"
              onChange={handleChange}
              readOnly
              disabled
            />
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default HistoryWOInput;
