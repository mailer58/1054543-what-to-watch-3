import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

const film = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  posterImage: ``,
  rating: 0,
  description: ``,
  scoresCount: 0,
  director: ``,
  genre: ``,
  released: 2000,
  starring: [],
  reviews: []
};

it(`Should Tabs render correctly`, () => {
  const store = mockStore({
    LOADING_DATA: {
      allFilms: [],
      promoFilm: {},
      comments: [],
    }
  });
  const tree = renderer
    .create(<Provider store = {store}>
      <Tabs film = {film}
        renderScreens ={jest.fn()}
        tab = {`Overview`} />
    </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
