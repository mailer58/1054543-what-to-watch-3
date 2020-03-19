import {films, getFilmsData, getRandomComments} from "./mocks/films.js";
import {Screens} from './const.js';
import {PromoFilm} from './mocks/films.js';
import {ListOfGenres} from './const.js';

export const genres = Object.values(ListOfGenres);

export const filmsData = getFilmsData(films);
export const comments = getRandomComments(filmsData);

const initialState = {
  screen: Screens.MAIN,
  allFilms: filmsData,
  filmsComments: comments,
  film: {}, // clicked film
  promoFilmTitle: PromoFilm.TITLE,
  promoFilmGenre: PromoFilm.GENRE,
  promoFilmYear: PromoFilm.YEAR,
  genresList: genres,
  currentGenre: ListOfGenres.ALL_GENRES
};

export const ActionType = {
  CHANGING_SCREEN: `CHANGING_SCREEN`,
  CHANGING_GENRE: `CHANGING_GENRE`,
};

export const ActionCreator = {
  changeScreen: (newScreen, newFilm) => {
    const obj = Object.assign({},
        {screen: newScreen},
        {film: newFilm}
    );
    return ({
      type: ActionType.CHANGING_SCREEN,
      payload: obj
    });
  },
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGING_GENRE,
      payload: genre
    };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGING_SCREEN:
      return Object.assign({}, state, {
        screen: action.payload.screen}, {
        film: action.payload.film}
      );
    case ActionType.CHANGING_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload
      });
  }
  return state;
};


