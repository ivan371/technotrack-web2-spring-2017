import { combineReducers } from 'redux';
import router from './router';
import posts from './posts';
import users from './users';
import chats from './chats';
import friend from './friend';
import news from './news';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    router,
    posts,
    users,
    chats,
    friend,
    news,
    routing: routerReducer
});
