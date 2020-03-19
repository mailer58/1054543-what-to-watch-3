import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from './../../reducer.js';

class GenresListConnected extends PureComponent {
  constructor(props) {
    super();
    this._changeGenre = props.changeGenre.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(evt) {
    evt.preventDefault();
    const clickedGenre = evt.target.dataset.genre;
    if (clickedGenre !== this.props.currentGenre) {
      this._changeGenre(clickedGenre); // change redux store
    }
  }
  render() {
    const {
      currentGenre,
      genresList,
    } = this.props;
    return (
      <ul className="catalog__genres-list">
        {genresList.map((genre, index) => {
          const isActiveGenre = genre === currentGenre ? `catalog__genres-item catalog__genres-item--active`
            : `catalog__genres-item`;
          return (
            <li key={index} className={isActiveGenre}>
              <a onClick={this._onClick} href="#" className="catalog__genres-link" data-genre={genre}>{genre}</a>
            </li>);
        })
        }
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genresList: state.genresList,
    currentGenre: state.currentGenre
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

const GenresList = connect(mapStateToProps, mapDispatchToProps)(GenresListConnected);
export default GenresList;

GenresListConnected.propTypes = {
  changeGenre: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  genresList: PropTypes.array.isRequired
};

