import React, {PureComponent} from 'react';
import {ElementState} from './../../const.js';

const STARS_NUMBER = 5;
const DEFAULT_RATING = 3;

const withAddReviewForm = (Component) => {
  class AddReviewForm extends PureComponent {
    constructor() {
      super();

      this.state = {
        comment: ``,
        commentLength: 0,
        rating: DEFAULT_RATING
      };
      this.stars = [];

      this.onTextAreaChange = this.onTextAreaChange.bind(this);
      this.onStarClick = this.onStarClick.bind(this);
    }

    onTextAreaChange(evt) {
      this.setState({
        comment: evt.target.value,
        commentLength: evt.target.value.length
      });
    }

    onSubmit(changeForm, addComment, formState) {
      return (evt) => {
        evt.preventDefault();
        if (formState === ElementState.UNBLOCKED) {
          changeForm(); // block form after submit
          addComment();
        }
      };
    }

    onStarClick(value) {
      return () => {
        this.setState({
          rating: value
        });
      };
    }

    render() {
      // generate ratings array:
      if (!this.stars.length) {
        for (let i = 1; i <= STARS_NUMBER; i++) {
          this.stars.push(i);
        }
      }

      return <Component
        {...this.props}
        state = {this.state}
        stars = {this.stars}
        onTextAreaChange = {this.onTextAreaChange}
        onSubmit = {this.onSubmit}
        onStarClick = {this.onStarClick}
        onFormClick = {this.onFormClick}
      />;
    }
  }
  return AddReviewForm;
};

export default withAddReviewForm;
