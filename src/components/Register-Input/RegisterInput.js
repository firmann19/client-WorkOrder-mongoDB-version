import React from "react";
import SButton from "../partikel/Button";
import SelectBox from "../partikel/selectBox";
import { Col, Figure, Form, Row } from "react-bootstrap";
import TextInputWithLabel from "../partikel/TextInputWithLabel";
import { config } from "../../configs";

function RegisterInput({ form, lists, handleChange, handleSubmit, isLoading }) {
  return (
    <Form method="post" className="form-register">
      <TextInputWithLabel
        placeholder={"Masukan Avatar..."}
        label={"Avatar"}
        name="avatar"
        //value={form?.nama}
        type="file"
        onChange={handleChange}
      />
      {form.avatar !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={`${config.api_image}/${form.avatar}`}
            />

            <Figure.Caption>Perview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}

      <TextInputWithLabel
        placeholder={"Masukan nama..."}
        label={"Nama"}
        name="nama"
        value={form?.nama}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukan email"}
        label={"Email"}
        name="email"
        value={form?.email}
        type="text"
        onChange={handleChange}
      />

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <SelectBox
            label={"Group"}
            placeholder={"Pilih group anda..."}
            name="group"
            isClearable={true}
            value={form.group}
            options={lists.groups}
            handleChange={(e) => handleChange(e)}
          />
        </Col>

        <Col className="me-3">
          <SelectBox
            label={"Departement"}
            placeholder={"Pilih departement anda..."}
            name="departement"
            isClearable={true}
            value={form.departement}
            options={lists.departements}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <Row className="mt-4 mb-4">
        <Col className="ms-2">
          <SelectBox
            label={"Posisi"}
            placeholder={"Pilih posisi anda..."}
            name="posisi"
            isClearable={true}
            value={form.posisi}
            options={lists.positions}
            handleChange={(e) => handleChange(e)}
          />
        </Col>

        <Col className="me-3">
          <SelectBox
            label={"Role"}
            placeholder={"Pilih role anda..."}
            name="role"
            isClearable={true}
            value={form.role}
            options={lists.role}
            handleChange={(e) => handleChange(e)}
          />
        </Col>
      </Row>

      <TextInputWithLabel
        placeholder={"Masukan Password"}
        label={"Password"}
        name="password"
        value={form?.password}
        type="password"
        onChange={handleChange}
      />
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

export default RegisterInput;
