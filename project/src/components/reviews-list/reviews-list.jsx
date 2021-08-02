import {reviewProp} from '../room-screen/room-screen.prop';
import CommentForm from '../comment-form/comment-form';
import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import {connect} from 'react-redux';
import {AuthorizationStatus, MAXIMUM_REVIEWS} from '../../const';
import {sortReviews} from '../../utils';
import {getAuthorizationStatus} from '../../store/user/selectors';

function ReviewsList(props) {
  const {reviews, authorizationStatus, roomId} = props;
  const sortedReviews = reviews.slice().sort(sortReviews).slice(0, MAXIMUM_REVIEWS);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <li key={review.id} className="reviews__item">
            <Review review={review} />
          </li>
        ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.AUTH && <CommentForm roomId={roomId}/>}
    </section>
  );
}


ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {ReviewsList};
export default connect(mapStateToProps, null)(ReviewsList);
