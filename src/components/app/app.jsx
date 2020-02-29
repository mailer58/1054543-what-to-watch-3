import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import {MoviePage} from './../movie-page/movie-page.jsx';
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Screens} from './../../const.js';

class App extends PureComponent {
  constructor({promoFilmTitle, promoFilmGenre, promoFilmYear, filmsData, onClickFunc}) {
    super();
    this.app = this;
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
  }

  _renderScreens() {
    if (this.state.screen === Screens.MAIN) {
      return (
        <Main promoFilmTitle = {this.promoFilmTitle}
          promoFilmGenre = {this.promoFilmGenre}
          promoFilmYear = {this.promoFilmYear}
          filmsData = {this.filmsData}
          onHeaderClick = {this.onClickFunc}
          app = {this.app}
        />);
    }
    if (this.state.screen === Screens.MOVIE) {
      return (
        <MoviePage
          id = {this.film.id}
          title = {this.film.title}
          poster = {this.film.poster}
          scoring = {this.film.scoring}
          description = {this.film.description}
          ratings = {this.film.ratings}
          director = {this.film.director}
          starring = {this.film.starring}
          genre = {this.film.genre}
          year = {this.film.year}
          cardImg = {this.film.cardImg}
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
            {this._renderScreens()}
          </Route>
          <Route exact path="/movie">
            <MoviePage />
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
        starring: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        cardImg: PropTypes.string.isRequired,
      })
  ).isRequired,
  onClickFunc: PropTypes.func.isRequired,
  onMouseOverFunc: PropTypes.func
};

export default App;
