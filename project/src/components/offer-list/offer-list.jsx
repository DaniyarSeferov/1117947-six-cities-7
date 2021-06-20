import PlaceCard from '../place-card/place-card';
import React, {useState} from 'react';
import {offerProp} from '../room-screen/room-screen.prop';
import PropTypes from 'prop-types';

function OfferList(props) {
  const [activeOffer, setActiveOffer] = useState(null);
  const {offers} = props;

  if (activeOffer) {
    activeOffer['test'] = true;
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id.toString()}
          offer={offer}
          onHover={setActiveOffer}
        />))}
    </div>
  );
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default OfferList;
