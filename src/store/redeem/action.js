import axios from "axios";

import {
  GET_ACCEPTED_REDEEM,
  GET_PENDING_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  DECLINE_REDEEM,
  ACCEPT_SUCCESS,
  CLOSE_REDEEM_ACCEPT_DIALOG,
} from "./types";

export const getAcceptedRedeem = (id) => (dispatch) => {
  axios
    .get(`/redeem/accepted/${id}`)
    .then((res) => {
      dispatch({ type: GET_ACCEPTED_REDEEM, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const getPendingRedeem = (id) => (dispatch) => {
  axios
    .get(`/redeem/unaccepted/${id}`)
    .then((res) => {
      dispatch({ type: GET_PENDING_REDEEM, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const acceptRedeemRequest = (id, data) => (dispatch) => {
  axios
    .patch(`/redeem/${id}`, data)
    .then((res) => {
      dispatch({ type: ACCEPT_REDEEM_REQUEST, payload: res.data.data });
      dispatch({ type: CLOSE_REDEEM_ACCEPT_DIALOG });
      dispatch({ type: ACCEPT_SUCCESS });
    })
    .catch((error) => console.log(error));
};

export const declineRedeemRequest = (id) => (dispatch) => {
  axios
    .patch(`/redeem/decline/${id}`)
    .then((res) => {
      dispatch({ type: DECLINE_REDEEM, payload: { data: res.data.data, id } });
    })
    .catch((error) => console.log(error));
};
