import React from 'react';
import PropTypes from "prop-types";
import {VideoPlayer} from './../video-player/video-player.jsx';
import withVideoPlayer from './../../hocs/with-video-player/with-video-player.jsx';

const VideoPlayerWrapped = withVideoPlayer(VideoPlayer);

export const FilmCard = ({isActive, name, previewImage, previewVideoLink, onClickCard, onMouseOverCard, onMouseOutCard}) => {
  return (<article onClick={onClickCard} onMouseOver={onMouseOverCard} onMouseOut={onMouseOutCard} className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <VideoPlayerWrapped previewVideoLink = {previewVideoLink}
        previewImage = {previewImage}
        isVideoPlaying = {isActive} />
    </div>
    {isActive ? null :
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="#">{name}</a>
      </h3>
    }
  </article>);
};

FilmCard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  onMouseOverCard: PropTypes.func.isRequired,
  onMouseOutCard: PropTypes.func.isRequired,
  onClickCard: PropTypes.func.isRequired
};
