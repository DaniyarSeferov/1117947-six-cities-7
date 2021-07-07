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
  bedrooms: PropTypes.number.isRequired,
  city: PropTypes.shape({
    location: locationProp.isRequired,
    name: cityNameProp.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string),
  host: userProp.isRequired,
  id: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  isFavorite: PropTypes.bool.isRequired,
  isPremium: PropTypes.bool.isRequired,
  location: locationProp.isRequired,
  maxAdults: PropTypes.number.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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
