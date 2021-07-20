import React from 'react';
import {Route, Switch, Router as BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute, NEIGHBOURS_COUNT} from '../../const';
import {cityNameProp, offerProp, reviewProp} from '../room-screen/room-screen.prop';
import SpinnerScreen from '../spinner-screen/spinner-screen';
import {connect} from 'react-redux';
import {isCheckedAuth} from '../../utils';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import AnonymousRoute from '../anonymous-route/anonymous-route';

function App(props) {
  const {city, offers, reviews, isDataLoaded, authorizationStatus} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <SpinnerScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen
            city={city}
            offers={offers}
          />
        </Route>
        <AnonymousRoute
          exact
          path={AppRoute.SIGN_IN}
          render={() => (
            <SignInScreen />
          )}
        />
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => (
            <FavoritesScreen
              offers={offers.filter((offer) => offer.isFavorite)}
            />
          )}
        />
        <Route exact
          path={AppRoute.ROOM}
          render={(routeProps) => {
            const id = Number(routeProps.match.params.id);
            const currentOffer = offers.filter((offer) => offer.id === id)[0];
            const neighbours = offers.slice(0, NEIGHBOURS_COUNT);
            return (
              <RoomScreen
                offer={currentOffer}
                reviews={reviews}
                neighbours={neighbours}
              />
            );}}
        />
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  city: cityNameProp.isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isDataLoaded: state.isDataLoaded,
  offers: state.offers,
  authorizationStatus: state.authorizationStatus,
  city: state.city,
});

export {App};
export default connect(mapStateToProps, null)(App);
