import {Screens} from './../../const';

const MAX_DEFAULT_NUMBER_PREVIEWS = 8;

const initialState = {
  screen: Screens.MAIN,
  film: {}, // clicked film
  genresList: [],
  currentGenre: `All genres`,
  numberPreviews: MAX_DEFAULT_NUMBER_PREVIEWS
};

export const ActionType = {
  CHANGING_SCREEN: `CHANGING_SCREEN`,
  CHANGING_GENRE: `CHANGING_GENRE`,
  RESET_NUMBER_PREVIEWS: `RESET_NUMBER_PREVIEWS`,
  CHANGE_NUMBER_PREVIEWS: `CHANGE_NUMBER_PREVIEWS`,
  CHANGE_FILM: `CHANGE_FILM`
};

export const ActionCreator = {
  changeScreen: (newScreen) => {
    return {
      type: ActionType.CHANGING_SCREEN,
      payload: newScreen
    };
  },
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGING_GENRE,
      payload: genre
    };
  },
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  resetNumberPreviews: () => {
    return {
      type: ActionType.RESET_NUMBER_PREVIEWS,
      payload: MAX_DEFAULT_NUMBER_PREVIEWS
    };
  },
  changeNumberPreviews: (newNumberPreviews) => {
    return {
      type: ActionType.CHANGE_NUMBER_PREVIEWS,
      payload: newNumberPreviews
    };
  },
  changeFilm: (film) => {
    return {
      type: ActionType.CHANGE_FILM,
      payload: film
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.CHANGING_SCREEN:
      return Object.assign({}, state, {
        screen: action.payload}
      );

    case ActionType.CHANGING_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload
      });

    case ActionType.RESET_NUMBER_PREVIEWS:
      return Object.assign({}, state, {
        numberPreviews: action.payload
      });

    case ActionType.CHANGE_NUMBER_PREVIEWS:
      return Object.assign({}, state, {
        numberPreviews: action.payload
      });

    case ActionType.CHANGE_FILM:
      return Object.assign({}, state, {
        film: action.payload
      });
  }
  return state;
};

