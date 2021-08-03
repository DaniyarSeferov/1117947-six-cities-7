import PropTypes from 'prop-types';
import {cityNameProp} from '../room-screen/room-screen.prop';
import React from 'react';

function CitiesList(props) {
  const {city, cities, onChangeCity} = props;

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((cityItem) => (
          <li key={`locations-${cityItem}`} className="locations__item">
            <button
              className={`locations__item-link tabs__item ${cityItem === city ? 'tabs__item--active' : ''}`}
              style={{border: 'none', cursor: 'pointer', background: cityItem !== city ? 'none' : ''}}
              onClick={(event) => {
                event.preventDefault();
                onChangeCity(cityItem);
              }}
            >
              <span>{cityItem}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

CitiesList.propTypes = {
  city: cityNameProp.isRequired,
  cities: PropTypes.arrayOf(cityNameProp).isRequired,
  onChangeCity: PropTypes.func.isRequired,
};

export default CitiesList;
