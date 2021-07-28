import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createAPI} from './services/api';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reviews from './mocks/reviews';
import {AuthorizationStatus} from './const';
import {reducer} from './store/reducer';
import {checkAuth, fetchOffers} from './store/api-actions';
import {ActionCreator} from './store/action';
import {redirect} from './store/middlewares/redirect';

const api = createAPI({
  onUnauthorized: () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
  onNotFound: () => store.dispatch(ActionCreator.redirectToRoute('/404')),
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
