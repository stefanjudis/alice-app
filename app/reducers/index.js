import { combineReducers } from 'redux';
import views from './views';
import config from './config';

const rootReducer = combineReducers({
  views,
  config
});

export default rootReducer;
