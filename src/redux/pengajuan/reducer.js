import {
  ERROR_FETCHING_PENGAJUAN,
  START_FETCHING_PENGAJUAN,
  SUCCESS_FETCHING_PENGAJUAN,
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
    case START_FETCHING_PENGAJUAN:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_PENGAJUAN:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_PENGAJUAN:
      return {
        ...state,
        status: statuslist.success,
        data: action.pengajuans,
      };
    default:
      return state;
  }
}
