import React from "react";
import PropTypes from "prop-types";
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import LargeVideoPlayer from './../large-video-player/large-video-player.jsx';
import withLargePlayer from './../../hocs/with-large-player/with-large-player.jsx';
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import {getHistory} from '../../reducer/app-state/selectors.js';

const LargeVideoPlayerWrapped = withLargePlayer(LargeVideoPlayer);

const WidePlayer = React.memo((props) => {
  const {
    history,
    addHistory,
    storageHistory
  } = props;
  if (!storageHistory) {
    addHistory(history);
  }
  return <React.Fragment>
    <HiddenTopDiv/>
    <div className="player">
      <LargeVideoPlayerWrapped
        history = {history}/>
    </div>
  </React.Fragment>;
});

WidePlayer.displayName = `WidePlayer`;

const mapStateToProps = (state) => {
  return {
    storageHistory: getHistory(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  addHistory(history) {
    dispatch(ActionCreator.changeScreen(history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WidePlayer);

WidePlayer.propTypes = {
  videoRef: PropTypes.object.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired
};
