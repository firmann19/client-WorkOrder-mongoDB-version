import {
  START_FETCHING_USERS,
  SUCCESS_FETCHING_USERS,
  ERROR_FETCHING_USERS,
  SET_DEPARTEMENT,
  SET_GROUP,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_USERS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_USERS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_USERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.users,
      };
    case SET_DEPARTEMENT:
      return {
        ...state,
        departement: action.departement,
      };

    case SET_GROUP:
      return {
        ...state,
        group: action.group,
      };

    default:
      return state;
  }
}
