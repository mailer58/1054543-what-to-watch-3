import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {Genre} from './../genre/genre.jsx';
import {getFilms} from './../../reducer/loading-data/selectors.js';

const MAX_GENRES_NUMBER = 10;

export class GenresList extends PureComponent {
  constructor(props) {
    super();
    this.state = {currentGenre: `All genres`};
    this.onLinkClick = this.onLinkClick.bind(this);
    this._changeGenre = props.changeGenre.bind(this);
    this.onClickFunctions = [];
    this.genres = [];
  }

  onLinkClick(genre) {
    return (evt) => {
      evt.preventDefault();
      if (genre !== this.state.currentGenre) {
        this.setState({currentGenre: genre});
        this._changeGenre(genre); // change redux store
      }
    };
  }

  render() {
    const {
      films,
    } = this.props;

    // get genres from films:
    if (films.length && !this.genres.length) { // films loaded
      const genres = new Set();

      films.forEach((film) => genres.add(film.genre));

      this.genres = [...genres];

      this.genres = this.genres.sort((a, b) => a.localeCompare(b));

      this.genres.unshift(`All genres`);
    }

    if (this.genres.length) {
      const genres = this.genres.slice();
      genres.length = this.genres.length > MAX_GENRES_NUMBER ? MAX_GENRES_NUMBER : this.genres.length;
      return (
        genres.map((genre, index) => {
          const isActive = genre === this.state.currentGenre ? true : false;
          if (this.onClickFunctions.length === 0) {
            genres.forEach((item) => {
              this.onClickFunctions.push(this.onLinkClick(item));
            });
          }
          return (
            <Genre key = {genre}
              isActive = {isActive}
              genre = {genre}
              onLinkClick = {this.onClickFunctions[index]}
            />);
        })
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    films: getFilms(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetNumberPreviews());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);

GenresList.propTypes = {
  changeGenre: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired
};

