import React from "react";
import PropTypes from "prop-types";

export const VideoPlayer = ({videoRef, previewVideoLink, previewImage}) => {
  return <video ref={videoRef} src={previewVideoLink} width="280" height="175" poster={previewImage}></video>;
};

VideoPlayer.propTypes = {
  videoRef: PropTypes.object.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired
};
