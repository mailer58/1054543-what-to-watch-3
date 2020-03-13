import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const PLAYING_DELAY = 1000;

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super();

      this.state = {
        isPlaying: false,
      };

      this._src = props.videoSrc;
      this._poster = props.poster;

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
        this._video.load(); // with the purpose of showing of a poster
      }
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

