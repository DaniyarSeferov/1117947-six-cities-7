import React from 'react';
import PlaceCard from './place-card';
import PropTypes from 'prop-types';

function PlaceCardNeighbours(props) {
  const {className = '', ...restProps} = props;

  return (
    <PlaceCard
      className={`near-places__card ${className}`}
      imageClassName={'near-places__image-wrapper'}
      {...restProps}
    />
  );
}


PlaceCardNeighbours.propTypes = {
  className: PropTypes.string,
};

export default PlaceCardNeighbours;
