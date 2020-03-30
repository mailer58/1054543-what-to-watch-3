import NameSpace from './../name-space.js';
import {getGenre, getFilm} from './../app-state/selectors.js';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.LOADING_DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].allFilms;
};

export const filterFilmsByGenre = createSelector(
    getFilms, getGenre,
    (films, genre) => {
      return films.filter((film) => film.genre === genre);
    });

export const getSimilarFilms = createSelector(
    filterFilmsByGenre, getFilm,
    (films, currentFilm) => {
      return films.filter((film)=> film.id !== currentFilm.id); // exclude current film
    });

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

