import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import MovieOverview from './../movie-overview/movie-overview.jsx';
import MovieDetails from './../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import AuthScreen from './../auth-screen/auth-screen.jsx';
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {Screens} from './../../const.js';
import {connect} from "react-redux";
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {getFilms, getPromoFilm} from '../../reducer/loading-data/selectors.js';
import {getScreen, getFilm, getGenres} from '../../reducer/app-state/selectors.js';
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from './../../reducer/user/user.js';

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
      changeFilm,
      genres,
      api,
      login,
      authorizationStatus
    } = this.props;

    if (screenType && clickedFilm) {
      // change state of redux store for screen and film:
      changeScreen(screenType);
      changeFilm(clickedFilm);
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
          changeScreen = {changeScreen}
        />
      );
    }

    if (screen === Screens.SIGN_IN && authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <AuthScreen
          login = {login}
          api = {api} />
      );
    } else if (screen === Screens.SIGN_IN && authorizationStatus === AuthorizationStatus.AUTH) {
      changeScreen(Screens.MAIN);
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
          <Route exact path="/dev-auth">
            <AuthScreen />
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
    authorizationStatus: getAuthorizationStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeScreen(screen) {
    dispatch(ActionCreator.changeScreen(screen));
  },
  changeFilm(film) {
    dispatch(ActionCreator.changeFilm(film));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
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
  api: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  changeFilm: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};
