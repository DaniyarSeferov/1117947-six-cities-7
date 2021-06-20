import React from 'react';
import Header from '../header/header';
import PropTypes from 'prop-types';
import {offerProp} from '../room-screen/room-screen.prop';
import FavoritesList from '../favorites-list/favorites-list';

function FavoritesScreen(props) {
  const offers = props.offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoritesList offers={offers} />
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default FavoritesScreen;
