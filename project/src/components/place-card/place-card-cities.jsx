import React from 'react';
import PlaceCard from './place-card';
import PropTypes from 'prop-types';

function PlaceCardCities(props) {
  const {className = '', ...restProps} = props;

  return (
    <PlaceCard
      className={`cities__place-card ${className}`}
      imageClassName={'cities__image-wrapper'}
      {...restProps}
    />
  );
}


PlaceCardCities.propTypes = {
  className: PropTypes.string,
};

export default PlaceCardCities;
