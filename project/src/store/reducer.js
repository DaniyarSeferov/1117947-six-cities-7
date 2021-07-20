import {ActionType} from './action';
import {Cities} from '../const';

const initialState = {
  city: Cities.PARIS,
  offers: [],
  isDataLoaded: false,
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
    default:
      return state;
  }
};

export {reducer};
