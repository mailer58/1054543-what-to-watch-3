import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const PromoFilm = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

const filmsCards = [{
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  img: `img/snatch.jpg`
},
{
  title: `Bohemian Rhapsody`,
  img: `img/snatch.jpg`
},
{
  title: `Macbeth`,
  img: `img/snatch.jpg`
}
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main titleFilm = {
      PromoFilm.TITLE
    }
    genreFilm = {
      PromoFilm.GENRE
    }
    yearFilm = {
      PromoFilm.YEAR
    }
    filmsCards = {filmsCards}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
