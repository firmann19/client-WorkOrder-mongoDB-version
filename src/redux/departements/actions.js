import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_DEPARTEMENTS,
  START_FETCHING_DEPARTEMENTS,
  SUCCESS_FETCHING_DEPARTEMENTS,
} from "./constants";

let debouncedFetchDepartements = debounce(getData, 1000);

export const startFetchingDepartements = () => {
  return {
    type: START_FETCHING_DEPARTEMENTS,
  };
};

export const successFetchingDepartements = ({ departements }) => {
  return {
    type: SUCCESS_FETCHING_DEPARTEMENTS,
    departements,
  };
};

export const errorFetchingDepartements = () => {
  return {
    type: ERROR_FETCHING_DEPARTEMENTS,
  };
};

export const fetchDepartements = () => {
  return async (dispatch) => {
    dispatch(startFetchingDepartements());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchDepartements("/departement");

      dispatch(
        successFetchingDepartements({
          departements: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingDepartements());
    }
  };
};
