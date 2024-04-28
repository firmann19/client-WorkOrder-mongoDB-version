import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { listen } from "./redux/listener";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "../src/pages/dashboard-page";
import WorkOrderPage from "../src/pages/work-order-page";
import UserPage from "./pages/user-page";
import CreateUser from "./pages/user-page/Create";
import EditUser from "./pages/user-page/edit";
import DepartementPage from "./pages/Departement-Page";
import CreateDepartement from "./pages/Departement-Page/create";
import EditDepartement from "./pages/Departement-Page/edit";
import GroupPage from "./pages/Group-Page";
import CreateGroup from "./pages/Group-Page/create";
import EditGroup from "./pages/Group-Page/edit";
import ConfirmationWO from "./pages/work-order-page/Confirmation";
import HistoryWO from "./pages/work-order-page/historyWO";
import CreateChangeSparepart from "./pages/changeSparepart/create";
import ChangeSparepartPage from "./pages/changeSparepart";
import HistoryChangeSparepart from "./pages/changeSparepart/detail";


function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work-order-page" element={<WorkOrderPage />} />
        <Route
          path="/work-order-page/confirmation-wo/:id"
          element={<ConfirmationWO />}
        />
        <Route path="/work-order-page/history-wo/:id" element={<HistoryWO />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/user-page/create-user" element={<CreateUser />} />
        <Route path="/user-page/edit-user/:id" element={<EditUser />} />
        <Route path="/departement-page" element={<DepartementPage />} />
        <Route
          path="/departement-page/create-departement"
          element={<CreateDepartement />}
        />
        <Route
          path="/departement-page/edit-departement/:id"
          element={<EditDepartement />}
        />
        <Route path="/group-page" element={<GroupPage />} />
        <Route
          path="/create-changeSparepart/:id"
          element={<CreateChangeSparepart />}
        />
        <Route path="/changeSparepart-page" element={<ChangeSparepartPage />} />
        <Route
          path="/changeSparepart-page/historyChangeSparepart-page/:id"
          element={<HistoryChangeSparepart />}
        />
        <Route path="/group-page/create-group" element={<CreateGroup />} />
        <Route path="/group-page/edit-group/:id" element={<EditGroup />} />
      </Routes>
    </>
  );
}

export default App;
