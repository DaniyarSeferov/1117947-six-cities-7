import React, {useState} from 'react';
import {MAXIMUM_RATING, RatingType} from '../../const';

function CommentForm() {
  const [formRating, setFormRating] = useState([false, false, false, false, false]);
  const [formReview, setFormReview] = useState('');

  return (
    <form onSubmit={(event) => event.preventDefault()}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.values(RatingType).map((ratingItem, ratingIndex) => {
          const ratingValue = MAXIMUM_RATING - ratingIndex;
          const ratingValueIndex = ratingValue - 1;

          return (
            <React.Fragment key={`${ratingValue}-stars`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={ratingValue}
                id={`${ratingValue}-stars`}
                type="radio"
                checked={formRating[ratingValueIndex]}
                onChange={(evt) => {
                  const value = evt.target.checked;
                  setFormRating([...formRating.slice(0, ratingValueIndex).fill(false), value, ...formRating.slice(ratingValueIndex + 1).fill(false)]);
                }}
              />
              <label htmlFor={`${ratingValue}-stars`} className="reviews__rating-label form__rating-label" title={ratingItem}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formReview}
        onChange={(evt) => setFormReview(evt.target.value)}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
