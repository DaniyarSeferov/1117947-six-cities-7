import React, {useEffect} from 'react';
import Header from '../header/header';
import PropTypes from 'prop-types';
import {offerProp} from '../room-screen/room-screen.prop';
import FavoritesList from '../favorites-list/favorites-list';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {ActionCreator} from '../../store/action';
import {fetchFavorite} from '../../store/api-actions';
import {connect} from 'react-redux';
import SpinnerScreen from '../spinner-screen/spinner-screen';

function FavoritesScreen(props) {
  const {isDataLoaded, requestOffers} = props;
  let {offers} = props;
  offers = offers.filter((offer) => offer.isFavorite);

  useEffect(() => {
    requestOffers();
  }, []);

  if (!isDataLoaded) {
    return (
      <SpinnerScreen />
    );
  }

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {offers.length ? <FavoritesList offers={offers} /> : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  requestOffers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  requestOffers() {
    dispatch(ActionCreator.startLoading());
    dispatch(fetchFavorite());
  },
});

export {FavoritesScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
