import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {FilmCard} from "./../film-card/film-card.jsx";

configure({adapter: new Adapter()});

const mock = {
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
  cardImg: `img/aviator.jpg`,
  src: `http`
};


const mockEvent = {
  preventDefault() {}
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
  cardImg: `img/aviator.jpg`,
  src: `http`
};

const card = mock;
const onMouseOver = jest.fn();
onMouseOver.mockReturnValue(jest.fn());
const onMouseOut = jest.fn();
const onClick = jest.fn();
onClick.mockReturnValue(jest.fn());

const screen = shallow(<FilmCard
  isActive = {false}
  title = {film.title}
  img = {film.cardImg}
  video = {film.src}
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
