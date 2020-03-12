import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const PLAYING_DELAY = 1000;

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor({videoSrc, poster, isVideoPlaying}) {
      super();

      this.state = {
        isPlaying: isVideoPlaying,
      };

      this._src = videoSrc;
      this._poster = poster;
      this._video = null;

      this._videoRef = createRef();

      this._interval = null;
    }

    componentDidMount() {
      this._video = this._videoRef.current;

      if (this.state.isPlaying) {
        this._interval = setTimeout(() => {
          this._video.play();
          this._video.muted = true;
        }, PLAYING_DELAY);
      }
    }

    componentWillUnmount() {
      clearTimeout(this._interval);
      this._video = null;
    }

    render() {
      return <Component
        videoRef = {this._videoRef}
        src = {this._src}
        poster = {this._poster}
      />;
    }
  }

  WithVideoPlayer.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    isVideoPlaying: PropTypes.bool.isRequired,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;

