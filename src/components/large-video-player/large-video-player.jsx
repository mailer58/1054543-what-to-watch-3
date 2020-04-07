import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilm, getScreen, getHistory} from "../../reducer/app-state/selectors.js";

export const LargeVideoPlayer = React.memo((props) => {
  const {
    storageHistory,
    isPlaying,
    videoRef,
    film,
    onPlayButtonClick,
    onPauseButtonClick,
    toggler,
    onMouseDown,
    timeLine,
    onLoadedMetaData,
    onTimeUpdate,
    currentTime,
    togglerPosition,
    timeLineValue,
    fullScreenBtn,
    onFullScreenBtnClick,
    onExitButtonClick
  } = props;

  console.log(storageHistory);

  const videoLink = film.videoLink;

  let onExitButtonClickBinded = onExitButtonClick;
  if (videoRef && onExitButtonClick) {
    onExitButtonClickBinded = onExitButtonClick.bind(null, videoRef.current);
  }

  return (<React.Fragment>
    <video onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetaData} style={{zIndex: 1000}}
      ref={videoRef} src={videoLink} className="player__video" poster="img/player-poster.jpg" autoPlay="autoplay"></video>
    <button onClick={onExitButtonClickBinded} style={{zIndex: 2000}} type="button" className="player__exit">Exit</button>

    <div className="player__controls" style={{zIndex: 2000}}>
      <div className="player__controls-row">
        <div className="player__time">
          <progress ref={timeLine} className="player__progress" value={timeLineValue} max="100"></progress>
          <div ref={toggler} onMouseDown={onMouseDown} className="player__toggler" style={{left: togglerPosition + `px`}}>Toggler</div>
        </div>
        <div className="player__time-value">{currentTime}</div>
      </div>

      <div className="player__controls-row">
        {isPlaying ? <button onClick={onPauseButtonClick} type="button" className="player__play">
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
          <span>Pause</span>
        </button> : <button onClick={onPlayButtonClick} type="button" className="player__play">
          <svg width="25" height="25">
            <use xlinkHref="#play"></use>
          </svg>
          <span>Play</span>
        </button>}
        <div className="player__name">Transpotting</div>

        <button ref={fullScreenBtn} onClick={onFullScreenBtnClick} type="button" className="player__full-screen">
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </React.Fragment>);
});

LargeVideoPlayer.displayName = `LargeVideoPlayer`;

const mapStateToProps = (state) => {
  return {
    screen: getScreen(state),
    film: getFilm(state),
    storageHistory: getHistory(state)
  };
};


export default connect(mapStateToProps)(LargeVideoPlayer);


LargeVideoPlayer.propTypes = {
  screen: PropTypes.string.isRequired,
  film: PropTypes.object.isRequired,
  videoRef: PropTypes.object.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPauseButtonClick: PropTypes.func.isRequired,
};
