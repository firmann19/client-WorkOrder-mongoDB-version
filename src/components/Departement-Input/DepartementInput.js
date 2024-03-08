import React from "react";
import SButton from "../partikel/Button";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../partikel/TextInputWithLabel";

function DepartementInput({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form method="post" className="form-register-departements">
      <TextInputWithLabel
        placeholder={"Masukan nama Departement..."}
        label={"Nama Departement"}
        name="namaDepartement"
        value={form?.namaDepartement}
        type="text"
        onChange={handleChange}
        className="text-lg form-control"
      />
      <div className="mx-auto w-25 mt-5">
        <SButton
          className="w-100 btn-departement text-white"
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

export default DepartementInput;
