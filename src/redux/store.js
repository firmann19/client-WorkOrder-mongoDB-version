import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import thunk from "redux-thunk";
import authReducer from "./auth/reducer";
import listsReducer from "./lists/reducer";
import notifReducer from "./notif/reducer";
import userReducer from "./users/reducer";
import departementsReducer from "./departements/reducer"
import groupsReducer from "./groups/reducer"
import checkoutReducer from "./checkouts/reducer"
import pengajuanReducer from "./pengajuan/reducer"

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  lists: listsReducer,
  notif: notifReducer,
  user: userReducer,
  departements : departementsReducer,
  groups: groupsReducer,
  checkouts: checkoutReducer,
  pengajuans: pengajuanReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
