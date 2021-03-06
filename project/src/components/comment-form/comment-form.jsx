import React, {useEffect, useState} from 'react';
import {
  COMMENT_MAXIMUM_LENGTH,
  COMMENT_MINIMUM_LENGTH,
  MAXIMUM_RATING,
  RatingType
} from '../../const';
import useForm, {getValidators} from '../../hooks/use-form/use-form';
import {useDispatch, useSelector} from 'react-redux';
import {sendComment} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {startSending} from '../../store/action';
import {getRequestError, getRequestStatus} from '../../store/application-process/selectors';

function CommentForm(props) {
  const [isFormValid, setFormValid] = useState(false);

  const validators = getValidators();
  const [controls] = useState({
    rating: [{
      validator: validators.required,
      error: 'Rating is required.',
    }],
    review: [{
      validator: validators.length(COMMENT_MINIMUM_LENGTH, COMMENT_MAXIMUM_LENGTH),
      error: `Review should be between ${COMMENT_MINIMUM_LENGTH} and ${COMMENT_MAXIMUM_LENGTH} characters long.`,
    }],
  });

  const isDataSent = useSelector(getRequestStatus);
  const sendError = useSelector(getRequestError);

  const dispatch = useDispatch();

  const onSubmit = (id, comment) => {
    dispatch(startSending());
    dispatch(sendComment(id, comment));
  };

  const {roomId} = props;
  const formRef = React.useRef(null);

  const [getValue, clear, isValid] = useForm(formRef, controls);

  useEffect(() => {
    if (!sendError && isDataSent && clear) {
      clear();
      setFormValid(false);
    }
  }, [sendError, isDataSent, clear]);

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
      {sendError && (
        <p className="request-error" style={{fontSize: '14px', color: 'red'}}>{sendError}</p>
      )}
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
                  disabled={!isDataSent}
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
          disabled={!isDataSent}
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
          disabled={!isFormValid || !isDataSent}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default CommentForm;
