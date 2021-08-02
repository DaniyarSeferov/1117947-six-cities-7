import {ActionType} from '../action';
import {Cities} from '../../const';

const initialState = {
  city: Cities.PARIS,
  isDataSent: true,
  sendError: '',
};

const applicationProcess = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        city: action.payload,
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
    default:
      return state;
  }
};

export {applicationProcess};
