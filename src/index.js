import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {PromoFilm, films} from "./mocks/films.js";

const onHeaderClick = () => {};

ReactDOM.render(<
  App title = {
    PromoFilm.TITLE
  }
  genre = {
    PromoFilm.GENRE
  }
  year = {
    PromoFilm.YEAR
  }
  cards = {films}
  onClickFunc = {onHeaderClick}
/>,
document.querySelector(`#root`)
);
