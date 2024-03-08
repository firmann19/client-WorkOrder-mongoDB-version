import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import SAlert from "../components/partikel/Alert";
import { userLogin } from "../redux/auth/actions";
import { postData } from "../utils/fetch";
import { Card, Container, Row, Col } from "react-bootstrap";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "danger",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("/auth/login", form);

      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.user,
          res.data.data.userId,
          res.data.data.role,
          res.data.data.getNameManager,
          res.data.data.getManager,
          res.data.data.getAllWO,
          res.data.data.getAllUser,
          res.data.data.getAllDepartement,
          res.data.data.getAllGroup,
          res.data.data.getAllOnProgress,
          res.data.data.getAllClose,
          res.data.data.getAllPending,
          res.data.data.image
        )
      );

      setIsLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? "Internal Server Error",
        type: "danger",
      });
    }
  };

  return (
    <Container className="sign-in my-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={6}>
          {alert.status && (
            <div className="mb-3">
              <SAlert type={alert.type} message={alert.message} />
            </div>
          )}
          <Card>
            <Card.Body>
              <Card.Title className="title fw-bold color-palette-1 text-center">Form Signin</Card.Title>
              <LoginInput
                form={form}
                isLoading={isLoading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
