import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import {Screens} from '../../const.js';

const withLargePlayer = (Component) => {
  class WithLargePlayer extends PureComponent {
    constructor() {
      super();

      this.state = {
        isPlaying: true,
        duration: null,
        currentTime: null
      };

      this.previewRef = createRef();
      this._videoRef = createRef();
      this.toggler = createRef();
      this.timeLine = createRef();
      this.fullScreenBtn = createRef();

      this._video = null;
      this._timeout = null;
      this.startCoord = null;
      this.elapsedTimePercents = 0;
      this.timeLineValue = 0;

      this._isPausedByRewinding = false;

      this.onPlayButtonClick = this.onPlayButtonClick.bind(this);
      this.onPauseButtonClick = this.onPauseButtonClick.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
      this.onTimeUpdate = this.onTimeUpdate.bind(this);
      this.onFullScreenBtnClick = this.onFullScreenBtnClick.bind(this);
      this.onExitButtonClick = this.onExitButtonClick.bind(this);
    }

    onPlayButtonClick() {
      if (this._videoRef.current) {
        this.setState({isPlaying: true});
        this._videoRef.current.play();
      }
    }

    onPauseButtonClick() {
      if (this._videoRef.current) {
        this.setState({isPlaying: false});
        this._videoRef.current.pause();
      }
    }

    onMouseDown(evt) {
      evt.preventDefault();

      const video = this._videoRef.current;
      if (this.state.isPlaying) {
        video.pause();
        this._isPausedByRewinding = true;
      }

      let startCoord = evt.clientX;
      const toggler = this.toggler.current;
      const timeLine = this.timeLine.current;

      if (!this.timeLineWidth) {
        this.timeLineWidth = timeLine.offsetWidth;
      }

      const onMouseMove = (moveEvt) => {
        if (this.state.duration) {
          moveEvt.preventDefault();

          const shift = startCoord - moveEvt.clientX;

          startCoord = moveEvt.clientX;

          // set boundaries for moving of the toggler:
          if (toggler.offsetLeft - shift >= 0
            && toggler.offsetLeft - shift <= this.timeLineWidth) {

            // set position of the toggler:
            const togglerPosition = toggler.offsetLeft - shift;
            toggler.style.left = (togglerPosition) + `px`;

            const percents = togglerPosition * 100 / this.timeLineWidth;
            this.elapsedTimePercents = percents;

            // change timeline:
            timeLine.value = percents;

            // get current time (s):
            const currentTime = this.state.duration * percents / 100;

            // set current time for video:
            video.currentTime = currentTime;
            let time = moment(currentTime, `s`).format(`H:mm:ss`);

            // redraw current time:
            this.setState({currentTime: time});
            console.log(time);


            // play video that was paused by moving of the toggler:
            if (this._isPausedByRewinding) {
              video.play();
              this._isPausedByRewinding = false;
            }
          }
        }
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        window.removeEventListener(`mousemove`, onMouseMove);
        window.removeEventListener(`mouseup`, onMouseUp);
      };

      window.addEventListener(`mousemove`, onMouseMove);
      window.addEventListener(`mouseup`, onMouseUp);
    }

    onLoadedMetaData(evt) {
      if (!this.state.duration) {
        this.setState({duration: evt.target.duration});
      }
    }

    onTimeUpdate(evt) {
      let time = moment(evt.target.currentTime, `ss`);
      time = time.format(`H:mm:ss`);

      const elapsedTimePercents = evt.target.currentTime * 100 / this.state.duration;
      this.elapsedTimePercents = elapsedTimePercents;
      this.setState({currentTime: time});

    }

    onFullScreenBtnClick() {
      const video = this._videoRef.current;
      if (video.fullscreenElement) {
        video.exitFullscreen()
          .then(() => {})
          .catch((err) => err);
      } else if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }

    onExitButtonClick(video) {
      if (this.state.isPlaying && video) {
        this.setState({isPlaying: false});
        video.pause();
        video.currentTime = 0;
      } else if (video) {
        video.currentTime = 0;
      }
      this.props.renderScreens(Screens.OVERVIEW);
    }

    render() {
      // get position of the toggler:
      let togglerPosition = 0;
      const toggler = this.toggler.current;
      if (toggler) {
        const timeLine = this.timeLine.current;
        const timeLineWidth = timeLine.offsetWidth;
        togglerPosition = this.elapsedTimePercents * timeLineWidth / 100;
        this.timeLineValue = this.elapsedTimePercents;
      }
      return <Component
        videoRef = {this._videoRef}
        isPlaying = {this.state.isPlaying}
        onPlayButtonClick = {this.onPlayButtonClick}
        onPauseButtonClick = {this.onPauseButtonClick}
        toggler = {this.toggler}
        onMouseDown ={this.onMouseDown}
        timeLine = {this.timeLine}
        onLoadedMetaData = {this.onLoadedMetaData}
        duration = {this.state.duration}
        currentTime = {this.state.currentTime}
        onTimeUpdate = {this.onTimeUpdate}
        togglerPosition = {togglerPosition}
        timeLineValue = {this.timeLineValue}
        onFullScreenBtnClick = {this.onFullScreenBtnClick}
        fullScreenBtn = {this.fullScreenBtn}
        onExitButtonClick = {this.onExitButtonClick}
        previewRef = {this.previewRef}
      />;
    }
  }

  WithLargePlayer.propTypes = {
    previewVideoLink: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    isVideoPlaying: PropTypes.bool.isRequired,
  };

  return WithLargePlayer;
};

export default withLargePlayer;

