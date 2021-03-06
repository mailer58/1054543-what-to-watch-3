import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';

configure({adapter: new Adapter()});

const filmData = {
  id: 1,
  name: `Aviator`,
  posterImage: `img/the-grand-budapest-hotel-posterImage.jpg`,
  rating: 5,
  description: ``,
  scoresCount: 100,
  director: ``,
  starring: [],
  genre: ``,
  released: 2000,
  previewImage: `img/aviator.jpg`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};


window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};
window.HTMLMediaElement.prototype.load = () => {};

it(`Test state of playing and pause`, () => {
  const FilmCardWrapped = withFilmCard(FilmCard);
  const wrapper = mount(<FilmCardWrapped
    filmData = {filmData}
    renderScreens = {jest.fn()}
  />);

  const filmCard = wrapper.find(`FilmCard`);

  filmCard.simulate(`mouseover`); // trigger playing
  wrapper.find(`WithVideoPlayer`).instance().componentDidUpdate();

  let isPlaying = wrapper.find(`WithVideoPlayer`).instance()[`state`][`isPlaying`];
  expect(isPlaying).toBe(true);

  filmCard.simulate(`mouseout`); // trigger stop of playing
  wrapper.find(`WithVideoPlayer`).instance().componentDidUpdate();

  isPlaying = wrapper.find(`WithVideoPlayer`).instance()[`state`][`isPlaying`];
  expect(isPlaying).toBe(false);
});
