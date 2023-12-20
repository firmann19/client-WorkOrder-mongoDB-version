import {
  ERROR_FETCHING_CHECKOUTS,
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
    default:
      return state;
  }
}
