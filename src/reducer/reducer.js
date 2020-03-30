import {combineReducers} from "redux";
import {reducer as appState} from './../reducer/app-state/app-state.js';
import {reducer as loadingData} from './../reducer/loading-data/loading-data.js';
import {reducer as user} from './../reducer/user/user.js';

import NameSpace from './name-space.js';

export default combineReducers({
  [NameSpace.APP_STATE]: appState,
  [NameSpace.LOADING_DATA]: loadingData,
  [NameSpace.USER]: user,
});
