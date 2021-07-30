export const ActionType = {
  CITY_CHANGE: 'city/change',
  LOAD_OFFERS: 'data/loadOffers',
  LOAD_SINGLE_OFFER: 'data/loadSingleOffer',
  LOAD_OFFER: 'data/loadOffer',
  LOAD_COMMENTS: 'data/loadComments',
  START_LOADING: 'data/startLoading',
  START_SENDING: 'data/startSending',
  FINISH_SENDING: 'data/finishSending',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  GET_USER_DATA: 'user/data',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'page/redirectToRoute',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CITY_CHANGE,
    city,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadSingleOffer: (offer) => ({
    type: ActionType.LOAD_SINGLE_OFFER,
    payload: offer,
  }),
  loadOffer: (offerData) => ({
    type: ActionType.LOAD_OFFER,
    payload: offerData,
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),
  startLoading: () => ({
    type: ActionType.START_LOADING,
  }),
  startSending: () => ({
    type: ActionType.START_SENDING,
  }),
  finishSending: (error) => ({
    type: ActionType.FINISH_SENDING,
    payload: error,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  getUserData: (user) => ({
    type: ActionType.GET_USER_DATA,
    payload: user,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};

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
