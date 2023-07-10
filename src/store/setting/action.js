import {
  GET_SETTING,
  EDIT_SETTING,
  GOOGLE_SWITCH,
  STRIPE_SWITCH,
  RAZOR_PAY_SWITCH,
} from "./types";

import axios from "axios";

export const getSetting = () => (dispatch) => {
  axios
    .get("/setting")
    .then((res) => {
      dispatch({ type: GET_SETTING, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
export const editSetting = (formData, id) => (dispatch) => {
  axios
    .patch("/setting/" + id, formData)
    .then((res) => {
      dispatch({ type: EDIT_SETTING, payload: { data: res.data.data, id } });
    })
    .catch((error) => console.log(error));
};
export const handleGoogleSwitch = (id) => (dispatch) => {
  axios
    .patch(`/setting/googlePay/${id}`)
    .then((res) => {
      dispatch({ type: GOOGLE_SWITCH, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
export const handleRazorSwitch = (id) => (dispatch) => {
  axios
    .patch(`/setting/razorPay/${id}`)
    .then((res) => {
      dispatch({ type: RAZOR_PAY_SWITCH, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
export const handleStripeSwitch = (id) => (dispatch) => {
  axios
    .patch(`/setting/stripe/${id}`)
    .then((res) => {
      dispatch({ type: STRIPE_SWITCH, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
