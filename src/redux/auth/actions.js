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
  getAllPending,
  image
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
    getAllPending,
    image,
  };
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}
