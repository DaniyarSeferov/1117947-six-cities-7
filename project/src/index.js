import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reviews from './mocks/reviews';
import {Cities} from './const';
import {reducer} from './store/reducer';
import {fetchOffers} from './store/api-actions';

const Setting = {
  DEFAULT_CITY: Cities.PARIS,
};

const api = createAPI(
  () => {},
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

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
