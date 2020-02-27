import React from 'react';
import PropTypes from "prop-types";

export const FilmCard = ({title, img, onMouseOverCard, onMouseOutCard}) => {
  return (<article onMouseOver={onMouseOverCard} onMouseOut={onMouseOutCard} className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={img} alt={title} width="280" height="175" />
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html">{title}</a>
    </h3>
  </article>
  );
};

FilmCard.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onMouseOverCard: PropTypes.func.isRequired,
  onMouseOutCard: PropTypes.func.isRequired
};
