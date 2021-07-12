import {ActionType} from './action';
import offers from '../mocks/offers';
import {Cities} from '../const';

const initialState = {
  city: Cities.PARIS,
  offers,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE: {
      return {
        ...state,
        city: action.city,
      };
    }
    case ActionType.OFFERS_FILL: {
      return {
        ...state,
        offers: action.offers,
      };
    }
    default:
      return state;
  }
};


export {reducer};
