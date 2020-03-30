import React from 'react';
import {connect} from "react-redux";
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {filterFilmsByGenre, getFilms} from './../../reducer/loading-data/selectors.js';
import {getNumberPreviews, getGenre} from '../../reducer/app-state/selectors.js';
import PropTypes from "prop-types";

const FILMS_INCREMENT = 8;

export const CatalogButton = React.memo((props) => {
  const {
    numberPreviews,
    allFilms,
    filmsByGenre,
    incrementPreviews,
    currentGenre
  } = props;

  const films = currentGenre === `All genres` ? allFilms : filmsByGenre;
  const filmsNumber = films.length; // number of all or filtered films
  if (numberPreviews < filmsNumber) {

    const changeNumberPreviews = incrementPreviews.bind(null, numberPreviews, films);

    return (
      <div className="catalog__more">
        <button onClick={changeNumberPreviews} className="catalog__button" type="button">Show more</button>
      </div>);
  }
  return null;
});

CatalogButton.displayName = `CatalogButton`;

const mapStateToProps = (state) => {
  return {
    allFilms: getFilms(state),
    filmsByGenre: filterFilmsByGenre(state),
    numberPreviews: getNumberPreviews(state),
    currentGenre: getGenre(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  incrementPreviews(currentNumberPreviews, films) {
    const sum = currentNumberPreviews + FILMS_INCREMENT;

    const newNumberPreviews = (sum <= films.length) ? sum : films.length;

    dispatch(ActionCreator.changeNumberPreviews(newNumberPreviews));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogButton);

CatalogButton.propTypes = {
  numberPreviews: PropTypes.number.isRequired,
  allFilms: PropTypes.array.isRequired,
  filmsByGenre: PropTypes.array.isRequired,
  incrementPreviews: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
};
