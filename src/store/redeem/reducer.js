import { DELETE_REDEEM } from "../agencyRedeem/types";
import {
  GET_ACCEPTED_REDEEM,
  GET_PENDING_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  DECLINE_REDEEM,
  OPEN_REDEEM_ACCEPT_DIALOG,
  CLOSE_REDEEM_ACCEPT_DIALOG,
  ACCEPT_SUCCESS,
  CLOSE_ACCEPT_SUCCESS,
} from "./types";

const initialState = {
  acceptedRedeem: [],
  pendingRedeem: [],
  dialog: false,
  dialogData: null,
  acceptDone: false,
};

const redeemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_REDEEM:
      return {
        ...state,
        acceptedRedeem: action.payload,
      };
    case GET_PENDING_REDEEM:
      return {
        ...state,
        pendingRedeem: action.payload,
      };
    case ACCEPT_REDEEM_REQUEST:
      return {
        ...state,
        pendingRedeem: state.pendingRedeem.filter(
          (redeem) => redeem._id !== action.payload._id
        ),
      };

    case DECLINE_REDEEM:
      return {
        ...state,
        pendingRedeem: state.pendingRedeem.map((data) => {
          if (data._id === action.payload.id) return action.payload.data;
          else return data;
        }),
      };

    case OPEN_REDEEM_ACCEPT_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_REDEEM_ACCEPT_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case ACCEPT_SUCCESS:
      return {
        ...state,
        acceptDone: true,
      };

    case CLOSE_ACCEPT_SUCCESS:
      return {
        ...state,
        acceptDone: false,
      };

    default:
      return state;
  }
};

export default redeemReducer;
