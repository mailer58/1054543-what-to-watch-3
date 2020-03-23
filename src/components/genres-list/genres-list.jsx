import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from './../../reducer.js';
import {Genre} from './../genre/genre.jsx';

export class GenresList extends PureComponent {
  constructor(props) {
    super();
    this.state = {currentGenre: `All genres`};
    this.onLinkClick = this.onLinkClick.bind(this);
    this._changeGenre = props.changeGenre.bind(this);
    this.onClickFunctions = [];
  }

  onLinkClick(genre, evt) {
    evt.preventDefault();
    if (genre !== this.state.currentGenre) {
      this.setState({currentGenre: genre});
    }
    this._changeGenre(genre); // change redux store
  }

  render() {
    const {
      genresList,
    } = this.props;
    return (
      genresList.map((genre, index) => {
        const isActive = genre === this.state.currentGenre ? true : false;
        if (this.onClickFunctions.length === 0) {
          genresList.forEach((item) => {
            this.onClickFunctions.push(this.onLinkClick.bind(null, item));
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
}

const mapStateToProps = (state) => {
  return {
    genresList: state.genresList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);

GenresList.propTypes = {
  changeGenre: PropTypes.func.isRequired,
  genresList: PropTypes.array.isRequired
};

