import {AccommodationType, MAXIMUM_RATING} from './const';

export const getRatingPercent = (rating) => Math.round(rating) * 100 / MAXIMUM_RATING;

export const getAccommodationTypeTitle = (type) => AccommodationType[type];

export const getKey = (title) => {
  title = title.toLowerCase();
  return title.replace(/\s/gm, '-');
};

export const sortPriceLow = (offerA, offerB) => offerA.price - offerB.price;

export const sortPriceHigh = (offerA, offerB) => offerB.price - offerA.price;

export const sortTopRated = (offerA, offerB) => offerB.rating - offerA.rating;
