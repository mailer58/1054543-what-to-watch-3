import {modifyFilmDataFromJson} from './../../utils.js';
import {ActionCreator as ActionCreatorAppState} from './../app-state/app-state.js';

export const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  RESET_COMMENTS: `RESET_COMMENTS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  CHANGE_FILM_STATUS: `CHANGE_FILM_STATUS`
};

export const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films,
    };
  },
  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },
  resetComments: () => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: [],
    };
  },
  loadPromoFilm: (promoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm,
    };
  },
  changeFilmStatus: (copyFilms, filmId) => {
    const index = copyFilms.findIndex((film) => film.id === filmId);
    copyFilms[index].isFavorite = true;
    return {
      type: ActionType.CHANGE_FILM_STATUS,
      payload: copyFilms,
    };
  },
};

export const Operation = {

  loadFilms: (api) => (dispatch) => {
    api.get(`/films`)
        .then((response) => {
          const films = response.data.map((film) => modifyFilmDataFromJson(film));
          dispatch(ActionCreator.loadFilms(films));
        });
  },

  // screen is added into user.js -> Operation -> addComment
  // for transition to movie-review page from add-review one:
  loadComments: (api, filmId, screen) => (dispatch) => {
    const url = `/comments/` + filmId;
    api.get(url)
        .then((response) => {
          dispatch(ActionCreator.loadComments(response.data));
          if (screen) {
            dispatch(ActionCreatorAppState.changeScreen(screen));
          }
        });
  },

  loadPromoFilm: (api) => (dispatch) => {
    api.get(`/films/promo`)
        .then((response) => {
          const promoFilm = modifyFilmDataFromJson(response.data);
          dispatch(ActionCreator.loadPromoFilm(promoFilm));
          dispatch(ActionCreatorAppState.changeFilm(promoFilm));
        });
  },
};

const initialState = {
  allFilms: [],
  promoFilm: {},
  comments: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOAD_FILMS:
      return Object.assign({}, state, {
        allFilms: action.payload
      });

    case ActionType.LOAD_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload
      });

    case ActionType.RESET_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload
      });

    case ActionType.LOAD_PROMO_FILM:
      return Object.assign({}, state, {
        promoFilm: action.payload
      });

    case ActionType.CHANGE_FILM_STATUS:
      return Object.assign({}, state, {
        allFilms: action.payload
      });
  }
  return state;
};

