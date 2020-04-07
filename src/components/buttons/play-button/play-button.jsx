import React from "react";
import {AppRoute} from '../../../const.js';
import {getRoute} from './../../../utils.js';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export const PlayButton = ({filmId}) =>{
  const link = getRoute(AppRoute.PLAYER, filmId);

  return <React.Fragment>
    <Link to={link} className="btn btn--play movie-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
  </React.Fragment>;
};

PlayButton.propTypes = {
  renderScreens: PropTypes.func.isRequired,
};

