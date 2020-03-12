import React, {PureComponent} from 'react';
import {Screens} from './../../const.js';
import PropTypes from "prop-types";

const withFilmCard = (Component) => {
  class WithFilmCard extends PureComponent {
    constructor({filmData, app}) {
      super();
      this.state = {
        isActive: false
      };

      this._filmData = filmData;
      this._app = app;

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
      // set data of film for app component:
      this._app.film = film;

      // change a screen:
      this._app.setState({screen: Screens.MOVIE});
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
    app: PropTypes.object.isRequired
  };

  return WithFilmCard;
};

export default withFilmCard;


