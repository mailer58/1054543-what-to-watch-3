import React from 'react';
import PropTypes from "prop-types";
import {Tabs} from './../tabs/tabs.jsx';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {PageHeader} from './../page-header/page-header.jsx';
import {Footer} from './../footer/footer.jsx';
import {ReviewsColumn} from './../reviews-colum/reviews-column.jsx';

export const MovieReviews = (props) => {
  const {
    title,
    genre,
    year,
    reviews
  } = props.film;

  const reviewsNumber = reviews.length;
  let half = reviewsNumber / 2;

  const isNumberEven = reviewsNumber % 2 === 0 ? true : false;

  let firstHalfReviews = [];
  let secondHalfReviews = [];

  if (reviewsNumber > 1) {
    if (isNumberEven) {
      firstHalfReviews = reviews.slice(0, half);
      secondHalfReviews = reviews.slice(half);
    } else {
      half = Math.ceil(half);
      firstHalfReviews = reviews.slice(0, half);
      secondHalfReviews = reviews.slice(half);
    }
  } else if (reviewsNumber === 1) {
    firstHalfReviews = reviews.slice();
  }

  return (
    <React.Fragment>
      <HiddenTopDiv />
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <PageHeader />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
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
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs film = {props.film}
                renderScreens ={props.renderScreens}
                tab = {props.tab} />

              <div className="movie-card__reviews movie-card__row">
                <ReviewsColumn halfReviews = {firstHalfReviews} />
                <ReviewsColumn halfReviews = {secondHalfReviews} />
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
    title: PropTypes.string,
    genre: PropTypes.string,
    year: PropTypes.number,
    reviews: PropTypes.array
  }),
  renderScreens: PropTypes.func,
  tab: PropTypes.string,
};
