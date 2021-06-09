import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting = {
  PLACES_COUNT: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App placesCount={Setting.PLACES_COUNT} />
  </React.StrictMode>,
  document.getElementById('root'),
);
