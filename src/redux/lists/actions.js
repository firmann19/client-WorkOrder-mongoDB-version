/* eslint-disable no-undef */
import debounce from "debounce-promise";
import { getData } from "../../utils/fetch";
import {
  ERROR_FETCHING_LISTS_DEPARTEMENT,
  ERROR_FETCHING_LISTS_GROUP,
  ERROR_FETCHING_LISTS_POSISI,
  ERROR_FETCHING_LISTS_ROLES,
  START_FETCHING_LISTS_DEPARTEMENT,
  START_FETCHING_LISTS_GROUP,
  START_FETCHING_LISTS_POSISI,
  START_FETCHING_LISTS_ROLES,
  SUCCESS_FETCHING_LISTS_DEPARTEMENT,
  SUCCESS_FETCHING_LISTS_GROUP,
  SUCCESS_FETCHING_LISTS_POSISI,
  SUCCESS_FETCHING_LISTS_ROLES,
} from "./constants";

let debouncedFetchListsDepartement = debounce(getData, 1000);
let debouncedFetchListsGroup = debounce(getData, 1000);
let debouncedFetchListsPosisi = debounce(getData, 1000);
let debouncedFetchListsRole = debounce(getData, 1000);

// Departement

export const startFetchingListsDepartement = () => {
  return {
    type: START_FETCHING_LISTS_DEPARTEMENT,
  };
};

export const successFetchingListsDepartement = ({ departements }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_DEPARTEMENT,
    departements,
  };
};

export const errorFetchingListsDepartement = () => {
  return {
    type: ERROR_FETCHING_LISTS_DEPARTEMENT,
  };
};

export const fetchListsDepartement = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsDepartement());

    try {
      let res = await debouncedFetchListsDepartement("/departement");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.namaDepartement,
          target: { value: res._id, name: "departement" },
        });
      });

      dispatch(
        successFetchingListsDepartement({
          departements: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListsDepartement());
    }
  };
};

// Group

export const startFetchingListsGroup = () => {
  return {
    type: START_FETCHING_LISTS_GROUP,
  };
};

export const successFetchingListsGroup = ({ groups }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_GROUP,
    groups,
  };
};

export const errorFetchingListsGroup = () => {
  return {
    type: ERROR_FETCHING_LISTS_GROUP,
  };
};

export const fetchListsGroup = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsGroup());

    try {
      let res = await debouncedFetchListsGroup("/group");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.namaGroup,
          target: { value: res._id, name: "group" },
        });
      });

      dispatch(successFetchingListsGroup({ groups: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsGroup());
    }
  };
};

// Posisi
export const startFetchingListsPosisi = () => {
  return {
    type: START_FETCHING_LISTS_POSISI,
  };
};

export const successFetchingListsPosisi = ({ positions }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_POSISI,
    positions,
  };
};

export const errorFetchingListsPosisi = () => {
  return {
    type: ERROR_FETCHING_LISTS_POSISI,
  };
};

export const fetchListsPosisi = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsPosisi());

    try {
      let res = await debouncedFetchListsPosisi("/posisi");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.jabatan,
          target: { value: res._id, name: "posisi" },
        });
      });

      dispatch(successFetchingListsPosisi({ positions: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsPosisi());
    }
  };
};

// Roles
export const startFetchingListsRoles = () => {
  return {
    type: START_FETCHING_LISTS_ROLES,
  };
};

export const successFetchingListsRoles = ({ roles }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_ROLES,
    roles,
  };
};

export const errorFetchingListsRoles = () => {
  return {
    type: ERROR_FETCHING_LISTS_ROLES,
  };
};

export const fetchListsRoles = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsRoles());

    try {
      let res = await debouncedFetchListsRole("/role");

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.role,
          target: { value: res._id, name: "role" },
        });
      });

      dispatch(successFetchingListsRoles({ roles: _temp }));
    } catch (error) {
      dispatch(errorFetchingListsRoles());
    }
  };
};