import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import {cityNameProp, offerProp} from '../room-screen/room-screen.prop';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import {Cities, OfferListType} from '../../const';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';

function MainScreen(props) {
  const {offers, city, onChangeCity} = props;
  const points = offers
    .map((offer) => offer.location);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.values(Cities).map((cityItem) => (
                <li key={`locations-${cityItem}`} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${cityItem === city ? 'tabs__item--active' : ''}`}
                    href={`${cityItem !== city ? '#' : ''}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onChangeCity(cityItem);
                    }}
                  >
                    <span>{cityItem}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offers.length} ${offers.length !== 1 ? 'places' : 'place'} to stay in ${city}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <OfferList
                className="cities__places-list tabs__content"
                offers={offers}
                type={OfferListType.CITIES}
              />
            </section>
            <div className="cities__right-section">
              <Map city={offers[0].city} points={points} render={(mapRef) => (
                <section
                  style={{height: '100%'}}
                  className="cities__map map"
                  ref={mapRef}
                >
                </section>
              )}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

MainScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  onChangeCity: PropTypes.func.isRequired,
  city: cityNameProp.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers.filter((offer) => offer.city.name === state.city),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export {MainScreen};
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
