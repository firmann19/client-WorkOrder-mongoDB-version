import {
  ERROR_FETCHING_DEPARTEMENTS,
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
    default:
      return state;
  }
}
