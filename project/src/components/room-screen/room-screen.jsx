import React, {useEffect, useState} from 'react';
import Header from '../header/header';
import {offerProp, reviewProp} from './room-screen.prop';
import PropTypes from 'prop-types';
import {getAccommodationTypeTitle, getKey, getMapPoints, getRatingPercent, isEmptyObject} from '../../utils';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import {OfferListType} from '../../const';
import OfferList from '../offer-list/offer-list';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import {fetchComments, fetchOffer} from '../../store/api-actions';

function RoomScreen(props) {
  const [activeOffer, setActiveOffer] = useState(null);
  const { id } = props.match.params;
  const {offer, getOfferData} = props;

  useEffect(() => {
    if (isEmptyObject(offer)) {
      getOfferData(id);
    }
  }, []);

  const {reviews, neighbours = []} = props;
  const {images = [], isPremium, title, isFavorite, bedrooms, maxAdults, price, goods = [], rating, host, description, city} = offer;
  let {type} = offer;
  const ratingPercent = getRatingPercent(rating);
  type = getAccommodationTypeTitle(type);
  const {avatarUrl = '', isPro = false, name = ''} = host || {};
  const points = getMapPoints(neighbours, activeOffer);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image, index) => {
                const keyValue = `${index}-${image}`;
                return (
                  <div key={keyValue} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio"/>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button button ${isFavorite && 'property__bookmark-button--active'}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${ratingPercent}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms === 1 ? '1 Bedroom' : `${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {maxAdults === 1 ? 'Max 1 adult' : `Max ${maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, index) => {
                    const keyValue = `${index}-${getKey(good)}`;
                    return (
                      <li key={keyValue} className="property__inside-item">
                        {good}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${isPro && 'property__avatar-wrapper--pro'}`}>
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              {reviews && <ReviewsList reviews={reviews}/>}
            </div>
          </div>
          {city && (
            <Map city={city} points={points} render={(mapRef) => (
              <section
                className="property__map map"
                ref={mapRef}
              >
              </section>
            )}
            />)}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              className="near-places__list"
              offers={neighbours}
              type={OfferListType.NEIGHBOURS}
              onHover={setActiveOffer}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

RoomScreen.propTypes = {
  offer: offerProp,
  reviews: PropTypes.arrayOf(reviewProp),
  neighbours: PropTypes.arrayOf(offerProp),
  getOfferData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  reviews: state.comments,
});

const mapDispatchToProps = (dispatch) => ({
  getOfferData(id) {
    dispatch(ActionCreator.startLoading());
    dispatch(fetchOffer(id));
    dispatch(fetchComments(id));
  },
});

export {RoomScreen};
export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);
