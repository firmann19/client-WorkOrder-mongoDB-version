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

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  departements: [],
  statusDepartements: statuslist.idle,
  groups: [],
  statusGroups: statuslist.idle,
  positions: [],
  statusPosisi: statuslist.idle,
  roles: [],
  statusRole: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_DEPARTEMENT:
      return { ...state, statusDepartements: statuslist.process };

    case ERROR_FETCHING_LISTS_DEPARTEMENT:
      return { ...state, statusDepartements: statuslist.error };

    case SUCCESS_FETCHING_LISTS_DEPARTEMENT:
      return {
        ...state,
        statusDepartements: statuslist.success,
        departements: action.departements,
      };

    case START_FETCHING_LISTS_GROUP:
      return { ...state, statusGroups: statuslist.process };

    case ERROR_FETCHING_LISTS_GROUP:
      return { ...state, statusGroups: statuslist.error };

    case SUCCESS_FETCHING_LISTS_GROUP:
      return {
        ...state,
        statusGroups: statuslist.success,
        groups: action.groups,
      };

    case START_FETCHING_LISTS_POSISI:
      return { ...state, statusPosisi: statuslist.process };

    case ERROR_FETCHING_LISTS_POSISI:
      return { ...state, statusPosisi: statuslist.error };

    case SUCCESS_FETCHING_LISTS_POSISI:
      return {
        ...state,
        statusPosisi: statuslist.success,
        positions: action.positions,
      };

    case START_FETCHING_LISTS_ROLES:
      return { ...state, statusRole: statuslist.process };

    case ERROR_FETCHING_LISTS_ROLES:
      return { ...state, statusRole: statuslist.error };

    case SUCCESS_FETCHING_LISTS_ROLES:
      return {
        ...state,
        statusRole: statuslist.success,
        roles: action.roles,
      };
      return {
        ...state,
        statusPengajuans: statuslist.success,
        status: action.status,
      };

    default:
      return state;
  }
}
