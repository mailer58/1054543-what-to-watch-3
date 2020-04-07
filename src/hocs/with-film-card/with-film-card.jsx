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
      this._renderScreens(Screens.OVERVIEW, film);
    }

    render() {
      return <Component
        isActive = {this.state.isActive}
        id = {this._filmData.id}
        name = {this._filmData.name}
        previewImage = {this._filmData.previewImage}
        previewVideoLink = {this._filmData.previewVideoLink}
        onClickCard = {this._onClickCard}
        onMouseOverCard = {this._onMouseOverCard}
        onMouseOutCard = {this._onMouseOutCard}
      />;
    }
  }

  WithFilmCard.propTypes = {
    filmData: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      posterImage: PropTypes.string,
      rating: PropTypes.number,
      description: PropTypes.string,
      scoresCount: PropTypes.number,
      director: PropTypes.string,
      starring: PropTypes.array,
      genre: PropTypes.string,
      released: PropTypes.number,
      previewImage: PropTypes.string,
      previewVideoLink: PropTypes.string
    }).isRequired,
    renderScreens: PropTypes.func.isRequired
  };

  return WithFilmCard;
};

export default withFilmCard;


