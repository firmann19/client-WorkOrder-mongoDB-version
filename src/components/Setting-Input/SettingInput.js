import React from "react";
import { Link } from "react-router-dom";
import SButton from "../partikel/Button";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../partikel/TextInputWithLabel";

function SettingInput() {
  return (
    <Form className="form-register">
      <TextInputWithLabel
        placeholder={"Masukan nama..."}
        label={"Nama"}
        name="name"
        type="text"
      />

      <TextInputWithLabel
        placeholder={"Masukan email"}
        label={"Email"}
        name="email"
        type="text"
      />

      <div className="mx-auto w-25 mt-5">
        <Link to="/complete-order">
          <SButton className="w-100" variant="danger">
            Submit
          </SButton>
        </Link>
      </div>
    </Form>
  );
}

export default SettingInput;
