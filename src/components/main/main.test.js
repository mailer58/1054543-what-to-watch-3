import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Screens} from './../../const.js';
import {AuthorizationStatus} from "../../reducer/user/user.js";

const mockStore = configureStore([]);

const genres = [`All genres`, `Comedies`, `Action`];

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

const promo = {
  id: 1,
  name: `Midnight Special`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Midnight_Special.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/midnight-special.jpg`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Midnight_Special.jpg`,
  backgroundColor: `#828585`,
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  description: `A father and son go on the run, pursued by the government and a cult drawn to the child's special powers.`,
  rating: 3.3,
  scoresCount: 67815,
  director: `Jeff Nichols`,
  starring: [`Michael Shannon`, `Joel Edgerton`, `Kirsten Dunst `],
  runTime: 112,
  genre: `Action`,
  released: 2016,
  isVaforite: false,
};

const store = mockStore({
  LOADING_DATA: {
    promoFilm: promo,
    allFilms: films,
  },
  APP_STATE: {
    screen: Screens.MAIN,
    genresList: genres,
    currentGenre: `All genres`,
    film: films[0], // clicked film
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH
  }
});

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(
        <Provider store = {store}>
          <Main
            promoFilm = {promo}
            renderScreens = {jest.fn()}
            genres = {genres}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
