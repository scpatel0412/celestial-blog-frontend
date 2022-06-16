import * as types from "./actionTypes";

const initialState = {
  users: [],
  user: {},
  respsignupuser: {},
  resploginuser: {},
  datas: [],
  data: {},
  like1: [],
  comment1: [],
  dailyfeeds1: [],
  dailyfeed1: [],
  errors: "",
};
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.POST_USER_SIGNUP:
      return {
        ...state,
        respsignupuser: action.payload,
      };
    case types.POST_USER_LOGIN:
      return {
        ...state,
        resploginuser: action.payload,
      };
    case types.UPDATE_USER:
      return {
        ...state,
      };
    case types.DELETE_USER:
      return {
        ...state,
      };
    case types.GET_DATA:
      return {
        ...state,
        datas: action.payload,
      };
    case types.GET_SINGLE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case types.POST_DATA:
      return {
        ...state,
      };
    case types.UPDATE_DATA:
      return {
        ...state,
      };
    case types.DELETE_DATA:
      return {
        ...state,
      };
    case types.SHOW_COMMENT:
      return {
        ...state,
        comment1: action.payload,
      };
    case types.ADD_COMMENT:
      return {
        ...state,
      };
    case types.SHOW_LIKE:
      return {
        ...state,
        like1: action.payload,
      };
    case types.ADD_LIKE:
      return {
        ...state,
      };
    case types.SHOW_FEED:
      return {
        ...state,
        dailyfeeds1: action.payload,
      };
    case types.SHOW_SINGLE_FEED:
      return {
        ...state,
        dailyfeed1: action.payload,
      };
    case types.ADD_FEED:
      return {
        ...state,
      };
    case types.UPDATE_FEED:
      return {
        ...state,
      };
    case types.DELETE_FEED:
      return {
        ...state,
      };
    case types.ERROR_USER:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
export default blogReducer;
