import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_CHECKOUTS,
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

      let res = await debouncedFetchCheckouts("/checkout", /*params*/);
      console.log("test", res)

      res.data.data.forEach((res) => {
        res.UserRequestName = res.UserRequest.nama;
        res.DepartementName = res.Departement.namaDepartement;
        res.NamaPeralatan = res.NamaBarang;  
        res.KodePeralatan = res.KodeBarang;
        res.Status_WO = res.StatusWO;
        res.DateRequestWO = moment(res.Date_RequestWO).format("DD-MM-YYYY, h:mm:ss a");
        res.Status_Pengerjaan = res.StatusPengerjaan;    
      });

      dispatch(
        successFetchingCheckouts({
          checkouts: res.data.data
          //checkouts: _temp,
          //pages: res.data.data.pages,
        })
      );
    } catch (error) {
      dispatch(errorFetchingCheckouts());
    }
  };
};
