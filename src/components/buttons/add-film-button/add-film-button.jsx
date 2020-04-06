import React from "react";
import {connect} from "react-redux";
import {Operation as UserOperation} from '../../../reducer/user/user.js';
import {getAddFilmButtonState, getFilm, getScreen} from '../../../reducer/app-state/selectors.js';
import {getAuthorizationStatus} from '../../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../../reducer/user/user.js';
import {Screens} from '../../../const.js';
import {ActionCreator} from '../../../reducer/app-state/app-state.js';
import {ElementState} from '../../../const.js';
import {getFilms} from './../../../reducer/loading-data/selectors';
import PropTypes from "prop-types";

const ADD_STATUS = 1;

export const AddFilmButton = (props) => {
  const {
    addFilmButtonState,
    film,
    addFavoriteFilm,
    api,
    authorizationStatus,
    renderScreens,
    setAddFilmButtonState,
    allFilms
  } = props;

  const parameters = [api, film.id, allFilms, ADD_STATUS];
  const addFavoriteFilmBinded = addFavoriteFilm.bind(null, parameters);

  const onAddFilmButtonClick = (evt) => {
    evt.preventDefault();
    if (addFilmButtonState === ElementState.UNBLOCKED) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        addFavoriteFilmBinded();
        setAddFilmButtonState(ElementState.BLOCKED);
      } else {
        renderScreens(Screens.SIGN_IN);
      }
    }
  };

  return (<React.Fragment>
    <button onClick={onAddFilmButtonClick} className="btn btn--list movie-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
    </button>
  </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    addFilmButtonState: getAddFilmButtonState(state),
    film: getFilm(state),
    screen: getScreen(state),
    authorizationStatus: getAuthorizationStatus(state),
    allFilms: getFilms(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  addFavoriteFilm(data) {
    dispatch(UserOperation.addFavoriteFilm(data));
  },
  setAddFilmButtonState(value) {
    dispatch(ActionCreator.setAddFilmButtonState(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFilmButton);

AddFilmButton.propTypes = {
  addFilmButtonState: PropTypes.string,
  film: PropTypes.object,
  addFavoriteFilm: PropTypes.func,
  api: PropTypes.func,
  screen: PropTypes.string,
  authorizationStatus: PropTypes.string,
  renderScreens: PropTypes.func,
  setAddFilmButtonState: PropTypes.func,
  allFilms: PropTypes.array
};


