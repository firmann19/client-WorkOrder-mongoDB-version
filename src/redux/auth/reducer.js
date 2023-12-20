import { USER_LOGIN, USER_LOGOUT } from "./constants";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      token: null,
      user: null,
      userId: null,
      role: null,
      getNameManager: null,
      getManager: null,
      getAllWO: null,
      getAllUser: null,
      getAllDepartement: null,
      getAllGroup: null,
      getAllOnProgress: null,
      getAllClose: null,
      getAllPending: null,
    };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        user: action.user,
        userId: action.userId,
        role: action.role,
        getNameManager: action.getNameManager,
        getManager: action.getManager,
        getAllWO: action.getAllWO,
        getAllUser: action.getAllUser,
        getAllDepartement: action.getAllDepartement,
        getAllGroup: action.getAllGroup,
        getAllOnProgress: action.getAllOnProgress,
        getAllClose: action.getAllClose,
        getAllPending: action.getAllPending,
      };

    case USER_LOGOUT:
      return {
        token: null,
        user: null,
        userId: null,
        role: null,
        getNameManager: null,
        getManager: null,
        getAllOnProgress: null,
        getAllClose: null,
        getAllPending: null,
      };

    default:
      return state;
  }
}
