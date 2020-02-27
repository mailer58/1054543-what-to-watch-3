import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
}
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<FilmsList
      films = {films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
