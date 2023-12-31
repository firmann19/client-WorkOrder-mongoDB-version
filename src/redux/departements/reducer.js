import {
  ERROR_FETCHING_DEPARTEMENTS,
  SET_DEPARTEMENT,
  SET_KEYWORD,
  START_FETCHING_DEPARTEMENTS,
  SUCCESS_FETCHING_DEPARTEMENTS,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_DEPARTEMENTS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_DEPARTEMENTS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_DEPARTEMENTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.departements,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    default:
      return state;
  }
}
