import axios from "axios";

import {
  GET_HOST,
  BLOCK_UNBLOCK_HOST,
  CREATE_NEW_HOST,
  EDIT_HOST,
  CLOSE_HOST_DIALOG,
  SET_CREATE_HOST_DONE,
  SET_UPDATE_HOST_DONE,
  GET_HOST_ANALYTIC,
  GET_TOTAL_COIN_OF_ANALYTIC,
  GET_LIVE_STREAMING_ANALYTIC,
  GET_LIVE_STREAMING_COIN,
  EXTRA_BONUS,
} from "./types";

export const getHost = (id) => (dispatch) => {
  axios
    .get(`/host/agency/${id}`)
    .then((res) => {
      dispatch({ type: GET_HOST, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockHost = (id) => (dispatch) => {
  axios
    .get(`/host/blockUnblock/${id}`)
    .then((res) => {
      dispatch({ type: BLOCK_UNBLOCK_HOST, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const createNewHost = (formData) => (dispatch) => {
  axios
    .post("/host", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_HOST, payload: res.data.host });
      dispatch({ type: CLOSE_HOST_DIALOG });
      dispatch({ type: SET_CREATE_HOST_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const editHost = (formData, id) => (dispatch) => {
  axios
    .patch("/host/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_HOST,
        payload: { data: res.data.host, id },
      });
      dispatch({ type: CLOSE_HOST_DIALOG });
      dispatch({ type: SET_UPDATE_HOST_DONE });
    })
    .catch((error) => console.log(error));
};

export const hostAnalytic = (id, start, end) => (dispatch) => {
  axios
    .get(`/host/analytic/${id}?start=${start}&end=${end}`)
    .then((res) => {
      dispatch({ type: GET_HOST_ANALYTIC, payload: res.data.data });
      dispatch({
        type: GET_TOTAL_COIN_OF_ANALYTIC,
        payload: res.data.totalCoin,
      });
    })
    .catch((error) => console.log(error));
};

export const liveStreamingAnalytic = (id, start, end) => (dispatch) => {
  axios
    .get(`/host/analytic/liveStreaming/${id}?start=${start}&end=${end}`)
    .then((res) => {
      dispatch({ type: GET_LIVE_STREAMING_ANALYTIC, payload: res.data.data });
      dispatch({
        type: GET_LIVE_STREAMING_COIN,
        payload: res.data.totalCoin,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
