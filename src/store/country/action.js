import { GET_COUNTRY } from "./types";

import axios from "axios";

export const getCountry = () => (dispatch) => {
  axios
    .get("/country")
    .then((res) => {
      dispatch({ type: GET_COUNTRY, payload: res.data.country });
    })
    .catch((error) => console.log(error));
};
