import PlaceCard from '../place-card/place-card';
import React from 'react';
import {offerProp} from '../room-screen/room-screen.prop';
import PropTypes from 'prop-types';

function OfferList(props) {
  const {offers} = props;

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id.toString()} offer={offer}/>)}
    </div>
  );
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default OfferList;
