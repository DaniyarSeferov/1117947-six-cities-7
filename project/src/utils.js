import {AccommodationType, MAXIMUM_RATING} from './const';

export const getRatingPercent = (rating) => Math.round(rating) * 100 / MAXIMUM_RATING;

export const getAccommodationTypeTitle = (type) => AccommodationType[type];
