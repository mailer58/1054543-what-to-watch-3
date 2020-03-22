import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import {MovieOverview} from './../movie-overview/movie-overview.jsx';
import {MovieDetails} from './../movie-details/movie-details.jsx';
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Screens} from './../../const.js';
import {MovieReviews} from '../movie-reviews/movie-reviews.jsx';
import {connect} from "react-redux";
import {ActionCreator} from './../../reducer.js';

class App extends PureComponent {
  constructor() {
    super();
    this.renderScreens = this.renderScreens.bind(this);
  }

  renderScreens(screenType, clickedFilm) {
    const {
      screen,
      promoFilmTitle,
      promoFilmGenre,
      promoFilmYear,
      allFilms,
      film,
      filmsComments,
      changeScreen,
      genres
    } = this.props;
    let comments = [];

    if (screenType && clickedFilm) {
      // change state of redux store for screen and film:
      changeScreen(screenType, clickedFilm);
    }

    if (screen === Screens.MAIN) {
      return (
        <Main promoFilmTitle = {promoFilmTitle}
          promoFilmGenre = {promoFilmGenre}
          promoFilmYear = {promoFilmYear}
          filmsData = {allFilms}
          renderScreens = {this.renderScreens}
          genres = {genres}
        />);
    }

    if (screen === Screens.OVERVIEW) {
      return (
        <MovieOverview
          film = {film}
          renderScreens = {this.renderScreens}
          tab = {Screens.OVERVIEW}
        />
      );
    }

    if (screen === Screens.DETAILS) {
      return (
        <MovieDetails
          film = {film}
          renderScreens = {this.renderScreens}
          tab = {Screens.DETAILS}
        />
      );
    }

    if (screen === Screens.REVIEW) {
    // get comments for the film:
      comments = filmsComments.filter((comment) => {
        return comment.id === film.id;
      });

      return (
        <MovieReviews
          film = {film}
          renderScreens = {this.renderScreens}
          tab = {Screens.REVIEW}
          comments = {comments}
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

const mapStateToProps = (state) => {
  return {
    screen: state.screen,
    allFilms: state.allFilms,
    filmsComments: state.filmsComments,
    film: state.film,
    promoFilmTitle: state.promoFilmTitle,
    promoFilmGenre: state.promoFilmGenre,
    promoFilmYear: state.promoFilmYear,
    genres: state.genresList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeScreen(screen, film) {
    dispatch(ActionCreator.changeScreen(screen, film));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};

App.propTypes = {
  screen: PropTypes.string.isRequired,
  promoFilmTitle: PropTypes.string.isRequired,
  promoFilmGenre: PropTypes.string.isRequired,
  promoFilmYear: PropTypes.number.isRequired,
  allFilms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        posterImage: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        scoresCount: PropTypes.number.isRequired,
        director: PropTypes.string.isRequired,
        starring: PropTypes.array.isRequired,
        genre: PropTypes.string.isRequired,
        released: PropTypes.number.isRequired,
        previewImage: PropTypes.string.isRequired,
      })
  ).isRequired,
  onMouseOverFunc: PropTypes.func,
  filmsComments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }),
        rating: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
  ).isRequired,
  changeScreen: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired
};
