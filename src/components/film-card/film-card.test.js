import React from "react";
import renderer from "react-test-renderer";
import {FilmCard} from "./film-card.jsx";

const films = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `http`
};

const film = {
  id: 1,
  name: `Aviator`,
  posterImage: `img/the-grand-budapest-hotel-posterImage.jpg`,
  rating: 5,
  description: `text`,
  scoresCount: 100,
  director: `director`,
  starring: `actor`,
  genre: `Drama`,
  released: 2000,
  previewImage: `img/aviator.jpg`,
  previewVideoLink: `http`
};

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
    .create(<FilmCard
      isActive = {false}
      name = {films.name}
      previewImage = {films.previewImage}
      previewVideoLink = {films.previewVideoLink}
      onMouseOverCard = {jest.fn(film)}
      onMouseOutCard = {jest.fn()}
      onClickCard = {jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
