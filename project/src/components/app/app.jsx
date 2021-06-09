import React from 'react';
import PropTypes from 'prop-types';
import MainScreen from '../main-screen/main-screen';

function App(props) {
  const {placesCount} = props;

  return (
    <MainScreen placesCount={placesCount} />
  );
}

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
};

export default App;
