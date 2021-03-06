export const AppRoute = {
  FAVORITES: '/favorites',
  ROOT: '/',
  SIGN_IN: '/login',
  ROOM: '/offer/:id',
  NOT_FOUND: '/404',
};

export const Cities = {
  PARIS: 'Paris',
  COLOGNE: 'Cologne',
  BRUSSELS: 'Brussels',
  AMSTERDAM: 'Amsterdam',
  HAMBURG: 'Hamburg',
  DUSSELDORF: 'Dusseldorf',
};

export const AccommodationType = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export const MAXIMUM_RATING = 5;
export const MAXIMUM_OFFER_IMAGES = 6;
export const MAXIMUM_NEIGHBOURS = 3;
export const MAXIMUM_REVIEWS = 10;
export const COMMENT_MINIMUM_LENGTH = 50;
export const COMMENT_MAXIMUM_LENGTH = 300;

export const RatingType = {
  PERFECT: 'perfect',
  GOOD: 'good',
  NOT_BAD: 'not bad',
  BADLY: 'badly',
  TERRIBLY: 'terribly',
};

export const OfferListType = {
  CITIES: 'cities',
  NEIGHBOURS: 'neighbours',
};

export const SortingOption = {
  POPULAR: 'Popular',
  PRICE_LOW: 'Price: low to high',
  PRICE_HIGH: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const APIRoute = {
  OFFERS: '/hotels',
  COMMENTS: '/comments',
  COMMENT: '/comments/:hotelId',
  NEARBY: '/hotels/:hotelId/nearby',
  FAVORITE: '/favorite/:hotelId/:status',
  FAVORITES: '/favorite',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const ServerStatus = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
};
