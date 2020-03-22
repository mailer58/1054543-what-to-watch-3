import React from "react";
import renderer from "react-test-renderer";
import {MovieReviews} from "./movie-reviews.jsx";

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

const comment = {
  id: 1,
  user: {
    id: 1,
    name: `name`,
  },
  rating: `0`,
  comment: `text`,
  date: `December`,

};

const comments = [];
comments.push(comment);

it(`Should MovieReviews render correctly`, () => {
  const tree = renderer
    .create(<MovieReviews
      film = {film}
      renderScreens = {jest.fn()}
      tab = {`Reviews`}
      comments = {comments}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
