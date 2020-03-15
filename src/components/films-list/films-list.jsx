import React from 'react';
import PropTypes from 'prop-types';
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';

const FilmCardWrapped = withFilmCard(FilmCard);

export const FilmsList = (({films, renderScreens}) => {
  return (
    films.map((film, index) => {
      return (<FilmCardWrapped filmData = {film}
        renderScreens = {renderScreens}
        key = {index}
      />);
    })
  );
});


FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster: PropTypes.string,
        scoring: PropTypes.number,
        description: PropTypes.string,
        ratings: PropTypes.number,
        director: PropTypes.string,
        starring: PropTypes.array,
        genre: PropTypes.string,
        year: PropTypes.number,
        cardImg: PropTypes.string,
      })
  ).isRequired,
  renderScreens: PropTypes.func
};
