import React from "react";
import renderer from "react-test-renderer";
import {Tabs} from "./tabs.jsx";

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

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs film = {film}
      renderScreens ={jest.fn()}
      tab = {`Overview`} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
