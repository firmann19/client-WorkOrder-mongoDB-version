import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_PENGAJUAN,
  SET_KEYWORD,
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
  return async (dispatch, getState) => {
    dispatch(startFetchingPengajuan());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().pengajuans.keyword,
      };

      let res = await debouncedFetchPengajuan("/changeSparepart", params);

      res.data.data.forEach((res) => {
        res.UserRequestName = res.userRequestWO.nama;
        res.NamaPeralatan = res.namaSparepart;
        res.KodePeralatan = res.kodeSparepart;
        res.StatusPengajuan = res.statusPengajuan;
      }); 

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

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};
