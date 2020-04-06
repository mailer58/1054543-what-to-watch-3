import {Screens} from '../../const.js';
import {ActionCreator as ActionCreatorAppState} from './../app-state/app-state.js';
import {Operation as LoadingOperation} from './../loading-data/loading-data.js';
import {ElementState} from '../../const.js';
import {ActionCreator as ActionCreatorLoadingData} from '../loading-data/loading-data.js';

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const SubmitState = {
  ERROR: `ERROR`,
  RESET: `RESET`
};

const favoriteSet = new Set();

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_SUBMIT_STATE: `SET_SUBMIT_STATE`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  submitState: SubmitState.RESET
};

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  setSubmitState: (value) => {
    return {
      type: ActionType.SET_SUBMIT_STATE,
      payload: value,
    };
  },
};

export const Operation = {
  checkAuth: (api) => (dispatch) => {
    api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (arr) => (dispatch) => {
    const [api, authData] = arr;
    api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err)=>{
        dispatch(ActionCreator.setSubmitState(SubmitState.ERROR));
        throw err;
      });
  },

  addComment: (arr) => (dispatch) => {
    const [api, comment, filmId] = arr;
    const url = `/comments/` + filmId;
    api.post(url, {
      "rating": comment.rating,
      "comment": comment.comment,
    })
      .then(() => {
        dispatch(LoadingOperation.loadComments(api, filmId, Screens.REVIEW));
        dispatch(ActionCreatorAppState.changeReviewForm(ElementState.UNBLOCKED));
      })
      .catch((err) => {
        dispatch(ActionCreatorAppState.setReviewFormError(true));
        dispatch(ActionCreatorAppState.changeReviewForm(ElementState.UNBLOCKED));
        throw err;
      });
  },

  addFavoriteFilm: (arr) => (dispatch) => {
    const [api, filmId, allFilms, status] = arr;
    const url = `/favorite/` + filmId + `/` + status;
    api.post(url)
    .then(() => {
      dispatch(ActionCreatorAppState.setAddFilmButtonState(ElementState.UNBLOCKED));
      dispatch(ActionCreatorAppState.addFavoriteFilm(filmId, favoriteSet));
      const copyFilms = allFilms.slice();
      // add favorite film by copying the array:
      dispatch(ActionCreatorLoadingData.changeFilmStatus(copyFilms, filmId));
    })
    .catch((err) => {
      dispatch(ActionCreatorAppState.setAddFilmButtonState(ElementState.UNBLOCKED));
      throw err;
    });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_SUBMIT_STATE:
      return Object.assign({}, state, {
        submitState: action.payload,
      });
  }

  return state;
};

