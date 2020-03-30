import React from 'react';
import PropTypes from "prop-types";
import Tabs from './../tabs/tabs.jsx';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import {PageHeader} from './../page-header/page-header.jsx';
import {Footer} from './../footer/footer.jsx';
import FilmsList from './../films-list/films-list.jsx';
import {getSimilarFilms} from '../../reducer/loading-data/selectors.js';
import {connect} from "react-redux";

export const MovieDetails = (props) => {
  const {
    name,
    posterImage,
    director,
    genre,
    released,
    runTime,
    backgroundImage
  } = props.film;

  const imgAlt = name + ` poster`;
  let {starring} = props.film;
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
                renderScreens = {props.renderScreens}
                tab = {props.tab}
                api = {props.api} />
              <div className="movie-card__text movie-card__row">
                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Director</strong>
                    <span className="movie-card__details-value">{director}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Starring</strong>

                    {starring.map((actor, index) => {
                      if (index < starring.length - 1) {
                        return <span key ={index} className="movie-card__details-value">{actor},<br /></span>;
                      }
                      return actor;
                    })
                    }
                  </p>
                </div>

                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Run Time</strong>
                    <span className="movie-card__details-value">{runTime}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Genre</strong>
                    <span className="movie-card__details-value">{genre}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Released</strong>
                    <span className="movie-card__details-value">{released}</span>
                  </p>
                </div>
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

export default connect(mapStateToProps)(MovieDetails);

MovieDetails.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string,
    posterImage: PropTypes.string,
    director: PropTypes.string,
    starring: PropTypes.array,
    genre: PropTypes.string,
    released: PropTypes.number,
    runTime: PropTypes.number,
    backgroundImage: PropTypes.string
  }),
  renderScreens: PropTypes.func,
  tab: PropTypes.string,
  similarFilms: PropTypes.array,
  api: PropTypes.func
};

