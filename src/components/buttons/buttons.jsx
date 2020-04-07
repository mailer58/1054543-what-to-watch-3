import React from "react";
import {PlayButton} from './play-button/play-button.jsx';
import AddFilmButton from './add-film-button/add-film-button.jsx';
import {AddReviewButton} from './add-review-button/add-review-button.jsx';
import {Screens} from './../../const.js';
import PropTypes from "prop-types";

export const Buttons = ({screen, renderScreens, api, filmId}) => {
  return (<div className="movie-card__buttons">
    <PlayButton
      renderScreens = {renderScreens}
      filmId = {filmId}/>
    <AddFilmButton
      renderScreens = {renderScreens}
      api = {api}/>
    {screen === Screens.MAIN ? null :
      <AddReviewButton
        renderScreens = {renderScreens}/>}
  </div>
  );
};

Buttons.propTypes = {
  api: PropTypes.func,
  renderScreens: PropTypes.func,
  screen: PropTypes.string
};
