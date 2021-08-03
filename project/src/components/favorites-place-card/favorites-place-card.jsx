import {offerProp} from '../room-screen/room-screen.prop';
import React from 'react';
import {getAccommodationTypeTitle, getRatingPercent} from '../../utils';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {sendFavorite} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {redirectToRoute} from '../../store/action';
import {getAuthorizationStatus} from '../../store/user/selectors';

function FavoritesPlaceCard(props) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const dispatch = useDispatch();

  const setFavorite = (status) => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      dispatch(sendFavorite(id, status));
    } else {
      dispatch(redirectToRoute(AppRoute.SIGN_IN));
    }
  };

  const {offer} = props;
  const {isPremium, previewImage, price, title, isFavorite, id} = offer;
  let {rating, type} = offer;
  rating = getRatingPercent(rating);
  type = getAccommodationTypeTitle(type);

  return (
    <article className="favorites__card place-card">
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setFavorite(Number(!isFavorite));
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

FavoritesPlaceCard.propTypes = {
  offer: offerProp.isRequired,
};

export default FavoritesPlaceCard;
