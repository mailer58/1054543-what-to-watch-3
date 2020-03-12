import React from 'react';
import PropTypes from 'prop-types';
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';

const FilmCardWrapped = withFilmCard(FilmCard);

export const FilmsList = (({films, app}) => {
  return (
    films.map((film, index) => {
      return (<FilmCardWrapped filmData = {film}
        app = {app}
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
        starring: PropTypes.string,
        genre: PropTypes.string,
        year: PropTypes.number,
        cardImg: PropTypes.string,
      })
  ).isRequired,
  app: PropTypes.object
};
