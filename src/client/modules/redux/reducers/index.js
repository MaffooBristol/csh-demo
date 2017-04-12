import { combineReducers } from 'redux';
import chatbots from './ChatbotsReducers';

const reducers = combineReducers({ chatbots });

export default reducers;
