import axios from "axios";

import { GET_COMPLAIN, SOLVED_COMPLAIN } from "./types";

export const getComplain = (type, id) => (dispatch) => {
  axios
    .get(`/complain/host?type=${type}&agency_id=${id}`)
    .then((res) => {
      debugger;
      dispatch({ type: GET_COMPLAIN, payload: res.data.data });
    })
    .catch((error) => {
      debugger;
      console.log(error);
    });
};

export const solvedComplain = (id) => (dispatch) => {
  axios
    .patch(`/complain/${id}`)
    .then((res) => {
      dispatch({ type: SOLVED_COMPLAIN, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
