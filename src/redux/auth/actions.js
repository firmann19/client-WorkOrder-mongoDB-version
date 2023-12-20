import { USER_LOGIN, USER_LOGOUT } from "./constants";

export function userLogin(
  token,
  user,
  userId,
  role,
  getNameManager,
  getManager,
  getAllWO,
  getAllUser,
  getAllDepartement,
  getAllGroup,
  getAllOnProgress,
  getAllClose,
  getAllPending
) {
  return {
    type: USER_LOGIN,
    token,
    user,
    userId,
    role,
    getNameManager,
    getManager,
    getAllWO,
    getAllUser,
    getAllDepartement,
    getAllGroup,
    getAllOnProgress,
    getAllClose,
    getAllPending
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
