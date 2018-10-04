import { combineReducers } from 'redux';

import dataReducer from '../reducers/ReducerData';
import viewReducer from '../reducers/ReducerView';

export default combineReducers({
  data: dataReducer,
  view: viewReducer,
});
