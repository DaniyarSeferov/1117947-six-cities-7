import React from 'react';
import {offerProp} from '../room-screen/room-screen.prop';
import PropTypes from 'prop-types';
import {getAccommodationTypeTitle, getRatingPercent} from '../../utils';
import {Link} from 'react-router-dom';

function PlaceCard(props) {
  const {offer, onHover, className = '', imageClassName = ''} = props;
  const {isPremium, previewImage, price, isFavorite, title} = offer;
  let {rating, type} = offer;
  rating = getRatingPercent(rating);
  type = getAccommodationTypeTitle(type);

  return (
    <article className={`place-card ${className}`} onMouseOver={() => {onHover(offer);}}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}

      <div className={`place-card__image-wrapper ${imageClassName}`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  offer: offerProp.isRequired,
  onHover: PropTypes.func.isRequired,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
};

export default PlaceCard;
