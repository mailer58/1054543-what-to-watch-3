import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

Enzyme.configure({
  adapter: new Adapter(),
});

const filmsData = [{
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
  previewVideoLink: `http`
},
{
  id: 2,
  name: `Revenant`,
  posterImage: `img/the-grand-budapest-hotel-posterImage.jpg`,
  rating: 4,
  description: ``,
  scoresCount: 300,
  director: ``,
  starring: [],
  genre: ``,
  released: 2005,
  previewImage: `img/revenant.jpg`,
  previewVideoLink: `http`
},
];

jest.mock(`./../app/app.jsx`);

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();

  const main = shallow(
      <Main
        promoFilmTitle = {
          PromoFilm.TITLE
        }
        promoFilmGenre = {
          PromoFilm.GENRE
        }
        promoFilmYear = {
          PromoFilm.YEAR
        }
        filmsData = {filmsData}
        onHeaderClick={onHeaderClick}
        renderScreens = {jest.fn()}
        genres = {[`All gernes`, `Action`]}
      />
  );

  const headers = main.find(`.catalog__genres-link`);

  let number = 0;
  headers.forEach((node) => {
    expect(node.props().onClick());
    number++;
  });

  expect(onHeaderClick.mock.calls.length).toBe(number);
});
