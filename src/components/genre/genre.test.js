import React from "react";
import renderer from "react-test-renderer";
import {Genre} from "./genre.jsx";

it(`Should Genre render correctly`, () => {
  const tree = renderer
    .create(
        <Genre
          isActive = {true}
          genre = {`Sci-Fi`}
          onLinkClick = {jest.fn()}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
