import {createReducer} from '@reduxjs/toolkit';
import {loadComments, loadOffer, loadOffers, setFavorite, startLoading} from '../action';

const initialState = {
  offers: [],
  offer: {},
  comments: [],
  neighbours: [],
  isDataLoaded: false,
};

const applicationData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload.offer;
      state.comments = action.payload.comments;
      state.neighbours = action.payload.neighbours;
      state.isDataLoaded = true;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(startLoading, (state, action) => {
      state.isDataLoaded = false;
    })
    .addCase(setFavorite, (state, action) => {
      state.offer = action.payload.offer;
      state.offers = action.payload.offers;
      state.neighbours = action.payload.neighbours;
    });
});

export {applicationData};
