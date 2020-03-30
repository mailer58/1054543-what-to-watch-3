import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const promo = {
  id: 1,
  name: `Midnight Special`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Midnight_Special.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/midnight-special.jpg`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Midnight_Special.jpg`,
  backgroundColor: `#828585`,
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  description: `A father and son go on the run, pursued by the government and a cult drawn to the child's special powers.`,
  rating: 3.3,
  scoresCount: 67815,
  director: `Jeff Nichols`,
  starring: [`Michael Shannon`, `Joel Edgerton`, `Kirsten Dunst `],
  runTime: 112,
  genre: `Action`,
  released: 2016,
  isVaforite: false,
};

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`./../app/app.jsx`);

it(`Should header be pressed`, () => {
  const onHeaderClick = jest.fn();

  const main = shallow(
      <Main
        promoFilm = {promo}
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
