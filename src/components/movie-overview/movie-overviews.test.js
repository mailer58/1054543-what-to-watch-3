import React from "react";
import renderer from "react-test-renderer";
import {MovieOverview} from "./movie-overview.jsx";

const film = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  posterImage: ``,
  rating: 0,
  description: ``,
  scoresCount: 0,
  director: ``,
  genre: ``,
  released: 2000,
  starring: []
};

it(`Should MovieOverview render correctly`, () => {
  const tree = renderer
    .create(<MovieOverview
      film = {film}
      renderScreens = {jest.fn()}
      tab = {`Overview`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
