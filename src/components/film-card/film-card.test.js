import React from "react";
import renderer from "react-test-renderer";
import {FilmCard} from "./film-card.jsx";

const films = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
}
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<FilmCard
      title = {films[0].title}
      img = {films[0].img}
      onMouseOverCard = {jest.fn()}
      onMouseOutCard = {jest.fn()}

    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
