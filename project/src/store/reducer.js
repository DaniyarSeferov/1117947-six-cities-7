import {ActionType} from './action';
import {AuthorizationStatus, Cities} from '../const';

const initialState = {
  city: Cities.PARIS,
  offers: [],
  offer: {},
  comments: [],
  neighbours: [],
  isDataLoaded: false,
  isDataSent: true,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE: {
      return {
        ...state,
        city: action.city,
      };
    }
    case ActionType.LOAD_OFFERS: {
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    }
    case ActionType.LOAD_SINGLE_OFFER: {
      return {
        ...state,
        offer: action.payload,
      };
    }
    case ActionType.LOAD_OFFER: {
      return {
        ...state,
        offer: action.payload.offer,
        comments: action.payload.comments,
        neighbours: action.payload.neighbours,
        isDataLoaded: true,
      };
    }
    case ActionType.LOAD_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
        isDataSent: true,
      };
    }
    case ActionType.START_LOADING: {
      return {
        ...state,
        isDataLoaded: false,
      };
    }
    case ActionType.START_SENDING: {
      return {
        ...state,
        isDataSent: false,
      };
    }
    case ActionType.FINISH_SENDING: {
      return {
        ...state,
        isDataSent: true,
      };
    }
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {},
      };
    default:
      return state;
  }
};

export {reducer};
