import {ActionType} from '../action';
import {AuthorizationStatus, Cities} from '../../const';

const initialState = {
  city: Cities.PARIS,
  isDataSent: true,
  sendError: '',
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const applicationProcess = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        city: action.city,
      };
    case ActionType.SET_FAVORITE:
      return {
        ...state,
        offer: action.payload.offer,
        offers: action.payload.offers,
        neighbours: action.payload.neighbours,
      };
    case ActionType.START_SENDING:
      return {
        ...state,
        isDataSent: false,
        sendError: '',
      };
    case ActionType.FINISH_SENDING:
      return {
        ...state,
        isDataSent: true,
        sendError: action.payload,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    default:
      return state;
  }
};

export {applicationProcess};
