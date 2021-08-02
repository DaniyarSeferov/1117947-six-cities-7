import React, {useEffect} from 'react';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {fetchFavorite} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import SpinnerScreen from '../spinner-screen/spinner-screen';
import {startLoading} from '../../store/action';
import {getLoadedDataStatus, getStateOffers} from '../../store/application-data/selectors';

function FavoritesScreen() {
  let offers = useSelector(getStateOffers);
  const isDataLoaded = useSelector(getLoadedDataStatus);
  offers = offers.filter((offer) => offer.isFavorite);

  const dispatch = useDispatch();

  const requestOffers = () => {
    dispatch(startLoading());
    dispatch(fetchFavorite());
  };

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

export default FavoritesScreen;
