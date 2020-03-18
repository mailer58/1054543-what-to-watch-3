import React from 'react';
import PropTypes from "prop-types";

export const ReviewsColumn = ({halfReviews}) => {
  return (
    <div className="movie-card__reviews-col">
      {halfReviews.map((review, index) => {
        return (
          <div key={index} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.review}</p>

              <footer className="review__details">
                <cite className="review__author">{review.author}</cite>
                <time className="review__date" dateTime="2016-12-20">{review.date}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.scoring}</div>
          </div>);
      })
      }
    </div>
  );
};

ReviewsColumn.propTypes = {
  halfReviews: PropTypes.array.isRequired,
};
