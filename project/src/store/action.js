import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CITY_CHANGE: 'city/change',
  LOAD_OFFERS: 'data/loadOffers',
  SET_FAVORITE: 'data/setFavorite',
  LOAD_OFFER: 'data/loadOffer',
  LOAD_COMMENTS: 'data/loadComments',
  START_LOADING: 'data/startLoading',
  START_SENDING: 'data/startSending',
  FINISH_SENDING: 'data/finishSending',
  DELETE_SENDING_ERROR: 'data/deleteSendingError',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  GET_USER_DATA: 'user/data',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'page/redirectToRoute',
  SET_SERVER_STATUS: 'server/status',
};

export const changeCity = createAction(ActionType.CITY_CHANGE, (city) => ({
  payload: city,
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const loadOffer = createAction(ActionType.LOAD_OFFER, (offerData) => ({
  payload: offerData,
}));

export const setFavorite = createAction(ActionType.SET_FAVORITE, (data) => ({
  payload: data,
}));

export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => ({
  payload: comments,
}));

export const startLoading = createAction(ActionType.START_LOADING);

export const startSending = createAction(ActionType.START_SENDING);

export const finishSending = createAction(ActionType.FINISH_SENDING, (error) => ({
  payload: error,
}));

export const deleteSendingError = createAction(ActionType.DELETE_SENDING_ERROR);

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const getUserData = createAction(ActionType.GET_USER_DATA, (user) => ({
  payload: user,
}));

export const logoutAction = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => ({
  payload: url,
}));

export const setServerStatus = createAction(ActionType.SET_SERVER_STATUS, (data) => ({
  payload: data,
}));

export const adaptToClient = (offer) => {
  const adaptedOffer = Object.assign(
    {},
    offer,
    {
      host: Object.assign(
        {},
        offer.host,
        {
          avatarUrl: offer.host.avatar_url,
          isPro: offer.host.is_pro,
        },
      ),
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      maxAdults: offer.max_adults,
      previewImage: offer.preview_image,
    },
  );

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptUserDataToClient = (user) => {
  const adaptedUserData = Object.assign(
    {},
    user,
    {
      avatarUrl: user.avatar_url,
      isPro: user.is_pro,
    },
  );

  delete adaptedUserData.avatar_url;
  delete adaptedUserData.is_pro;

  return adaptedUserData;
};

export const adaptCommentToClient = (comment) => {
  const adaptedCommentData = Object.assign(
    {},
    comment,
    {
      user: Object.assign(
        {},
        comment.user,
        {
          avatarUrl: comment.user.avatar_url,
          isPro: comment.user.is_pro,
        },
      ),
    },
  );

  delete adaptedCommentData.user.avatar_url;
  delete adaptedCommentData.user.is_pro;

  return adaptedCommentData;
};
