import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const filmsCards = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/snatch.jpg`
},
];

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();

  const main = shallow(
      <Main
        titleFilm = {
          PromoFilm.TITLE
        }
        genreFilm = {
          PromoFilm.GENRE
        }
        yearFilm = {
          PromoFilm.YEAR
        }
        filmsCards = {filmsCards}
        onHeaderClick={onHeaderClick}
      />
  );

  const header = main.find(`.btn--list`);
  header.props().onClick();

  expect(onHeaderClick.mock.calls.length).toBe(1);
});
