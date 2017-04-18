import { combineReducers } from 'redux';
import chatbots from './ChatbotsReducers';
import auth from './AuthReducers';

const reducers = combineReducers({ chatbots, auth });

export default reducers;
