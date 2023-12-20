import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_PENGAJUAN,
  START_FETCHING_PENGAJUAN,
  SUCCESS_FETCHING_PENGAJUAN,
} from "./constants";

let debouncedFetchPengajuan = debounce(getData, 1000);

export const startFetchingPengajuan = () => {
  return {
    type: START_FETCHING_PENGAJUAN,
  };
};

export const successFetchingPengajuan = ({ pengajuans }) => {
  return {
    type: SUCCESS_FETCHING_PENGAJUAN,
    pengajuans,
  };
};

export const errorFetchingPengajuan = () => {
  return {
    type: ERROR_FETCHING_PENGAJUAN,
  };
};

export const fetchPengajuan = () => {
  return async (dispatch) => {
    dispatch(startFetchingPengajuan());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchPengajuan("/changeSparepart");

      dispatch(
        successFetchingPengajuan({
          pengajuans: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPengajuan());
    }
  };
};
