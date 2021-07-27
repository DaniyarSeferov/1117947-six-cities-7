import {AccommodationType, AuthorizationStatus, MAXIMUM_RATING} from './const';

export const getRatingPercent = (rating) => Math.round(rating) * 100 / MAXIMUM_RATING;

export const getAccommodationTypeTitle = (type) => AccommodationType[type];

export const getKey = (title) => {
  title = title.toLowerCase();
  return title.replace(/\s/gm, '-');
};

export const sortPriceLow = (offerA, offerB) => offerA.price - offerB.price;

export const sortPriceHigh = (offerA, offerB) => offerB.price - offerA.price;

export const sortTopRated = (offerA, offerB) => offerB.rating - offerA.rating;

export const getMapPoints = (offers, activeOffer) => offers
  .map((offer) => {
    if (activeOffer && offer.id === activeOffer.id) {
      return Object.assign(
        {},
        offer.location,
        {
          isActive: true,
        },
      );
    }
    return offer.location;
  });

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

export const isEmptyObject = (currentObject) =>
  Object.keys(currentObject).length === 0;
