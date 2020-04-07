import {Screens, ElementState} from './../../const';

const MAX_DEFAULT_NUMBER_PREVIEWS = 8;

const initialState = {
  screen: Screens.MAIN,
  film: {}, // clicked film
  genresList: [],
  currentGenre: `All genres`,
  numberPreviews: MAX_DEFAULT_NUMBER_PREVIEWS,
  reviewFormState: ElementState.UNBLOCKED,
  reviewFormError: false,
  addFilmButtonState: ElementState.UNBLOCKED,
  favoriteFilms: null,
  history: null
};

export const ActionType = {
  CHANGING_SCREEN: `CHANGING_SCREEN`,
  CHANGING_GENRE: `CHANGING_GENRE`,
  RESET_NUMBER_PREVIEWS: `RESET_NUMBER_PREVIEWS`,
  CHANGE_NUMBER_PREVIEWS: `CHANGE_NUMBER_PREVIEWS`,
  CHANGE_FILM: `CHANGE_FILM`,
  CHANGE_REVIEW_FORM: `CHANGE_REVIEW_FORM`,
  SET_REVIEW_FORM_ERROR: `SET_REVIEW_FORM_ERROR`,
  SET_ADD_FILM_BUTTON_STATE: `SET_ADD_FILM_BUTTON_STATE`,
  ADD_FAVORITE_FILM: `ADD_FAVORITE_FILM`,
  ADD_HISTORY: `ADD_HISTORY`
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
  changeReviewForm: (value) => {
    return {
      type: ActionType.CHANGE_REVIEW_FORM,
      payload: value
    };
  },
  setReviewFormError: (value) => {
    return {
      type: ActionType.SET_REVIEW_FORM_ERROR,
      payload: value
    };
  },
  setAddFilmButtonState: (value) => {
    return {
      type: ActionType.SET_ADD_FILM_BUTTON_STATE,
      payload: value
    };
  },

  addFavoriteFilm: (id, filmsSet) => {
    filmsSet.add(id);
    return {
      type: ActionType.ADD_FAVORITE_FILM,
      payload: filmsSet
    };
  },

  addHistory: (value) => {
    return {
      type: ActionType.ADD_HISTORY,
      payload: value
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

    case ActionType.CHANGE_REVIEW_FORM:
      return Object.assign({}, state, {
        reviewFormState: action.payload
      });

    case ActionType.SET_REVIEW_FORM_ERROR:
      return Object.assign({}, state, {
        reviewFormError: action.payload
      });

    case ActionType.SET_ADD_FILM_BUTTON_STATE:
      return Object.assign({}, state, {
        addFilmButtonState: action.payload
      });

    case ActionType.ADD_FAVORITE_FILM:
      return Object.assign({}, state, {
        favoriteFilms: action.payload
      });

    case ActionType.ADD_HISTORY:
      return Object.assign({}, state, {
        history: action.payload
      });
  }
  return state;
};

