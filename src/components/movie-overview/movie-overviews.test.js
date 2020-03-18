import React from "react";
import renderer from "react-test-renderer";
import {MovieOverview} from "./movie-overview.jsx";

const film = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: ``,
  scoring: 0,
  description: ``,
  ratings: 0,
  director: ``,
  genre: ``,
  year: 2000,
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
