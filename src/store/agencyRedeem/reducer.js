import {
  GET_REDEEM,
  CREATE_NEW_REDEEM,
  SET_CREATE_REDEEM_DONE,
  UNSET_CREATE_REDEEM_DONE,
  OPEN_REDEEM_DIALOG,
  CLOSE_REDEEM_DIALOG,
  EDIT_REDEEM,
  SET_UPDATE_REDEEM_DONE,
  UNSET_UPDATE_REDEEM_DONE,
  GET_AGENCY_COIN_DETAIL,
  DELETE_REDEEM,
} from "./types";

const initialState = {
  agencyRedeem: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  agencyCoin: null,
};

const agencyRedeemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REDEEM:
      return {
        ...state,
        agencyRedeem: action.payload,
      };

    case CREATE_NEW_REDEEM:
      const data = [...state.agencyRedeem];
      data.unshift(action.payload);
      return {
        ...state,
        agencyRedeem: data,
      };

    case EDIT_REDEEM:
      return {
        ...state,
        agencyRedeem: state.agencyRedeem.map((data) => {
          if (data._id === action.payload.id) return action.payload.data;
          else return data;
        }),
      };

    case SET_CREATE_REDEEM_DONE:
      return {
        ...state,
        createDone: true,
      };

    case UNSET_CREATE_REDEEM_DONE:
      return {
        ...state,
        createDone: false,
      };

    case OPEN_REDEEM_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };

    case CLOSE_REDEEM_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case SET_UPDATE_REDEEM_DONE:
      return {
        ...state,
        updateDone: true,
      };

    case UNSET_UPDATE_REDEEM_DONE:
      return {
        ...state,
        updateDone: false,
      };

    case GET_AGENCY_COIN_DETAIL:
      return {
        ...state,
        agencyCoin: action.payload,
      };

    case DELETE_REDEEM:
      return {
        ...state,
        agencyRedeem: state.agencyRedeem.filter(
          (data) => data._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default agencyRedeemReducer;
