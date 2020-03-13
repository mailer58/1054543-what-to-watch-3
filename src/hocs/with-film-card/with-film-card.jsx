import React, {PureComponent} from 'react';
import {Screens} from './../../const.js';
import PropTypes from "prop-types";

const withFilmCard = (Component) => {
  class WithFilmCard extends PureComponent {
    constructor({filmData, renderScreens}) {
      super();
      this.state = {
        isActive: false
      };

      this._filmData = filmData;
      this._renderScreens = renderScreens;

      this._onClickCard = this._onClickCard.bind(this, this._filmData);
      this._onMouseOverCard = this._onMouseOverCard.bind(this, this._filmData);
      this._onMouseOutCard = this._onMouseOutCard.bind(this, this._filmData);
    }

    _onMouseOverCard() {
      this.setState({isActive: true});
    }

    _onMouseOutCard() {
      this.setState({isActive: false});
    }

    _onClickCard(film) {
      this._renderScreens(Screens.MOVIE, film);
    }

    render() {
      return <Component
        isActive = {this.state.isActive}
        title = {this._filmData.title}
        img = {this._filmData.cardImg}
        video = {this._filmData.src}
        onClickCard = {this._onClickCard}
        onMouseOverCard = {this._onMouseOverCard}
        onMouseOutCard = {this._onMouseOutCard}
      />;
    }
  }

  WithFilmCard.propTypes = {
    filmData: PropTypes.shape({
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
      src: PropTypes.string
    }).isRequired,
    renderScreens: PropTypes.func.isRequired
  };

  return WithFilmCard;
};

export default withFilmCard;


