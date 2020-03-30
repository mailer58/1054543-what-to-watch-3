import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

export const ReviewsColumn = ({halfReviews}) => {
  return (
    <div className="movie-card__reviews-col">
      {halfReviews.map((review) => {
        let date = moment(review.date);
        const dateTime = date.format(`YYYY-MM-DD`);
        date = date.format(`MMM DD, YYYY`);

        return (
          <div key={review.id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={dateTime}>{date}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>);
      })
      }
    </div>
  );
};

ReviewsColumn.propTypes = {
  halfReviews: PropTypes.array.isRequired,
};
