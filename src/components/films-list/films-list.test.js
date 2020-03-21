import React from "react";
import renderer from "react-test-renderer";
import {FilmsList} from "./films-list.jsx";

const ListOfGenres = {
  ALL_GENRES: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS_AND_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCIFI: `Sci-Fi`,
  THRILLERS: `Thrillers`
};

export const genres = Object.values(ListOfGenres);

const films = [{
  id: 1,
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `http`
}
];


it(`Should FilmsList render correctly`, () => {
  const tree = renderer
    .create(
        <FilmsList
          films = {films}
          renderScreens = {jest.fn()}
          key = {films[0].id}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
