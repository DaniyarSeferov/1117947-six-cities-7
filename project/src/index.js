import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reviews from './mocks/reviews';
import {AuthorizationStatus, Cities} from './const';
import {reducer} from './store/reducer';
import {checkAuth, fetchOffers} from './store/api-actions';
import {ActionCreator} from './store/action';

const Setting = {
  DEFAULT_CITY: Cities.PARIS,
};

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        city={Setting.DEFAULT_CITY}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
