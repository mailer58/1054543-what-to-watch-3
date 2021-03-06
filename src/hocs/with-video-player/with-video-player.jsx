import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const PLAYING_DELAY = 1000;

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(filmData) {
      super();

      this.state = {
        isPlaying: false,
      };

      this._previewVideoLink = filmData.previewVideoLink;
      this._poster = filmData.previewImage;

      this._videoRef = createRef();
      this._video = null;

      this._timeout = null;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isVideoPlaying !== prevState.isPlaying) {
        return {isPlaying: nextProps.isVideoPlaying};
      } else {
        return null;
      }
    }

    componentDidUpdate() {
      if (this.state.isPlaying) {
        this._video = this._videoRef.current;
        this._timeout = setTimeout(() => {
          this._video.play();
          this._video.muted = true;
        }, PLAYING_DELAY);
      } else {
        if (this._timeout) {
          clearTimeout(this._timeout);
        }
        this._video.currentTime = 0;
        this._video.pause();
        this._video.load(); // with the purpose of showing of a posterImage
      }
    }

    render() {
      return <Component
        videoRef = {this._videoRef}
        previewVideoLink = {this._previewVideoLink}
        previewImage = {this._poster}
      />;
    }
  }

  WithVideoPlayer.propTypes = {
    previewVideoLink: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isVideoPlaying: PropTypes.bool.isRequired,
  };

  return WithVideoPlayer;
};

export default withVideoPlayer;

