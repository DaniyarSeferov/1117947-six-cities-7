import {reviewProp} from '../room-screen/room-screen.prop';
import {getRatingPercent} from '../../utils';
import dayjs from 'dayjs';
import React from 'react';

function Review(props) {
  const {review} = props;
  const reviewRatingPercent = getRatingPercent(review.rating);
  const reviewDate = dayjs(review.date);

  return (
    <React.Fragment>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${reviewRatingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={reviewDate.format('YYYY-MM-DD')}>
          {reviewDate.format('MMMM YYYY')}
        </time>
      </div>
    </React.Fragment>
  );
}


Review.propTypes = {
  review: reviewProp.isRequired,
};

export default Review;
