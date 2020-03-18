import React, {createRef} from "react";
import renderer from "react-test-renderer";
import {VideoPlayer} from './video-player.jsx';

it(`Should VideoPlayer render correctly`, () => {
  const tree = renderer
    .create(<VideoPlayer
      videoRef = {createRef()}
      src = {``}
      poster = {``}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
