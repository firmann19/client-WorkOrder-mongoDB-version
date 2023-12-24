import {
  ERROR_FETCHING_CHECKOUTS,
  SET_DEPARTEMENT,
  SET_KEYWORD,
  START_FETCHING_CHECKOUTS,
  SUCCESS_FETCHING_CHECKOUTS,
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
    case START_FETCHING_CHECKOUTS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_CHECKOUTS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_CHECKOUTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.checkouts,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_DEPARTEMENT:
      return {
        ...state,
        Departement: action.Departement,
      };
    default:
      return state;
  }
}
