import { combineReducers } from 'redux';
import router from './router';
import posts from './posts';
import user from './user';

export default combineReducers({
    router,
    posts,
    user,
});
