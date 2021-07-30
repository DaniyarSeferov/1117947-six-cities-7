import React, {useState} from 'react';
import {
  COMMENT_MAXIMUM_LENGTH,
  COMMENT_MINIMUM_LENGTH,
  MAXIMUM_RATING,
  RatingType
} from '../../const';
import useForm, {getValidators} from '../../hooks/use-form/use-form';
import {connect} from 'react-redux';
import {sendComment} from '../../store/api-actions';
import PropTypes from 'prop-types';

function CommentForm(props) {
  const [isFormValid, setFormValid] = useState(false);
  const {onSubmit, roomId} = props;
  const formRef = React.useRef(null);
  const validators = getValidators();
  const [getValue, clear, isValid] = useForm(formRef, {
    rating: [{
      validator: validators.required,
      error: 'Rating is required.',
    }],
    review: [{
      validator: validators.length(COMMENT_MINIMUM_LENGTH, COMMENT_MAXIMUM_LENGTH),
      error: `Review should be between ${COMMENT_MINIMUM_LENGTH} and ${COMMENT_MAXIMUM_LENGTH} characters long.`,
    }],
  });

  const handleChange = (evt) => {
    setFormValid(isValid(false));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isValid()) {
      const formValues = getValue();
      const formData = {
        comment: formValues.review,
        rating: Number(formValues.rating),
      };

      onSubmit(roomId, formData);

      setFormValid(false);
      clear();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="form-control">
        <div className="reviews__rating-form form__rating">
          {Object.values(RatingType).map((ratingItem, ratingIndex) => {
            const ratingValue = MAXIMUM_RATING - ratingIndex;

            return (
              <React.Fragment key={`${ratingValue}-stars`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={ratingValue}
                  id={`${ratingValue}-stars`}
                  type="radio"
                  onChange={handleChange}
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
      </div>
      <div className="form-control">
        <textarea
          onChange={handleChange}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        />
      </div>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(id, comment) {
    dispatch(sendComment(id, comment));
  },
});

export {CommentForm};
export default connect(null, mapDispatchToProps)(CommentForm);
