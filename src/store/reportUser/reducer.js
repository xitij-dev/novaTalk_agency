import { GET_REPORTED_USER } from "./types";

const initialState = {
  report: [],
};

const reportUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPORTED_USER:
      return {
        ...state,
        report: action.payload,
      };
    // case GET_REPORT_USER:
    //   return {
    //     ...state,
    //     report: action.payload,
    //   };

    default:
      return state;
  }
};

export default reportUserReducer;
