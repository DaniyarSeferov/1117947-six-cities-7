import {reviewProp} from '../room-screen/room-screen.prop';
import CommentForm from '../comment-form/comment-form';
import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';

function ReviewsList(props) {
  const {reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <li key={review.id} className="reviews__item">
            <Review review={review} />
          </li>
        ))}
      </ul>
      <CommentForm />
    </section>
  );
}


ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

export default ReviewsList;
