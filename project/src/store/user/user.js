import {ActionType} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  user: {},
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    default:
      return state;
  }
};

export {user};
