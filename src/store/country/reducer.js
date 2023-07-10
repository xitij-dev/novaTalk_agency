import { GET_COUNTRY } from "./types";

const initialState = {
  country: [],
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };

    default:
      return state;
  }
};

export default countryReducer;
