import React from "react";
import renderer from "react-test-renderer";
import {ReviewsColumn} from "./reviews-column.jsx";

const halfReviews = [{}];

it(`Should ReviewsColumn render correctly`, () => {
  const tree = renderer
    .create(<ReviewsColumn
      halfReviews = {halfReviews} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
