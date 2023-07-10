import {
  GET_PENDING_REQUEST,
  ACCEPT_PENDING_REQUEST,
  OPEN_REQUEST_DIALOG,
  CLOSE_REQUEST_DIALOG,
  SET_ACCEPT_REQUEST_DONE,
  UNSET_ACCEPT_REQUEST_DONE,
} from "./types";

const initialState = {
  request: [],
  dialog: false,
  dialogData: null,
  createDone: false,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PENDING_REQUEST:
      return {
        ...state,
        request: action.payload,
      };

    case ACCEPT_PENDING_REQUEST:
      return {
        ...state,
        request: state.request.filter((data) => data._id !== action.payload),
      };

    case OPEN_REQUEST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_REQUEST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case SET_ACCEPT_REQUEST_DONE:
      return {
        ...state,
        createDone: true,
      };

    case UNSET_ACCEPT_REQUEST_DONE:
      return {
        ...state,
        createDone: false,
      };

    default:
      return state;
  }
};

export default requestReducer;
