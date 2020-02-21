import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

it(`Render App`, () => {
  const tree = renderer
    .create(<App title = {
      PromoFilm.TITLE
    }
    genre = {
      PromoFilm.GENRE
    }
    year = {
      PromoFilm.YEAR
    }
    cards = {filmsCards}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
