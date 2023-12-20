import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";
import {
  ERROR_FETCHING_GROUPS,
  START_FETCHING_GROUPS,
  SUCCESS_FETCHING_GROUPS,
} from "./constants";

let debouncedFetchGroups = debounce(getData, 1000);

export const startFetchingGroups = () => {
  return {
    type: START_FETCHING_GROUPS,
  };
};

export const successFetchingGroups = ({ groups }) => {
  return {
    type: SUCCESS_FETCHING_GROUPS,
    groups,
  };
};

export const errorFetchingGroups = () => {
  return {
    type: ERROR_FETCHING_GROUPS,
  };
};

export const fetchGroups = () => {
  return async (dispatch) => {
    dispatch(startFetchingGroups());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchGroups("/group");

      dispatch(
        successFetchingGroups({
          groups: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingGroups());
    }
  };
};
