import React from "react";
import renderer from "react-test-renderer";
import {ReviewsColumn} from "./reviews-column.jsx";

const review = {
  id: 1,
  user: {
    id: 1,
    name: `name`,
  },
  rating: `0`,
  comment: `text`,
  date: `December`,

};
const halfReviews = [];
halfReviews.push(review);

it(`Should ReviewsColumn render correctly`, () => {
  const tree = renderer
    .create(<ReviewsColumn
      halfReviews = {halfReviews} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
