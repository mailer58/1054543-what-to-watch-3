import React from "react";
import PropTypes from "prop-types";

export const VideoPlayer = ({videoRef, src, poster}) => {
  return <video ref={videoRef} src={src} width="280" height="175" poster={poster} controls="controls"></video>;
};

VideoPlayer.propTypes = {
  videoRef: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};
