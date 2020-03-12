import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const filmsData = [{
  id: 1,
  title: `Aviator`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  scoring: 5,
  description: ``,
  ratings: 100,
  director: ``,
  starring: ``,
  genre: ``,
  year: 2000,
  cardImg: `img/aviator.jpg`,
  src: `http`
},
{
  id: 2,
  title: `Revenant`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  scoring: 4,
  description: ``,
  ratings: 300,
  director: ``,
  starring: ``,
  genre: ``,
  year: 2005,
  cardImg: `img/revenant.jpg`,
  src: `http`
},
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App promoFilmTitle = {PromoFilm.TITLE}
      promoFilmGenre = {PromoFilm.GENRE}
      promoFilmYear = {PromoFilm.YEAR}
      filmsData = {filmsData}
      onClickFunc = {jest.fn()}
      app = {null}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
