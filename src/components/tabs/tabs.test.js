import React from "react";
import renderer from "react-test-renderer";
import {Tabs} from "./tabs.jsx";

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

it(`Should Tabs render correctly`, () => {
  const tree = renderer
    .create(<Tabs film = {film}
      renderScreens ={jest.fn()}
      tab = {`Overview`} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
