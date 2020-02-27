import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {FilmCard} from "./../film-card/film-card.jsx";

configure({adapter: new Adapter()});

const mock = {
  title: `one`,
  img: `pic-one`
};


const mockEvent = {
  preventDefault() {}
};


it(`Hover on card of film should pass to the callback data-object from which this card was created`, () => {
  const card = mock;
  const onMouseOver = jest.fn();
  const onMouseOut = jest.fn();
  const film = {
    title: `one`,
    img: `pic-one`,
  };

  const screen = shallow(<FilmCard
    title = {film.title}
    img = {film.img}
    onMouseOverCard = {onMouseOver(film)}
    onMouseOutCard = {onMouseOut}
    key = {0}
  />);

  const cards = screen.find(`.small-movie-card`);
  const cardOne = cards.at(0);

  cardOne.simulate(`mouseover`, mockEvent);

  expect(onMouseOver).toHaveBeenCalledTimes(1);
  expect(onMouseOver.mock.calls[0][0]).toMatchObject(card);
});
