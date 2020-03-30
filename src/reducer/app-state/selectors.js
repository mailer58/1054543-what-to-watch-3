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


