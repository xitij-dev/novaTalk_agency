import axios from "axios";

import { GET_DASHBOARD } from "./types";
export const getDashboard = () => (dispatch) => {
  axios
    .get("/dashboard")
    .then((res) => {
      // console.log(res.data.data);
      dispatch({ type: GET_DASHBOARD, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
