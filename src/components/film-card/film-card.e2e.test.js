import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {FilmCard} from "./../film-card/film-card.jsx";

configure({adapter: new Adapter()});

const mock = {
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


const mockEvent = {
  preventDefault() {}
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

const card = mock;
const onMouseOver = jest.fn();
onMouseOver.mockReturnValue(jest.fn());
const onMouseOut = jest.fn();
const onClick = jest.fn();
onClick.mockReturnValue(jest.fn());

const screen = shallow(<FilmCard
  isActive = {false}
  name = {film.name}
  previewImage = {film.previewImage}
  previewVideoLink = {film.previewVideoLink}
  onMouseOverCard = {onMouseOver(film)}
  onMouseOutCard = {onMouseOut}
  onClickCard = {onClick(film)}
  key = {0}
/>);

const cards = screen.find(`.small-movie-card`);
const cardOne = cards.at(0);

it(`Hover on card of film should pass to the callback data-object from which this card was created`, () => {

  cardOne.simulate(`mouseover`, mockEvent);

  expect(onMouseOver).toHaveBeenCalledTimes(1);
  expect(onMouseOver.mock.calls[0][0]).toMatchObject(card);
});

it(`Click on card of film should pass to the callback data-object from which this card was created`, () => {

  cardOne.simulate(`click`, mockEvent);

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick.mock.calls[0][0]).toMatchObject(card);
});
