import {reducer, filmsData, comments, ActionCreator, ActionType} from "./reducer.js";
import {Screens} from './const.js';
import {ListOfGenres} from './const.js';

export const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const genres = Object.values(ListOfGenres);

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    screen: Screens.MAIN,
    allFilms: filmsData,
    filmsComments: comments,
    film: {},
    promoFilmTitle: PromoFilm.TITLE,
    promoFilmGenre: PromoFilm.GENRE,
    promoFilmYear: PromoFilm.YEAR,
    genresList: genres,
    currentGenre: ListOfGenres.ALL_GENRES
  });
});

it(`Reducer should change a genre by a given value`, () => {
  expect(reducer({
    screen: Screens.MAIN,
    allFilms: filmsData,
    filmsComments: comments,
    film: {},
    promoFilmTitle: PromoFilm.TITLE,
    promoFilmGenre: PromoFilm.GENRE,
    promoFilmYear: PromoFilm.YEAR,
    genresList: genres,
    currentGenre: ListOfGenres.ALL_GENRES,
  }, {
    type: ActionType.CHANGING_GENRE,
    payload: ListOfGenres.COMEDIES,
  })).toEqual({
    screen: Screens.MAIN,
    allFilms: filmsData,
    filmsComments: comments,
    film: {},
    promoFilmTitle: PromoFilm.TITLE,
    promoFilmGenre: PromoFilm.GENRE,
    promoFilmYear: PromoFilm.YEAR,
    genresList: genres,
    currentGenre: ListOfGenres.COMEDIES,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing screen returns new values for screen and film`, () => {
    expect(ActionCreator.changeScreen(Screens.OVERVIEW, `Aviator`))
  .toEqual(
      {
        type: ActionType.CHANGING_SCREEN,
        payload: {
          screen: Screens.OVERVIEW,
          film: `Aviator`}
      });
  });
});


