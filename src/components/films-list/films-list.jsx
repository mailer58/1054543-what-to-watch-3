import React from 'react';
import PropTypes from 'prop-types';
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';
import {connect} from "react-redux";
import {filterFilmsByGenre, getSimilarFilms, getFilms, getFavoriteFilms} from '../../reducer/loading-data/selectors.js';
import {getNumberPreviews, getScreen, getGenre} from '../../reducer/app-state/selectors.js';
import {Screens} from '../../const.js';

const FilmCardWrapped = withFilmCard(FilmCard);

const FilmsList = (props) => {
  const {
    screen, // redux
    allFilms, // redux
    filmsByGenre, // redux
    similarFilms, // redux
    renderScreens,
    numberPreviews, // redux
    currentGenre, // redux
    favoriteFilms // redux
  } = props;

  let films;

  if (screen === Screens.MAIN && currentGenre === `All genres`) {
    films = allFilms.slice();
    films.length = getArrayLength(allFilms, numberPreviews);

  } else if (screen === Screens.MAIN && currentGenre !== `All genres`) {
    films = filmsByGenre.slice();
    films.length = getArrayLength(filmsByGenre, numberPreviews);

  } else if (screen === Screens.OVERVIEW || screen === Screens.DETAILS
    || screen === Screens.REVIEW) {
    films = similarFilms.slice();
    films.length = getArrayLength(similarFilms, numberPreviews);

  } else if (screen === Screens.FAVORITE_LIST) {
    films = favoriteFilms.slice();
  }

  return (
    films.map((film) => {
      return (<FilmCardWrapped filmData = {film}
        renderScreens = {renderScreens}
        key = {film.id}
      />);
    })
  );
};


const mapStateToProps = (state) => {
  return {
    screen: getScreen(state),
    allFilms: getFilms(state),
    filmsByGenre: filterFilmsByGenre(state),
    similarFilms: getSimilarFilms(state),
    numberPreviews: getNumberPreviews(state),
    currentGenre: getGenre(state),
    favoriteFilms: getFavoriteFilms(state)
  };
};

export default connect(mapStateToProps)(FilmsList);
export {FilmsList};

const getArrayLength = (arr, numberPreviews) => {
  return arr.length > numberPreviews ? numberPreviews : arr.length;
};


FilmsList.propTypes = {
  allFilms: PropTypes.arrayOf(
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
