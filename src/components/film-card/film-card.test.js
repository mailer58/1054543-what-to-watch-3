import React from "react";
import renderer from "react-test-renderer";
import {FilmCard} from "./film-card.jsx";

const films = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  cardImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
};

const film = {
  id: 1,
  title: `Aviator`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  scoring: 5,
  description: `text`,
  ratings: 100,
  director: `director`,
  starring: `actor`,
  genre: `Drama`,
  year: 2000,
  cardImg: `img/aviator.jpg`
};

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
    .create(<FilmCard
      title = {films.title}
      img = {films.cardImg}
      onMouseOverCard = {jest.fn(film)}
      onMouseOutCard = {jest.fn()}
      onClickCard = {jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
