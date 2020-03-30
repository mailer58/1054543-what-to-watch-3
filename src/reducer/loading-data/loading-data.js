import {modifyFilmDataFromJson} from './../../utils.js';

export const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  RESET_COMMENTS: `RESET_COMMENTS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
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
};

export const Operation = {

  loadFilms: (api) => (dispatch) => {
    api.get(`/films`)
        .then((response) => {
          const films = response.data.map((film) => modifyFilmDataFromJson(film));
          dispatch(ActionCreator.loadFilms(films));
        });
  },

  loadComments: (api, filmId) => (dispatch) => {
    const string = `/comments/` + filmId;
    api.get(string)
        .then((response) => {
          dispatch(ActionCreator.loadComments(response.data));
        });
  },

  loadPromoFilm: (api) => (dispatch) => {
    api.get(`/films/promo`)
        .then((response) => {
          const promoFilm = modifyFilmDataFromJson(response.data);
          dispatch(ActionCreator.loadPromoFilm(promoFilm));
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
  }
  return state;
};

