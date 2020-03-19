import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

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
  const store = mockStore({
    currentGenre: ListOfGenres.ALL_GENRES
  });
  const tree = renderer
    .create(<Provider store = {store}>
      <FilmsList
        films = {films}
        renderScreens = {jest.fn()}
        key = {films[0].id}
      />
    </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
