import {offerProp} from '../room-screen/room-screen.prop';
import React from 'react';
import PropTypes from 'prop-types';
import FavoritesPlaceCard from '../favorites-place-card/favorites-place-card';

function FavoritesList(props) {
  const {offers} = props;
  const offersFilter = {};
  offers
    .forEach((offer) => {
      if (!offersFilter[offer.city.name]) {
        offersFilter[offer.city.name] = [];
      }
      offersFilter[offer.city.name].push(offer);
    });

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(offersFilter).map(([city, cityOffers]) => (
          <li key={city.toLowerCase()} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <button className="locations__item-link" style={{border: 'none'}}>
                  <span>{city}</span>
                </button>
              </div>
            </div>
            <div className="favorites__places">
              {cityOffers.map((offer) => (
                <FavoritesPlaceCard key={offer.id.toString()} offer={offer} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

FavoritesList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default FavoritesList;
