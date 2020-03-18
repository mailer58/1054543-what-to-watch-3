import React from 'react';
import PropTypes from "prop-types";
import {VideoPlayer} from './../video-player/video-player.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

export const FilmCard = ({isActive, title, img, video, onClickCard, onMouseOverCard, onMouseOutCard}) => {
  return (<article onClick={onClickCard} onMouseOver={onMouseOverCard} onMouseOut={onMouseOutCard} className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <VideoPlayerWrapped videoSrc = {video}
        poster = {img}
        isVideoPlaying = {isActive} />
    </div>
    {isActive ? null :
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{title}</a>
      </h3>
    }
  </article>);
};

FilmCard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onMouseOverCard: PropTypes.func.isRequired,
  onMouseOutCard: PropTypes.func.isRequired,
  onClickCard: PropTypes.func.isRequired
};
