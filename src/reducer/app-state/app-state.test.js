import {reducer, ActionCreator, ActionType} from "./app-state.js";
import {Screens} from './../../const.js';

const MAX_DEFAULT_NUMBER_PREVIEWS = 8;

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    screen: Screens.MAIN,
    film: {}, // clicked film
    genresList: [],
    currentGenre: `All genres`,
    numberPreviews: MAX_DEFAULT_NUMBER_PREVIEWS
  });
});

it(`Reducer should change a genre by a given value`, () => {
  expect(reducer({
    screen: Screens.MAIN,
    film: {}, // clicked film
    genresList: [],
    currentGenre: `All genres`,
    numberPreviews: MAX_DEFAULT_NUMBER_PREVIEWS
  }, {
    type: ActionType.CHANGING_GENRE,
    payload: `Drama`,
  })).toEqual({
    screen: Screens.MAIN,
    film: {}, // clicked film
    genresList: [],
    currentGenre: `Drama`,
    numberPreviews: MAX_DEFAULT_NUMBER_PREVIEWS
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


