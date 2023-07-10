import { combineReducers } from "redux";

import dashboardReducer from "./dashboard/reducer";
import countryReducer from "./country/reducer";
import redeemReducer from "./redeem/reducer";
import adminReducer from "./admin/reducer";
import reportUserReducer from "./reportUser/reducer";
import spinnerReducer from "./spinner/reducer";
import hostReducer from "./host/reducer";
import settingReducer from "./setting/reducer";
import agencyRedeemReducer from "./agencyRedeem/reducer";
import complainReducer from "./complain/reducer";
import requestReducer from "./pendingHostRequest/reducer";

export default combineReducers({
  dashboard: dashboardReducer,
  admin: adminReducer,
  country: countryReducer,
  report: reportUserReducer,
  spinner: spinnerReducer,
  host: hostReducer,
  redeem: redeemReducer,
  setting: settingReducer,
  agencyRedeem: agencyRedeemReducer,
  complain: complainReducer,
  request: requestReducer,
});
