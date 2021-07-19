export const ActionType = {
  CITY_CHANGE: 'city/change',
  LOAD_OFFERS: 'data/loadOffers',
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
};
