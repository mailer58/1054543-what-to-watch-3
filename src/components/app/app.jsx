import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import {MovieOverview} from './../movie-overview/movie-overview.jsx';
import {MovieDetails} from './../movie-details/movie-details.jsx';
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Screens} from './../../const.js';
import {MovieReviews} from '../movie-reviews/movie-reviews.jsx';

class App extends PureComponent {
  constructor({promoFilmTitle, promoFilmGenre, promoFilmYear, filmsData, onClickFunc}) {
    super();
    this.state = {
      screen: Screens.MAIN,
    };

    // promo-film:
    this.promoFilmTitle = promoFilmTitle;
    this.promoFilmGenre = promoFilmGenre;
    this.promoFilmYear = promoFilmYear;

    // all films:
    this.filmsData = filmsData;

    this.onClickFunc = onClickFunc;

    // a data of clicked film:
    this.film = null;

    this.renderScreens = this.renderScreens.bind(this);
  }

  renderScreens(screenType, film) {
    if (screenType && film) {
      this.setState({screen: screenType});
      this.film = film;
    }
    if (this.state.screen === Screens.MAIN) {
      return (
        <Main promoFilmTitle = {this.promoFilmTitle}
          promoFilmGenre = {this.promoFilmGenre}
          promoFilmYear = {this.promoFilmYear}
          filmsData = {this.filmsData}
          onHeaderClick = {this.onClickFunc}
          renderScreens = {this.renderScreens}
        />);
    }
    if (this.state.screen === Screens.OVERVIEW) {
      return (
        <MovieOverview
          film = {this.film}
          renderScreens = {this.renderScreens}
          tab = {Screens.OVERVIEW}
        />
      );
    }
    if (this.state.screen === Screens.DETAILS) {
      return (
        <MovieDetails
          film = {this.film}
          renderScreens = {this.renderScreens}
          tab = {Screens.DETAILS}
        />
      );
    }
    if (this.state.screen === Screens.REVIEW) {
      return (
        <MovieReviews
          film = {this.film}
          renderScreens = {this.renderScreens}
          tab = {Screens.REVIEW}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderScreens()}
          </Route>
          <Route exact path="/movie">
            <MovieOverview />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoFilmTitle: PropTypes.string.isRequired,
  promoFilmGenre: PropTypes.string.isRequired,
  promoFilmYear: PropTypes.number.isRequired,
  filmsData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        scoring: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        ratings: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        cardImg: PropTypes.string.isRequired,
      })
  ).isRequired,
  onClickFunc: PropTypes.func.isRequired,
  onMouseOverFunc: PropTypes.func
};

export default App;
