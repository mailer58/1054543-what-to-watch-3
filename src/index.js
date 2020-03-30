import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from './reducer/reducer.js';
import {createAPI} from './api.js';
import {ActionCreator, Operation as DataOperation} from "./reducer/loading-data/loading-data.js";
import {AuthorizationStatus} from './reducer/user/user.js';
import thunk from "redux-thunk";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

export const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadFilms(api));
store.dispatch(DataOperation.loadPromoFilm(api));

ReactDOM.render(
    <Provider store={store}>
      <App/> </Provider>,
    document.querySelector(`#root`)
);

