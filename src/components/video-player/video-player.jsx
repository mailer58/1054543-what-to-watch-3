import React from "react";
import PropTypes from "prop-types";
import {Screens} from "../../const";
import {connect} from "react-redux";
import {getFilm, getScreen} from "../../reducer/app-state/selectors.js";
import {Link} from "react-router-dom";

export const VideoPlayer = React.memo((props) => {
  const {
    previewRef,
    previewVideoLink,
    previewImage,
  } = props;
  //const filmLink = getRoute(AppRoute.FILM, id);
const onclick = () => {console.log('clicked')};
  return <video onClick={onclick} ref={previewRef} src={previewVideoLink} width="280" height="175" poster={previewImage} controls=""></video>;
});

VideoPlayer.displayName = `VideoPlayer`;

const mapStateToProps = (state) => {
  return {
    screen: getScreen(state),
    film: getFilm(state),
  };
};


export default connect(mapStateToProps)(VideoPlayer);


VideoPlayer.propTypes = {
  screen: PropTypes.string.isRequired,
  film: PropTypes.object.isRequired,
  previewRef: PropTypes.object.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPauseButtonClick: PropTypes.func.isRequired,
};
