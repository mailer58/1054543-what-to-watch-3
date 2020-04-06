import React from "react";
import PropTypes from "prop-types";
import {Screens} from "./../../../const.js";

export const AddReviewButton = (props) => {
  const onAddReviewButtonClick = (evt) => {
    evt.preventDefault();
    props.renderScreens(Screens.ADD_REVIEW);
  };
  return <a href="add-review.html" onClick={onAddReviewButtonClick}
    className="btn movie-card__button">Add review</a>;
};

AddReviewButton.propTypes = {
  renderScreens: PropTypes.func.isRequired,
  onAddReviewButtonClick: PropTypes.func
};

