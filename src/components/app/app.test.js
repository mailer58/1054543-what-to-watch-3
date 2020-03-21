import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Screens} from '../../const.js';

const mockStore = configureStore([]);

const films = [{
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

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const comments = [{
  id: 1,
  user: {
    id: 1,
    name: `Kate Muir`,
  },
  rating: `5,5`,
  comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  date: `December `
},
{
  id: 2,
  user: {
    id: 1,
    name: `Matthew Lickona`,
  },
  rating: `2,0`,
  comment: `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  date: `November `
}
];

export const ListOfGenres = {
  ALL_GENRES: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS_AND_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCIFI: `Sci-Fi`,
  THRILLERS: `Thrillers`
};

const genres = Object.values(ListOfGenres);

it(`Render App`, () => {
  debugger;
  const store = mockStore({
    screen: Screens.MAIN,
    allFilms: films,
    filmsComments: comments,
    film: {},
    promoFilmTitle: PromoFilm.TITLE,
    promoFilmGenre: PromoFilm.GENRE,
    promoFilmYear: PromoFilm.YEAR,
    genresList: genres,
    currentGenre: ListOfGenres.ALL_GENRES
  });

  const tree = renderer
  .create(<Provider store = {store}>
    <App
      promoFilmTitle = {PromoFilm.TITLE}
      promoFilmGenre = {PromoFilm.GENRE}
      promoFilmYear = {PromoFilm.YEAR}
      filmsData = {films}
      renderScreens = {jest.fn()}
      comments = {[]}
    />
  </Provider>,
  {
    createNodeMock: () => {
      return {};
    }
  })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
