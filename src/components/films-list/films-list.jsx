import React from 'react';
import PropTypes from 'prop-types';
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';
import {connect} from "react-redux";
import {ListOfGenres} from './../../const.js';


const FilmCardWrapped = withFilmCard(FilmCard);

export const ConnectedFilmsList = (({currentGenre, films, renderScreens}) => {
  if (currentGenre === ListOfGenres.ALL_GENRES) {
    return (
      films.map((film) => {
        return (<FilmCardWrapped filmData = {film}
          renderScreens = {renderScreens}
          key = {film.id}
        />);
      })
    );
  } else {
    const filteredFilms = films.filter((film) => {
      return film.genre === currentGenre;
    });
    return (
      filteredFilms.map((film) => {
        return (<FilmCardWrapped filmData = {film}
          renderScreens = {renderScreens}
          key = {film.id}
        />);
      })
    );
  }
});

const mapStateToProps = (state) => {
  return {
    currentGenre: state.currentGenre
  };
};

const FilmsList = connect(mapStateToProps)(ConnectedFilmsList);
export default FilmsList;

ConnectedFilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        posterImage: PropTypes.string,
        rating: PropTypes.number,
        description: PropTypes.string,
        scoresCount: PropTypes.number,
        director: PropTypes.string,
        starring: PropTypes.array,
        genre: PropTypes.string,
        released: PropTypes.number,
        previewImage: PropTypes.string,
      })
  ).isRequired,
  renderScreens: PropTypes.func
};
