import { GET_REPORTED_USER } from "./types";

import axios from "axios";

//reported user [to user]
export const getReportedUser = (id) => (dispatch) => {
  axios
    .get(`/report/${id}`)
    .then((res) => {
      dispatch({ type: GET_REPORTED_USER, payload: res.data.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

//get list of report user [from user]
// export const getReportUser = (id) => (dispatch) => {
//   axios
//     .get(`/report/${id}`)
//     .then((res) => {
//       dispatch({ type: GET_REPORT_USER, payload: res.data.data });
//     })
//     .catch((error) => console.log(error));
// };
