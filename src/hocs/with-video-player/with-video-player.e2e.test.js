import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';

configure({adapter: new Adapter()});

const filmData = {
  id: 1,
  title: `Aviator`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  scoring: 5,
  description: ``,
  ratings: 100,
  director: ``,
  starring: ``,
  genre: ``,
  year: 2000,
  cardImg: `img/aviator.jpg`,
  src: `http`
};

it(`test`, () => {
  const FilmCardWrapped = withFilmCard(FilmCard);
  const wrapper = mount(<FilmCardWrapped
    filmData = {filmData}
    app = {{}}
  />);

  window.HTMLMediaElement.prototype.play = () => {};
  wrapper.simulate(`mouseover`);

  const player = wrapper.find(`video`);
  jest.spyOn(player, `play`);

  expect(player.play).toHaveBeenCalledTimes(1);

});
