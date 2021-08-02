import {ActionType} from '../action';

const initialState = {
  offers: [],
  offer: {},
  comments: [],
  neighbours: [],
  isDataLoaded: false,
};

const applicationData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: action.payload.offer,
        comments: action.payload.comments,
        neighbours: action.payload.neighbours,
        isDataLoaded: true,
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        isDataLoaded: false,
      };
    case ActionType.SET_FAVORITE:
      return {
        ...state,
        offer: action.payload.offer,
        offers: action.payload.offers,
        neighbours: action.payload.neighbours,
      };
    default:
      return state;
  }
};

export {applicationData};
