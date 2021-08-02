import {createReducer} from '@reduxjs/toolkit';
import {getUserData, logoutAction, requireAuthorization} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  user: {},
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserData, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logoutAction, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = {};
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {user};
