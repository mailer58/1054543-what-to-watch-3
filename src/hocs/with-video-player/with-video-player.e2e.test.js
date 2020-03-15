import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFilmCard from './../../hocs/with-film-card/with-film-card.jsx';
import {FilmCard} from './../../components/film-card/film-card.jsx';

configure({adapter: new Adapter()});


const PLAYING_DELAY = 1000;

const filmData = {
  id: 1,
  title: `Aviator`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  scoring: 5,
  description: ``,
  ratings: 100,
  director: ``,
  starring: [],
  genre: ``,
  year: 2000,
  cardImg: `img/aviator.jpg`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};


window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

it(`test`, () => {
  const FilmCardWrapped = withFilmCard(FilmCard);
  const wrapper = mount(<FilmCardWrapped
    filmData = {filmData}
    renderScreens = {jest.fn()}
  />);

  const filmCard = wrapper.find(`FilmCard`);

  const video = wrapper.find(`WithVideoPlayer`).instance()[`_videoRef`][`current`];
  jest.spyOn(video, `play`);

  filmCard.simulate(`mouseover`); // trigger playing
  wrapper.find(`WithVideoPlayer`).instance().componentDidUpdate();

  jest.setTimeout(PLAYING_DELAY);

  const isPlaying = wrapper.find(`WithVideoPlayer`).instance()[`state`][`isPlaying`];
  expect(isPlaying).toBe(true);

});
