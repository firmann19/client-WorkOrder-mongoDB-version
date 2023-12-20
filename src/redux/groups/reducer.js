import {
  ERROR_FETCHING_GROUPS,
  START_FETCHING_GROUPS,
  SUCCESS_FETCHING_GROUPS,
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
    case START_FETCHING_GROUPS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_GROUPS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_GROUPS:
      return {
        ...state,
        status: statuslist.success,
        data: action.groups,
      };
    default:
      return state;
  }
}
