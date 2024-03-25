import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_CHECKOUTS,
  SET_DEPARTEMENT,
  SET_KEYWORD,
  START_FETCHING_CHECKOUTS,
  SUCCESS_FETCHING_CHECKOUTS,
} from "./constants";
import moment from "moment";

let debouncedFetchCheckouts = debounce(getData, 1000);

export const startFetchingCheckouts = () => {
  return {
    type: START_FETCHING_CHECKOUTS,
  };
};

export const successFetchingCheckouts = ({ checkouts }) => {
  return {
    type: SUCCESS_FETCHING_CHECKOUTS,
    checkouts,
  };
};

export const errorFetchingCheckouts = () => {
  return {
    type: ERROR_FETCHING_CHECKOUTS,
  };
};

export const fetchCheckouts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingCheckouts());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().checkouts.keyword,
        Departement: getState().checkouts?.Departement?.value || "",
      };

      let res = await debouncedFetchCheckouts("/checkout", params);

      res.data.data.forEach((res) => {
        res.UserRequestName = res.UserRequest.nama;
        res.DepartementName = res.Departement.namaDepartement;
        res.NamaPeralatan = res.NamaBarang;
        res.KodePeralatan = res.KodeBarang;
        res.Status_WO = res.StatusWO;
        res.durationWO = `${res.duration.days} hari ${res.duration.hours} jam ${res.duration.minutes} menit ${res.duration.seconds} detik`; 
        res.Status_Pengerjaan = res.StatusPengerjaan;
      });

      dispatch(
        successFetchingCheckouts({
          checkouts: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingCheckouts());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setDepartement = (Departement) => {
  return {
    type: SET_DEPARTEMENT,
    Departement,
  };
};
