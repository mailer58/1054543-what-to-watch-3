import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from "prop-types";

const App = ({title, genre, year, cards}) => {
  return (
    <Main titleFilm = {title}
      genreFilm = {genre}
      yearFilm = {year}
      filmsCards = {cards}
    />);
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  cards: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired
      })
  ).isRequired
};

export default App;
