import {
  ERROR_FETCHING_GROUPS,
  SET_KEYWORD,
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
  keyword: "",
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

      case SET_KEYWORD:
        return {
          ...state,
          keyword: action.keyword,
        };
        
    default:
      return state;
  }
}
