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
},
{
  id: 2,
  title: `Revenant`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  scoring: 4,
  description: ``,
  ratings: 300,
  director: ``,
  starring: ``,
  genre: ``,
  year: 2005,
  cardImg: `img/revenant.jpg`,
  src: `http`
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
