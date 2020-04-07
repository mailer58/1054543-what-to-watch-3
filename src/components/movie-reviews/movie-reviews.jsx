import React from 'react';
import PropTypes from "prop-types";
import Tabs from './../tabs/tabs.jsx';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {PageHeader} from './../page-header/page-header.jsx';
import {Footer} from './../footer/footer.jsx';
import {ReviewsColumn} from './../reviews-colum/reviews-column.jsx';
import {connect} from "react-redux";
import {getComments, getSimilarFilms} from '../../reducer/loading-data/selectors.js';
import FilmsList from './../films-list/films-list.jsx';
import {Buttons} from './../buttons/buttons.jsx';
import {getScreen} from '../../reducer/app-state/selectors.js';

const MovieReviews = (props) => {
  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage,
    id
  } = props.film;

  const {comments} = props;

  const imgAlt = name + ` poster`;

  const commentsNumber = comments.length;
  let half = commentsNumber / 2;

  const isNumberEven = commentsNumber % 2 === 0 ? true : false;

  let firstHalfComments = [];
  let secondHalfComments = [];

  if (commentsNumber > 1) {
    if (isNumberEven) {
      firstHalfComments = comments.slice(0, half);
      secondHalfComments = comments.slice(half);
    } else {
      half = Math.ceil(half);
      firstHalfComments = comments.slice(0, half);
      secondHalfComments = comments.slice(half);
    }
  } else if (commentsNumber === 1) {
    firstHalfComments = comments.slice();
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
              <Buttons
                screen = {screen}
                renderScreens = {props.renderScreens}
                api = {props.api}
                filmId = {id}/>
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
                tab = {props.tab}
                api = {props.api}/>

              <div className="movie-card__reviews movie-card__row">
                <ReviewsColumn halfReviews = {firstHalfComments} />
                <ReviewsColumn halfReviews = {secondHalfComments} />
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
    comments: getComments(state),
    similarFilms: getSimilarFilms(state),
    screen: getScreen(state),
  };
};

export default connect(mapStateToProps)(MovieReviews);
export {MovieReviews};

MovieReviews.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string,
    genre: PropTypes.string,
    released: PropTypes.number,
    comments: PropTypes.array,
    posterImage: PropTypes.string,
    backgroundImage: PropTypes.string
  }),
  renderScreens: PropTypes.func,
  tab: PropTypes.string,
  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired
        }),
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
  ).isRequired,
  similarFilms: PropTypes.array,
  api: PropTypes.func
};

