import NameSpace from './../name-space.js';

const NAME_SPACE = NameSpace.APP_STATE;

export const getScreen = (state) => {
  return state[NAME_SPACE].screen;
};

export const getFilm = (state) => {
  return state[NAME_SPACE].film;
};

export const getGenres = (state) => {
  return state[NAME_SPACE].genresList;
};

export const getGenre = (state) => {
  return state[NAME_SPACE].currentGenre;
};

export const getNumberPreviews = (state) => {
  return state[NAME_SPACE].numberPreviews;
};

export const getReviewFormState = (state) => {
  return state[NAME_SPACE].reviewFormState; // blocked/unblocked
};

export const isReviewFormError = (state) => {
  return state[NAME_SPACE].reviewFormError; // true/false
};

export const getAddFilmButtonState = (state) => {
  return state[NAME_SPACE].addFilmButtonState; // blocked/unblocked
};

export const getHistory = (state) => {
  return state[NAME_SPACE].history;
};

