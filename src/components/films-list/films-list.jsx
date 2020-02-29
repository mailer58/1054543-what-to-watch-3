import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FilmCard} from './../film-card/film-card.jsx';
import {Screens} from './../../const.js';

export default class FilmsList extends PureComponent {
  constructor({films, app}) {
    super();
    this.state = {
      activeCard: null,
    };

    this._films = films;
    this._app = app;
  }

  _onMouseOverCard(movieData, evt) {
    this.setState({activeCard: evt.currentTarget});
    let film = {};
    film.title = movieData.title;
    film.img = movieData.img;
  }

  _onMouseOutCard() {
    this.setState({activeCard: null});
  }

  _onClickCard(film) {
    // set data of film for app component:
    this._app.film = film;

    // change a screen:
    this._app.setState({screen: Screens.MOVIE});
  }

  render() {
    return (
      this._films.map((film, index) => {
        return (<FilmCard title = {film.title}
          img = {film.cardImg}
          onMouseOverCard = {this._onMouseOverCard.bind(this, film)}
          onMouseOutCard = {this._onMouseOutCard.bind(this)}
          onClickCard = {this._onClickCard.bind(this, film)}
          key = {index}
        />);
      })
    );
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster: PropTypes.string,
        scoring: PropTypes.number,
        description: PropTypes.string,
        ratings: PropTypes.number,
        director: PropTypes.string,
        starring: PropTypes.string,
        genre: PropTypes.string,
        year: PropTypes.number,
        cardImg: PropTypes.string,
      })
  ).isRequired,
  app: PropTypes.object
};
