import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);


const genres = [`Comedies`, `Action`];

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const filmsData = [{
  id: 1,
  name: `Aviator`,
  posterImage: `img/the-grand-budapest-hotel-posterImage.jpg`,
  rating: 5,
  description: `text`,
  scoresCount: 100,
  director: ``,
  starring: [],
  genre: ``,
  released: 2000,
  previewImage: `img/aviator.jpg`,
  previewVideoLink: `http`
},
{
  id: 2,
  name: `Revenant`,
  posterImage: `img/the-grand-budapest-hotel-posterImage.jpg`,
  rating: 4,
  description: `text`,
  scoresCount: 300,
  director: ``,
  starring: [],
  genre: ``,
  released: 2005,
  previewImage: `img/revenant.jpg`,
  previewVideoLink: `http`
},
];

const store = mockStore({
  film: {},
  promoFilmTitle: PromoFilm.TITLE,
  promoFilmGenre: PromoFilm.GENRE,
  promoFilmYear: PromoFilm.YEAR,
  genresList: genres,
  currentGenre: `All genres`
});

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(
        <Provider store = {store}>
          <Main promoFilmTitle = {
            PromoFilm.TITLE
          }
          promoFilmGenre = {
            PromoFilm.GENRE
          }
          promoFilmYear = {
            PromoFilm.YEAR
          }
          filmsData = {filmsData}
          renderScreens = {jest.fn()}
          genres = {genres}
          />
    /</Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
