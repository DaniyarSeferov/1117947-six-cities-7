import {ActionType} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  user: {},
};

const user = (state = initialState, action) => {
  switch (action.type) {
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

export {user};
