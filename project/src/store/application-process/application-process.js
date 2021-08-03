import {
  changeCity, deleteSendingError,
  finishSending,
  startSending
} from '../action';
import {Cities} from '../../const';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  city: Cities.PARIS,
  isDataSent: true,
  sendError: '',
};

const applicationProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(startSending, (state) => {
      state.isDataSent = false;
      state.sendError = '';
    })
    .addCase(finishSending, (state, action) => {
      state.isDataSent = true;
      state.sendError = action.payload;
    })
    .addCase(deleteSendingError, (state, action) => {
      state.sendError = '';
    });
});

export {applicationProcess};
