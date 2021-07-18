import PlaceCard from '../place-card/place-card';
import React from 'react';
import {offerProp} from '../room-screen/room-screen.prop';
import PropTypes from 'prop-types';
import {OfferListType} from '../../const';
import PlaceCardCities from '../place-card/place-card-cities';
import PlaceCardNeighbours from '../place-card/place-card-neighbours';

function OfferList(props) {
  const {offers, onHover, className = '', type = ''} = props;

  const getComponentByType = (placeCardType, offer) => {
    switch (placeCardType) {
      case OfferListType.CITIES:
        return <PlaceCardCities key={offer.id.toString()} offer={offer} onHover={onHover} />;
      case OfferListType.NEIGHBOURS:
        return <PlaceCardNeighbours key={offer.id.toString()} offer={offer} onHover={onHover} />;
      default:
        return <PlaceCard key={offer.id.toString()} offer={offer} onHover={onHover} />;
    }
  };

  return (
    <div className={`places__list ${className}`}>
      {offers.map((offer) => getComponentByType(type, offer))}
    </div>
  );
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onHover: PropTypes.func.isRequired,
};

export default OfferList;
