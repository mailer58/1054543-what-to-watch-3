import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Screens} from './../../const.js';

const mockStore = configureStore([]);
const MAX_NUMBER_PREVIEWS = 8;


const films = [{
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `http`
}
];


it(`Should FilmsList render correctly`, () => {
  const store = mockStore({
    LOADING_DATA: {
      allFilms: films
    },
    APP_STATE: {
      screen: Screens.MAIN,
      numberPreviews: MAX_NUMBER_PREVIEWS,
      currentGenre: `All genres`
    }
  });
  const tree = renderer
    .create(<Provider store = {store}>
      <FilmsList
        renderScreens = {jest.fn()}
        key = {films[0].id}
      />
    </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
