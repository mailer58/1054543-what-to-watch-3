import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from './reducer/reducer.js';
import {createAPI} from './api.js';
import {Operation as DataOperation} from "./reducer/loading-data/loading-data.js";
import {Operation as UserOperation} from './reducer/user/user.js';
import {ActionCreator as ActionCreatorUser} from './reducer/user/user.js';
import {AuthorizationStatus} from './reducer/user/user.js';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const onUnauthorized = () => {
  store.dispatch(ActionCreatorUser.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

export const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms(api));
store.dispatch(DataOperation.loadPromoFilm(api));
store.dispatch(UserOperation.checkAuth(api));

ReactDOM.render(
    <Provider store={store}>
      <App api = {api}/>
    </Provider>,
    document.querySelector(`#root`)
);

