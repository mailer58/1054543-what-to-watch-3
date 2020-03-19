import React from 'react';
import PropTypes from "prop-types";
import {Tabs} from './../tabs/tabs.jsx';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {PageHeader} from './../page-header/page-header.jsx';
import {Footer} from './../footer/footer.jsx';
import {ReviewsColumn} from './../reviews-colum/reviews-column.jsx';

export const MovieReviews = (props) => {
  const {
    name,
    genre,
    released,
    posterImage,
    backgroundImage
  } = props.film;

  const comments = props.comments;

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

              <div className="movie-card__reviews movie-card__row">
                <ReviewsColumn halfReviews = {firstHalfComments} />
                <ReviewsColumn halfReviews = {secondHalfComments} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
              </h3>
            </article>

            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
              </h3>
            </article>
          </div>
        </section>
        <Footer />
      </div>
    </React.Fragment>);
};

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
        rating: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
  ).isRequired
};

