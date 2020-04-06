import React from 'react';
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import {ElementState} from './../../const.js';
import {getReviewFormState, isReviewFormError, getFilm} from '../../reducer/app-state/selectors.js';
import {Operation as UserOperation} from './../../reducer/user/user.js';
import PropTypes from "prop-types";

const MIN_SYMBOLS_NUMBER = 50;
const MAX_SYMBOLS_NUMBER = 400;

const AddReviewForm = React.memo((props) => {
  const {
    state,
    stars,
    onTextAreaChange,
    reviewFormState,
    changeReviewForm,
    onSubmit,
    onStarClick,
    addComment,
    api,
    film,
    reviewFormError,
    setReviewFormError,
  } = props;

  const blockForm = changeReviewForm.bind(null, ElementState.BLOCKED);

  const data = [
    api,
    {
      rating: state.rating,
      comment: state.comment
    },
    film.id
  ];

  const addCommentBinded = addComment.bind(null, data);

  const clearError = setReviewFormError.bind(null, false);
  const onFormSubmit = onSubmit(blockForm, addCommentBinded, reviewFormState);
  const isPostButtonEnabled = (state.commentLength >= MIN_SYMBOLS_NUMBER)
    && (state.commentLength <= MAX_SYMBOLS_NUMBER);

  const className = reviewFormError ? `add-review__form warning-border` : `add-review__form`;

  return (<form action="#" onClick={clearError} onSubmit={onFormSubmit} className={className}>
    <div className="rating">
      <div className="rating__stars">
        {stars.map((star, index, arr) => {
          let isChecked = arr[index] === state.rating ? true : false;
          let starValue = `star-` + arr[index];
          const onStarClickReturned = onStarClick(arr[index]);
          return <React.Fragment key={arr[index]}>
            <input onClick={onStarClickReturned} className="rating__input" id={starValue} type="radio" name="rating" value={arr[index]} defaultChecked={isChecked}/>
            <label className="rating__label" htmlFor={starValue}>Rating {index}</label>
          </React.Fragment>;
        })
        }
      </div>
    </div>

    <div className="add-review__text">
      <textarea className="add-review__textarea" name="review-text"
        id="review-text" placeholder="Review text"
        onChange={onTextAreaChange} value={state.comment}></textarea>
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit" disabled={!isPostButtonEnabled}>Post</button>
      </div>

    </div>
  </form>);
});

AddReviewForm.displayName = `AddReviewForm`;

const mapStateToProps = (state) => {
  return {
    reviewFormState: getReviewFormState(state),
    film: getFilm(state),
    reviewFormError: isReviewFormError(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeReviewForm(value) {
    dispatch(ActionCreator.changeReviewForm(value));
  },
  addComment(data) {
    dispatch(UserOperation.addComment(data));
  },
  setReviewFormError(value) {
    dispatch(ActionCreator.setReviewFormError(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm);

AddReviewForm.propTypes = {
  state: PropTypes.shape({
    comment: PropTypes.string,
    commentLength: PropTypes.number,
    rating: PropTypes.number
  }).isRequired,
  stars: PropTypes.arrayOf(
      PropTypes.number.isRequired
  ).isRequired,
  onTextAreaChange: PropTypes.func.isRequired,
  reviewFormState: PropTypes.string.isRequired,
  changeReviewForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequire,
  api: PropTypes.func.isRequire,
  film: PropTypes.object.isRequire,
  reviewFormError: PropTypes.boolean,
  setReviewFormError: PropTypes.func.isRequire,
  onFormClick: PropTypes.func.isRequire
};
