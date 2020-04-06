import React from 'react';
import {HiddenTopDiv} from './../hidden-top-div/hidden-top-div.jsx';
import UserBlock from './../user-block/user-block.jsx';
import FilmsList from './../films-list/films-list.jsx';
import PropTypes from "prop-types";

export const FavoriteList = (props) => {
  return (<React.Fragment>
    <HiddenTopDiv />
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          <FilmsList renderScreens = {props.renderScreens} />
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
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

FavoriteList.propTypes = {
  renderScreens: PropTypes.func.isRequired
};
