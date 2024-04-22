import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./styles/utilities.css"
import "./styles/transactions.css"
import "./styles/history-order.css"
import "./styles/Navbar.css"
import "./styles/card-performance.css"
import "./styles/Footer.css"
import "./styles/login.css"
import "./styles/departement.css"
import "./styles/changeSparepart.css"
import "./styles/user.css"
import "./styles/workOrder.css"
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
