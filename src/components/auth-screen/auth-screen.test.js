import React from "react";
import renderer from "react-test-renderer";
import AuthScreen from "./auth-screen.jsx";

it(`Should AuthScreen render correctly`, () => {
  const tree = renderer
    .create(<AuthScreen
      login = {jest.fn()}
      api = {jest.fn()} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
