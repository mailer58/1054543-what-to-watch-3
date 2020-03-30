import React from 'react';
import PropTypes from "prop-types";
import Tabs from './../tabs/tabs.jsx';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {PageHeader} from './../page-header/page-header.jsx';
import {Footer} from './../footer/footer.jsx';
import FilmsList from './../films-list/films-list.jsx';
import {ActionCreator} from './../../reducer/app-state/app-state.js';
import {ActionCreator as CommentsActionCreator} from './../../reducer/loading-data/loading-data.js';
import {connect} from "react-redux";
import {getSimilarFilms} from './../../reducer/loading-data/selectors.js';

const NUMBER_OF_ACTORS = 4;
const MAX_PREVIEWS_NUMBER = 4;

export const MovieOverview = (props) => {
  const {
    name,
    posterImage,
    rating,
    description,
    scoresCount,
    director,
    genre,
    released,
    backgroundImage} = props.film;

  props.resetComments(); // avoid momentary showing previous comments

  // for the FilmsList component:
  props.changeFilm(props.film);
  props.changeGenre(genre);
  props.changeNumberPreviews(MAX_PREVIEWS_NUMBER);

  let {starring} = props.film;
  const scoreCount = scoresCount + ` ratings`;

  const imgAlt = name + ` poster`;

  let starringCopy = starring.slice();
  starringCopy.length = starring.length > NUMBER_OF_ACTORS ? NUMBER_OF_ACTORS : starring.length;
  starringCopy = starringCopy.join(`, `) + ` and other`;

  let mark;
  if (rating >= 0 && rating < 3) {
    mark = `Bad`;
  } else if (rating >= 3 && rating < 5) {
    mark = `Normal`;
  } else if (rating >= 5 && rating < 8) {
    mark = `Good`;
  } else if (rating >= 8 && rating < 10) {
    mark = `Very good`;
  } else if (rating === 10) {
    mark = `Awesome`;
  }

  return (
    <React.Fragment>
      <HiddenTopDiv />
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <PageHeader />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={imgAlt} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs film = {props.film}
                renderScreens ={props.renderScreens}
                tab = {props.tab} />

              <div className="movie-rating">
                <div className="movie-rating__score">{rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{mark}</span>
                  <span className="movie-rating__count">{scoreCount}</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{description}</p>
                <p className="movie-card__director"><strong>Director: {director}</strong></p>
                <p className="movie-card__starring"><strong>Starring: {starringCopy}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        {props.similarFilms.length ? <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <FilmsList renderScreens = {props.renderScreens} />
          </div>
        </section> : null}
        <Footer />
      </div>

    </React.Fragment>);
};

const mapStateToProps = (state) => {
  return {
    similarFilms: getSimilarFilms(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeNumberPreviews(newNumber) {
    dispatch(ActionCreator.changeNumberPreviews(newNumber));
  },
  changeFilm(film) {
    dispatch(ActionCreator.changeFilm(film));
  },
  changeGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  resetComments() {
    dispatch(CommentsActionCreator.resetComments());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieOverview);

MovieOverview.propTypes = {
  film: PropTypes.shape({
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
    backgroundImage: PropTypes.string
  }),
  renderScreens: PropTypes.func,
  tab: PropTypes.string,
  resetComments: PropTypes.func,
  changeFilm: PropTypes.func,
  changeGenre: PropTypes.func,
  changeNumberPreviews: PropTypes.func,
  similarFilms: PropTypes.array,
};


