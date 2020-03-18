import React from "react";
import renderer from "react-test-renderer";
import {MovieDetails} from "./movie-details.jsx";

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
