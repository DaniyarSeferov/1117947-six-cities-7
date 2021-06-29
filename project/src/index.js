import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers';
import reviews from './mocks/reviews';
import {Cities} from './const';

const Setting = {
  DEFAULT_CITY: Cities.PARIS,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      city={Setting.DEFAULT_CITY}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
