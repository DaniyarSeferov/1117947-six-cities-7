import PropTypes from 'prop-types';
import {Cities} from '../../const';

const userProp = PropTypes.shape({
  id: PropTypes.number.isRequired,
  isPro: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
});

const locationProp = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
});

const cityNameProp = PropTypes.oneOf(Object.values(Cities));

const offerProp = PropTypes.shape({
  bedrooms: PropTypes.number,
  city: PropTypes.shape({
    location: locationProp.isRequired,
    name: cityNameProp.isRequired,
  }),
  description: PropTypes.string,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: userProp,
  id: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string),
  isFavorite: PropTypes.bool,
  isPremium: PropTypes.bool,
  location: locationProp,
  maxAdults: PropTypes.number,
  previewImage: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
});

const reviewProp = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: userProp.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
});

const roomScreenProp = PropTypes.shape({
  offer: offerProp.isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
}).isRequired;

export {roomScreenProp, offerProp, reviewProp, cityNameProp, locationProp};
