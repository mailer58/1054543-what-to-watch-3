import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FilmCard} from './../film-card/film-card.jsx';

export default class FilmsList extends PureComponent {
  constructor({films}) {
    super();
    this.state = {
      activeCard: null,
    };
    this._films = films;
  }

  _onMouseOverCard(filmData, evt) {
    this.setState({activeCard: evt.currentTarget});
    let film = {};
    film.title = filmData.title;
    film.img = filmData.img;
  }

  _onMouseOutCard() {
    this.setState({activeCard: null});
  }

  render() {
    return (
      this._films.map((film, index) => {
        return (<FilmCard title = {film.title}
          img = {film.img}
          onMouseOverCard = {this._onMouseOverCard.bind(this, film)}
          onMouseOutCard = {this._onMouseOutCard.bind(this)}
          key = {index}
        />);
      })
    );
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
      })
  ).isRequired,
};
