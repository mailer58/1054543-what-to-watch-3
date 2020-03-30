import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import MovieOverview from './../movie-overview/movie-overview.jsx';
import MovieDetails from './../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Screens} from './../../const.js';
import {connect} from "react-redux";
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {getFilms, getPromoFilm} from '../../reducer/loading-data/selectors.js';
import {getScreen, getFilm, getGenres} from '../../reducer/app-state/selectors.js';

class App extends PureComponent {
  constructor() {
    super();
    this.renderScreens = this.renderScreens.bind(this);
  }

  renderScreens(screenType, clickedFilm) {
    const {
      screen,
      promoFilm,
      film,
      changeScreen,
      genres,
      api
    } = this.props;

    if (screenType && clickedFilm) {
      // change state of redux store for screen and film:
      changeScreen(screenType, clickedFilm);
    }

    if (screen === Screens.MAIN) {
      return (
        <Main promoFilm = {promoFilm}
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
          api = {api}
        />
      );
    }

    if (screen === Screens.DETAILS) {
      return (
        <MovieDetails
          film = {film}
          renderScreens = {this.renderScreens}
          tab = {Screens.DETAILS}
          api = {api}
        />
      );
    }

    if (screen === Screens.REVIEW) {
      return (
        <MovieReviews
          film = {film}
          renderScreens = {this.renderScreens}
          tab = {Screens.REVIEW}
          api = {api}
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
    screen: getScreen(state),
    allFilms: getFilms(state),
    film: getFilm(state),
    promoFilm: getPromoFilm(state),
    genres: getGenres(state),
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
  promoFilm: PropTypes.object.isRequired,
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
  changeScreen: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  api: PropTypes.func.isRequired
};
