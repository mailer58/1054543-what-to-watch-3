import React from "react";
import renderer from "react-test-renderer";
import {FilmsList} from "./films-list.jsx";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  cardImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  src: `http`
}
];

it(`Should FilmsList render correctly`, () => {
  const tree = renderer
    .create(<FilmsList
      films = {films}
      renderScreens = {jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
