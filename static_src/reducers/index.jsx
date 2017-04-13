import { combineReducers } from 'redux';
import router from './router';
import posts from './posts';
import user from './user';
import users from './users';
import chats from './chats';
import friend from './friend';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    router,
    posts,
    user,
    users,
    chats,
    friend,
    routing: routerReducer
});
