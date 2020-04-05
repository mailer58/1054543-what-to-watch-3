import React from 'react';
import PropTypes from "prop-types";
import FilmsList from './../films-list/films-list.jsx';
import GenresList from './../genres-list/genres-list.jsx';
import CatalogButton from './../catalog-button/catalog-button.jsx';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import UserBlock from '../user-block/user-block.jsx';
import {Buttons} from './../buttons/buttons.jsx';

const Main = ({promoFilm, renderScreens, genres, screen, api}) => {
  return (
    <React.Fragment>
      <HiddenTopDiv />

      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />
        </header>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name + ` poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Buttons
                  screen = {screen}
                  renderScreens = {renderScreens}
                  api = {api}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ul className="catalog__genres-list">
            <GenresList genresList = {genres}/>
          </ul>

          <div className="catalog__movies-list">
            <FilmsList renderScreens = {renderScreens} />
          </div>

          <CatalogButton />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>);
};

Main.propTypes = {
  promoFilm: PropTypes.object.isRequired,
  renderScreens: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  screen: PropTypes.string.isRequired,
  api: PropTypes.func.isRequired
};

export default Main;


