import React, {PureComponent} from 'react';
import Main from '../main/main.jsx';
import MovieOverview from './../movie-overview/movie-overview.jsx';
import MovieDetails from './../movie-details/movie-details.jsx';
import MovieReviews from '../movie-reviews/movie-reviews.jsx';
import AuthScreen from './../auth-screen/auth-screen.jsx';
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {Screens} from './../../const.js';
import {connect} from "react-redux";
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {getFilms, getPromoFilm} from '../../reducer/loading-data/selectors.js';
import {getScreen, getFilm, getGenres} from '../../reducer/app-state/selectors.js';
import {getAuthorizationStatus} from './../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from './../../reducer/user/user.js';
import AddReviewPage from './../add-review-page/add-review-page.jsx';
import {FavoriteList} from '../favorite-list/favorite-list.jsx';
import WidePlayer from '../wide-player/wide-player.jsx';
import {AppRoute} from '../../const.js';
import history from "../../history.js";

class App extends PureComponent {
  constructor(props) {
    super();
    this.renderScreens = this.renderScreens.bind(this);
    this.history = props.history;
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

    // change state of redux store for screen and film:

    if (screenType) {
      changeScreen(screenType);
    }

    if (clickedFilm) {
      changeFilm(clickedFilm);
    }

    if (screen === Screens.MAIN) {
      return (
        <Main promoFilm = {promoFilm}
          renderScreens = {this.renderScreens}
          genres = {genres}
          screen = {screen}
          api = {api}
          onClickCard = {this.onClickCard}
        />);
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
      return history.push(AppRoute.SIGN_IN);
    } else if (screen === Screens.SIGN_IN && authorizationStatus === AuthorizationStatus.AUTH) {
      changeScreen(Screens.MAIN);
    }

    if (screen === Screens.ADD_REVIEW) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return <AddReviewPage api = {api}/>;
      } else {
        return <AuthScreen
          login = {login}
          api = {api} />;
      }
    }

    if (screen === Screens.FAVORITE_LIST) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return <FavoriteList renderScreens = {this.renderScreens}/>;
      } else {
        return <AuthScreen
          login = {login}
          api = {api} />;
      }
    }

    if (screen === Screens.WIDE_PLAYER) {
      return (
        <WidePlayer />
      );
    }

    return null;
  }

  onClickCard(value) {
    return history.push(value);
  }

  render() {
    console.log(this.props);
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

    return (
      <Router history={history}>
        <Switch>

          <Route exact path={AppRoute.PLAYER}
            render ={() => (
              <WidePlayer
                history = {history}
                film={film}/>
            )}>
          </Route>

          <Route exact path={AppRoute.MAIN}>
            {this.renderScreens(Screens.MAIN)}
          </Route>

          <Route exact path={AppRoute.LOGIN}>
            <AuthScreen
              login = {login}
              api = {api} />
          </Route>

          <Route exact path={AppRoute.FILM}>
            <MovieOverview
              film = {film}
              renderScreens = {this.renderScreens}
              tab = {Screens.OVERVIEW}
              api = {api}
            />
          </Route>


        </Switch>
      </Router>
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
