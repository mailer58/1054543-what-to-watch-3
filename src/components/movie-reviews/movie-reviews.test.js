import React from "react";
import renderer from "react-test-renderer";
import {MovieReviews} from "./movie-reviews.jsx";

const film = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: ``,
  scoring: 0,
  description: ``,
  ratings: 0,
  director: ``,
  genre: ``,
  year: 2000,
  starring: [],
  reviews: []
};

it(`Should MovieReviews render correctly`, () => {
  const tree = renderer
    .create(<MovieReviews
      film = {film}
      renderScreens = {jest.fn()}
      tab = {`Reviews`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
