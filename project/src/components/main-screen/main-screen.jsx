import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import {cityNameProp, offerProp} from '../room-screen/room-screen.prop';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import {Cities, OfferListType} from '../../const';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import CitiesList from '../cities-list/cities-list';
import SortingOptions from '../sorting-options/sorting-options';

function MainScreen(props) {
  const {offers, city, onChangeCity} = props;
  const points = offers
    .map((offer) => offer.location);
  const hasOffers = offers.length ? true : null;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList city={city} cities={Object.values(Cities)} onChangeCity={onChangeCity} />
        </div>
        <div className="cities">
          <div className={`cities__places-container container ${!hasOffers ? 'cities__places-container--empty' : ''}`}>
            {hasOffers &&
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${offers.length} ${offers.length !== 1 ? 'places' : 'place'} to stay in ${city}`}</b>
              <SortingOptions/>
              <OfferList
                className="cities__places-list tabs__content"
                offers={offers}
                type={OfferListType.CITIES}
              />
            </section>}
            {!hasOffers &&
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in {city}
                </p>
              </div>
            </section>}
            <div className="cities__right-section">
              {hasOffers &&
              <Map city={offers[0].city} points={points} render={(mapRef) => (
                <section
                  style={{height: '100%'}}
                  className="cities__map map"
                  ref={mapRef}
                >
                </section>
              )}
              />}
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
