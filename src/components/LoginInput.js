import React from "react";
import SButton from "./partikel/Button";
import TextInputWithLabel from "./partikel/TextInputWithLabel";
import { Form } from "react-bootstrap";

export default function SFORM({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukan email"}
        label={"Email"}
        name="email"
        value={form?.email}
        type="email"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukan password"}
        label={"Password"}
        name="password"
        value={form?.password}
        type="password"
        onChange={handleChange}
        className="text-lg form-control"
      />

      <SButton
        loading={isLoading}
        disabled={isLoading}
        className="btn btn-sign-in text-white mt-3"
        action={handleSubmit}
      >
        Submit
      </SButton>
    </Form>
  );
}
