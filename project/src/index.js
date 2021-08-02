import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {AppRoute, AuthorizationStatus} from './const';
import rootReducer from './store/root-reducer';
import {checkAuth} from './store/api-actions';
import {redirect} from './store/middlewares/redirect';
import {redirectToRoute, requireAuthorization} from './store/action';

const api = createAPI({
  onUnauthorized: () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
  onNotFound: () => store.dispatch(redirectToRoute(AppRoute.NOT_FOUND)),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
