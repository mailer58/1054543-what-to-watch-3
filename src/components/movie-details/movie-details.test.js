import React from "react";
import renderer from "react-test-renderer";
import {MovieDetails} from "./movie-details.jsx";

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

it(`Should MovieDetails render correctly`, () => {
  const tree = renderer
    .create(<MovieDetails
      film = {film}
      renderScreens = {jest.fn()}
      tab = {`Details`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
