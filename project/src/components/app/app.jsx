import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute, NEIGHBOURS_COUNT} from '../../const';
import {cityNameProp, offerProp, reviewProp} from '../room-screen/room-screen.prop';

function App(props) {
  const {city, offers, reviews} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen
            city={city}
            offers={offers}
          />
        </Route>
        <Route exact path={AppRoute.SIGN_IN}>
          <SignInScreen />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <FavoritesScreen
            offers={offers}
          />
        </Route>
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
};

export default App;
