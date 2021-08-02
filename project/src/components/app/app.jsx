import React from 'react';
import {Route, Switch, Router as BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';
import SignInScreen from '../sign-in-screen/sign-in-screen';
import FavoritesScreen from '../favorites-screen/favorites-screen';
import RoomScreen from '../room-screen/room-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import {AppRoute} from '../../const';
import SpinnerScreen from '../spinner-screen/spinner-screen';
import {connect} from 'react-redux';
import {isCheckedAuth} from '../../utils';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import AnonymousRoute from '../anonymous-route/anonymous-route';
import {getAuthorizationStatus} from '../../store/user/selectors';

function App(props) {
  const {authorizationStatus} = props;

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <SpinnerScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen />
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
            <FavoritesScreen />
          )}
        />
        <Route exact
          path={AppRoute.ROOM}
          render={(routeProps) => <RoomScreen {...routeProps}/>}
        />
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps, null)(App);
