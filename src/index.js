import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {PromoFilm, films, getFilmsData} from "./mocks/films.js";

const onHeaderClick = () => {};

const filmsData = getFilmsData(films);

ReactDOM.render(<
  App promoFilmTitle = {
    PromoFilm.TITLE
  }
  promoFilmGenre = {
    PromoFilm.GENRE
  }
  promoFilmYear = {
    PromoFilm.YEAR
  }
  filmsData = {filmsData}
  onClickFunc = {onHeaderClick}
/>,
document.querySelector(`#root`)
);
