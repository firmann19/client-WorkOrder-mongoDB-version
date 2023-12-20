import {
  START_FETCHING_USERS,
  SUCCESS_FETCHING_USERS,
  ERROR_FETCHING_USERS,
  SET_DEPARTEMENT,
  SET_GROUP,
} from "./constants";

import { getData } from "../../utils/fetch";
import debounce from "debounce-promise";
import { clearNotif } from "../notif/actions";

let debouncedFetchUsers = debounce(getData, 1000);

export const startFetchingUsers = () => {
  return {
    type: START_FETCHING_USERS,
  };
};

export const successFetchingUsers = ({ users }) => {
  return {
    type: SUCCESS_FETCHING_USERS,
    users,
  };
};

export const errorFetchingUsers = () => {
  return {
    type: ERROR_FETCHING_USERS,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(startFetchingUsers());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchUsers("/user");

      res.data.data.forEach((res) => {
        res.namaUser = res.nama;
        res.emailUser = res.email;
        res.posisiUser = res.posisi.jabatan;
        res.roleUser = res.role.role;
        res.departementUser = res.departement.namaDepartement;
        res.groupUser = res.group.namaGroup;
      });

      dispatch(
        successFetchingUsers({
          users: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingUsers());
    }
  };
};

export const setDepartement = (departement) => {
  return {
    type: SET_DEPARTEMENT,
    departement,
  };
};

export const setGroup = (group) => {
  return {
    type: SET_GROUP,
    group,
  };
};
