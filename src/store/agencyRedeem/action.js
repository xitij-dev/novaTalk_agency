import axios from "axios";
import {
  GET_REDEEM,
  CREATE_NEW_REDEEM,
  CLOSE_REDEEM_DIALOG,
  SET_UPDATE_REDEEM_DONE,
  EDIT_REDEEM,
  SET_CREATE_REDEEM_DONE,
  GET_AGENCY_COIN_DETAIL,
  DELETE_REDEEM,
} from "./types";

export const getRedeem = (id) => (dispatch) => {
  axios
    .get(`/agencyRedeem/${id}`)
    .then((res) => {
      dispatch({ type: GET_REDEEM, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createRedeem = (data) => (dispatch) => {
  axios
    .post("/agencyRedeem", data)
    .then((res) => {
      debugger;
      dispatch({ type: CREATE_NEW_REDEEM, payload: res.data.data });
      dispatch({ type: CLOSE_REDEEM_DIALOG });
      dispatch({ type: SET_CREATE_REDEEM_DONE });
    })
    .catch((error) => {
      debugger;
      console.log(error);
    });
};

export const editRedeem = (data, id) => (dispatch) => {
  axios
    .patch(`/agencyRedeem/${id}`, data)
    .then((res) => {
      dispatch({
        type: EDIT_REDEEM,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_REDEEM_DIALOG });
      dispatch({ type: SET_UPDATE_REDEEM_DONE });
    })
    .catch((error) => console.log(error));
};

export const getCoinDetail = (id) => (dispatch) => {
  axios
    .get(`/agency/getCoin/${id}`)
    .then((res) => {
      dispatch({ type: GET_AGENCY_COIN_DETAIL, payload: res.data.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteRedeem = (id) => (dispatch) => {
  axios
    .delete(`/agencyRedeem/${id}`)
    .then((res) => {
      debugger;
      dispatch({ type: DELETE_REDEEM, payload: id });
    })
    .catch((error) => {
      debugger;
      console.log(error);
    });
};
