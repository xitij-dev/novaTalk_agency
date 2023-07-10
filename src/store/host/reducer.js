import {
  GET_HOST,
  BLOCK_UNBLOCK_HOST,
  OPEN_HOST_DIALOG,
  CLOSE_HOST_DIALOG,
  CREATE_NEW_HOST,
  EDIT_HOST,
  SET_CREATE_HOST_DONE,
  UNSET_CREATE_HOST_DONE,
  SET_UPDATE_HOST_DONE,
  UNSET_UPDATE_HOST_DONE,
  GET_HOST_ANALYTIC,
  GET_SINGLE_HOST_DATA,
  GET_TOTAL_COIN_OF_ANALYTIC,
  GET_LIVE_STREAMING_ANALYTIC,
  GET_LIVE_STREAMING_COIN,
} from "./types";

const initialState = {
  host: [],
  analytic: [],
  singleHost: {},
  totalCoin: {},
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case BLOCK_UNBLOCK_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host._id === action.payload._id)
            return {
              ...host,
              block: action.payload.block,
            };
          else return host;
        }),
      };
    case CREATE_NEW_HOST:
      const data = [...state.host];
      data.unshift(action.payload);
      return {
        ...state,
        host: data,
      };
    case EDIT_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host._id === action.payload.id) return action.payload.data;
          else return host;
        }),
      };

    case GET_TOTAL_COIN_OF_ANALYTIC:
      return {
        ...state,
        totalCoin: action.payload,
      };
    case GET_SINGLE_HOST_DATA:
      return {
        ...state,
        singleHost: action.payload,
      };
    case SET_CREATE_HOST_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_HOST_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_HOST_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_HOST_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_HOST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_HOST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    case GET_HOST_ANALYTIC:
      return {
        ...state,
        analytic: action.payload,
      };

    case GET_LIVE_STREAMING_ANALYTIC:
      return {
        ...state,
        liveStreamingAnalytic: action.payload,
      };
    case GET_LIVE_STREAMING_COIN:
      return {
        ...state,
        liveStreamingCoin: action.payload,
      };
    default:
      return state;
  }
};

export default hostReducer;
