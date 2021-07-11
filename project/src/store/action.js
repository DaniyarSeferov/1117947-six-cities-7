export const ActionType = {
  CITY_CHANGE: 'city/change',
  OFFERS_FILL: 'city/offersFill',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CITY_CHANGE,
    city,
  }),
  setOffers: (offers) => ({
    type: ActionType.OFFERS_FILL,
    offers,
  }),
};
